import React, { useState } from 'react';
import { FacultyMember } from '../data/faculty';
import { Mail, ChevronDown, ChevronUp } from 'lucide-react';

interface FacultyCardProps {
  faculty: FacultyMember;
}

const FacultyCard: React.FC<FacultyCardProps> = ({ faculty }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="md:flex">
        <div className="md:w-1/3">
          <img 
            src={faculty.image} 
            alt={faculty.name} 
            className="w-full h-64 md:h-full object-cover"
          />
        </div>
        
        <div className="p-6 md:w-2/3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
            <h3 className="text-xl font-semibold text-gray-800">{faculty.name}</h3>
            <span className="text-blue-700 font-medium text-sm md:text-base">{faculty.department}</span>
          </div>
          
          <p className="text-gray-700 font-medium mb-2">{faculty.title}</p>
          
          <div className="mb-4">
            <p className={`text-gray-600 ${expanded ? '' : 'line-clamp-2'}`}>{faculty.bio}</p>
            <button 
              onClick={() => setExpanded(!expanded)}
              className="text-blue-700 hover:text-blue-800 text-sm font-medium flex items-center mt-1"
            >
              {expanded ? (
                <>
                  <span>Show less</span>
                  <ChevronUp className="h-4 w-4 ml-1" />
                </>
              ) : (
                <>
                  <span>Read more</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </>
              )}
            </button>
          </div>
          
          <div className="text-sm text-gray-600 space-y-1 mb-4">
            <p>Email: {faculty.email}</p>
            <p>Phone: {faculty.phone}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Courses:</h4>
            <div className="flex flex-wrap gap-2">
              {faculty.courses.map((course, index) => (
                <span 
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-4">
            <a 
              href={`mailto:${faculty.email}`}
              className="inline-flex items-center text-blue-700 hover:text-blue-800"
            >
              <Mail className="h-4 w-4 mr-1" />
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyCard;