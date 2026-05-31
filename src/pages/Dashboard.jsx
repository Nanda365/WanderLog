import React, { useState, useEffect } from 'react';
import { LayoutGrid, ListFilter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useTravel } from '../hooks/useTravel';
import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';
import RegionFilter from '../components/RegionFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { SORT_OPTIONS } from '../utils/constants';

const Dashboard = () => {
  const {
    filteredCountries,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    regionFilter,
    setRegionFilter,
    sortBy,
    setSortBy,
    countries
  } = useTravel();

  const [visibleCount, setVisibleCount] = useState(20);

  // Reset pagination when search/filter changes
  useEffect(() => {
    setVisibleCount(20);
  }, [searchTerm, regionFilter, sortBy]);

  if (loading && countries.length === 0) return <LoadingSpinner fullPage />;
  if (error && countries.length === 0) return <ErrorState message={error} />;

  const visibleCountries = filteredCountries.slice(0, visibleCount);
  const hasMore = filteredCountries.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 20);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Explore the World</h1>
        <p className="text-slate-600 dark:text-slate-400">Discover new destinations and add them to your bucket list.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 mb-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-sm font-medium">Sort by:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 transition-all outline-none"
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
            <ListFilter className="w-4 h-4" />
            <span className="text-sm font-medium">Regions:</span>
          </div>
          <RegionFilter value={regionFilter} onChange={setRegionFilter} />
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing <span className="font-bold text-slate-900 dark:text-slate-100">{visibleCountries.length}</span> of <span className="font-bold text-slate-900 dark:text-slate-100">{filteredCountries.length}</span> countries
        </p>
        <div className="flex items-center space-x-2 text-slate-400">
          <LayoutGrid className="w-4 h-4" />
        </div>
      </div>

      {visibleCountries.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleCountries.map(country => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>
          
          {hasMore && (
            <div className="mt-12 flex flex-col items-center">
              <button
                onClick={handleLoadMore}
                className="group flex items-center space-x-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary-500 px-8 py-3 rounded-xl font-bold text-slate-700 dark:text-slate-200 shadow-sm transition-all card-hover"
              >
                <span>Load More Countries</span>
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </button>
              <p className="mt-4 text-xs text-slate-400">
                You've seen {visibleCountries.length} out of {filteredCountries.length} destinations
              </p>
            </div>
          )}
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default Dashboard;
