import React, { useState, useEffect } from 'react';
import { coursesData, Course } from '../data/courses';
import CourseCard from '../components/CourseCard';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(coursesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [filtersVisible, setFiltersVisible] = useState(false);
  const { currentUser } = useAuth();
  
  // Get unique categories
  const categories = ['All', ...new Set(coursesData.map(course => course.category))];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    // Update document title
    document.title = 'Courses - EduLearn';
    
    // Filter courses based on search and filters
    let filtered = [...coursesData];
    
    // Apply search filter
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(lowercasedSearch) || 
        course.description.toLowerCase().includes(lowercasedSearch) ||
        course.instructor.toLowerCase().includes(lowercasedSearch)
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'All') {
      filtered = filtered.filter(course => course.category === categoryFilter);
    }
    
    // Apply level filter
    if (levelFilter !== 'All') {
      filtered = filtered.filter(course => course.level === levelFilter);
    }
    
    setCourses(filtered);
  }, [searchTerm, categoryFilter, levelFilter]);

  const handleAddToCart = (course: Course) => {
    // Get existing cart from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if course is already in cart
    const existingItem = cartItems.find((item: any) => item.courseId === course.id);
    
    if (existingItem) {
      // Update quantity if already in cart
      existingItem.quantity += 1;
    } else {
      // Add new item to cart
      cartItems.push({
        courseId: course.id,
        quantity: 1,
        course
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Show success message
    alert(`${course.title} added to cart!`);
  };

  return (
    <div className="pt-20 pb-16">
      {/* Hero Section */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Courses</h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover a wide range of courses designed to help you achieve your personal and professional goals.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-6">
            <button
              onClick={() => setFiltersVisible(!filtersVisible)}
              className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-md px-4 py-3"
            >
              <div className="flex items-center">
                <Filter className="h-5 w-5 mr-2 text-gray-500" />
                <span className="text-gray-700 font-medium">Filters</span>
              </div>
              <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${filtersVisible ? 'transform rotate-180' : ''}`} />
            </button>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Filters */}
            <div className={`md:w-1/4 lg:w-1/5 md:pr-8 ${filtersVisible ? 'block' : 'hidden'} md:block`}>
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category}`}
                        name="category"
                        checked={categoryFilter === category}
                        onChange={() => setCategoryFilter(category)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={`category-${category}`} className="ml-2 text-gray-700">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Level</h3>
                <div className="space-y-2">
                  {levels.map((level, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="radio"
                        id={`level-${level}`}
                        name="level"
                        checked={levelFilter === level}
                        onChange={() => setLevelFilter(level)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={`level-${level}`} className="ml-2 text-gray-700">
                        {level}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Course Grid */}
            <div className="md:w-3/4 lg:w-4/5">
              {courses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map(course => (
                    <CourseCard 
                      key={course.id} 
                      course={course}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No courses found matching your criteria.</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setCategoryFilter('All');
                      setLevelFilter('All');
                    }}
                    className="mt-4 text-blue-600 hover:text-blue-800"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;