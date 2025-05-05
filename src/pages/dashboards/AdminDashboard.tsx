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
  Settings,
  DollarSign,
  UserPlus,
  BookPlus,
  Search,
  Plus,
  Edit,
  Trash2,
  PieChart
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { currentUser, users } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // Update document title
    document.title = 'Admin Dashboard - EduLearn';
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Statistics
  const totalStudents = users.filter(user => user.role === 'student').length;
  const totalFaculty = users.filter(user => user.role === 'faculty').length;
  const totalCourses = coursesData.length;
  const totalRevenue = coursesData.reduce((acc, course) => {
    const enrolledStudents = course.enrolledStudents || 0;
    return acc + (course.price * enrolledStudents);
  }, 0);

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="md:w-1/4 lg:w-1/5 mb-6 md:mb-0 md:pr-8">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col items-center text-center mb-6">
                <CircleUser className="h-20 w-20 text-blue-700 mb-4" />
                <h2 className="text-xl font-bold text-gray-800">{currentUser?.name}</h2>
                <p className="text-gray-600">Administrator</p>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{currentUser?.email}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Last Login:</span>
                  <span className="font-medium">Today, 9:32 AM</span>
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
                    onClick={() => setActiveTab('users')}
                    className={`w-full text-left px-6 py-4 flex items-center border-l-4 ${
                      activeTab === 'users' 
                        ? 'border-blue-700 bg-blue-50 text-blue-700' 
                        : 'border-transparent text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Users className="h-5 w-5 mr-3" />
                    <span>Users</span>
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
                    <span>Courses</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full text-left px-6 py-4 flex items-center border-l-4 ${
                      activeTab === 'settings' 
                        ? 'border-blue-700 bg-blue-50 text-blue-700' 
                        : 'border-transparent text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Settings className="h-5 w-5 mr-3" />
                    <span>Settings</span>
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
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
                
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Total Students</p>
                        <p className="text-2xl font-bold text-gray-800">{totalStudents}</p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-full">
                        <Users className="h-6 w-6 text-blue-700" />
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-green-600 flex items-center">
                      <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>12% increase</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Total Faculty</p>
                        <p className="text-2xl font-bold text-gray-800">{totalFaculty}</p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-full">
                        <CircleUser className="h-6 w-6 text-green-700" />
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-green-600 flex items-center">
                      <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>5% increase</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Total Courses</p>
                        <p className="text-2xl font-bold text-gray-800">{totalCourses}</p>
                      </div>
                      <div className="bg-purple-100 p-3 rounded-full">
                        <BookOpen className="h-6 w-6 text-purple-700" />
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-green-600 flex items-center">
                      <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>8% increase</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-800">${totalRevenue.toFixed(2)}</p>
                      </div>
                      <div className="bg-yellow-100 p-3 rounded-full">
                        <DollarSign className="h-6 w-6 text-yellow-700" />
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-green-600 flex items-center">
                      <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>15% increase</span>
                    </div>
                  </div>
                </div>
                
                {/* Recent Activity & Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-start pb-4 border-b border-gray-100">
                        <div className="bg-blue-100 p-2 rounded-full mr-4">
                          <UserPlus className="h-5 w-5 text-blue-700" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">New Student Registration</p>
                          <p className="text-sm text-gray-600">Liam Davis enrolled in Web Development</p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start pb-4 border-b border-gray-100">
                        <div className="bg-green-100 p-2 rounded-full mr-4">
                          <BookPlus className="h-5 w-5 text-green-700" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">New Course Added</p>
                          <p className="text-sm text-gray-600">Dr. Emily Parker added "AI Foundations"</p>
                          <p className="text-xs text-gray-500">Yesterday</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start pb-4 border-b border-gray-100">
                        <div className="bg-yellow-100 p-2 rounded-full mr-4">
                          <DollarSign className="h-5 w-5 text-yellow-700" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Payment Received</p>
                          <p className="text-sm text-gray-600">$299.99 payment for Data Science course</p>
                          <p className="text-xs text-gray-500">2 days ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-purple-100 p-2 rounded-full mr-4">
                          <CircleUser className="h-5 w-5 text-purple-700" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">New Faculty Member</p>
                          <p className="text-sm text-gray-600">Prof. Robert Thompson joined the faculty</p>
                          <p className="text-xs text-gray-500">3 days ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Enrollment Statistics</h2>
                    
                    <div className="flex items-center justify-center h-64">
                      {/* Placeholder for chart */}
                      <div className="flex flex-col items-center">
                        <PieChart className="h-24 w-24 text-blue-700 mb-4" />
                        <p className="text-gray-600 text-center">
                          Enrollment distribution by course category
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm text-gray-600">Computer Science (45%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm text-gray-600">Data Science (20%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                        <span className="text-sm text-gray-600">Business (15%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                        <span className="text-sm text-gray-600">Other (20%)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-4 rounded-lg flex flex-col items-center justify-center transition-colors">
                      <UserPlus className="h-8 w-8 mb-2" />
                      <span className="text-sm font-medium">Add User</span>
                    </button>
                    
                    <button className="bg-green-50 hover:bg-green-100 text-green-700 p-4 rounded-lg flex flex-col items-center justify-center transition-colors">
                      <BookPlus className="h-8 w-8 mb-2" />
                      <span className="text-sm font-medium">Add Course</span>
                    </button>
                    
                    <button className="bg-purple-50 hover:bg-purple-100 text-purple-700 p-4 rounded-lg flex flex-col items-center justify-center transition-colors">
                      <BarChart2 className="h-8 w-8 mb-2" />
                      <span className="text-sm font-medium">View Reports</span>
                    </button>
                    
                    <button className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 p-4 rounded-lg flex flex-col items-center justify-center transition-colors">
                      <Settings className="h-8 w-8 mb-2" />
                      <span className="text-sm font-medium">System Settings</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-800 mb-4 lg:mb-0">User Management</h1>
                  
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center transition-colors">
                      <Plus className="h-4 w-4 mr-1" />
                      Add New User
                    </button>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <CircleUser className="h-8 w-8 text-gray-400 mr-3" />
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.role === 'admin' 
                                  ? 'bg-purple-100 text-purple-800' 
                                  : user.role === 'faculty'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-blue-100 text-blue-800'
                              }`}>
                                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-900 mr-4">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {filteredUsers.length === 0 && (
                    <div className="text-center py-6">
                      <p className="text-gray-500">No users found matching your search criteria.</p>
                    </div>
                  )}
                  
                  <div className="bg-gray-50 px-6 py-3 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Showing {filteredUsers.length} of {users.length} users
                    </div>
                    <div className="flex-1 flex justify-end">
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <a
                          href="#"
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          Previous
                        </a>
                        <a
                          href="#"
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          1
                        </a>
                        <a
                          href="#"
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-700"
                        >
                          2
                        </a>
                        <a
                          href="#"
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          3
                        </a>
                        <a
                          href="#"
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          Next
                        </a>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-800 mb-4 lg:mb-0">Course Management</h1>
                  
                  <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center transition-colors">
                    <Plus className="h-4 w-4 mr-1" />
                    Add New Course
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {coursesData.map((course, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="relative">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                          {course.level}
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>
                        
                        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                          <div>Price: <span className="font-semibold">${course.price}</span></div>
                          <div>Students: <span className="font-semibold">{course.enrolledStudents || 0}</span></div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 rounded-md text-sm font-medium flex items-center justify-center transition-colors">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </button>
                          <button className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 py-2 rounded-md text-sm font-medium flex items-center justify-center transition-colors">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-6">System Settings</h1>
                
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">General Settings</h2>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div>
                      <label htmlFor="site-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Site Name
                      </label>
                      <input
                        type="text"
                        id="site-name"
                        defaultValue="EduLearn"
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="site-description" className="block text-sm font-medium text-gray-700 mb-1">
                        Site Description
                      </label>
                      <textarea
                        id="site-description"
                        rows={3}
                        defaultValue="EduLearn - Online Learning Platform"
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-1">
                        Admin Email
                      </label>
                      <input
                        type="email"
                        id="admin-email"
                        defaultValue="admin@edulearn.com"
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center">
                        <input
                          id="maintenance-mode"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="maintenance-mode" className="ml-2 block text-sm text-gray-700">
                          Enable Maintenance Mode
                        </label>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        When enabled, only administrators can access the site.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">Email Settings</h2>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div>
                      <label htmlFor="smtp-host" className="block text-sm font-medium text-gray-700 mb-1">
                        SMTP Host
                      </label>
                      <input
                        type="text"
                        id="smtp-host"
                        defaultValue="smtp.example.com"
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="smtp-port" className="block text-sm font-medium text-gray-700 mb-1">
                          SMTP Port
                        </label>
                        <input
                          type="text"
                          id="smtp-port"
                          defaultValue="587"
                          className="block w-full px-4 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="smtp-encryption" className="block text-sm font-medium text-gray-700 mb-1">
                          Encryption
                        </label>
                        <select
                          id="smtp-encryption"
                          defaultValue="tls"
                          className="block w-full px-4 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="none">None</option>
                          <option value="ssl">SSL</option>
                          <option value="tls">TLS</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="smtp-username" className="block text-sm font-medium text-gray-700 mb-1">
                        SMTP Username
                      </label>
                      <input
                        type="text"
                        id="smtp-username"
                        defaultValue="noreply@edulearn.com"
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="smtp-password" className="block text-sm font-medium text-gray-700 mb-1">
                        SMTP Password
                      </label>
                      <input
                        type="password"
                        id="smtp-password"
                        defaultValue="••••••••••"
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">Payment Settings</h2>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div>
                      <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                        Currency
                      </label>
                      <select
                        id="currency"
                        defaultValue="usd"
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="usd">USD ($)</option>
                        <option value="eur">EUR (€)</option>
                        <option value="gbp">GBP (£)</option>
                        <option value="jpy">JPY (¥)</option>
                      </select>
                    </div>
                    
                    <div>
                      <div className="flex items-center">
                        <input
                          id="stripe-enabled"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="stripe-enabled" className="ml-2 block text-sm text-gray-700">
                          Enable Stripe
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="stripe-api-key" className="block text-sm font-medium text-gray-700 mb-1">
                        Stripe API Key
                      </label>
                      <input
                        type="text"
                        id="stripe-api-key"
                        defaultValue="pk_test_••••••••••••••••••••••••"
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="stripe-secret-key" className="block text-sm font-medium text-gray-700 mb-1">
                        Stripe Secret Key
                      </label>
                      <input
                        type="password"
                        id="stripe-secret-key"
                        defaultValue="sk_test_••••••••••••••••••••••••"
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium mr-2">
                    Reset
                  </button>
                  <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;