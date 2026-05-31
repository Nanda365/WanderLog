import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Users, Globe, MapPin, Languages, Banknote, Clock, Maximize, Bookmark, CheckCircle, ExternalLink } from 'lucide-react';
import { fetchCountryByCode } from '../api/countryApi';
import { useTravel } from '../hooks/useTravel';
import { formatNumber } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';

const CountryDetails = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { bucketList, visitedCountries, addToBucketList, removeFromBucketList, toggleVisited, countries } = useTravel();

  useEffect(() => {
    const loadCountry = async () => {
      try {
        setLoading(true);
        const data = await fetchCountryByCode(code);
        setCountry(data);
      } catch (err) {
        setError('Failed to load country details.');
      } finally {
        setLoading(false);
      }
    };
    loadCountry();
    window.scrollTo(0, 0);
  }, [code]);

  if (loading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;
  if (!country) return <ErrorState message="Country not found" />;

  const isInBucketList = bucketList.some(c => c.cca3 === country.cca3);
  const isVisited = visitedCountries.some(c => c.cca3 === country.cca3);

  const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
  const currencies = country.currencies 
    ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ') 
    : 'N/A';
  
  const borderCountries = country.borders?.map(borderCode => {
    const borderCountry = countries.find(c => c.cca3 === borderCode);
    return borderCountry ? { name: borderCountry.name.common, code: borderCode } : { name: borderCode, code: borderCode };
  }) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Explorer</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800">
            <img
              src={country.flags.svg || country.flags.png}
              alt={`Flag of ${country.name.common}`}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => isInBucketList ? removeFromBucketList(country.cca3) : addToBucketList(country)}
              className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-bold transition-all shadow-sm ${
                isInBucketList 
                  ? 'bg-orange-500 text-white hover:bg-orange-600' 
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-orange-500 hover:text-orange-500'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isInBucketList ? 'fill-current' : ''}`} />
              <span>{isInBucketList ? 'In Bucket List' : 'Add to Bucket'}</span>
            </button>
            <button
              onClick={() => toggleVisited(country)}
              className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-bold transition-all shadow-sm ${
                isVisited 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-green-500 hover:text-green-500'
              }`}
            >
              <CheckCircle className={`w-5 h-5 ${isVisited ? 'fill-current' : ''}`} />
              <span>{isVisited ? 'Visited' : 'Mark Visited'}</span>
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs font-bold rounded-full uppercase tracking-wider">
                {country.region} / {country.subregion || 'N/A'}
              </span>
              {country.unMember && (
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold rounded-full">
                  UN Member
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
              {country.name.common}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">
              {country.name.official}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">Capital</p>
                <p className="text-slate-900 dark:text-white font-medium">{country.capital?.[0] || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">Population</p>
                <p className="text-slate-900 dark:text-white font-medium">{formatNumber(country.population)}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                <Maximize className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">Area</p>
                <p className="text-slate-900 dark:text-white font-medium">{formatNumber(country.area)} km²</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">TLD</p>
                <p className="text-slate-900 dark:text-white font-medium">{country.tld?.[0] || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                <Languages className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">Languages</p>
                <p className="text-slate-900 dark:text-white font-medium">{languages}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                <Banknote className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">Currencies</p>
                <p className="text-slate-900 dark:text-white font-medium">{currencies}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">Timezones</p>
                <p className="text-slate-900 dark:text-white font-medium truncate max-w-[200px]" title={country.timezones?.join(', ')}>
                  {country.timezones?.[0]} {country.timezones?.length > 1 && `(+${country.timezones.length - 1} more)`}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Border Countries</h3>
            {borderCountries.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {borderCountries.map(border => (
                  <Link
                    key={border.code}
                    to={`/country/${border.code}`}
                    className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-primary-500 hover:text-primary-600 transition-all shadow-sm"
                  >
                    {border.name}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 dark:text-slate-400 text-sm italic">This country has no land borders.</p>
            )}
          </div>

          <div className="pt-6">
            <a
              href={`https://www.google.com/maps/place/${country.name.common}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 font-bold hover:underline"
            >
              <span>View on Google Maps</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
