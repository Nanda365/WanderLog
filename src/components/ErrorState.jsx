import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="py-16 flex flex-col items-center justify-center text-center px-4">
      <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mb-4">
        <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Oops! Something went wrong</h3>
      <p className="text-slate-600 dark:text-slate-400 max-w-md mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

export default ErrorState;
