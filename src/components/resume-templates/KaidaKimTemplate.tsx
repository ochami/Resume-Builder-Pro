'use client';

import { useState } from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Twitter, Github, User, Briefcase, GraduationCap, Award, Calendar, ExternalLink } from 'lucide-react';

interface KaidaKimTemplateProps {
  data: ResumeData;
}

export default function KaidaKimTemplate({ data }: KaidaKimTemplateProps) {
  const [showFormattingTips, setShowFormattingTips] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    licenses: true,
    activities: true
  });
  const { personalInfo, profileSummary, workExperience, education, skills, certifications, languages, hobbies } = data;

  // Coral color scheme
  const colors = {
    coral: '#f96d6d',
    black: '#000000',
    darkGray: '#333333',
    lightGray: '#666666',
    iconGray: '#999999'
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

  return (
    <div className="w-full max-w-4xl mx-auto bg-white font-lato kaida-kim-template">
      {/* Section Visibility Toggles */}
      <div className="no-print sticky top-4 z-10 flex justify-end mb-4 pr-4 gap-2">
        <button
          onClick={() => setVisibleSections(prev => ({ ...prev, licenses: !prev.licenses }))}
          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
            visibleSections.licenses 
              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
        >
          {visibleSections.licenses ? 'Hide' : 'Show'} Licenses
        </button>
        <button
          onClick={() => setVisibleSections(prev => ({ ...prev, activities: !prev.activities }))}
          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
            visibleSections.activities 
              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
        >
          {visibleSections.activities ? 'Hide' : 'Show'} Activities
        </button>
        <button
          onClick={() => setShowFormattingTips(!showFormattingTips)}
          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
            showFormattingTips 
              ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
        >
          {showFormattingTips ? 'Hide' : 'Show'} Tips
        </button>
      </div>

      {/* Header Section */}
      <header className="mb-8 relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 
              className="text-2xl md:text-3xl font-bold mb-2 uppercase tracking-wide"
              style={{ color: colors.black }}
            >
              {personalInfo.fullName || 'YOUR NAME'}
            </h1>
            <h2 
              className="text-xl md:text-2xl font-semibold mb-4"
              style={{ color: colors.coral }}
            >
              {personalInfo.jobTitle || 'Professional Title'}
            </h2>
            
            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 text-sm">
              {personalInfo.email && (
                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center hover:opacity-70 transition-opacity"
                  style={{ color: colors.darkGray }}
                >
                  <Mail className="w-4 h-4 mr-1" style={{ color: colors.iconGray }} />
                  {personalInfo.email}
                </a>
              )}
              {personalInfo.phone && (
                <a 
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center hover:opacity-70 transition-opacity"
                  style={{ color: colors.darkGray }}
                >
                  <Phone className="w-4 h-4 mr-1" style={{ color: colors.iconGray }} />
                  {personalInfo.phone}
                </a>
              )}
              {personalInfo.location && (
                <div className="flex items-center" style={{ color: colors.darkGray }}>
                  <MapPin className="w-4 h-4 mr-1" style={{ color: colors.iconGray }} />
                  {personalInfo.location}
                </div>
              )}
              {personalInfo.linkedin && (
                <a 
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:opacity-70 transition-opacity"
                  style={{ color: colors.darkGray }}
                >
                  <Linkedin className="w-4 h-4 mr-1" style={{ color: colors.iconGray }} />
                  LinkedIn
                </a>
              )}
              {personalInfo.website && (
                <a 
                  href={personalInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:opacity-70 transition-opacity"
                  style={{ color: colors.darkGray }}
                >
                  <Globe className="w-4 h-4 mr-1" style={{ color: colors.iconGray }} />
                  Website
                </a>
              )}
            </div>
          </div>
          
          {/* Optional Profile Photo */}
          {personalInfo.profilePicture && (
            <div className="ml-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
                <img
                  src={personalInfo.profilePicture}
                  alt={personalInfo.fullName || 'Profile Picture'}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Two Column Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column (65-70%) */}
        <div className="w-full md:w-[65%]">
          {/* Work Experience */}
          {workExperience.length > 0 && (
            <section className="mb-8">
              <h3 
                className="text-lg font-bold uppercase mb-2 tracking-wide"
                style={{ 
                  color: colors.black,
                  borderBottom: `3px solid ${colors.black}`,
                  paddingBottom: '4px'
                }}
              >
                Work Experience
              </h3>
              <div className="space-y-6">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="relative">
                    <h4 
                      className="text-lg font-bold mb-1"
                      style={{ color: colors.black }}
                    >
                      {exp.role}
                    </h4>
                    <p 
                      className="text-base font-semibold mb-2"
                      style={{ color: colors.coral }}
                    >
                      {exp.company}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm mb-3" style={{ color: colors.lightGray }}>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" style={{ color: colors.iconGray }} />
                        {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                      </div>
                      {exp.location && (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" style={{ color: colors.iconGray }} />
                          {exp.location}
                        </div>
                      )}
                    </div>
                    {exp.responsibilities.some(resp => resp.trim()) && (
                      <ul className="space-y-2 text-sm" style={{ color: colors.darkGray, lineHeight: '1.6' }}>
                        {exp.responsibilities
                          .filter(resp => resp.trim())
                          .map((resp, index) => (
                            <li key={index} className="flex items-start relative group">
                              <span className="w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: colors.coral }}></span>
                              <div className="flex-1">
                                {renderFormattedText(resp)}
                                {showFormattingTips && (
                                  <div className="absolute left-0 top-full mt-1 p-2 bg-gray-100 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                    Tip: Use **bold** for metrics and _italic_ for emphasis
                                  </div>
                                )}
                              </div>
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Professional Summary */}
          {profileSummary && (
            <section className="mb-8">
              <h3 
                className="text-lg font-bold uppercase mb-2 tracking-wide"
                style={{ 
                  color: colors.black,
                  borderBottom: `3px solid ${colors.black}`,
                  paddingBottom: '4px'
                }}
              >
                Professional Summary
              </h3>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: colors.darkGray, lineHeight: '1.6' }}
              >
                {renderFormattedText(profileSummary)}
              </p>
            </section>
          )}
        </div>

        {/* Right Column (30-35%) */}
        <div className="w-full md:w-[35%]">
          {/* Education */}
          {education.length > 0 && (
            <section className="mb-8">
              <h3 
                className="text-lg font-bold uppercase mb-2 tracking-wide"
                style={{ 
                  color: colors.black,
                  borderBottom: `3px solid ${colors.black}`,
                  paddingBottom: '4px'
                }}
              >
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h4 
                      className="text-base font-semibold mb-1"
                      style={{ color: colors.coral }}
                    >
                      {edu.school}
                    </h4>
                    <p className="text-sm font-medium mb-1" style={{ color: colors.black }}>
                      {edu.degree} in {edu.field}
                    </p>
                    <div className="text-sm" style={{ color: colors.lightGray }}>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" style={{ color: colors.iconGray }} />
                        {formatDateRange(edu.startDate, edu.endDate, false)}
                      </div>
                      {edu.gpa && (
                        <div className="mt-1">GPA: {edu.gpa}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section className="mb-8">
              <h3 
                className="text-lg font-bold uppercase mb-2 tracking-wide"
                style={{ 
                  color: colors.black,
                  borderBottom: `3px solid ${colors.black}`,
                  paddingBottom: '4px'
                }}
              >
                Skills
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-2" style={{ color: colors.black }}>Technical Skills</h4>
                  <ul className="text-sm space-y-1" style={{ color: colors.darkGray }}>
                    {skills
                      .filter(skill => skill.type === 'hard')
                      .map((skill, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: colors.coral }}></span>
                          {skill.name}
                        </li>
                      ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2" style={{ color: colors.black }}>Soft Skills</h4>
                  <ul className="text-sm space-y-1" style={{ color: colors.darkGray }}>
                    {skills
                      .filter(skill => skill.type === 'soft')
                      .map((skill, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: colors.coral }}></span>
                          {skill.name}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Licenses */}
          {visibleSections.licenses && certifications.length > 0 && (
            <section className="mb-8">
              <h3 
                className="text-lg font-bold uppercase mb-2 tracking-wide"
                style={{ 
                  color: colors.black,
                  borderBottom: `3px solid ${colors.black}`,
                  paddingBottom: '4px'
                }}
              >
                Licenses
              </h3>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <h4 
                      className="text-base font-semibold mb-1"
                      style={{ color: colors.coral }}
                    >
                      {cert.name}
                    </h4>
                    <p className="text-sm" style={{ color: colors.darkGray }}>
                      {cert.issuer}
                    </p>
                    <div className="text-sm" style={{ color: colors.lightGray }}>
                      {cert.date}{cert.expiryDate && ` - ${cert.expiryDate}`}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Activities */}
          {visibleSections.activities && (languages.length > 0 || hobbies.length > 0) && (
            <section className="mb-8">
              <h3 
                className="text-lg font-bold uppercase mb-2 tracking-wide"
                style={{ 
                  color: colors.black,
                  borderBottom: `3px solid ${colors.black}`,
                  paddingBottom: '4px'
                }}
              >
                Activities
              </h3>
              
              {/* Languages */}
              {languages.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2" style={{ color: colors.black }}>Languages</h4>
                  <ul className="text-sm space-y-1" style={{ color: colors.darkGray }}>
                    {languages.map((lang) => (
                      <li key={lang.id} className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: colors.coral }}></span>
                        {lang.name} - {lang.proficiency}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Hobbies/Interests */}
              {hobbies.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2" style={{ color: colors.black }}>Interests</h4>
                  <ul className="text-sm space-y-1" style={{ color: colors.darkGray }}>
                    {hobbies.map((hobby) => (
                      <li key={hobby.id} className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: colors.coral }}></span>
                        {hobby.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}
        </div>
      </div>

      {/* Responsive styles and font loading */}
      <style jsx global>{`
        /* System fonts fallback */
        .kaida-kim-template {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 15px;
          line-height: 1.6;
        }
        
        @media print {
          .no-print {
            display: none !important;
          }
          .kaida-kim-template {
            break-inside: avoid;
          }
        }
        
        @media (max-width: 768px) {
          .kaida-kim-template .flex {
            flex-direction: column !important;
          }
          .kaida-kim-template .w-full.md\\:w-\\[65\\%\\] {
            width: 100% !important;
          }
          .kaida-kim-template .w-full.md\\:w-\\[35\\%\\] {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}