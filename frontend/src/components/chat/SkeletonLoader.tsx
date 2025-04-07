import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="space-y-4 w-full max-w-md p-4">
        {/* Skeleton for header */}
        <div className="h-8 bg-gray-300 rounded-md animate-pulse"></div>

        {/* Skeleton for messages */}
        <div className="space-y-2">
          <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
        </div>

        {/* Skeleton for input */}
        <div className="h-10 bg-gray-300 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;