import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Users, BookOpen, Award, Zap, ArrowRight } from 'lucide-react';
import { coursesData } from '../data/courses';
import CourseCard from '../components/CourseCard';

const HomePage: React.FC = () => {
  useEffect(() => {
    // Update document title
    document.title = 'EduLearn - Home';
  }, []);

  // Show only 3 featured courses
  const featuredCourses = coursesData.slice(0, 3);
  
  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white h-screen max-h-[700px] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Campus" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 z-10 py-20 mt-16">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Expand Your Knowledge & Achieve Your Goals
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Discover a world of learning opportunities with our comprehensive courses 
              designed to help you succeed in today's competitive environment.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/courses"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center transition-colors"
              >
                Browse Courses
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/register"
                className="bg-white hover:bg-gray-100 text-blue-900 px-6 py-3 rounded-md font-medium flex items-center justify-center transition-colors"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <p className="text-4xl font-bold text-blue-700 mb-2">10k+</p>
              <p className="text-gray-600">Students</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-blue-700 mb-2">150+</p>
              <p className="text-gray-600">Courses</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-blue-700 mb-2">50+</p>
              <p className="text-gray-600">Instructors</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-blue-700 mb-2">95%</p>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <img 
                src="https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="About EduLearn" 
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">About EduLearn</h2>
              <p className="text-gray-600 mb-6">
                Founded in 2010, EduLearn has been at the forefront of online education, 
                providing high-quality learning experiences to students worldwide. 
                Our mission is to make education accessible, engaging, and effective for everyone.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <Users className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Expert Instructors</h3>
                    <p className="text-gray-600">Learn from industry professionals and academic experts.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <BookOpen className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Comprehensive Curriculum</h3>
                    <p className="text-gray-600">Courses designed to provide both theoretical knowledge and practical skills.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <Award className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Recognized Certifications</h3>
                    <p className="text-gray-600">Earn certificates valued by employers worldwide.</p>
                  </div>
                </div>
              </div>
              <Link 
                to="/about" 
                className="inline-flex items-center text-blue-700 hover:text-blue-800 font-medium transition-colors"
              >
                Learn more about us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Courses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular courses designed to help you master new skills 
              and advance your career. Learn at your own pace with our flexible online programs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map(course => (
              <CourseCard 
                key={course.id} 
                course={course}
                showAddToCart={false}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/courses" 
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-md font-medium inline-flex items-center transition-colors"
            >
              View All Courses
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of students who have already transformed their lives through education.
              Register now and get access to our comprehensive course library.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/register"
                className="bg-white hover:bg-gray-100 text-blue-800 px-8 py-4 rounded-md font-medium transition-colors inline-flex items-center justify-center"
              >
                Register Now
                <Zap className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="bg-transparent hover:bg-blue-700 border-2 border-white text-white px-8 py-4 rounded-md font-medium transition-colors inline-flex items-center justify-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;