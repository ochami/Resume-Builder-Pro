import { ResumeData } from '@/types/resume';

export const sampleResumes = {
  junior: {
    personalInfo: {
      fullName: 'Alex Johnson',
      jobTitle: 'Junior Software Developer',
      email: 'alex.johnson@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/alexjohnson',
      website: 'alexjohnson.dev'
    },
    profileSummary: 'Recent Computer Science graduate with a passion for full-stack development and a strong foundation in JavaScript, React, and Node.js. Eager to apply academic knowledge and internship experience to create innovative solutions while continuing to learn and grow in a collaborative team environment.',
    education: [
      {
        id: '1',
        school: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2020-09',
        endDate: '2024-05',
        gpa: '3.8'
      }
    ],
    workExperience: [
      {
        id: '1',
        role: 'Software Engineering Intern',
        company: 'TechStart Inc.',
        location: 'San Francisco, CA',
        startDate: '2023-06',
        endDate: '2023-08',
        current: false,
        responsibilities: [
          'Developed and maintained features for the company\'s main web application using React and TypeScript',
          'Collaborated with senior developers to implement RESTful APIs and integrate with backend services',
          'Participated in code reviews and agile development processes',
          'Fixed bugs and improved application performance, resulting in 20% faster load times'
        ]
      },
      {
        id: '2',
        role: 'Teaching Assistant',
        company: 'UC Berkeley Computer Science Department',
        location: 'Berkeley, CA',
        startDate: '2022-09',
        endDate: '2023-05',
        current: false,
        responsibilities: [
          'Led weekly lab sessions for introductory programming courses (Python and Java)',
          'Graded assignments and provided constructive feedback to over 50 students',
          'Conducted office hours to help students with programming concepts and debugging',
          'Developed supplementary materials to enhance student understanding of complex topics'
        ]
      }
    ],
    skills: [
      { id: '1', name: 'JavaScript', type: 'hard' },
      { id: '2', name: 'React', type: 'hard' },
      { id: '3', name: 'TypeScript', type: 'hard' },
      { id: '4', name: 'Node.js', type: 'hard' },
      { id: '5', name: 'Python', type: 'hard' },
      { id: '6', name: 'Git', type: 'hard' },
      { id: '7', name: 'Problem Solving', type: 'soft' },
      { id: '8', name: 'Teamwork', type: 'soft' },
      { id: '9', name: 'Communication', type: 'soft' },
      { id: '10', name: 'Quick Learner', type: 'soft' }
    ],
    certifications: [
      {
        id: '1',
        name: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        date: '2024-01',
        expiryDate: '2027-01'
      }
    ],
    languages: [
      { id: '1', name: 'English', proficiency: 'native' },
      { id: '2', name: 'Spanish', proficiency: 'intermediate' }
    ],
    hobbies: [
      { id: '1', name: 'Open Source Contributions' },
      { id: '2', name: 'Hackathons' },
      { id: '3', name: 'Hiking' },
      { id: '4', name: 'Photography' }
    ]
  } as ResumeData,

  midlevel: {
    personalInfo: {
      fullName: 'Sarah Chen',
      jobTitle: 'Senior Product Manager',
      email: 'sarah.chen@email.com',
      phone: '+1 (555) 987-6543',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/sarahchen',
      website: 'sarahchen.pm'
    },
    profileSummary: 'Results-driven Product Manager with 6+ years of experience leading cross-functional teams to deliver user-centric digital products. Proven track record of managing product lifecycles from conception to launch, driving user engagement, and achieving business objectives. Adept at data analysis, user research, and stakeholder management.',
    education: [
      {
        id: '1',
        school: 'Stanford University',
        degree: 'Master of Business Administration',
        field: 'Management',
        startDate: '2016-09',
        endDate: '2018-05',
        gpa: '3.9'
      },
      {
        id: '2',
        school: 'University of Washington',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2012-09',
        endDate: '2016-05',
        gpa: '3.7'
      }
    ],
    workExperience: [
      {
        id: '1',
        role: 'Senior Product Manager',
        company: 'FinTech Solutions',
        location: 'New York, NY',
        startDate: '2021-03',
        endDate: '',
        current: true,
        responsibilities: [
          'Lead product strategy and roadmap for mobile banking app serving 500K+ active users',
          'Manage a team of 8 developers, 2 designers, and 3 QA engineers',
          'Increased user engagement by 45% through implementation of personalized features',
          'Reduced customer support tickets by 30% by improving user onboarding experience',
          'Collaborate with C-level executives to align product strategy with business goals'
        ]
      },
      {
        id: '2',
        role: 'Product Manager',
        company: 'E-commerce Platform',
        location: 'Seattle, WA',
        startDate: '2018-07',
        endDate: '2021-02',
        current: false,
        responsibilities: [
          'Managed product lifecycle for B2B marketplace platform connecting 10K+ sellers',
          'Led redesign of seller dashboard resulting in 25% increase in seller retention',
          'Conducted user research and A/B testing to optimize conversion funnels',
          'Worked closely with engineering teams to implement API integrations and features',
          'Presented product performance and strategy to stakeholders quarterly'
        ]
      },
      {
        id: '3',
        role: 'Associate Product Manager',
        company: 'HealthTech Startup',
        location: 'San Francisco, CA',
        startDate: '2016-06',
        endDate: '2018-06',
        current: false,
        responsibilities: [
          'Supported senior PM in managing telemedicine platform development',
          'Conducted market research and competitive analysis to inform product decisions',
          'Created user stories and product requirements documentation',
          'Coordinated with UX designers to create user-centered design solutions'
        ]
      }
    ],
    skills: [
      { id: '1', name: 'Product Strategy', type: 'hard' },
      { id: '2', name: 'Data Analysis', type: 'hard' },
      { id: '3', name: 'User Research', type: 'hard' },
      { id: '4', name: 'Agile/Scrum', type: 'hard' },
      { id: '5', name: 'SQL', type: 'hard' },
      { id: '6', name: 'Figma', type: 'hard' },
      { id: '7', name: 'Leadership', type: 'soft' },
      { id: '8', name: 'Strategic Thinking', type: 'soft' },
      { id: '9', name: 'Communication', type: 'soft' },
      { id: '10', name: 'Stakeholder Management', type: 'soft' }
    ],
    certifications: [
      {
        id: '1',
        name: 'Professional Scrum Product Owner (PSPO)',
        issuer: 'Scrum.org',
        date: '2020-03',
        expiryDate: '2023-03'
      },
      {
        id: '2',
        name: 'Google Analytics Certification',
        issuer: 'Google',
        date: '2019-08'
      }
    ],
    languages: [
      { id: '1', name: 'English', proficiency: 'native' },
      { id: '2', name: 'Mandarin', proficiency: 'advanced' }
    ],
    hobbies: [
      { id: '1', name: 'Public Speaking' },
      { id: '2', name: 'Mentoring' },
      { id: '3', name: 'Yoga' },
      { id: '4', name: 'Travel' }
    ]
  } as ResumeData,

  executive: {
    personalInfo: {
      fullName: 'Michael Rodriguez',
      jobTitle: 'Chief Technology Officer',
      email: 'm.rodriguez@corpemail.com',
      phone: '+1 (555) 456-7890',
      location: 'Austin, TX',
      linkedin: 'linkedin.com/in/mrodriguezcto',
      website: 'mrodriguez.tech'
    },
    profileSummary: 'Visionary technology executive with 15+ years of experience leading digital transformation and innovation at enterprise scale. Proven track record of building high-performing engineering organizations, driving multi-million dollar revenue growth through technology initiatives, and establishing strategic partnerships. Expert in cloud architecture, AI/ML strategy, and scaling technology platforms from startup to enterprise level.',
    education: [
      {
        id: '1',
        school: 'MIT Sloan School of Management',
        degree: 'Executive MBA',
        field: 'Business Administration',
        startDate: '2015-09',
        endDate: '2017-05',
        gpa: '3.9'
      },
      {
        id: '2',
        school: 'Carnegie Mellon University',
        degree: 'Master of Science',
        field: 'Computer Science',
        startDate: '2005-09',
        endDate: '2007-05',
        gpa: '3.8'
      },
      {
        id: '3',
        school: 'University of Texas at Austin',
        degree: 'Bachelor of Science',
        field: 'Computer Engineering',
        startDate: '2001-09',
        endDate: '2005-05',
        gpa: '3.7'
      }
    ],
    workExperience: [
      {
        id: '1',
        role: 'Chief Technology Officer',
        company: 'GlobalTech Enterprises',
        location: 'Austin, TX',
        startDate: '2019-01',
        endDate: '',
        current: true,
        responsibilities: [
          'Lead global technology organization of 500+ engineers across 8 international offices',
          'Drove digital transformation initiatives resulting in $200M+ annual cost savings',
          'Established company-wide AI/ML strategy and implemented predictive analytics platform',
          'Oversaw $50M+ technology budget and vendor relationships',
          'Led M&A technical due diligence for 5+ company acquisitions',
          'Served on executive committee shaping company strategy and product direction'
        ]
      },
      {
        id: '2',
        role: 'VP of Engineering',
        company: 'CloudScale Systems',
        location: 'San Francisco, CA',
        startDate: '2015-03',
        endDate: '2018-12',
        current: false,
        responsibilities: [
          'Scaled engineering team from 50 to 200+ engineers while maintaining quality and culture',
          'Led migration from monolithic architecture to microservices, improving system reliability by 60%',
          'Implemented DevOps practices reducing deployment time from weeks to hours',
          'Established engineering excellence programs including code reviews, testing, and documentation',
          'Managed $25M technology budget and infrastructure operations'
        ]
      },
      {
        id: '3',
        role: 'Director of Engineering',
        company: 'DataDriven Inc.',
        location: 'Seattle, WA',
        startDate: '2012-06',
        endDate: '2015-02',
        current: false,
        responsibilities: [
          'Led development of big data analytics platform processing 10TB+ data daily',
          'Built and managed team of 40 engineers across data engineering, data science, and platform teams',
          'Architected real-time data processing pipeline supporting 1M+ concurrent users',
          'Established partnerships with major cloud providers and technology vendors',
          'Improved system scalability to handle 1000% user growth over 3-year period'
        ]
      },
      {
        id: '4',
        role: 'Senior Engineering Manager',
        company: 'StartupVentures',
        location: 'Palo Alto, CA',
        startDate: '2008-01',
        endDate: '2012-05',
        current: false,
        responsibilities: [
          'Built foundational engineering team and processes from ground up',
          'Led development of core SaaS platform serving enterprise customers',
          'Implemented agile development practices and CI/CD pipelines',
          'Mentored junior engineers and established technical leadership development program'
        ]
      }
    ],
    skills: [
      { id: '1', name: 'Strategic Planning', type: 'hard' },
      { id: '2', name: 'Cloud Architecture', type: 'hard' },
      { id: '3', name: 'AI/ML Strategy', type: 'hard' },
      { id: '4', name: 'Digital Transformation', type: 'hard' },
      { id: '5', name: 'Enterprise Architecture', type: 'hard' },
      { id: '6', name: 'Budget Management', type: 'hard' },
      { id: '7', name: 'Executive Leadership', type: 'soft' },
      { id: '8', name: 'Team Building', type: 'soft' },
      { id: '9', name: 'Strategic Communication', type: 'soft' },
      { id: '10', name: 'Change Management', type: 'soft' }
    ],
    certifications: [
      {
        id: '1',
        name: 'AWS Certified Solutions Architect - Professional',
        issuer: 'Amazon Web Services',
        date: '2020-06',
        expiryDate: '2023-06'
      },
      {
        id: '2',
        name: 'Certified Information Systems Security Professional (CISSP)',
        issuer: 'ISC²',
        date: '2018-09',
        expiryDate: '2024-09'
      },
      {
        id: '3',
        name: 'TOGAF 9 Certified',
        issuer: 'The Open Group',
        date: '2017-03'
      }
    ],
    languages: [
      { id: '1', name: 'English', proficiency: 'native' },
      { id: '2', name: 'Spanish', proficiency: 'native' },
      { id: '3', name: 'Portuguese', proficiency: 'intermediate' }
    ],
    hobbies: [
      { id: '1', name: 'Board Membership (Non-profit)' },
      { id: '2', name: 'Public Speaking' },
      { id: '3', name: 'Golf' },
      { id: '4', name: 'Wine Collecting' }
    ]
  } as ResumeData
};