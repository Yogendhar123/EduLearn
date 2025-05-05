import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { studentsData, getEnrolledCoursesWithDetails } from '../../data/students';
import { coursesData } from '../../data/courses';
import { CircleUser, BookOpen, Clock, Award, BarChart2, CheckCircle, XCircle } from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    // Update document title
    document.title = 'Student Dashboard - EduLearn';
  }, []);
  
  // Get student data
  const student = studentsData.find(s => s.email === currentUser?.email) || {
    id: currentUser?.id || '',
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    enrollmentDate: new Date().toISOString().split('T')[0],
    program: 'New Student',
    enrolledCourses: []
  };
  
  // Get enrolled courses with details
  const enrolledCourses = getEnrolledCoursesWithDetails(student, coursesData);
  
  // Calculate overall progress
  const overallProgress = enrolledCourses.length > 0
    ? Math.round(enrolledCourses.reduce((acc, curr) => acc + curr.progress, 0) / enrolledCourses.length)
    : 0;
  
  // Group courses by progress status
  const completedCourses = enrolledCourses.filter(course => course.progress === 100);
  const inProgressCourses = enrolledCourses.filter(course => course.progress > 0 && course.progress < 100);
  const notStartedCourses = enrolledCourses.filter(course => course.progress === 0);

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="md:w-1/4 lg:w-1/5 mb-6 md:mb-0 md:pr-8">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col items-center text-center mb-6">
                <CircleUser className="h-20 w-20 text-blue-700 mb-4" />
                <h2 className="text-xl font-bold text-gray-800">{student.name}</h2>
                <p className="text-gray-600">{student.program}</p>
                <p className="text-sm text-gray-500">Student ID: {student.id.substring(0, 8)}</p>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Enrollment Date:</span>
                  <span className="font-medium">{student.enrollmentDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Courses Enrolled:</span>
                  <span className="font-medium">{enrolledCourses.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Completed:</span>
                  <span className="font-medium">{completedCourses.length} / {enrolledCourses.length}</span>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="bg-white rounded-lg shadow-md overflow-hidden">
              <ul>
                <li>
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`w-full text-left px-6 py-4 flex items-center border-l-4 ${
                      activeTab === 'overview' 
                        ? 'border-blue-700 bg-blue-50 text-blue-700' 
                        : 'border-transparent text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <BarChart2 className="h-5 w-5 mr-3" />
                    <span>Overview</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('courses')}
                    className={`w-full text-left px-6 py-4 flex items-center border-l-4 ${
                      activeTab === 'courses' 
                        ? 'border-blue-700 bg-blue-50 text-blue-700' 
                        : 'border-transparent text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <BookOpen className="h-5 w-5 mr-3" />
                    <span>My Courses</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('certificates')}
                    className={`w-full text-left px-6 py-4 flex items-center border-l-4 ${
                      activeTab === 'certificates' 
                        ? 'border-blue-700 bg-blue-50 text-blue-700' 
                        : 'border-transparent text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Award className="h-5 w-5 mr-3" />
                    <span>Certificates</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4 lg:w-4/5">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
                
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Overall Progress</p>
                        <p className="text-2xl font-bold text-gray-800">{overallProgress}%</p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-full">
                        <BarChart2 className="h-6 w-6 text-blue-700" />
                      </div>
                    </div>
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${overallProgress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Courses</p>
                        <p className="text-2xl font-bold text-gray-800">{enrolledCourses.length}</p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-full">
                        <BookOpen className="h-6 w-6 text-green-700" />
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                      <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-md mr-2">
                        {completedCourses.length} Completed
                      </span>
                      <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md">
                        {inProgressCourses.length} In Progress
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Certificates</p>
                        <p className="text-2xl font-bold text-gray-800">{completedCourses.length}</p>
                      </div>
                      <div className="bg-purple-100 p-3 rounded-full">
                        <Award className="h-6 w-6 text-purple-700" />
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                      {completedCourses.length > 0 ? (
                        <span className="text-green-600">Ready to download</span>
                      ) : (
                        <span className="text-gray-600">Complete courses to earn certificates</span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
                  
                  {enrolledCourses.length > 0 ? (
                    <div className="space-y-4">
                      {enrolledCourses.slice(0, 3).map((enrollment, index) => (
                        <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                          <div className="p-2 bg-blue-100 rounded-md mr-4">
                            <Clock className="h-5 w-5 text-blue-700" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{enrollment.courseDetails?.title}</p>
                            <p className="text-sm text-gray-600">
                              {enrollment.progress === 100 
                                ? 'Course completed' 
                                : `Progress: ${enrollment.progress}%`}
                            </p>
                            <p className="text-xs text-gray-500">Enrolled on {enrollment.enrolled}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-600">
                      <p>No recent activity. Enroll in courses to get started!</p>
                    </div>
                  )}
                </div>
                
                {/* Recommended Courses */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Recommended Courses</h2>
                  
                  <div className="space-y-4">
                    {coursesData.slice(0, 3).map((course, index) => (
                      <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        <div>
                          <p className="font-medium text-gray-800">{course.title}</p>
                          <p className="text-sm text-gray-600">{course.instructor}</p>
                          <p className="text-sm font-medium text-blue-700">${course.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-6">My Courses</h1>
                
                {enrolledCourses.length > 0 ? (
                  <div className="space-y-6">
                    {enrolledCourses.map((enrollment, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="md:flex">
                          <div className="md:w-1/4">
                            <img 
                              src={enrollment.courseDetails?.image} 
                              alt={enrollment.courseDetails?.title} 
                              className="w-full h-48 md:h-full object-cover"
                            />
                          </div>
                          <div className="p-6 md:w-3/4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                              <h3 className="text-xl font-semibold text-gray-800">{enrollment.courseDetails?.title}</h3>
                              <div className="flex items-center mt-2 md:mt-0">
                                {enrollment.progress === 100 ? (
                                  <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full flex items-center">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Completed
                                  </span>
                                ) : enrollment.progress > 0 ? (
                                  <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full">
                                    In Progress
                                  </span>
                                ) : (
                                  <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full flex items-center">
                                    <XCircle className="h-3 w-3 mr-1" />
                                    Not Started
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <p className="text-gray-700 font-medium mb-2">Instructor: {enrollment.courseDetails?.instructor}</p>
                            
                            <div className="mb-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Progress</span>
                                <span className="font-medium">{enrollment.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className={`h-2.5 rounded-full ${
                                    enrollment.progress === 100 
                                      ? 'bg-green-600' 
                                      : enrollment.progress > 50 
                                        ? 'bg-blue-600' 
                                        : 'bg-yellow-600'
                                  }`}
                                  style={{ width: `${enrollment.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            <div className="text-sm text-gray-600 space-y-1 mb-4">
                              <div className="flex justify-between">
                                <span>Enrolled:</span>
                                <span>{enrollment.enrolled}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Duration:</span>
                                <span>{enrollment.courseDetails?.duration}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Level:</span>
                                <span>{enrollment.courseDetails?.level}</span>
                              </div>
                            </div>
                            
                            <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                              Continue Learning
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <BookOpen className="h-12 w-12 text-blue-700 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No Courses Enrolled</h3>
                    <p className="text-gray-600 mb-6">
                      You haven't enrolled in any courses yet. Browse our catalog to find courses that interest you.
                    </p>
                    <a 
                      href="/courses" 
                      className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-md font-medium inline-block transition-colors"
                    >
                      Browse Courses
                    </a>
                  </div>
                )}
              </div>
            )}
            
            {/* Certificates Tab */}
            {activeTab === 'certificates' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-6">My Certificates</h1>
                
                {completedCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {completedCourses.map((course, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="bg-blue-100 p-3 rounded-full">
                            <Award className="h-6 w-6 text-blue-700" />
                          </div>
                          <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                            Completed
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {course.courseDetails?.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          Instructor: {course.courseDetails?.instructor}
                        </p>
                        <div className="flex justify-between text-sm text-gray-600 mb-4">
                          <span>Date Earned:</span>
                          <span>March 15, 2025</span>
                        </div>
                        <button className="w-full bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                          Download Certificate
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <Award className="h-12 w-12 text-blue-700 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No Certificates Yet</h3>
                    <p className="text-gray-600 mb-6">
                      Complete your courses to earn certificates that showcase your achievements.
                    </p>
                    {enrolledCourses.length > 0 ? (
                      <button 
                        onClick={() => setActiveTab('courses')}
                        className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-md font-medium inline-block transition-colors"
                      >
                        Go to My Courses
                      </button>
                    ) : (
                      <a 
                        href="/courses" 
                        className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-md font-medium inline-block transition-colors"
                      >
                        Browse Courses
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;