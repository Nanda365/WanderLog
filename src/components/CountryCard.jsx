import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, CheckCircle, Info } from 'lucide-react';
import { useTravel } from '../hooks/useTravel';
import { formatNumber } from '../utils/helpers';

const CountryCard = ({ country }) => {
  const { bucketList, visitedCountries, addToBucketList, removeFromBucketList, toggleVisited } = useTravel();
  
  const isInBucketList = bucketList.some(c => c.cca3 === country.cca3);
  const isVisited = visitedCountries.some(c => c.cca3 === country.cca3);

  const handleBucketList = (e) => {
    e.preventDefault();
    if (isInBucketList) {
      removeFromBucketList(country.cca3);
    } else {
      addToBucketList(country);
    }
  };

  const handleVisited = (e) => {
    e.preventDefault();
    toggleVisited(country);
  };

  return (
    <div className="group bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col h-full animate-fade-in">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={country.flags.svg || country.flags.png}
          alt={`Flag of ${country.name.common}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
        
        <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleBucketList}
            className={`p-2 rounded-lg backdrop-blur-md transition-colors ${
              isInBucketList 
                ? 'bg-orange-500 text-white' 
                : 'bg-white/80 text-slate-700 hover:bg-orange-500 hover:text-white'
            }`}
            title={isInBucketList ? "Remove from Bucket List" : "Add to Bucket List"}
          >
            <Bookmark className={`w-5 h-5 ${isInBucketList ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleVisited}
            className={`p-2 rounded-lg backdrop-blur-md transition-colors ${
              isVisited 
                ? 'bg-green-500 text-white' 
                : 'bg-white/80 text-slate-700 hover:bg-green-500 hover:text-white'
            }`}
            title={isVisited ? "Mark as Unvisited" : "Mark as Visited"}
          >
            <CheckCircle className={`w-5 h-5 ${isVisited ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 line-clamp-1">
            {country.name.common}
          </h3>
          <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
            {country.cca3}
          </span>
        </div>
        
        <div className="space-y-1.5 text-sm">
          <p className="text-slate-600 dark:text-slate-400">
            <span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}
          </p>
          <p className="text-slate-600 dark:text-slate-400">
            <span className="font-semibold">Population:</span> {formatNumber(country.population)}
          </p>
          <p className="text-slate-600 dark:text-slate-400">
            <span className="font-semibold">Region:</span> {country.region}
          </p>
        </div>
      </div>

      <div className="p-4 pt-0 mt-auto">
        <Link
          to={`/country/${country.cca3}`}
          className="w-full flex items-center justify-center space-x-2 py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 rounded-lg transition-all duration-300 font-medium text-slate-700 dark:text-slate-200"
        >
          <Info className="w-4 h-4" />
          <span>View Details</span>
        </Link>
      </div>
    </div>
  );
};

export default CountryCard;
