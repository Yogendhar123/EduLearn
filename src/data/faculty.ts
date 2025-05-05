export interface FacultyMember {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  bio: string;
  image: string;
  courses: string[];
}

export const facultyData: FacultyMember[] = [
  {
    id: '1',
    name: 'Dr. Jane Smith',
    title: 'Professor of Computer Science',
    department: 'Computer Science',
    email: 'jane.smith@example.edu',
    phone: '(555) 123-4567',
    bio: 'Dr. Smith has over 15 years of experience in computer science research and education. Her specialties include artificial intelligence and machine learning.',
    image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    courses: ['Introduction to Computer Science', 'Artificial Intelligence Fundamentals']
  },
  {
    id: '2',
    name: 'Prof. Michael Johnson',
    title: 'Associate Professor of Mathematics',
    department: 'Mathematics',
    email: 'michael.johnson@example.edu',
    phone: '(555) 234-5678',
    bio: 'Professor Johnson specializes in advanced calculus and mathematical modeling. He has published numerous papers on differential equations and their applications.',
    image: 'https://images.pexels.com/photos/8617942/pexels-photo-8617942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    courses: ['Advanced Mathematics', 'Calculus II', 'Differential Equations']
  },
  {
    id: '3',
    name: 'Sarah Williams',
    title: 'Lecturer in Marketing',
    department: 'Business',
    email: 'sarah.williams@example.edu',
    phone: '(555) 345-6789',
    bio: 'Sarah brings real-world experience from her 10 years in digital marketing agencies before joining academia. She specializes in social media marketing and SEO.',
    image: 'https://images.pexels.com/photos/5212339/pexels-photo-5212339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    courses: ['Digital Marketing Fundamentals', 'Social Media Strategies']
  },
  {
    id: '4',
    name: 'David Chen',
    title: 'Assistant Professor of Computer Science',
    department: 'Computer Science',
    email: 'david.chen@example.edu',
    phone: '(555) 456-7890',
    bio: 'David is an expert in web technologies and software engineering. Before joining academia, he worked as a senior developer at several tech companies.',
    image: 'https://images.pexels.com/photos/8617957/pexels-photo-8617957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    courses: ['Web Development Bootcamp', 'Advanced JavaScript']
  },
  {
    id: '5',
    name: 'Dr. Emily Parker',
    title: 'Professor of Data Science',
    department: 'Data Science',
    email: 'emily.parker@example.edu',
    phone: '(555) 567-8901',
    bio: 'Dr. Parker has a PhD in Statistics and specializes in big data analytics. She previously worked as a data scientist for a major tech company.',
    image: 'https://images.pexels.com/photos/5212326/pexels-photo-5212326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    courses: ['Data Science Essentials', 'Big Data Analytics']
  }
];