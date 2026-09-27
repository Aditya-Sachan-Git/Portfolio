export interface Experience {
  id: string
  company: string
  role: string
  period: string
  startMonth: string
  endMonth: string
  year: string
  description: string[]
  tags: string[]
  current: boolean
}

export const experience: Experience[] = [
  {
    id: 'srf-limited',
    company: 'SRF Limited',
    role: 'IT Intern',
    period: 'May 2026 – July 2026',
    startMonth: 'May',
    endMonth: 'July',
    year: '2026',
    description: [
      'Contributed to enterprise software supporting business operations and decision-making.',
      'Improved usability, functionality, and UX of internal applications.',
      'Developed and enhanced BI dashboards for reporting, visualization, sales analytics, financial performance reporting, and enterprise data workflows.',
      'Built AI-assisted features for information retrieval and business insights.',
      'Supported workflow visualization.',
      'Collaborated cross-functionally in an Agile environment.',
      'Strengthened software engineering, analytical, debugging, and problem-solving skills through enterprise projects.',
    ],
    tags: ['Enterprise Software', 'BI / Analytics', 'AI-Assisted Retrieval'],
    current: false,
  },
]

export interface Education {
  id: string
  institution: string
  shortName: string
  degree: string
  board?: string
  year: string
  grade: string
  gradeLabel: string
  primary: boolean
}

export const education: Education[] = [
  {
    id: 'vit-chennai',
    institution: 'Vellore Institute of Technology, Chennai',
    shortName: 'VIT Chennai',
    degree: 'B.Tech in Computer Science',
    year: 'Expected 2027',
    grade: '8.15',
    gradeLabel: 'CGPA',
    primary: true,
  },
  {
    id: 'ryan-mumbai',
    institution: 'Ryan International School, Mumbai',
    shortName: 'Ryan International',
    degree: 'Senior Secondary School',
    board: 'CBSE',
    year: '2023',
    grade: '80.8%',
    gradeLabel: 'Percentage',
    primary: false,
  },
  {
    id: 'dps-kanpur',
    institution: 'Delhi Public School, Kanpur',
    shortName: 'DPS Kanpur',
    degree: 'High School',
    board: 'CBSE',
    year: '2021',
    grade: '96.67%',
    gradeLabel: 'Percentage',
    primary: false,
  },
]
