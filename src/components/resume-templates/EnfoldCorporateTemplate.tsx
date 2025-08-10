'use client';

import { useState } from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, User, Briefcase, GraduationCap, Award, Languages, ExternalLink } from 'lucide-react';

interface EnfoldCorporateTemplateProps {
  data: ResumeData;
}

export default function EnfoldCorporateTemplate({ data }: EnfoldCorporateTemplateProps) {
  const [atsView, setAtsView] = useState(false);
  const [colorTheme, setColorTheme] = useState<'navy-gray' | 'dark-green-cream'>('navy-gray');
  const { personalInfo, profileSummary, workExperience, education, skills, certifications, languages, hobbies } = data;

  // Get initials for fallback when no profile picture
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  };

  // Group skills by type
  const hardSkills = skills.filter(skill => skill.type === 'hard');
  const softSkills = skills.filter(skill => skill.type === 'soft');

  // Color themes
  const themes = {
    'navy-gray': {
      sidebar: '#f4f6f8',
      primary: '#1e3a8a',
      secondary: '#64748b',
      accent: '#3b82f6',
      text: '#1f2937',
      lightText: '#6b7280'
    },
    'dark-green-cream': {
      sidebar: '#faf8f3',
      primary: '#14532d',
      secondary: '#64748b',
      accent: '#16a34a',
      text: '#1f2937',
      lightText: '#6b7280'
    }
  };

  const currentTheme = themes[colorTheme];

  // Format date range for display
  const formatDateRange = (startDate: string, endDate: string, current: boolean) => {
    if (current) return `${startDate} - Present`;
    return `${startDate} - ${endDate}`;
  };

  // Extract years for timeline
  const workYears = workExperience.map(exp => {
    const startYear = exp.startDate.split('-')[0];
    const endYear = exp.current ? 'Present' : exp.endDate.split('-')[0];
    return { id: exp.id, years: `${startYear}${endYear !== 'Present' ? `-${endYear}` : ''}`, type: 'work' };
  });

  const educationYears = education.map(edu => {
    const startYear = edu.startDate.split('-')[0];
    const endYear = edu.endDate.split('-')[0];
    return { id: edu.id, years: `${startYear}-${endYear}`, type: 'education' };
  });

  const allYears = [...workYears, ...educationYears].sort((a, b) => {
    const aYear = parseInt(a.years.split('-')[0]);
    const bYear = parseInt(b.years.split('-')[0]);
    return bYear - aYear; // Sort by most recent first
  });

  if (atsView) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white p-8 font-inter text-black">
        {/* ATS Friendly Version */}
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">{personalInfo.fullName || 'Your Name'}</h1>
            <h2 className="text-lg font-semibold mb-2">{personalInfo.jobTitle || 'Professional Title'}</h2>
            <div className="text-sm text-gray-600 space-y-1">
              {personalInfo.email && <p>Email: {personalInfo.email}</p>}
              {personalInfo.phone && <p>Phone: {personalInfo.phone}</p>}
              {personalInfo.location && <p>Location: {personalInfo.location}</p>}
              {personalInfo.linkedin && <p>LinkedIn: {personalInfo.linkedin}</p>}
              {personalInfo.website && <p>Website: {personalInfo.website}</p>}
            </div>
          </div>

          {/* Professional Summary */}
          {profileSummary && (
            <div>
              <h3 className="text-lg font-bold mb-2 uppercase border-b-2 border-black pb-1">Professional Summary</h3>
              <p className="text-sm leading-relaxed">{profileSummary}</p>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-3 uppercase border-b-2 border-black pb-1">Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                {hardSkills.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Technical Skills</h4>
                    <p className="text-sm">{hardSkills.map(skill => skill.name).join(', ')}</p>
                  </div>
                )}
                {softSkills.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Soft Skills</h4>
                    <p className="text-sm">{softSkills.map(skill => skill.name).join(', ')}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-3 uppercase border-b-2 border-black pb-1">Work Experience</h3>
              {workExperience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold">{exp.role}</h4>
                    <span className="text-sm text-gray-600">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                  </div>
                  <p className="font-semibold text-sm mb-1">{exp.company}{exp.location && `, ${exp.location}`}</p>
                  {exp.responsibilities.some(resp => resp.trim()) && (
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {exp.responsibilities
                        .filter(resp => resp.trim())
                        .map((resp, index) => (
                          <li key={index}>{resp}</li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-3 uppercase border-b-2 border-black pb-1">Education</h3>
              {education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold">{edu.degree} in {edu.field}</h4>
                    <span className="text-sm text-gray-600">{formatDateRange(edu.startDate, edu.endDate, false)}</span>
                  </div>
                  <p className="text-sm">{edu.school}{edu.gpa && `, GPA: ${edu.gpa}`}</p>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-3 uppercase border-b-2 border-black pb-1">Certifications</h3>
              {certifications.map((cert) => (
                <div key={cert.id} className="mb-2">
                  <h4 className="font-bold text-sm">{cert.name}</h4>
                  <p className="text-sm">{cert.issuer}, {cert.date}{cert.expiryDate && ` - ${cert.expiryDate}`}</p>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-3 uppercase border-b-2 border-black pb-1">Languages</h3>
              <p className="text-sm">{languages.map(lang => `${lang.name} (${lang.proficiency})`).join(', ')}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white font-inter enfold-corporate">
      {/* ATS Toggle and Theme Selector */}
      <div className="no-print sticky top-4 z-10 flex justify-between items-center mb-4 px-4">
        <div className="flex gap-2">
          <button
            onClick={() => setColorTheme('navy-gray')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              colorTheme === 'navy-gray' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Navy/Gray
          </button>
          <button
            onClick={() => setColorTheme('dark-green-cream')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              colorTheme === 'dark-green-cream' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Green/Cream
          </button>
        </div>
        <button
          onClick={() => setAtsView(!atsView)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            atsView 
              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {atsView ? 'Visual View' : 'ATS View'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left Column (35% width - sidebar) */}
        <div 
          className="w-full md:w-[35%] p-6 order-2 md:order-1"
          style={{ backgroundColor: currentTheme.sidebar }}
        >
          {/* Profile Picture */}
          {personalInfo.profilePicture && (
            <div className="mb-6 text-center">
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-gray-200">
                <img
                  src={personalInfo.profilePicture}
                  alt={personalInfo.fullName || 'Profile Picture'}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="mb-8">
            <h3 
              className="text-lg font-semibold mb-4 pb-2 border-b"
              style={{ color: currentTheme.primary, borderColor: currentTheme.primary }}
            >
              Contact
            </h3>
            <div className="space-y-3">
              {personalInfo.email && (
                <div className="flex items-center text-sm" style={{ color: currentTheme.text }}>
                  <Mail className="w-4 h-4 mr-3" style={{ color: currentTheme.accent }} />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center text-sm" style={{ color: currentTheme.text }}>
                  <Phone className="w-4 h-4 mr-3" style={{ color: currentTheme.accent }} />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center text-sm" style={{ color: currentTheme.text }}>
                  <MapPin className="w-4 h-4 mr-3" style={{ color: currentTheme.accent }} />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center text-sm" style={{ color: currentTheme.text }}>
                  <Linkedin className="w-4 h-4 mr-3" style={{ color: currentTheme.accent }} />
                  <span>LinkedIn</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center text-sm" style={{ color: currentTheme.text }}>
                  <Globe className="w-4 h-4 mr-3" style={{ color: currentTheme.accent }} />
                  <span>Website</span>
                </div>
              )}
            </div>
          </div>

          {/* Timeline - Work & Education Dates */}
          {(workExperience.length > 0 || education.length > 0) && (
            <div className="mb-8">
              <h3 
                className="text-lg font-semibold mb-4 pb-2 border-b"
                style={{ color: currentTheme.primary, borderColor: currentTheme.primary }}
              >
                Timeline
              </h3>
              <div className="space-y-3">
                {allYears.map((item) => {
                  const workExp = workExperience.find(exp => exp.id === item.id);
                  const eduExp = education.find(edu => edu.id === item.id);
                  
                  return (
                    <div key={item.id} className="text-sm">
                      <div 
                        className="font-medium tracking-wide text-xs uppercase"
                        style={{ color: currentTheme.lightText }}
                      >
                        {item.years}
                      </div>
                      <div className="text-xs" style={{ color: currentTheme.text }}>
                        {workExp ? workExp.role : eduExp ? `${eduExp.degree}` : ''}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Skills */}
          {(hardSkills.length > 0 || softSkills.length > 0) && (
            <div className="mb-8">
              <h3 
                className="text-lg font-semibold mb-4 pb-2 border-b"
                style={{ color: currentTheme.primary, borderColor: currentTheme.primary }}
              >
                Skills
              </h3>
              <div className="space-y-4">
                {hardSkills.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2" style={{ color: currentTheme.text }}>Technical Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {hardSkills.map((skill) => (
                        <span
                          key={skill.id}
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: currentTheme.accent + '20',
                            color: currentTheme.accent
                          }}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {softSkills.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2" style={{ color: currentTheme.text }}>Soft Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {softSkills.map((skill) => (
                        <span
                          key={skill.id}
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: currentTheme.secondary + '20',
                            color: currentTheme.secondary
                          }}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="mb-8">
              <h3 
                className="text-lg font-semibold mb-4 pb-2 border-b"
                style={{ color: currentTheme.primary, borderColor: currentTheme.primary }}
              >
                Certifications
              </h3>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-sm">
                    <h4 className="font-medium mb-1" style={{ color: currentTheme.text }}>{cert.name}</h4>
                    <p style={{ color: currentTheme.lightText }}>{cert.issuer}</p>
                    <p className="text-xs" style={{ color: currentTheme.lightText }}>
                      {cert.date}{cert.expiryDate && ` - ${cert.expiryDate}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="mb-8">
              <h3 
                className="text-lg font-semibold mb-4 pb-2 border-b"
                style={{ color: currentTheme.primary, borderColor: currentTheme.primary }}
              >
                Languages
              </h3>
              <div className="space-y-2">
                {languages.map((language) => (
                  <div key={language.id} className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: currentTheme.text }}>{language.name}</span>
                    <span 
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        backgroundColor: currentTheme.accent + '20',
                        color: currentTheme.accent
                      }}
                    >
                      {language.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (65% width - main content) */}
        <div className="w-full md:w-[65%] bg-white p-8 order-1 md:order-2">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 
              className="text-3xl font-bold mb-2"
              style={{ color: currentTheme.primary }}
            >
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <h2 
              className="text-xl font-semibold mb-3"
              style={{ color: currentTheme.secondary }}
            >
              {personalInfo.jobTitle || 'Professional Title'}
            </h2>
            
            {/* Brand Headline */}
            <p 
              className="text-lg italic mb-4"
              style={{ color: currentTheme.lightText }}
            >
              {personalInfo.jobTitle ? 
                `Driving excellence in ${personalInfo.jobTitle.toLowerCase()}` : 
                'Driving professional excellence across industries'
              }
            </p>
          </div>

          {/* Professional Summary */}
          {profileSummary && (
            <div className="mb-8">
              <h3 
                className="text-lg font-semibold mb-3 flex items-center"
                style={{ color: currentTheme.primary }}
              >
                <User className="w-5 h-5 mr-2" style={{ color: currentTheme.accent }} />
                Professional Summary
              </h3>
              <p 
                className="leading-relaxed text-justify"
                style={{ color: currentTheme.text }}
              >
                {profileSummary}
              </p>
            </div>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div className="mb-8">
              <h3 
                className="text-lg font-semibold mb-4 flex items-center"
                style={{ color: currentTheme.primary }}
              >
                <Briefcase className="w-5 h-5 mr-2" style={{ color: currentTheme.accent }} />
                Work Experience
              </h3>
              <div className="space-y-6">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="relative">
                    {/* Subtle connector line */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-0.5"
                      style={{ backgroundColor: currentTheme.accent + '30' }}
                    ></div>
                    <div className="pl-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div>
                          <h4 
                            className="text-lg font-semibold"
                            style={{ color: currentTheme.primary }}
                          >
                            {exp.role}
                          </h4>
                          <p 
                            className="text-md font-medium mb-1"
                            style={{ color: currentTheme.secondary }}
                          >
                            {exp.company}
                          </p>
                          {exp.location && (
                            <p 
                              className="text-sm flex items-center"
                              style={{ color: currentTheme.lightText }}
                            >
                              <MapPin className="w-4 h-4 mr-1" />
                              {exp.location}
                            </p>
                          )}
                        </div>
                        <div 
                          className="text-sm font-medium tracking-wide text-xs uppercase mt-1 sm:mt-0"
                          style={{ color: currentTheme.lightText }}
                        >
                          {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                        </div>
                      </div>
                      {exp.responsibilities.some(resp => resp.trim()) && (
                        <ul className="space-y-2">
                          {exp.responsibilities
                            .filter(resp => resp.trim())
                            .map((resp, index) => (
                              <li 
                                key={index} 
                                className="flex items-start text-sm"
                                style={{ color: currentTheme.text }}
                              >
                                <span 
                                  className="w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0"
                                  style={{ backgroundColor: currentTheme.accent }}
                                ></span>
                                <span>{resp}</span>
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-8">
              <h3 
                className="text-lg font-semibold mb-4 flex items-center"
                style={{ color: currentTheme.primary }}
              >
                <GraduationCap className="w-5 h-5 mr-2" style={{ color: currentTheme.accent }} />
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="relative">
                    {/* Subtle connector line */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-0.5"
                      style={{ backgroundColor: currentTheme.accent + '30' }}
                    ></div>
                    <div className="pl-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div>
                          <h4 
                            className="text-lg font-semibold"
                            style={{ color: currentTheme.primary }}
                          >
                            {edu.degree} in {edu.field}
                          </h4>
                          <p 
                            className="text-md font-medium mb-1"
                            style={{ color: currentTheme.secondary }}
                          >
                            {edu.school}
                          </p>
                          {edu.gpa && (
                            <p 
                              className="text-sm"
                              style={{ color: currentTheme.lightText }}
                            >
                              GPA: {edu.gpa}
                            </p>
                          )}
                        </div>
                        <div 
                          className="text-sm font-medium tracking-wide text-xs uppercase mt-1 sm:mt-0"
                          style={{ color: currentTheme.lightText }}
                        >
                          {formatDateRange(edu.startDate, edu.endDate, false)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects or Awards */}
          {hobbies.length > 0 && (
            <div className="mb-8">
              <h3 
                className="text-lg font-semibold mb-4 flex items-center"
                style={{ color: currentTheme.primary }}
              >
                <Award className="w-5 h-5 mr-2" style={{ color: currentTheme.accent }} />
                Projects & Awards
              </h3>
              <div className="flex flex-wrap gap-2">
                {hobbies.map((hobby) => (
                  <span
                    key={hobby.id}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: currentTheme.accent + '20',
                      color: currentTheme.accent
                    }}
                  >
                    {hobby.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Responsive styles */}
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .enfold-corporate {
            break-inside: avoid;
          }
        }
        
        @media (max-width: 768px) {
          .enfold-corporate .flex {
            flex-direction: column !important;
          }
          .enfold-corporate .w-full.md\\:w-\\[35\\%\\] {
            width: 100% !important;
          }
          .enfold-corporate .w-full.md\\:w-\\[65\\%\\] {
            width: 100% !important;
          }
          .enfold-corporate .order-2 {
            order: 2 !important;
          }
          .enfold-corporate .order-1 {
            order: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}