import React from 'react';
import { SearchX } from 'lucide-react';

const EmptyState = ({ title = "No countries found", message = "Try adjusting your search or filters to find what you're looking for." }) => {
  return (
    <div className="py-16 flex flex-col items-center justify-center text-center px-4">
      <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full mb-4">
        <SearchX className="w-12 h-12 text-slate-400" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 max-w-md">{message}</p>
    </div>
  );
};

export default EmptyState;
