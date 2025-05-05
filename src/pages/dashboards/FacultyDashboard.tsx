import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { facultyData } from '../../data/faculty';
import { studentsData } from '../../data/students';
import { coursesData } from '../../data/courses';
import { 
  CircleUser, 
  Users, 
  BookOpen, 
  BarChart2, 
  Calendar, 
  MessageSquare,
  Edit,
  Plus,
  Star
} from 'lucide-react';

const FacultyDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    // Update document title
    document.title = 'Faculty Dashboard - EduLearn';
  }, []);
  
  // Get faculty data
  const faculty = facultyData.find(f => f.email === currentUser?.email) || {
    id: currentUser?.id || '',
    name: currentUser?.name || '',
    title: 'Instructor',
    department: 'General',
    email: currentUser?.email || '',
    phone: '(555) 000-0000',
    bio: 'New faculty member',
    image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    courses: []
  };
  
  // Get instructor's courses
  const instructorCourses = coursesData.filter(course => 
    faculty.courses.includes(course.title)
  );
  
  // Get students enrolled in instructor's courses
  const enrolledStudents = studentsData.filter(student =>
    student.enrolledCourses.some(enrollment =>
      instructorCourses.some(course => course.id === enrollment.courseId)
    )
  );

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="md:w-1/4 lg:w-1/5 mb-6 md:mb-0 md:pr-8">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col items-center text-center mb-6">
                <img
                  src={faculty.image}
                  alt={faculty.name}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h2 className="text-xl font-bold text-gray-800">{faculty.name}</h2>
                <p className="text-gray-600">{faculty.title}</p>
                <p className="text-sm text-gray-500">{faculty.department}</p>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{faculty.email}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{faculty.phone}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Courses:</span>
                  <span className="font-medium">{instructorCourses.length}</span>
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
                    onClick={() => setActiveTab('students')}
                    className={`w-full text-left px-6 py-4 flex items-center border-l-4 ${
                      activeTab === 'students' 
                        ? 'border-blue-700 bg-blue-50 text-blue-700' 
                        : 'border-transparent text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Users className="h-5 w-5 mr-3" />
                    <span>Students</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('schedule')}
                    className={`w-full text-left px-6 py-4 flex items-center border-l-4 ${
                      activeTab === 'schedule' 
                        ? 'border-blue-700 bg-blue-50 text-blue-700' 
                        : 'border-transparent text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Calendar className="h-5 w-5 mr-3" />
                    <span>Schedule</span>
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
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Faculty Dashboard</h1>
                
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Courses</p>
                        <p className="text-2xl font-bold text-gray-800">{instructorCourses.length}</p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-full">
                        <BookOpen className="h-6 w-6 text-blue-700" />
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-600">
                      {instructorCourses.length === 0 ? 
                        'No courses yet' : 
                        `Active in ${instructorCourses.length} course${instructorCourses.length > 1 ? 's' : ''}`}
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Students</p>
                        <p className="text-2xl font-bold text-gray-800">{enrolledStudents.length}</p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-full">
                        <Users className="h-6 w-6 text-green-700" />
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-600">
                      {enrolledStudents.length === 0 ? 
                        'No students enrolled yet' : 
                        `${enrolledStudents.length} student${enrolledStudents.length > 1 ? 's' : ''} enrolled in your courses`}
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Rating</p>
                        <p className="text-2xl font-bold text-gray-800">4.8/5</p>
                      </div>
                      <div className="bg-yellow-100 p-3 rounded-full">
                        <Star className="h-6 w-6 text-yellow-700" />
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-600">Based on 42 student reviews</p>
                  </div>
                </div>
                
                {/* Recent Messages */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Messages</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start pb-4 border-b border-gray-100">
                      <img 
                        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                        alt="Student" 
                        className="w-10 h-10 rounded-full object-cover mr-4"
                      />
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium text-gray-800">Alex Johnson</p>
                          <span className="ml-2 text-xs text-gray-500">2 hours ago</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          I have a question about the assignment due next week...
                        </p>
                        <button className="mt-1 text-sm text-blue-600 hover:text-blue-800">Reply</button>
                      </div>
                    </div>
                    
                    <div className="flex items-start pb-4 border-b border-gray-100">
                      <img 
                        src="https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                        alt="Student" 
                        className="w-10 h-10 rounded-full object-cover mr-4"
                      />
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium text-gray-800">Emma Williams</p>
                          <span className="ml-2 text-xs text-gray-500">Yesterday</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Thank you for the feedback on my project!
                        </p>
                        <button className="mt-1 text-sm text-blue-600 hover:text-blue-800">Reply</button>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <img 
                        src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                        alt="Student" 
                        className="w-10 h-10 rounded-full object-cover mr-4"
                      />
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium text-gray-800">James Brown</p>
                          <span className="ml-2 text-xs text-gray-500">2 days ago</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Will there be office hours this Friday?
                        </p>
                        <button className="mt-1 text-sm text-blue-600 hover:text-blue-800">Reply</button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center mt-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center mx-auto">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      View All Messages
                    </button>
                  </div>
                </div>
                
                {/* Upcoming Schedule */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Upcoming Schedule</h2>
                    <span className="text-sm text-gray-500">Today, March 15, 2025</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <span className="text-sm font-medium text-gray-700">9:00</span>
                        <div className="bg-blue-100 h-full w-px my-1"></div>
                        <span className="text-sm font-medium text-gray-700">10:30</span>
                      </div>
                      <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-md p-3 flex-grow">
                        <p className="font-medium text-gray-800">Web Development Lecture</p>
                        <p className="text-sm text-gray-600">Room 305, Building A</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <span className="text-sm font-medium text-gray-700">11:00</span>
                        <div className="bg-blue-100 h-full w-px my-1"></div>
                        <span className="text-sm font-medium text-gray-700">12:00</span>
                      </div>
                      <div className="bg-green-50 border-l-4 border-green-600 rounded-r-md p-3 flex-grow">
                        <p className="font-medium text-gray-800">Office Hours</p>
                        <p className="text-sm text-gray-600">Faculty Office 112</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <span className="text-sm font-medium text-gray-700">2:00</span>
                        <div className="bg-blue-100 h-full w-px my-1"></div>
                        <span className="text-sm font-medium text-gray-700">3:30</span>
                      </div>
                      <div className="bg-purple-50 border-l-4 border-purple-600 rounded-r-md p-3 flex-grow">
                        <p className="font-medium text-gray-800">Department Meeting</p>
                        <p className="text-sm text-gray-600">Conference Room B</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center mt-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center mx-auto">
                      <Calendar className="h-4 w-4 mr-1" />
                      View Full Schedule
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-800">My Courses</h1>
                  <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors">
                    <Plus className="h-4 w-4 mr-1" />
                    Add New Course
                  </button>
                </div>
                
                {instructorCourses.length > 0 ? (
                  <div className="space-y-6">
                    {instructorCourses.map((course, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="md:flex">
                          <div className="md:w-1/4">
                            <img 
                              src={course.image} 
                              alt={course.title} 
                              className="w-full h-48 md:h-full object-cover"
                            />
                          </div>
                          <div className="p-6 md:w-3/4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                              <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
                              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full mt-2 md:mt-0">
                                {course.category}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 mb-4">{course.description}</p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div>
                                <p className="text-xs text-gray-500">Duration</p>
                                <p className="text-sm font-medium">{course.duration}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Level</p>
                                <p className="text-sm font-medium">{course.level}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Students</p>
                                <p className="text-sm font-medium">{course.enrolledStudents || 0}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Price</p>
                                <p className="text-sm font-medium">${course.price}</p>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors">
                                <Edit className="h-4 w-4 mr-1" />
                                Edit Course
                              </button>
                              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors">
                                <Users className="h-4 w-4 mr-1" />
                                View Students
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <BookOpen className="h-12 w-12 text-blue-700 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No Courses Yet</h3>
                    <p className="text-gray-600 mb-6">
                      You don't have any courses assigned to you yet. Create a new course to get started.
                    </p>
                    <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-md font-medium inline-flex items-center transition-colors">
                      <Plus className="h-5 w-5 mr-2" />
                      Create New Course
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Students Tab */}
            {activeTab === 'students' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Students</h1>
                
                {enrolledStudents.length > 0 ? (
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Student
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Enrolled Course
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Progress
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Enrollment Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {enrolledStudents.map((student, index) => {
                            const studentCourses = student.enrolledCourses.filter(enrollment =>
                              instructorCourses.some(course => course.id === enrollment.courseId)
                            );
                            
                            return studentCourses.map((enrollment, courseIndex) => {
                              const course = instructorCourses.find(c => c.id === enrollment.courseId);
                              return (
                                <tr key={`${index}-${courseIndex}`}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <CircleUser className="h-8 w-8 text-gray-400 mr-3" />
                                      <div>
                                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                        <div className="text-sm text-gray-500">{student.email}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{course?.title}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <div className="flex-1 h-2 bg-gray-200 rounded-full w-24 mr-2">
                                        <div 
                                          className={`h-full rounded-full ${
                                            enrollment.progress === 100 
                                              ? 'bg-green-600' 
                                              : enrollment.progress > 50 
                                                ? 'bg-blue-600' 
                                                : 'bg-yellow-600'
                                          }`}
                                          style={{ width: `${enrollment.progress}%` }}
                                        ></div>
                                      </div>
                                      <span className="text-sm text-gray-600">{enrollment.progress}%</span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {enrollment.enrolled}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900 mr-4">
                                      View Details
                                    </button>
                                    <button className="text-blue-600 hover:text-blue-900">
                                      Message
                                    </button>
                                  </td>
                                </tr>
                              );
                            });
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <Users className="h-12 w-12 text-blue-700 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No Students Yet</h3>
                    <p className="text-gray-600 mb-6">
                      You don't have any students enrolled in your courses yet.
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {/* Schedule Tab */}
            {activeTab === 'schedule' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-800">My Schedule</h1>
                  <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Event
                  </button>
                </div>
                
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                  <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
                    <button className="p-2 hover:bg-gray-200 rounded-md">
                      <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <h3 className="font-semibold text-gray-700">March 2025</h3>
                    <button className="p-2 hover:bg-gray-200 rounded-md">
                      <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-px bg-gray-200">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                      <div key={i} className="p-2 text-center text-sm font-medium text-gray-500 bg-gray-50">
                        {day}
                      </div>
                    ))}
                    
                    {[...Array(35)].map((_, i) => {
                      const day = i - 2;
                      const isCurrentMonth = day > 0 && day <= 31;
                      const isToday = day === 15;
                      const hasEvent = [3, 8, 15, 22, 27].includes(day);
                      
                      return (
                        <div 
                          key={i} 
                          className={`p-2 h-20 bg-white ${isCurrentMonth ? '' : 'text-gray-400'} ${isToday ? 'ring-2 ring-blue-500 ring-inset' : ''}`}
                        >
                          {isCurrentMonth && (
                            <>
                              <div className="text-right text-sm">{day}</div>
                              {hasEvent && (
                                <div className={`mt-1 p-1 text-xs ${isToday ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'} rounded truncate`}>
                                  {day === 3 && 'Office Hours'}
                                  {day === 8 && 'Lecture'}
                                  {day === 15 && '3 Events'}
                                  {day === 22 && 'Meeting'}
                                  {day === 27 && 'Deadline'}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Events</h2>
                
                <div className="space-y-4">
                  <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-md text-blue-800 mr-4 text-center min-w-[3rem]">
                          <div className="text-sm font-bold">15</div>
                          <div className="text-xs">Mar</div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">Web Development Lecture</h3>
                          <p className="text-sm text-gray-600">
                            <span className="inline-block mr-3">9:00 AM - 10:30 AM</span>
                            <span>Room 305, Building A</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        <button className="text-gray-500 hover:text-gray-700 p-1">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-md text-blue-800 mr-4 text-center min-w-[3rem]">
                          <div className="text-sm font-bold">15</div>
                          <div className="text-xs">Mar</div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">Office Hours</h3>
                          <p className="text-sm text-gray-600">
                            <span className="inline-block mr-3">11:00 AM - 12:00 PM</span>
                            <span>Faculty Office 112</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        <button className="text-gray-500 hover:text-gray-700 p-1">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-md text-blue-800 mr-4 text-center min-w-[3rem]">
                          <div className="text-sm font-bold">15</div>
                          <div className="text-xs">Mar</div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">Department Meeting</h3>
                          <p className="text-sm text-gray-600">
                            <span className="inline-block mr-3">2:00 PM - 3:30 PM</span>
                            <span>Conference Room B</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        <button className="text-gray-500 hover:text-gray-700 p-1">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;