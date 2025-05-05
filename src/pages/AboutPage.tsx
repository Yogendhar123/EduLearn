import React, { useEffect } from 'react';
import { BookOpen, Users, Award, Target, ChevronRight, CheckCircle } from 'lucide-react';

const AboutPage: React.FC = () => {
  useEffect(() => {
    // Update document title
    document.title = 'About Us - EduLearn';
  }, []);

  return (
    <div className="pt-20 pb-16">
      {/* Hero Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">About EduLearn</h1>
            <p className="text-xl text-gray-600 mb-8">
              We're on a mission to transform education by providing accessible, 
              high-quality learning experiences for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <img 
                src="https://images.pexels.com/photos/7103/writing-notes-idea-conference.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Our Story" 
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-6">
                EduLearn was founded in 2010 by a group of passionate educators and technologists 
                who believed that education should be accessible to everyone, regardless of 
                geographical or financial constraints.
              </p>
              <p className="text-gray-600 mb-6">
                What started as a small platform with just a handful of courses has grown into 
                a comprehensive learning ecosystem serving thousands of students worldwide. 
                Our commitment to quality education has never wavered, and we continue to 
                innovate and improve our offerings.
              </p>
              <p className="text-gray-600">
                Today, EduLearn partners with leading universities, industry experts, and 
                organizations to provide diverse learning experiences that help students 
                achieve their personal and professional goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission and Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission & Vision</h2>
            <p className="text-gray-600">
              We're guided by clear principles that help us deliver exceptional educational experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
                <Target className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                To democratize education by providing accessible, affordable, and high-quality 
                learning opportunities that empower individuals to transform their lives and communities.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <span className="text-gray-600">Make education accessible to all</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <span className="text-gray-600">Provide practical, career-relevant skills</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <span className="text-gray-600">Foster a community of lifelong learners</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
                <BookOpen className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-gray-600 mb-6">
                To be the world's leading platform for transformative learning experiences that 
                help people realize their full potential and create positive change in the world.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <span className="text-gray-600">Set the standard for online education</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <span className="text-gray-600">Innovate continuously in learning technology</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <span className="text-gray-600">Bridge the gap between education and employment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-gray-600">
              These principles guide everything we do at EduLearn, from course development to student support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 p-4 rounded-full inline-flex justify-center items-center mb-4 h-20 w-20">
                <Users className="h-10 w-10 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Inclusivity</h3>
              <p className="text-gray-600">
                We believe education should be accessible to everyone, regardless of background, 
                location, or circumstances.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-blue-100 p-4 rounded-full inline-flex justify-center items-center mb-4 h-20 w-20">
                <Award className="h-10 w-10 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Excellence</h3>
              <p className="text-gray-600">
                We are committed to providing the highest quality educational content and 
                learning experiences.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-blue-100 p-4 rounded-full inline-flex justify-center items-center mb-4 h-20 w-20">
                <Target className="h-10 w-10 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Innovation</h3>
              <p className="text-gray-600">
                We constantly explore new technologies and methodologies to enhance the 
                learning experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Join the EduLearn Community</h2>
            <p className="text-xl text-blue-100 mb-8">
              Become part of our growing community of learners and educators dedicated to 
              transforming lives through education.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="/register"
                className="bg-white hover:bg-gray-100 text-blue-800 px-8 py-4 rounded-md font-medium transition-colors inline-flex items-center justify-center"
              >
                Register Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="/courses"
                className="bg-transparent hover:bg-blue-700 border-2 border-white text-white px-8 py-4 rounded-md font-medium transition-colors inline-flex items-center justify-center"
              >
                Browse Courses
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;