export const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Leadership', path: '/leadership' },
  { name: 'Departments', path: '/departments' },
  { name: 'Admissions', path: '/admissions' },
  { name: 'Fees', path: '/fees' },
  { name: 'Events', path: '/events' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Hostel', path: '/hostel' },
  { name: 'Contact', path: '/contact' },
  { name: 'Student Login', path: '/student-login' },
  { name: 'Admin', path: '/admin' }
];

export const departments = [
  {
    id: 1,
    name: 'Computer Science and Engineering',
    short: 'CSE',
    slug: 'cse',
    description: 'Focused on software engineering, systems design, analytics and emerging technologies.',
    faculty: [{ name: 'Dr. Anjali Menon', designation: 'HOD' }, { name: 'Prof. Rakesh Kumar', designation: 'Asst. Professor' }],
    courses: ['Data Structures', 'Operating Systems', 'DBMS', 'Machine Learning', 'Software Engineering'],
    color: '#1d4ed8',
    highlights: ['Project Labs', 'Placement Readiness', 'Industry Mentoring']
  },
  {
    id: 2,
    name: 'CSE (AI & DS)',
    short: 'CSE-AI',
    slug: 'cse-ai-ds',
    description: 'AI-driven learning, data science, decision intelligence and intelligent systems.',
    faculty: [{ name: 'Dr. Raghav Iyer', designation: 'HOD' }, { name: 'Dr. Kavya Nair', designation: 'Associate Professor' }],
    courses: ['Python for AI', 'Statistical Learning', 'Deep Learning', 'Data Visualization', 'Big Data'],
    color: '#0f766e',
    highlights: ['AI Lab', 'Data Practice', 'Analytics Bootcamp']
  },
  {
    id: 3,
    name: 'Electronics and Communication Engineering',
    short: 'ECE',
    slug: 'ece',
    description: 'Specialization in communication systems, embedded electronics and signal processing.',
    faculty: [{ name: 'Dr. Krishna Rao', designation: 'HOD' }, { name: 'Prof. Nihal Verma', designation: 'Professor' }],
    courses: ['Signals & Systems', 'Digital Electronics', 'VLSI', 'Communication Systems', 'Embedded Systems'],
    color: '#7c3aed',
    highlights: ['Embedded Lab', 'Signal Analysis', 'IoT Systems']
  },
  {
    id: 4,
    name: 'Electrical and Electronics Engineering',
    short: 'EEE',
    slug: 'eee',
    description: 'Power systems, control engineering and sustainable electrical technologies.',
    faculty: [{ name: 'Dr. Nisha K', designation: 'HOD' }, { name: 'Prof. Vishal Jain', designation: 'Professor' }],
    courses: ['Power Systems', 'Electrical Machines', 'Control Systems', 'Power Electronics', 'Renewable Energy'],
    color: '#ea580c',
    highlights: ['Power Grid Lab', 'Smart Energy', 'Control Systems']
  },
  {
    id: 5,
    name: 'Mechanical Engineering',
    short: 'MECH',
    slug: 'mechanical',
    description: 'Covers design, manufacturing, thermal sciences and industrial innovation.',
    faculty: [{ name: 'Dr. Sandeep Nair', designation: 'HOD' }, { name: 'Prof. M. Rao', designation: 'Professor' }],
    courses: ['Thermodynamics', 'Fluid Mechanics', 'Strength of Materials', 'CAD', 'Heat Transfer'],
    color: '#dc2626',
    highlights: ['Design Studio', 'Thermal Labs', 'Manufacturing']
  },
  {
    id: 6,
    name: 'Civil Engineering',
    short: 'CIVIL',
    slug: 'civil',
    description: 'Infrastructure, construction management, structural engineering and sustainable design.',
    faculty: [{ name: 'Dr. Deepa Mohan', designation: 'HOD' }, { name: 'Prof. A. Sen', designation: 'Associate Professor' }],
    courses: ['Structural Analysis', 'Surveying', 'Hydraulics', 'Transportation', 'Environmental Engineering'],
    color: '#0891b2',
    highlights: ['Surveying Lab', 'Site Planning', 'Sustainable Design']
  }
];

export const leadership = [
  {
    name: 'Ravi Kumar',
    designation: 'Chairman',
    qualification: 'Education Visionary and Founder',
    bio: 'Ravi Kumar is a visionary education leader whose values-driven leadership established the foundation of SHEC and its strong focus on student welfare and excellence.',
    legacy: 'History of Chairman Sir / Legacy: Ravi Kumar built SHEC with a long-term mission to create future-ready graduates, socially responsible citizens, and a campus culture grounded in discipline, innovation, and service.',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Harshith',
    designation: 'Director',
    qualification: 'Institutional Strategy Leader',
    bio: 'Harshith guides SHEC’s institutional strategy, innovation pipeline, and strong industry alignment so students gain a modern, global learning experience.',
    legacy: 'Harshith has driven digital transformation, academic modernization, and stronger industry-linked partnerships across the college.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Srinivasa Rao',
    designation: 'Principal',
    qualification: 'Academic Administrator',
    bio: 'Srinivasa Rao oversees curriculum quality, student affairs, and governance, ensuring SHEC remains student-centric and academically strong.',
    legacy: 'The principal has strengthened learner-centric teaching systems, quality assurance, and academic excellence across departments.',
    photo: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Sudheer Chakravarthy',
    designation: 'Vice Principal',
    qualification: 'Academic Operations Leader',
    bio: 'Sudheer Chakravarthy supports department coordination, faculty excellence, and mentoring-focused student support systems.',
    legacy: 'He has enabled stronger governance, measurable academic outcomes, and improved student engagement across campus operations.',
    photo: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Manikanta',
    designation: 'Controller of Examinations (COE)',
    qualification: 'Examination Governance Leader',
    bio: 'Manikanta leads exam policy, transparent evaluation, and academic integrity for a fair, systematic assessment ecosystem.',
    legacy: 'The COE has introduced stronger digital assessment workflows and time-bound result transparency for students and faculty.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80'
  }
];

export const feeStructure = {
  tuition: [
    { department: 'CSE', annual: '₹85,000', semester: '₹42,500' },
    { department: 'CSE (AI & DS)', annual: '₹90,000', semester: '₹45,000' },
    { department: 'ECE', annual: '₹82,000', semester: '₹41,000' },
    { department: 'EEE', annual: '₹80,000', semester: '₹40,000' },
    { department: 'Mechanical', annual: '₹78,000', semester: '₹39,000' },
    { department: 'Civil', annual: '₹76,000', semester: '₹38,000' }
  ],
  counselling: '₹5,000',
  hostel: { hostel: '₹22,000', mess: '₹18,000', security: '₹10,000' }
};

export const scholarships = [
  { name: 'Merit Excellence Scholarship', eligibility: 'CGPA above 8.5 and no backlogs', deadline: '30 Nov 2026', link: '#', amount: '₹50,000' },
  { name: 'EWS Support Grant', eligibility: 'Family income below the threshold', deadline: '15 Dec 2026', link: '#', amount: '₹25,000' },
  { name: 'Sports Achievement Award', eligibility: 'National/state sports participation certificate', deadline: '01 Dec 2026', link: '#', amount: '₹30,000' }
];

export const galleryItems = [
  { category: 'Campus', title: 'Academic Block', image: 'https://images.unsplash.com/photo-1562771382-9e0d7d7f3e1e?auto=format&fit=crop&w=900&q=80' },
  { category: 'Cafeteria', title: 'Student Cafeteria', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80' },
  { category: 'Hostel', title: 'Hostel Rooms', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80' },
  { category: 'Classrooms', title: 'Smart Classrooms', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80' },
  { category: 'Lab', title: 'Engineering Lab', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80' },
  { category: 'Library', title: 'Central Library', image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80' }
];

export const events = [
  { title: 'Annual Tech Fest', date: '12 Nov 2026', category: 'Technical', description: 'Innovation, robotics, coding sprint and industry demo zone.' },
  { title: 'Cultural Night', date: '02 Dec 2026', category: 'Cultural', description: 'Dance, music, skits and celebration of student creativity.' },
  { title: 'Inter-College Sports Meet', date: '20 Oct 2026', category: 'Sports', description: 'Athletics, team matches and youth fitness showcase.' },
  { title: 'AI & Data Science Workshop', date: '08 Nov 2026', category: 'Workshop', description: 'Hands-on methods for ML pipelines and data-driven problem solving.' }
];

export const statCards = [
  { label: 'Students', value: '2,400+' },
  { label: 'Faculty', value: '180+' },
  { label: 'Departments', value: '6' },
  { label: 'Placement Rate', value: '94%' }
];

export const announcements = [
  'Admissions for 2026-27 are now open.',
  'New scholarship applications will close on 30 November.',
  'Campus-wide placement drive is scheduled for 12 October.',
  'Hostel allotment list has been published for first-year students.'
];
