export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  profilePicture?: string; // Base64 encoded image
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string[];
}

export interface Skill {
  id: string;
  name: string;
  type: 'hard' | 'soft';
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'native';
}

export interface Hobby {
  id: string;
  name: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  profileSummary: string;
  education: Education[];
  workExperience: WorkExperience[];
  skills: Skill[];
  certifications: Certification[];
  languages: Language[];
  hobbies: Hobby[];
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
}