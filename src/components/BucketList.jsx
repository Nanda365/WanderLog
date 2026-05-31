import React from 'react';
import CountryCard from './CountryCard';
import EmptyState from './EmptyState';

const BucketList = ({ countries }) => {
  if (countries.length === 0) {
    return <EmptyState title="Bucket list is empty" message="Explore countries and add some to your bucket list!" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {countries.map(country => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  );
};

export default BucketList;
