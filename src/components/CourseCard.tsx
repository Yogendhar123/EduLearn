import React from 'react';
import { Course } from '../data/courses';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingCart, BookOpen, Users, Clock } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onAddToCart?: (course: Course) => void;
  showAddToCart?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  onAddToCart,
  showAddToCart = true
}) => {
  const { currentUser } = useAuth();
  const isStudent = currentUser?.role === 'student';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
          {course.level}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
        
        <p className="text-gray-600 text-sm mb-4">{course.description}</p>
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <Clock className="h-4 w-4 mr-1" />
          <span>{course.duration}</span>
          <Users className="h-4 w-4 ml-4 mr-1" />
          <span>{course.enrolledStudents} students</span>
        </div>
        
        <div className="flex items-center mb-4">
          <img 
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt={course.instructor} 
            className="w-8 h-8 rounded-full mr-2 object-cover"
          />
          <span className="text-sm font-medium text-gray-700">{course.instructor}</span>
        </div>
        
        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-xl font-bold text-blue-700">${course.price.toFixed(2)}</span>
          
          {isStudent && showAddToCart && (
            <button 
              onClick={() => onAddToCart && onAddToCart(course)}
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md flex items-center transition-colors"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </button>
          )}
          
          {!isStudent && (
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md flex items-center transition-colors">
              <BookOpen className="h-4 w-4 mr-1" />
              Learn More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;