import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-8">
        <Compass className="w-32 h-32 text-primary-600 dark:text-primary-500 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-black text-white drop-shadow-lg">
          404
        </div>
      </div>
      <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Lost in Translation?</h1>
      <p className="text-xl text-slate-600 dark:text-slate-400 max-w-md mb-8">
        The destination you're looking for doesn't exist on our map yet. Let's get you back on track.
      </p>
      <Link
        to="/"
        className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-primary-500/25"
      >
        <Home className="w-5 h-5" />
        <span>Return to Dashboard</span>
      </Link>
    </div>
  );
};

export default NotFound;
