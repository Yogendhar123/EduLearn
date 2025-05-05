import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, LogOut, User, BookOpen, Home } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!currentUser) return '/login';
    
    switch (currentUser.role) {
      case 'admin':
        return '/dashboard/admin';
      case 'faculty':
        return '/dashboard/faculty';
      case 'student':
        return '/dashboard/student';
      default:
        return '/login';
    }
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-800" />
            <span className="ml-2 text-xl font-bold text-blue-800">EduLearn</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-800 hover:text-blue-700 transition-colors">Home</Link>
            <Link to="/about" className="text-gray-800 hover:text-blue-700 transition-colors">About</Link>
            <Link to="/courses" className="text-gray-800 hover:text-blue-700 transition-colors">Courses</Link>
            <Link to="/faculty" className="text-gray-800 hover:text-blue-700 transition-colors">Faculty</Link>
            <Link to="/contact" className="text-gray-800 hover:text-blue-700 transition-colors">Contact</Link>
            
            {currentUser ? (
              <div className="relative">
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-1 text-gray-800 hover:text-blue-700 transition-colors"
                >
                  <span>{currentUser.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link 
                      to={getDashboardLink()} 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    {currentUser.role === 'student' && (
                      <Link 
                        to="/cart" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Cart
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-blue-700 hover:text-blue-800 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-700 text-white hover:bg-blue-800 px-4 py-2 rounded-md transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-800" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg mt-2">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-800 hover:text-blue-700 transition-colors py-2">Home</Link>
              <Link to="/about" className="text-gray-800 hover:text-blue-700 transition-colors py-2">About</Link>
              <Link to="/courses" className="text-gray-800 hover:text-blue-700 transition-colors py-2">Courses</Link>
              <Link to="/faculty" className="text-gray-800 hover:text-blue-700 transition-colors py-2">Faculty</Link>
              <Link to="/contact" className="text-gray-800 hover:text-blue-700 transition-colors py-2">Contact</Link>
              
              {currentUser ? (
                <>
                  <Link 
                    to={getDashboardLink()} 
                    className="flex items-center text-gray-800 hover:text-blue-700 transition-colors py-2"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                  {currentUser.role === 'student' && (
                    <Link 
                      to="/cart" 
                      className="text-gray-800 hover:text-blue-700 transition-colors py-2"
                    >
                      Cart
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-gray-800 hover:text-blue-700 transition-colors py-2"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                  <Link 
                    to="/login" 
                    className="text-blue-700 hover:text-blue-800 transition-colors py-2"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-blue-700 text-white hover:bg-blue-800 px-4 py-2 rounded-md transition-colors text-center"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;