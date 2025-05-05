export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  image: string;
  price: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  enrolledStudents?: number;
}

export const coursesData: Course[] = [
  {
    id: '1',
    title: 'Introduction to Computer Science',
    description: 'Learn the fundamentals of computer science and programming.',
    instructor: 'Dr. Jane Smith',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 99.99,
    duration: '8 weeks',
    level: 'Beginner',
    category: 'Computer Science',
    enrolledStudents: 1243
  },
  {
    id: '2',
    title: 'Advanced Mathematics',
    description: 'Deep dive into advanced mathematical concepts and their applications.',
    instructor: 'Prof. Michael Johnson',
    image: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 129.99,
    duration: '12 weeks',
    level: 'Advanced',
    category: 'Mathematics',
    enrolledStudents: 867
  },
  {
    id: '3',
    title: 'Digital Marketing Fundamentals',
    description: 'Learn the essentials of digital marketing in the modern world.',
    instructor: 'Sarah Williams',
    image: 'https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 79.99,
    duration: '6 weeks',
    level: 'Beginner',
    category: 'Marketing',
    enrolledStudents: 2156
  },
  {
    id: '4',
    title: 'Web Development Bootcamp',
    description: 'Comprehensive course on modern web development techniques.',
    instructor: 'David Chen',
    image: 'https://images.pexels.com/photos/6457544/pexels-photo-6457544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 149.99,
    duration: '16 weeks',
    level: 'Intermediate',
    category: 'Web Development',
    enrolledStudents: 1785
  },
  {
    id: '5',
    title: 'Data Science Essentials',
    description: 'Introduction to data science concepts, tools and methodologies.',
    instructor: 'Dr. Emily Parker',
    image: 'https://images.pexels.com/photos/4665064/pexels-photo-4665064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 119.99,
    duration: '10 weeks',
    level: 'Intermediate',
    category: 'Data Science',
    enrolledStudents: 1342
  },
  {
    id: '6',
    title: 'Business Management',
    description: 'Learn essential business management skills for the modern workplace.',
    instructor: 'Robert Thompson',
    image: 'https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 89.99,
    duration: '8 weeks',
    level: 'Beginner',
    category: 'Business',
    enrolledStudents: 976
  }
];