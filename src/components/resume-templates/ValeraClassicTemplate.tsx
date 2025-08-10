'use client';

import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Twitter, Github, User, Briefcase, GraduationCap, Award, Calendar } from 'lucide-react';

interface ValeraClassicTemplateProps {
  data: ResumeData;
}

export default function ValeraClassicTemplate({ data }: ValeraClassicTemplateProps) {
  const { personalInfo, profileSummary, workExperience, education, skills, certifications, languages, hobbies } = data;

  // Color palette - monochrome
  const colors = {
    black: '#000000',
    darkGray: '#333333',
    mediumGray: '#666666',
    lightGray: '#999999',
    bgGray: '#f8f8f8'
  };

  // Parse markdown-style formatting in text
  const parseFormatting = (text: string) => {
    if (!text) return [];
    
    const parts = [];
    let currentPart = '';
    let isBold = false;
    let isItalic = false;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];
      
      if (char === '*' && nextChar === '*') {
        if (currentPart) {
          parts.push({ text: currentPart, bold: isBold, italic: isItalic });
          currentPart = '';
        }
        isBold = !isBold;
        i++; // Skip next *
      } else if (char === '_') {
        if (currentPart) {
          parts.push({ text: currentPart, bold: isBold, italic: isItalic });
          currentPart = '';
        }
        isItalic = !isItalic;
      } else {
        currentPart += char;
      }
    }
    
    if (currentPart) {
      parts.push({ text: currentPart, bold: isBold, italic: isItalic });
    }
    
    return parts;
  };

  // Render formatted text
  const renderFormattedText = (text: string) => {
    const parts = parseFormatting(text);
    return parts.map((part, index) => {
      let className = '';
      if (part.bold) className += ' font-bold';
      if (part.italic) className += ' italic';
      
      return (
        <span key={index} className={className}>
          {part.text}
        </span>
      );
    });
  };

  // Format date range for display
  const formatDateRange = (startDate: string, endDate: string, current: boolean) => {
    if (current) return `${startDate} - Present`;
    return `${startDate} - ${endDate}`;
  };

  // Extract year from date
  const getYear = (date: string) => {
    return date.split('-')[0];
  };

  // Render skill level dots
  const renderSkillDots = (level: number) => {
    const dots = [];
    for (let i = 1; i <= 5; i++) {
      dots.push(
        <span 
          key={i} 
          className="inline-block w-2 h-2 rounded-full mx-0.5"
          style={{ 
            backgroundColor: i <= level ? colors.black : colors.lightGray 
          }}
        />
      );
    }
    return dots;
  };

  // Get skill level label
  const getSkillLevelLabel = (level: number) => {
    const labels = ['', 'Beginner', 'Fair', 'Good', 'Very Good', 'Excellent'];
    return labels[level] || '';
  };

  // Group skills by type for software section
  const softwareSkills = skills.filter(skill => 
    skill.type === 'hard' && 
    ['JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'Angular', 'Vue.js', 'SQL', 'Excel', 'PowerPoint', 'Word', 'Photoshop', 'Illustrator', 'Figma', 'Sketch'].some(
      tech => skill.name.toLowerCase().includes(tech.toLowerCase())
    )
  );

  // Professional skills (non-software)
  const professionalSkills = skills.filter(skill => 
    !softwareSkills.some(soft => soft.id === skill.id)
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-white font-inter valera-classic-template">
      {/* Header Section */}
      <header className="mb-4 pb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ 
                color: colors.black,
                fontFamily: "'Playfair Display', 'Times New Roman', serif"
              }}
            >
              {personalInfo.fullName || 'YOUR NAME'}
            </h1>
            <h2 
              className="text-xl md:text-2xl font-medium"
              style={{ color: colors.darkGray }}
            >
              {personalInfo.jobTitle || 'Professional Title'}
            </h2>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="flex flex-wrap gap-4 text-sm mb-4">
          {personalInfo.phone && (
            <div className="flex items-center" style={{ color: colors.darkGray }}>
              <span className="font-bold mr-1">Phone:</span>
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.email && (
            <div className="flex items-center" style={{ color: colors.darkGray }}>
              <span className="font-bold mr-1">Email:</span>
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center" style={{ color: colors.darkGray }}>
              <span className="font-bold mr-1">LinkedIn:</span>
              <span>LinkedIn Profile</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center" style={{ color: colors.darkGray }}>
              <span className="font-bold mr-1">Location:</span>
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>
        
        {/* Summary Content (no title) */}
        {profileSummary && (
          <div className="mb-4">
            <p 
              className="text-sm leading-relaxed"
              style={{ 
                color: colors.darkGray,
                lineHeight: '1.6'
              }}
            >
              {renderFormattedText(profileSummary)}
            </p>
          </div>
        )}
      </header>

      {/* Experience Section */}
      {workExperience.length > 0 && (
        <section className="mb-6">
          <h3 
            className="text-lg font-bold uppercase mb-1 tracking-wide"
            style={{ color: colors.black }}
          >
            Experience
          </h3>
          <div 
            className="w-full h-px mb-4"
            style={{ backgroundColor: colors.lightGray }}
          ></div>
          <div className="space-y-8">
            {workExperience.map((exp) => (
              <div key={exp.id} className="relative">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Date - Left Aligned */}
                  <div className="sm:w-32 flex-shrink-0 pt-1">
                    <div 
                      className="text-xs font-medium uppercase tracking-wide"
                      style={{ color: colors.mediumGray }}
                    >
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </div>
                  </div>
                  
                  {/* Main Content - Right */}
                  <div className="flex-1">
                    <h4 
                      className="text-lg font-bold mb-1"
                      style={{ color: colors.black }}
                    >
                      {exp.role}
                    </h4>
                    <p 
                      className="text-base font-medium mb-3 italic"
                      style={{ color: colors.darkGray }}
                    >
                      {exp.company}{exp.location && `, ${exp.location}`}
                    </p>
                    
                    {exp.responsibilities.some(resp => resp.trim()) && (
                      <ul className="space-y-2 text-sm">
                        {exp.responsibilities
                          .filter(resp => resp.trim())
                          .map((resp, index) => (
                            <li key={index} className="flex items-start">
                              <span 
                                className="w-1 h-1 rounded-full mt-2 mr-3 flex-shrink-0"
                                style={{ backgroundColor: colors.black }}
                              ></span>
                              <div style={{ color: colors.darkGray }}>
                                {renderFormattedText(resp)}
                              </div>
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section className="mb-6">
          <h3 
            className="text-lg font-bold uppercase mb-1 tracking-wide"
            style={{ color: colors.black }}
          >
            Education
          </h3>
          <div 
            className="w-full h-px mb-4"
            style={{ backgroundColor: colors.lightGray }}
          ></div>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="relative">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Date - Left Aligned */}
                  <div className="sm:w-32 flex-shrink-0 pt-1">
                    <div 
                      className="text-xs font-medium uppercase tracking-wide"
                      style={{ color: colors.mediumGray }}
                    >
                      {formatDateRange(edu.startDate, edu.endDate, false)}
                    </div>
                  </div>
                  
                  {/* Main Content - Right */}
                  <div className="flex-1">
                    <h4 
                      className="text-lg font-bold mb-1"
                      style={{ color: colors.black }}
                    >
                      {edu.degree} in {edu.field}
                    </h4>
                    <p 
                      className="text-base font-medium mb-2"
                      style={{ color: colors.darkGray }}
                    >
                      {edu.school}
                    </p>
                    
                    {/* Sub-bullets for honors, projects, fellowships */}
                    <div className="space-y-1 text-sm">
                      {edu.gpa && (
                        <div className="flex items-start">
                          <span 
                            className="w-1 h-1 rounded-full mt-2 mr-3 flex-shrink-0"
                            style={{ backgroundColor: colors.black }}
                          ></span>
                          <span style={{ color: colors.darkGray }}>
                            GPA: {edu.gpa}
                          </span>
                        </div>
                      )}
                      {/* Add placeholder for honors/projects if needed */}
                      <div className="flex items-start">
                        <span 
                          className="w-1 h-1 rounded-full mt-2 mr-3 flex-shrink-0"
                          style={{ backgroundColor: colors.black }}
                        ></span>
                        <span style={{ color: colors.darkGray }}>
                          Academic Excellence Award
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {professionalSkills.length > 0 && (
        <section className="mb-6">
          <h3 
            className="text-lg font-bold uppercase mb-1 tracking-wide"
            style={{ color: colors.black }}
          >
            Skills
          </h3>
          <div 
            className="w-full h-px mb-4"
            style={{ backgroundColor: colors.lightGray }}
          ></div>
          <div className="space-y-6">
            {/* Technical Skills */}
            {professionalSkills.filter(skill => skill.type === 'hard').length > 0 && (
              <div className="relative">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Empty left space to maintain alignment */}
                  <div className="sm:w-32 flex-shrink-0"></div>
                  
                  {/* Main Content - Right */}
                  <div className="flex-1">
                    <h4 
                      className="text-base font-bold mb-2"
                      style={{ color: colors.black }}
                    >
                      Technical Skills
                    </h4>
                    <p 
                      className="text-sm"
                      style={{ color: colors.darkGray }}
                    >
                      {professionalSkills
                        .filter(skill => skill.type === 'hard')
                        .map(skill => skill.name)
                        .join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Soft Skills */}
            {professionalSkills.filter(skill => skill.type === 'soft').length > 0 && (
              <div className="relative">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Empty left space to maintain alignment */}
                  <div className="sm:w-32 flex-shrink-0"></div>
                  
                  {/* Main Content - Right */}
                  <div className="flex-1">
                    <h4 
                      className="text-base font-bold mb-2"
                      style={{ color: colors.black }}
                    >
                      Soft Skills
                    </h4>
                    <p 
                      className="text-sm"
                      style={{ color: colors.darkGray }}
                    >
                      {professionalSkills
                        .filter(skill => skill.type === 'soft')
                        .map(skill => skill.name)
                        .join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Languages */}
            {languages.length > 0 && (
              <div className="relative">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Empty left space to maintain alignment */}
                  <div className="sm:w-32 flex-shrink-0"></div>
                  
                  {/* Main Content - Right */}
                  <div className="flex-1">
                    <h4 
                      className="text-base font-bold mb-2"
                      style={{ color: colors.black }}
                    >
                      Languages
                    </h4>
                    <p 
                      className="text-sm"
                      style={{ color: colors.darkGray }}
                    >
                      {languages
                        .map(lang => `${lang.name} (${lang.proficiency})`)
                        .join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Software Section */}
      {softwareSkills.length > 0 && (
        <section className="mb-6">
          <h3 
            className="text-lg font-bold uppercase mb-1 tracking-wide"
            style={{ color: colors.black }}
          >
            Software
          </h3>
          <div 
            className="w-full h-px mb-4"
            style={{ backgroundColor: colors.lightGray }}
          ></div>
          <div className="space-y-3">
            {softwareSkills.map((skill) => (
              <div key={skill.id} className="relative">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Empty left space to maintain alignment */}
                  <div className="sm:w-32 flex-shrink-0"></div>
                  
                  {/* Main Content - Right */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm" style={{ color: colors.black }}>
                        {skill.name}
                      </span>
                      <div className="flex items-center">
                        {renderSkillDots(4)} {/* Default to 4 for software skills */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {certifications.length > 0 && (
        <section className="mb-6">
          <h3 
            className="text-lg font-bold uppercase mb-1 tracking-wide"
            style={{ color: colors.black }}
          >
            Certifications
          </h3>
          <div 
            className="w-full h-px mb-4"
            style={{ backgroundColor: colors.lightGray }}
          ></div>
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <div key={cert.id}>
                {index > 0 && (
                  <div 
                    className="w-full h-px mb-4"
                    style={{ backgroundColor: colors.lightGray }}
                  ></div>
                )}
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Date - Left Aligned */}
                  <div className="sm:w-32 flex-shrink-0 pt-1">
                    <div 
                      className="text-xs font-medium uppercase tracking-wide"
                      style={{ color: colors.mediumGray }}
                    >
                      {cert.date}
                    </div>
                  </div>
                  
                  {/* Main Content - Right */}
                  <div className="flex-1">
                    <h4 
                      className="text-base font-bold mb-1"
                      style={{ color: colors.black }}
                    >
                      {cert.name}
                    </h4>
                    <p 
                      className="text-sm"
                      style={{ color: colors.darkGray }}
                    >
                      {cert.issuer}
                    </p>
                    {cert.expiryDate && (
                      <p 
                        className="text-xs mt-1"
                        style={{ color: colors.mediumGray }}
                      >
                        Expires: {cert.expiryDate}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Responsive styles and font loading */}
      <style jsx global>{`
        /* System fonts fallback */
        .valera-classic-template {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 15px;
          line-height: 1.6;
          color: #333333;
        }
        
        .valera-classic-template h1 {
          font-family: Georgia, 'Times New Roman', serif;
        }
        
        @media print {
          .valera-classic-template {
            break-inside: avoid;
            padding: 0.5in;
            max-width: 8.5in;
            margin: 0 auto;
          }
          
          .valera-classic-template header {
            margin-bottom: 0.3in !important;
            padding-bottom: 0.2in !important;
          }
          
          .valera-classic-template section {
            margin-bottom: 0.3in !important;
          }
          
          .valera-classic-template h3 {
            margin-bottom: 0.05in !important;
          }
          
          .valera-classic-template .flex {
            margin-left: 0 !important;
            padding-left: 0 !important;
          }
          
          .valera-classic-template .sm\\:w-32 {
            width: 1.5in !important;
            padding-right: 0.2in !important;
            flex-shrink: 0 !important;
          }
          
          .valera-classic-template .flex-1 {
            padding-left: 0.1in !important;
          }
          
          .valera-classic-template .w-full.h-px {
            margin-bottom: 0.15in !important;
            margin-top: 0.05in !important;
          }
          
          .valera-classic-template .space-y-8 > * + * {
            margin-top: 0.25in !important;
          }
          
          .valera-classic-template .space-y-6 > * + * {
            margin-top: 0.2in !important;
          }
          
          .valera-classic-template .space-y-4 > * + * {
            margin-top: 0.15in !important;
          }
          
          .valera-classic-template .space-y-3 > * + * {
            margin-top: 0.1in !important;
          }
          
          .valera-classic-template .space-y-2 > * + * {
            margin-top: 0.08in !important;
          }
          
          .valera-classic-template .space-y-1 > * + * {
            margin-top: 0.05in !important;
          }
          
          .valera-classic-template ul {
            margin-top: 0.05in !important;
          }
          
          .valera-classic-template li {
            margin-bottom: 0.05in !important;
          }
        }
        
        @media (max-width: 768px) {
          .valera-classic-template .flex {
            flex-direction: column !important;
          }
          .valera-classic-template .sm\\:w-32 {
            width: 100% !important;
            margin-bottom: 8px;
          }
        }
      `}</style>
    </div>
  );
}