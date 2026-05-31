import React from 'react';
import { REGIONS } from '../utils/constants';

const RegionFilter = ({ value, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange('All')}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
          value === 'All'
            ? 'bg-primary-600 text-white shadow-md'
            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-primary-400'
        }`}
      >
        All
      </button>
      {REGIONS.map((region) => (
        <button
          key={region}
          onClick={() => onChange(region)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            value === region
              ? 'bg-primary-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-primary-400'
          }`}
        >
          {region}
        </button>
      ))}
    </div>
  );
};

export default RegionFilter;
