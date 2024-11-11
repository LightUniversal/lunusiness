import React from 'react';
import { Link } from 'react-router-dom';

const NotAuthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Access Denied</h1>
      <p className="text-lg text-gray-700 mb-8">
        You do not have permission to view this page.
      </p>
      <Link
        to="/"
        className="px-6 py-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotAuthorized;
