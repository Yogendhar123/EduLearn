import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-16 pb-12 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-700">404</h1>
        <div className="mt-4 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</h2>
          <p className="text-gray-600">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-md font-medium inline-flex items-center justify-center transition-colors"
          >
            <Home className="h-5 w-5 mr-2" />
            Go to Homepage
          </Link>
          <Link
            to="/courses"
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 px-6 py-3 rounded-md font-medium inline-flex items-center justify-center transition-colors"
          >
            <Search className="h-5 w-5 mr-2" />
            Browse Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;