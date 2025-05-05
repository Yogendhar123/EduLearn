import React, { useEffect } from 'react';
import { facultyData } from '../data/faculty';
import FacultyCard from '../components/FacultyCard';

const FacultyPage: React.FC = () => {
  useEffect(() => {
    // Update document title
    document.title = 'Faculty - EduLearn';
  }, []);

  return (
    <div className="pt-20 pb-16">
      {/* Hero Section */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Faculty</h1>
            <p className="text-xl text-gray-600 mb-8">
              Meet our team of expert educators and industry professionals dedicated to providing 
              exceptional learning experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Faculty List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {facultyData.map(faculty => (
              <FacultyCard key={faculty.id} faculty={faculty} />
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Join Our Teaching Team</h2>
            <p className="text-gray-600 mb-8">
              We're always looking for passionate educators to join our team. If you're an expert in your field 
              and enjoy sharing your knowledge, we'd love to hear from you.
            </p>
            <a 
              href="/contact" 
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-md font-medium inline-block transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FacultyPage;