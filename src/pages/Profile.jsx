import React, { useState } from 'react';
import { User, Bookmark, CheckCircle, TrendingUp, Globe2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTravel } from '../hooks/useTravel';
import { formatNumber } from '../utils/helpers';
import BucketList from '../components/BucketList';
import VisitedList from '../components/VisitedList';

const Profile = () => {
  const { user } = useAuth();
  const { bucketList, visitedCountries, stats, countries } = useTravel();
  const [activeTab, setActiveTab] = useState('bucket');

  const coveragePercent = countries.length > 0 
    ? ((visitedCountries.length / countries.length) * 100).toFixed(1) 
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
          <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400">
            <User className="w-12 h-12" />
          </div>
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Traveler Profile</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-4">{user?.email}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-full">
                Member since May 2026
              </span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full">
                {visitedCountries.length} Countries Visited
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center space-x-3 mb-4 text-orange-500">
            <Bookmark className="w-5 h-5" />
            <h3 className="font-bold text-slate-800 dark:text-slate-100">Bucket List</h3>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{stats.bucketListCount}</p>
          <p className="text-sm text-slate-500">Countries to visit</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center space-x-3 mb-4 text-green-500">
            <CheckCircle className="w-5 h-5" />
            <h3 className="font-bold text-slate-800 dark:text-slate-100">Visited</h3>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{stats.visitedCount}</p>
          <p className="text-sm text-slate-500">Countries explored</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center space-x-3 mb-4 text-blue-500">
            <TrendingUp className="w-5 h-5" />
            <h3 className="font-bold text-slate-800 dark:text-slate-100">Coverage</h3>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{coveragePercent}%</p>
          <p className="text-sm text-slate-500">Of the world explored</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center space-x-3 mb-4 text-purple-500">
            <Globe2 className="w-5 h-5" />
            <h3 className="font-bold text-slate-800 dark:text-slate-100">Impact</h3>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white truncate" title={formatNumber(stats.totalPopulation)}>
            {formatNumber(stats.totalPopulation)}
          </p>
          <p className="text-sm text-slate-500">Total population met</p>
        </div>
      </div>

      <div className="mb-8 border-b border-slate-200 dark:border-slate-700">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('bucket')}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === 'bucket' 
                ? 'text-primary-600' 
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Bucket List ({bucketList.length})
            {activeTab === 'bucket' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600 rounded-full"></div>}
          </button>
          <button
            onClick={() => setActiveTab('visited')}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === 'visited' 
                ? 'text-primary-600' 
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Visited Countries ({visitedCountries.length})
            {activeTab === 'visited' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600 rounded-full"></div>}
          </button>
        </div>
      </div>

      <div className="animate-fade-in">
        {activeTab === 'bucket' ? (
          <BucketList countries={bucketList} />
        ) : (
          <VisitedList countries={visitedCountries} />
        )}
      </div>
    </div>
  );
};

export default Profile;
