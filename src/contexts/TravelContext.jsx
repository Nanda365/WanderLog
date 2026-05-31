import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { storage } from '../utils/storage';
import { fetchAllCountries } from '../api/countryApi';

const TravelContext = createContext();

export const TravelProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bucketList, setBucketList] = useState(storage.get('bucketList') || []);
  const [visitedCountries, setVisitedCountries] = useState(storage.get('visitedCountries') || []);
  const [theme, setTheme] = useState(() => {
    const saved = storage.get('theme');
    return saved === 'dark' ? 'dark' : 'light';
  });
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCountries();
        setCountries(data);
      } catch (err) {
        setError('Failed to fetch countries. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadCountries();
  }, []);

  useEffect(() => {
    storage.set('bucketList', bucketList);
  }, [bucketList]);

  useEffect(() => {
    storage.set('visitedCountries', visitedCountries);
  }, [visitedCountries]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    storage.set('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const addToBucketList = useCallback((country) => {
    setBucketList(prev => {
      if (prev.find(c => c.cca3 === country.cca3)) return prev;
      return [...prev, country];
    });
  }, []);

  const removeFromBucketList = useCallback((cca3) => {
    setBucketList(prev => prev.filter(c => c.cca3 !== cca3));
  }, []);

  const toggleVisited = useCallback((country) => {
    setVisitedCountries(prev => {
      if (prev.find(c => c.cca3 === country.cca3)) {
        return prev.filter(c => c.cca3 !== country.cca3);
      }
      return [...prev, country];
    });
  }, []);

  const filteredCountries = useMemo(() => {
    let result = countries.filter(country => {
      const name = country.name?.common || '';
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = regionFilter === 'All' || country.region === regionFilter;
      return matchesSearch && matchesRegion;
    });

    result.sort((a, b) => {
      const nameA = a.name?.common || '';
      const nameB = b.name?.common || '';
      
      switch (sortBy) {
        case 'name-asc':
          return nameA.localeCompare(nameB);
        case 'name-desc':
          return nameB.localeCompare(nameA);
        case 'pop-desc':
          return (b.population || 0) - (a.population || 0);
        case 'pop-asc':
          return (a.population || 0) - (b.population || 0);
        case 'area-desc':
          return (b.area || 0) - (a.area || 0);
        case 'area-asc':
          return (a.area || 0) - (b.area || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [countries, searchTerm, regionFilter, sortBy]);

  const stats = useMemo(() => {
    const totalPopulation = visitedCountries.reduce((sum, c) => sum + (c.population || 0), 0);
    return {
      bucketListCount: bucketList.length,
      visitedCount: visitedCountries.length,
      totalPopulation
    };
  }, [bucketList, visitedCountries]);

  return (
    <TravelContext.Provider value={{
      countries,
      loading,
      error,
      bucketList,
      visitedCountries,
      theme,
      searchTerm,
      regionFilter,
      sortBy,
      filteredCountries,
      stats,
      setSearchTerm,
      setRegionFilter,
      setSortBy,
      toggleTheme,
      addToBucketList,
      removeFromBucketList,
      toggleVisited
    }}>
      {children}
    </TravelContext.Provider>
  );
};

export const useTravel = () => useContext(TravelContext);
export default TravelContext;
