export const personal = {
  name: {
    first: 'Aditya',
    last: 'Sachan',
    full: 'Aditya Sachan',
  },
  roles: [
    'AI / ML Researcher',
    'Software Engineer',
  ],
  education: {
    institution: 'Vellore Institute of Technology, Chennai',
    degree: 'B.Tech in Computer Science',
    expected: '2027',
    cgpa: '8.15',
  },
  contact: {
    email: 'adisachan2005@gmail.com',
  },
  social: {
    github: 'https://github.com/Aditya-Sachan-Git',
    linkedin: 'https://www.linkedin.com/in/aditya-sachan-7603b828b',
  },
  resume: 'https://drive.google.com/file/d/1oR9BZ2YCKP3Kzt6yOI4PcpIOBKAeWCQm/view?usp=sharing',
  portrait: '/profilePic1.jpg',
} as const

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Research', href: '#research' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
] as const
