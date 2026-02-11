import React from 'react';

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary dark:text-gray-100">
          Personal Finance Tracker
        </h1>
      </div>
    </header>
  );
};

export default Header;
