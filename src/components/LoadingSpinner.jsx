import React from 'react';

const LoadingSpinner = ({ fullPage = false }) => {
  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      <p className="text-slate-500 font-medium animate-pulse">Loading WanderLog...</p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return (
    <div className="py-12 flex items-center justify-center">
      {spinner}
    </div>
  );
};

export default LoadingSpinner;
