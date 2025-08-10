'use client';

import { useState, useEffect } from 'react';
import { ResumeData, PersonalInfo, Education, WorkExperience, Skill, Certification, Language, Hobby } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus, Trash2, Download, Save, FileText, Users, UserCheck, Crown, HelpCircle, Upload, File } from 'lucide-react';
import CorporateTemplate from '@/components/resume-templates/CorporateTemplate';
import ModernTechTemplate from '@/components/resume-templates/ModernTechTemplate';
import CreativeTemplate from '@/components/resume-templates/CreativeTemplate';
import MinimalistTemplate from '@/components/resume-templates/MinimalistTemplate';
import AcademicTemplate from '@/components/resume-templates/AcademicTemplate';
import ExecutiveProfileTemplate from '@/components/resume-templates/ExecutiveProfileTemplate';
import CreativePortfolioTemplate from '@/components/resume-templates/CreativePortfolioTemplate';
import ElegantSidebarTemplate from '@/components/resume-templates/ElegantSidebarTemplate';
import CreativeInfographicTemplate from '@/components/resume-templates/CreativeInfographicTemplate';
import ModernProfessionalHybridTemplate from '@/components/resume-templates/ModernProfessionalHybridTemplate';
import CreativeShowcaseInfographicTemplate from '@/components/resume-templates/CreativeShowcaseInfographicTemplate';
import EnfoldCorporateTemplate from '@/components/resume-templates/EnfoldCorporateTemplate';
import KaidaKimTemplate from '@/components/resume-templates/KaidaKimTemplate';
import ValeraClassicTemplate from '@/components/resume-templates/ValeraClassicTemplate';
import { sampleResumes } from '@/data/sampleResumes';

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    profilePicture: ''
  },
  profileSummary: '',
  education: [],
  workExperience: [],
  skills: [],
  certifications: [],
  languages: [],
  hobbies: []
};

type TemplateType = 'corporate' | 'modern-tech' | 'creative' | 'minimalist' | 'academic' | 'executive-profile' | 'creative-portfolio' | 'elegant-sidebar' | 'creative-infographic' | 'modern-professional-hybrid' | 'creative-showcase-infographic' | 'enfold-corporate' | 'kaida-kim' | 'valera-classic';

const templates = [
  { id: 'corporate' as const, name: 'Corporate Template', description: 'Clean, two-column layout for banking, finance, and law' },
  { id: 'modern-tech' as const, name: 'Modern Tech Template', description: 'Single-column, bold headings, great for tech roles' },
  { id: 'creative' as const, name: 'Creative Template', description: 'Light colors, icons, profile picture support, suitable for design/marketing' },
  { id: 'minimalist' as const, name: 'Minimalist Template', description: 'Plain text-based, ATS-optimized, no graphics' },
  { id: 'academic' as const, name: 'Academic Template', description: 'Detailed education and publications, suitable for researchers/teachers' },
  { id: 'executive-profile' as const, name: 'Executive Profile Template', description: 'Profile photo at top-left, elegant layout for executives' },
  { id: 'creative-portfolio' as const, name: 'Creative Portfolio Template', description: 'Circular profile picture centered, perfect for creative roles' },
  { id: 'elegant-sidebar' as const, name: 'Elegant Sidebar (2-Column)', description: 'Professional two-column layout with colored sidebar for skills and contact info' },
  { id: 'creative-infographic' as const, name: 'Creative Infographic', description: 'Modern visual design with timeline, skill bars, and ATS-friendly toggle for creative professionals' },
  { id: 'modern-professional-hybrid' as const, name: 'Modern Professional (Hybrid)', description: 'Clean two-column hybrid layout blending skills-first and experience-supported approach with ATS-friendly toggle' },
  { id: 'creative-showcase-infographic' as const, name: 'Creative Showcase (Infographic)', description: 'Visually engaging layout for design, marketing, and creative professionals with color themes and timeline-style experience' },
  { id: 'enfold-corporate' as const, name: 'Enfold Corporate', description: 'Professional timeline layout with date alignment in left column, perfect for executives and professionals' },
  { id: 'kaida-kim' as const, name: 'Kaida Kim', description: 'Modern two-column layout with coral accents, perfect for healthcare, marketing, and education professionals' },
  { id: 'valera-classic' as const, name: 'Valera Classic', description: 'Classic single-column timeline layout with monochrome styling, perfect for tech, finance, and consulting executives' }
];

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [activeTab, setActiveTab] = useState('personal');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('corporate');
  const [exportFormat, setExportFormat] = useState<'normal' | 'ats'>('normal');

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      setResumeData(JSON.parse(savedData));
    } else {
      // Load sample data if no saved data exists
      setResumeData(sampleResumes.junior);
    }
    
    const savedTemplate = localStorage.getItem('selectedTemplate');
    if (savedTemplate) {
      setSelectedTemplate(savedTemplate as TemplateType);
    }
    
    const savedExportFormat = localStorage.getItem('exportFormat');
    if (savedExportFormat) {
      setExportFormat(savedExportFormat as 'normal' | 'ats');
    }
  }, []);

  // Save data to localStorage whenever resumeData changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  // Save template selection to localStorage
  useEffect(() => {
    localStorage.setItem('selectedTemplate', selectedTemplate);
  }, [selectedTemplate]);

  // Save export format to localStorage
  useEffect(() => {
    localStorage.setItem('exportFormat', exportFormat);
  }, [exportFormat]);

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addWorkExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      role: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      responsibilities: ['']
    };
    setResumeData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, newExperience]
    }));
  };

  const updateWorkExperience = (id: string, field: keyof WorkExperience, value: string | boolean | string[]) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeWorkExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter(exp => exp.id !== id)
    }));
  };

  const addResponsibility = (expId: string) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(exp =>
        exp.id === expId
          ? { ...exp, responsibilities: [...exp.responsibilities, ''] }
          : exp
      )
    }));
  };

  const updateResponsibility = (expId: string, index: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(exp =>
        exp.id === expId
          ? { ...exp, responsibilities: exp.responsibilities.map((resp, i) => i === index ? value : resp) }
          : exp
      )
    }));
  };

  const removeResponsibility = (expId: string, index: number) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(exp =>
        exp.id === expId
          ? { ...exp, responsibilities: exp.responsibilities.filter((_, i) => i !== index) }
          : exp
      )
    }));
  };

  const addSkill = (type: 'hard' | 'soft') => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      type
    };
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (id: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, name: value } : skill
      )
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      expiryDate: ''
    };
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCertification]
    }));
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const removeCertification = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }));
  };

  const addLanguage = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      name: '',
      proficiency: 'beginner'
    };
    setResumeData(prev => ({
      ...prev,
      languages: [...prev.languages, newLanguage]
    }));
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.map(lang =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    }));
  };

  const removeLanguage = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang.id !== id)
    }));
  };

  const addHobby = () => {
    const newHobby: Hobby = {
      id: Date.now().toString(),
      name: ''
    };
    setResumeData(prev => ({
      ...prev,
      hobbies: [...prev.hobbies, newHobby]
    }));
  };

  const updateHobby = (id: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      hobbies: prev.hobbies.map(hobby =>
        hobby.id === id ? { ...hobby, name: value } : hobby
      )
    }));
  };

  const removeHobby = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      hobbies: prev.hobbies.filter(hobby => hobby.id !== id)
    }));
  };

  const loadSampleResume = (type: 'junior' | 'midlevel' | 'executive') => {
    setResumeData(sampleResumes[type]);
  };

  const clearResume = () => {
    setResumeData(defaultResumeData);
  };

  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      updatePersonalInfo('profilePicture', base64);
    };
    reader.readAsDataURL(file);
  };

  const downloadPDF = async (event?: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const fileName = resumeData.personalInfo.fullName 
        ? `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
        : 'resume.pdf';
      
      // Show loading state
      const button = event?.currentTarget as HTMLButtonElement;
      const originalText = button?.innerHTML;
      if (button) {
        button.innerHTML = '<svg class="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Generating...';
        button.disabled = true;
      }
      
      // Dynamically import the PDF generator only when needed
      const { generatePDF } = await import('@/utils/pdfGenerator');
      await generatePDF('resume-preview', fileName, exportFormat);
      
      // Reset button
      if (button) {
        button.innerHTML = originalText || '<Download className="w-4 h-4 mr-2" />Download PDF';
        button.disabled = false;
      }
      
      // Show success message
      alert('PDF generated successfully!');
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      
      // Reset button if it exists
      const button = event?.currentTarget as HTMLButtonElement;
      if (button) {
        button.innerHTML = '<Download className="w-4 h-4 mr-2" />Download PDF';
        button.disabled = false;
      }
      
      // Show user-friendly error message
      if (error instanceof Error) {
        alert(`Failed to generate PDF: ${error.message}`);
      } else {
        alert('Failed to generate PDF. Please try again.');
      }
    }
  };

  const downloadDOCX = async (event?: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const fileName = resumeData.personalInfo.fullName 
        ? `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.docx`
        : 'resume.docx';
      
      // Show loading state
      const button = event?.currentTarget as HTMLButtonElement;
      const originalText = button?.innerHTML;
      if (button) {
        button.innerHTML = '<svg class="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Generating...';
        button.disabled = true;
      }
      
      // Dynamically import the DOCX generator only when needed
      const { generateDocx } = await import('@/utils/docxGenerator');
      const blob = await generateDocx(resumeData, exportFormat);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      // Reset button
      if (button) {
        button.innerHTML = originalText || '<File className="w-4 h-4 mr-2" />Download DOCX';
        button.disabled = false;
      }
      
      // Show success message
      alert('DOCX generated successfully!');
    } catch (error) {
      console.error('Failed to generate DOCX:', error);
      
      // Reset button if it exists
      const button = event?.currentTarget as HTMLButtonElement;
      if (button) {
        button.innerHTML = '<File className="w-4 h-4 mr-2" />Download DOCX';
        button.disabled = false;
      }
      
      // Show user-friendly error message
      if (error instanceof Error) {
        alert(`Failed to generate DOCX: ${error.message}`);
      } else {
        alert('Failed to generate DOCX. Please try again.');
      }
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 p-4" role="application" aria-label="Resume Builder Application">
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Skip to main content
        </a>
        <div className="max-w-7xl mx-auto" id="main-content">
          <header className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
              <p className="text-gray-600">Create your professional resume with ease</p>
            </div>
            <div className="flex gap-2 items-center" role="toolbar" aria-label="Resume actions">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" aria-label="Load sample resume">
                    <FileText className="w-4 h-4 mr-2" />
                    Start From Example
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md" role="dialog" aria-labelledby="dialog-title">
                  <DialogHeader>
                    <DialogTitle id="dialog-title">Choose a Sample Resume</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3" role="group" aria-label="Sample resume options">
                    <div className="grid gap-3">
                      <Button
                        variant="outline"
                        className="h-auto p-4 flex flex-col items-start text-left"
                        onClick={() => loadSampleResume('junior')}
                        aria-describedby="junior-desc"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-5 h-5 text-blue-600" aria-hidden="true" />
                          <span className="font-semibold">Junior Level</span>
                        </div>
                        <p id="junior-desc" className="text-sm text-gray-600">Recent graduate with internship experience</p>
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="h-auto p-4 flex flex-col items-start text-left"
                        onClick={() => loadSampleResume('midlevel')}
                        aria-describedby="midlevel-desc"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <UserCheck className="w-5 h-5 text-green-600" aria-hidden="true" />
                          <span className="font-semibold">Mid-Level</span>
                        </div>
                        <p id="midlevel-desc" className="text-sm text-gray-600">Experienced professional with 5+ years experience</p>
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="h-auto p-4 flex flex-col items-start text-left"
                        onClick={() => loadSampleResume('executive')}
                        aria-describedby="executive-desc"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Crown className="w-5 h-5 text-purple-600" aria-hidden="true" />
                          <span className="font-semibold">Executive Level</span>
                        </div>
                        <p id="executive-desc" className="text-sm text-gray-600">Senior leadership and C-level experience</p>
                      </Button>
                    </div>
                    
                    <Button
                      variant="ghost"
                      onClick={clearResume}
                      className="w-full mt-4"
                      aria-label="Clear current resume data"
                    >
                      Clear Current Resume
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <div className="flex items-center gap-2">
                <Label htmlFor="template-select" className="text-sm font-medium">Template:</Label>
                <Select value={selectedTemplate} onValueChange={(value) => setSelectedTemplate(value as TemplateType)}>
                  <SelectTrigger id="template-select" className="w-64" aria-label="Select resume template">
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem 
                        key={template.id} 
                        value={template.id}
                        className="py-3"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{template.name}</span>
                          <span className="text-xs text-gray-500 mt-1">{template.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="export-format" className="text-sm font-medium">Export Format:</Label>
                <Select value={exportFormat} onValueChange={(value) => setExportFormat(value as 'normal' | 'ats')}>
                  <SelectTrigger id="export-format" className="w-40" aria-label="Select export format">
                    <SelectValue placeholder="Format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">
                      <div className="flex flex-col">
                        <span className="font-medium">Normal</span>
                        <span className="text-xs text-gray-500">Template styling</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="ats">
                      <div className="flex flex-col">
                        <span className="font-medium">ATS-Friendly</span>
                        <span className="text-xs text-gray-500">Optimized for scanning</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={downloadPDF} variant="outline" aria-label="Download resume as PDF">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button onClick={downloadDOCX} variant="outline" aria-label="Download resume as DOCX">
                <File className="w-4 h-4 mr-2" />
                Download DOCX
              </Button>
              <Button aria-label="Save resume data">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </header>

        <main className="space-y-6">
          {/* Form Section */}
          <section className="bg-white rounded-lg shadow-sm border" aria-label="Resume form">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5" role="tablist">
                <TabsTrigger value="personal" role="tab" aria-selected={activeTab === 'personal'}>Personal</TabsTrigger>
                <TabsTrigger value="experience" role="tab" aria-selected={activeTab === 'experience'}>Experience</TabsTrigger>
                <TabsTrigger value="education" role="tab" aria-selected={activeTab === 'education'}>Education</TabsTrigger>
                <TabsTrigger value="skills" role="tab" aria-selected={activeTab === 'skills'}>Skills</TabsTrigger>
                <TabsTrigger value="additional" role="tab" aria-selected={activeTab === 'additional'}>Additional</TabsTrigger>
              </TabsList>

              <div className="p-6">
                <TabsContent value="personal" className="space-y-4" role="tabpanel">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        Personal Information
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>Enter your basic contact information. Make sure your email is professional and your phone number is current.</p>
                          </TooltipContent>
                        </Tooltip>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            value={resumeData.personalInfo.fullName}
                            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <Label htmlFor="jobTitle">Job Title</Label>
                          <Input
                            id="jobTitle"
                            value={resumeData.personalInfo.jobTitle}
                            onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
                            placeholder="Software Engineer"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={resumeData.personalInfo.email}
                            onChange={(e) => updatePersonalInfo('email', e.target.value)}
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={resumeData.personalInfo.phone}
                            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={resumeData.personalInfo.location}
                          onChange={(e) => updatePersonalInfo('location', e.target.value)}
                          placeholder="New York, NY"
                        />
                      </div>
                      
                      {/* Profile Picture Upload */}
                      <div>
                        <Label htmlFor="profilePicture">Profile Picture (Optional)</Label>
                        <div className="space-y-3">
                          {resumeData.personalInfo.profilePicture ? (
                            <div className="flex items-center gap-4">
                              <img
                                src={resumeData.personalInfo.profilePicture}
                                alt="Profile"
                                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                              />
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => updatePersonalInfo('profilePicture', '')}
                                  variant="outline"
                                  size="sm"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Remove
                                </Button>
                                <Button
                                  onClick={() => document.getElementById('profilePicture')?.click()}
                                  variant="outline"
                                  size="sm"
                                >
                                  Replace
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600 mb-2">
                                Click to upload or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 mb-3">
                                PNG, JPG or GIF (max. 5MB)
                              </p>
                              <Button
                                onClick={() => document.getElementById('profilePicture')?.click()}
                                variant="outline"
                                size="sm"
                              >
                                Choose File
                              </Button>
                            </div>
                          )}
                          <input
                            id="profilePicture"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleProfilePictureUpload}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
                          <Input
                            id="linkedin"
                            value={resumeData.personalInfo.linkedin || ''}
                            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                            placeholder="linkedin.com/in/johndoe"
                          />
                        </div>
                        <div>
                          <Label htmlFor="website">Website (Optional)</Label>
                          <Input
                            id="website"
                            value={resumeData.personalInfo.website || ''}
                            onChange={(e) => updatePersonalInfo('website', e.target.value)}
                            placeholder="johndoe.com"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        Profile Summary
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>Write 2-3 sentences highlighting your key strengths, experience, and career goals. Focus on what makes you unique and valuable to employers.</p>
                          </TooltipContent>
                        </Tooltip>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={resumeData.profileSummary}
                        onChange={(e) => setResumeData(prev => ({ ...prev, profileSummary: e.target.value }))}
                        placeholder="Write a brief summary about yourself, your experience, and your career goals..."
                        rows={4}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="experience" className="space-y-4" role="tabpanel">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          Work Experience
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="w-4 h-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p>List your work experience in reverse chronological order. Use action verbs and quantify achievements when possible (e.g., "Increased sales by 25%").</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Button onClick={addWorkExperience} size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Experience
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {resumeData.workExperience.map((exp) => (
                        <div key={exp.id} className="border rounded-lg p-4 space-y-4">
                          <div className="flex justify-between items-start">
                            <div className="grid grid-cols-2 gap-4 flex-1">
                              <div>
                                <Label>Role</Label>
                                <Input
                                  value={exp.role}
                                  onChange={(e) => updateWorkExperience(exp.id, 'role', e.target.value)}
                                  placeholder="Software Engineer"
                                />
                              </div>
                              <div>
                                <Label>Company</Label>
                                <Input
                                  value={exp.company}
                                  onChange={(e) => updateWorkExperience(exp.id, 'company', e.target.value)}
                                  placeholder="Tech Corp"
                                />
                              </div>
                            </div>
                            <Button
                              onClick={() => removeWorkExperience(exp.id)}
                              variant="outline"
                              size="sm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Location</Label>
                              <Input
                                value={exp.location}
                                onChange={(e) => updateWorkExperience(exp.id, 'location', e.target.value)}
                                placeholder="San Francisco, CA"
                              />
                            </div>
                            <div>
                              <Label>Start Date</Label>
                              <Input
                                type="month"
                                value={exp.startDate}
                                onChange={(e) => updateWorkExperience(exp.id, 'startDate', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>End Date</Label>
                              <Input
                                type="month"
                                value={exp.endDate}
                                onChange={(e) => updateWorkExperience(exp.id, 'endDate', e.target.value)}
                                disabled={exp.current}
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`current-${exp.id}`}
                                checked={exp.current}
                                onChange={(e) => updateWorkExperience(exp.id, 'current', e.target.checked)}
                              />
                              <Label htmlFor={`current-${exp.id}`}>Current Position</Label>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <Label>Responsibilities</Label>
                              <Button onClick={() => addResponsibility(exp.id)} size="sm" variant="outline">
                                <Plus className="w-4 h-4 mr-2" />
                                Add
                              </Button>
                            </div>
                            {exp.responsibilities.map((resp, index) => (
                              <div key={index} className="flex gap-2 mb-2">
                                <Input
                                  value={resp}
                                  onChange={(e) => updateResponsibility(exp.id, index, e.target.value)}
                                  placeholder="Describe your responsibility..."
                                />
                                <Button
                                  onClick={() => removeResponsibility(exp.id, index)}
                                  variant="outline"
                                  size="sm"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="education" className="space-y-4" role="tabpanel">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          Education
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="w-4 h-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p>List your education in reverse chronological order. Include relevant coursework, honors, and GPA if it's impressive (3.5+).</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Button onClick={addEducation} size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Education
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {resumeData.education.map((edu) => (
                        <div key={edu.id} className="border rounded-lg p-4 space-y-4">
                          <div className="flex justify-between items-start">
                            <div className="grid grid-cols-2 gap-4 flex-1">
                              <div>
                                <Label>School</Label>
                                <Input
                                  value={edu.school}
                                  onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                                  placeholder="University of California"
                                />
                              </div>
                              <div>
                                <Label>Degree</Label>
                                <Input
                                  value={edu.degree}
                                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                  placeholder="Bachelor of Science"
                                />
                              </div>
                            </div>
                            <Button
                              onClick={() => removeEducation(edu.id)}
                              variant="outline"
                              size="sm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Field of Study</Label>
                              <Input
                                value={edu.field}
                                onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                                placeholder="Computer Science"
                              />
                            </div>
                            <div>
                              <Label>GPA (Optional)</Label>
                              <Input
                                value={edu.gpa || ''}
                                onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                                placeholder="3.8"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Start Date</Label>
                              <Input
                                type="month"
                                value={edu.startDate}
                                onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>End Date</Label>
                              <Input
                                type="month"
                                value={edu.endDate}
                                onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="skills" className="space-y-4" role="tabpanel">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            Hard Skills
                            <Tooltip>
                              <TooltipTrigger>
                                <HelpCircle className="w-4 h-4 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p>List technical skills like programming languages, software, tools, and technologies relevant to your target job.</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <Button onClick={() => addSkill('hard')} size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {resumeData.skills
                          .filter(skill => skill.type === 'hard')
                          .map((skill) => (
                            <div key={skill.id} className="flex gap-2">
                              <Input
                                value={skill.name}
                                onChange={(e) => updateSkill(skill.id, e.target.value)}
                                placeholder="JavaScript, Python, etc."
                              />
                              <Button
                                onClick={() => removeSkill(skill.id)}
                                variant="outline"
                                size="sm"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            Soft Skills
                            <Tooltip>
                              <TooltipTrigger>
                                <HelpCircle className="w-4 h-4 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p>List interpersonal skills like communication, leadership, teamwork, and problem-solving that are valuable in any role.</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <Button onClick={() => addSkill('soft')} size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {resumeData.skills
                          .filter(skill => skill.type === 'soft')
                          .map((skill) => (
                            <div key={skill.id} className="flex gap-2">
                              <Input
                                value={skill.name}
                                onChange={(e) => updateSkill(skill.id, e.target.value)}
                                placeholder="Communication, Leadership, etc."
                              />
                              <Button
                                onClick={() => removeSkill(skill.id)}
                                variant="outline"
                                size="sm"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="additional" className="space-y-4" role="tabpanel">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            Certifications
                            <Tooltip>
                              <TooltipTrigger>
                                <HelpCircle className="w-4 h-4 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p>Include professional certifications that are relevant to your career. Add issuing organization and completion date.</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <Button onClick={addCertification} size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {resumeData.certifications.map((cert) => (
                          <div key={cert.id} className="border rounded-lg p-3 space-y-2">
                            <div className="flex justify-between items-start">
                              <div className="flex-1 space-y-2">
                                <div>
                                  <Label>Certification Name</Label>
                                  <Input
                                    value={cert.name}
                                    onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                                    placeholder="AWS Certified Developer"
                                  />
                                </div>
                                <div>
                                  <Label>Issuer</Label>
                                  <Input
                                    value={cert.issuer}
                                    onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                                    placeholder="Amazon Web Services"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <Label>Date</Label>
                                    <Input
                                      type="month"
                                      value={cert.date}
                                      onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <Label>Expiry Date (Optional)</Label>
                                    <Input
                                      type="month"
                                      value={cert.expiryDate || ''}
                                      onChange={(e) => updateCertification(cert.id, 'expiryDate', e.target.value)}
                                    />
                                  </div>
                                </div>
                              </div>
                              <Button
                                onClick={() => removeCertification(cert.id)}
                                variant="outline"
                                size="sm"
                                className="ml-2"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            Languages
                            <Tooltip>
                              <TooltipTrigger>
                                <HelpCircle className="w-4 h-4 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p>List languages you speak and your proficiency level. This is especially valuable for international roles or companies with global presence.</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <Button onClick={addLanguage} size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {resumeData.languages.map((lang) => (
                          <div key={lang.id} className="flex gap-2">
                            <div className="flex-1">
                              <Input
                                value={lang.name}
                                onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                                placeholder="English, Spanish, etc."
                              />
                            </div>
                            <select
                              value={lang.proficiency}
                              onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)}
                              className="px-3 py-2 border rounded-md text-sm"
                            >
                              <option value="beginner">Beginner</option>
                              <option value="intermediate">Intermediate</option>
                              <option value="advanced">Advanced</option>
                              <option value="native">Native</option>
                            </select>
                            <Button
                              onClick={() => removeLanguage(lang.id)}
                              variant="outline"
                              size="sm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          Hobbies (Optional)
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="w-4 h-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p>Include interests that demonstrate well-roundedness or relevant skills. Avoid controversial or overly personal hobbies.</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Button onClick={addHobby} size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {resumeData.hobbies.map((hobby) => (
                        <div key={hobby.id} className="flex gap-2">
                          <Input
                            value={hobby.name}
                            onChange={(e) => updateHobby(hobby.id, e.target.value)}
                            placeholder="Reading, Hiking, Photography, etc."
                          />
                          <Button
                            onClick={() => removeHobby(hobby.id)}
                            variant="outline"
                            size="sm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </section>

          {/* Preview Section */}
          <section className="bg-white rounded-lg shadow-sm border p-6" aria-label="Resume preview">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Resume Preview</h2>
              <p className="text-sm text-gray-600">{templates.find(t => t.id === selectedTemplate)?.name}</p>
              <p className="text-xs text-blue-600">Debug: Template = {selectedTemplate}, Data loaded = {resumeData.personalInfo.fullName ? 'Yes' : 'No'}</p>
            </div>
            <div 
              id="resume-preview" 
              className="border rounded-lg bg-white overflow-hidden"
              role="document"
              aria-label="Generated resume preview"
              tabIndex={0}
            >
              {selectedTemplate === 'corporate' && <CorporateTemplate data={resumeData} />}
              {selectedTemplate === 'modern-tech' && <ModernTechTemplate data={resumeData} />}
              {selectedTemplate === 'creative' && <CreativeTemplate data={resumeData} />}
              {selectedTemplate === 'minimalist' && <MinimalistTemplate data={resumeData} />}
              {selectedTemplate === 'academic' && <AcademicTemplate data={resumeData} />}
              {selectedTemplate === 'executive-profile' && <ExecutiveProfileTemplate data={resumeData} />}
              {selectedTemplate === 'creative-portfolio' && <CreativePortfolioTemplate data={resumeData} />}
              {selectedTemplate === 'elegant-sidebar' && <ElegantSidebarTemplate data={resumeData} />}
              {selectedTemplate === 'creative-infographic' && <CreativeInfographicTemplate data={resumeData} />}
              {selectedTemplate === 'modern-professional-hybrid' && <ModernProfessionalHybridTemplate data={resumeData} />}
              {selectedTemplate === 'creative-showcase-infographic' && <CreativeShowcaseInfographicTemplate data={resumeData} />}
              {selectedTemplate === 'enfold-corporate' && <EnfoldCorporateTemplate data={resumeData} />}
              {selectedTemplate === 'kaida-kim' && <KaidaKimTemplate data={resumeData} />}
              {selectedTemplate === 'valera-classic' && <ValeraClassicTemplate data={resumeData} />}
              {!templates.find(t => t.id === selectedTemplate) && (
                <div className="p-8 text-center text-gray-500">
                  <p>Template not found. Please select a valid template.</p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
    </TooltipProvider>
  );
}