export interface Student {
  id: string;
  name: string;
  email: string;
  enrollmentDate: string;
  program: string;
  enrolledCourses: {
    courseId: string;
    progress: number;
    enrolled: string;
  }[];
}

export const studentsData: Student[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    enrollmentDate: '2023-09-01',
    program: 'Computer Science',
    enrolledCourses: [
      { courseId: '1', progress: 75, enrolled: '2023-09-05' },
      { courseId: '4', progress: 30, enrolled: '2023-10-15' }
    ]
  },
  {
    id: '2',
    name: 'Emma Williams',
    email: 'emma.williams@example.com',
    enrollmentDate: '2023-08-15',
    program: 'Data Science',
    enrolledCourses: [
      { courseId: '5', progress: 60, enrolled: '2023-08-20' },
      { courseId: '2', progress: 45, enrolled: '2023-09-10' }
    ]
  },
  {
    id: '3',
    name: 'James Brown',
    email: 'james.brown@example.com',
    enrollmentDate: '2023-09-10',
    program: 'Business Administration',
    enrolledCourses: [
      { courseId: '3', progress: 90, enrolled: '2023-09-15' },
      { courseId: '6', progress: 80, enrolled: '2023-09-20' }
    ]
  },
  {
    id: '4',
    name: 'Sophia Miller',
    email: 'sophia.miller@example.com',
    enrollmentDate: '2023-07-20',
    program: 'Mathematics',
    enrolledCourses: [
      { courseId: '2', progress: 95, enrolled: '2023-07-25' }
    ]
  },
  {
    id: '5',
    name: 'Liam Davis',
    email: 'liam.davis@example.com',
    enrollmentDate: '2023-08-05',
    program: 'Web Development',
    enrolledCourses: [
      { courseId: '4', progress: 70, enrolled: '2023-08-10' },
      { courseId: '1', progress: 50, enrolled: '2023-09-01' }
    ]
  }
];

// Function to get enrolled courses data with course details
export const getEnrolledCoursesWithDetails = (student: Student, courses: any[]) => {
  return student.enrolledCourses.map(enrollment => {
    const courseDetails = courses.find(course => course.id === enrollment.courseId);
    return {
      ...enrollment,
      courseDetails
    };
  });
};