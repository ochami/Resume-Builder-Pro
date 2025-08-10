'use client';

import { useState } from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, ExternalLink, User, Briefcase, GraduationCap, Award, Languages, Palette, Code, Image } from 'lucide-react';

interface CreativeShowcaseInfographicTemplateProps {
  data: ResumeData;
}

export default function CreativeShowcaseInfographicTemplate({ data }: CreativeShowcaseInfographicTemplateProps) {
  const [atsView, setAtsView] = useState(false);
  const [colorTheme, setColorTheme] = useState<'teal' | 'orange' | 'purple'>('teal');
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
  const colorThemes = {
    teal: {
      primary: 'bg-teal-600',
      secondary: 'bg-teal-100',
      accent: 'bg-teal-500',
      text: 'text-teal-600',
      border: 'border-teal-200',
      light: 'bg-teal-50',
      chip: 'bg-teal-100 text-teal-800',
      icon: 'text-teal-600'
    },
    orange: {
      primary: 'bg-orange-600',
      secondary: 'bg-orange-100',
      accent: 'bg-orange-500',
      text: 'text-orange-600',
      border: 'border-orange-200',
      light: 'bg-orange-50',
      chip: 'bg-orange-100 text-orange-800',
      icon: 'text-orange-600'
    },
    purple: {
      primary: 'bg-purple-600',
      secondary: 'bg-purple-100',
      accent: 'bg-purple-500',
      text: 'text-purple-600',
      border: 'border-purple-200',
      light: 'bg-purple-50',
      chip: 'bg-purple-100 text-purple-800',
      icon: 'text-purple-600'
    }
  };

  const currentTheme = colorThemes[colorTheme];

  // Projects section (using hobbies as projects for creative professionals)
  const projects = hobbies.filter(hobby => hobby.name.trim());

  if (atsView) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white p-8 font-poppins text-black">
        {/* ATS Friendly Version */}
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">{personalInfo.fullName || 'Your Name'}</h1>
            <h2 className="text-lg font-semibold mb-2">{personalInfo.jobTitle || 'Creative Professional'}</h2>
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
                    <span className="text-sm text-gray-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
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

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-3 uppercase border-b-2 border-black pb-1">Projects</h3>
              {projects.map((project) => (
                <div key={project.id} className="mb-2">
                  <h4 className="font-bold text-sm">{project.name}</h4>
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
                    <span className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</span>
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
    <div className="w-full max-w-4xl mx-auto bg-white font-poppins creative-showcase-infographic">
      {/* ATS Toggle and Theme Selector */}
      <div className="no-print sticky top-4 z-10 flex justify-between items-center mb-4 px-4">
        <div className="flex gap-2">
          <button
            onClick={() => setColorTheme('teal')}
            className={`w-6 h-6 rounded-full bg-teal-600 border-2 ${
              colorTheme === 'teal' ? 'border-gray-800' : 'border-gray-300'
            }`}
            title="Teal Theme"
          />
          <button
            onClick={() => setColorTheme('orange')}
            className={`w-6 h-6 rounded-full bg-orange-600 border-2 ${
              colorTheme === 'orange' ? 'border-gray-800' : 'border-gray-300'
            }`}
            title="Orange Theme"
          />
          <button
            onClick={() => setColorTheme('purple')}
            className={`w-6 h-6 rounded-full bg-purple-600 border-2 ${
              colorTheme === 'purple' ? 'border-gray-800' : 'border-gray-300'
            }`}
            title="Purple Theme"
          />
        </div>
        <button
          onClick={() => setAtsView(!atsView)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            atsView 
              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
              : `${currentTheme.primary} text-white hover:opacity-90`
          }`}
        >
          {atsView ? 'Visual View' : 'ATS View'}
        </button>
      </div>

      {/* Top Section */}
      <div className="text-center mb-12 py-8">
        {/* Profile Picture */}
        <div className="mb-6">
          {personalInfo.profilePicture ? (
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={personalInfo.profilePicture}
                alt={personalInfo.fullName || 'Profile Picture'}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center">
              <span className="text-3xl font-bold text-gray-600">
                {personalInfo.fullName ? getInitials(personalInfo.fullName) : '?'}
              </span>
            </div>
          )}
        </div>

        {/* Name and Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-700">
          {personalInfo.jobTitle || 'Creative Professional'}
        </h2>
        
        {/* Personal Brand Statement */}
        <p className="text-lg italic text-gray-600 max-w-2xl mx-auto">
          Designing digital experiences that spark emotion
        </p>
      </div>

      {/* Body Layout - Two Sections Vertically Stacked */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 px-6 pb-12">
        {/* Left Block (40%) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Contact Information */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Mail className={`w-5 h-5 mr-2 ${currentTheme.icon}`} />
              Contact
            </h3>
            <div className="space-y-3">
              {personalInfo.email && (
                <div className="flex items-center text-sm text-gray-700">
                  <Mail className={`w-4 h-4 mr-3 ${currentTheme.icon}`} />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center text-sm text-gray-700">
                  <Phone className={`w-4 h-4 mr-3 ${currentTheme.icon}`} />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center text-sm text-gray-700">
                  <MapPin className={`w-4 h-4 mr-3 ${currentTheme.icon}`} />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center text-sm text-gray-700">
                  <Linkedin className={`w-4 h-4 mr-3 ${currentTheme.icon}`} />
                  <span>LinkedIn</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center text-sm text-gray-700">
                  <Globe className={`w-4 h-4 mr-3 ${currentTheme.icon}`} />
                  <span>Website</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {(hardSkills.length > 0 || softSkills.length > 0) && (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Palette className={`w-5 h-5 mr-2 ${currentTheme.icon}`} />
                Skills
              </h3>
              <div className="space-y-4">
                {hardSkills.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Technical Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {hardSkills.map((skill) => (
                        <span
                          key={skill.id}
                          className={`px-3 py-1 ${currentTheme.chip} rounded-full text-xs font-medium`}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {softSkills.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Soft Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {softSkills.map((skill) => (
                        <span
                          key={skill.id}
                          className={`px-3 py-1 ${currentTheme.secondary} text-gray-700 rounded-full text-xs font-medium`}
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

          {/* Tools & Software */}
          {hardSkills.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Code className={`w-5 h-5 mr-2 ${currentTheme.icon}`} />
                Tools & Software
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {hardSkills.slice(0, 8).map((skill) => (
                  <div key={skill.id} className="flex items-center text-sm text-gray-700">
                    <div className={`w-2 h-2 ${currentTheme.accent} rounded-full mr-2`}></div>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Languages className={`w-5 h-5 mr-2 ${currentTheme.icon}`} />
                Languages
              </h3>
              <div className="space-y-2">
                {languages.map((language) => (
                  <div key={language.id} className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">{language.name}</span>
                    <span className={`text-xs px-2 py-1 rounded ${currentTheme.chip}`}>
                      {language.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Block (60%) */}
        <div className="lg:col-span-3 space-y-8">
          {/* Summary Paragraph */}
          {profileSummary && (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <User className={`w-5 h-5 mr-2 ${currentTheme.icon}`} />
                About Me
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify">
                {profileSummary}
              </p>
            </div>
          )}

          {/* Timeline-style Work Experience */}
          {workExperience.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-6 flex items-center">
                <Briefcase className={`w-5 h-5 mr-2 ${currentTheme.icon}`} />
                Experience
              </h3>
              <div className="relative">
                {/* Timeline Line */}
                <div className={`absolute left-4 top-0 bottom-0 w-0.5 ${currentTheme.border}`}></div>
                
                {workExperience.map((exp, index) => (
                  <div key={exp.id} className="relative mb-8 last:mb-0">
                    {/* Timeline Dot */}
                    <div className={`absolute left-3 w-3 h-3 ${currentTheme.accent} rounded-full border-2 border-white shadow-sm`}></div>
                    
                    <div className="ml-10">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{exp.role}</h4>
                          <p className="text-md font-medium text-gray-700">{exp.company}</p>
                          {exp.location && (
                            <p className="text-sm text-gray-600 flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {exp.location}
                            </p>
                          )}
                        </div>
                        <div className="mt-1 sm:mt-0">
                          <span className={`text-sm text-white px-3 py-1 rounded ${currentTheme.accent}`}>
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </span>
                        </div>
                      </div>
                      
                      {exp.responsibilities.some(resp => resp.trim()) && (
                        <ul className="space-y-1 mt-3">
                          {exp.responsibilities
                            .filter(resp => resp.trim())
                            .map((resp, respIndex) => (
                              <li key={respIndex} className="flex items-start text-sm text-gray-700">
                                <div className={`w-1.5 h-1.5 ${currentTheme.primary} rounded-full mt-2 mr-3 flex-shrink-0`}></div>
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

          {/* Key Projects */}
          {projects.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-6 flex items-center">
                <Image className={`w-5 h-5 mr-2 ${currentTheme.icon}`} alt="" />
                Key Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project, index) => (
                  <div key={project.id} className={`p-4 ${currentTheme.light} rounded-lg border ${currentTheme.border}`}>
                    <h4 className="font-semibold text-gray-900 mb-2">{project.name}</h4>
                    <p className="text-xs text-gray-600 mb-2">Tools: Creative Suite, Figma</p>
                    <p className="text-sm text-gray-700">Enhanced user engagement through innovative design solutions</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <GraduationCap className={`w-5 h-5 mr-2 ${currentTheme.icon}`} />
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start">
                    <div>
                      <h4 className="text-md font-semibold text-gray-900">{edu.degree} in {edu.field}</h4>
                      <p className="text-sm text-gray-700">{edu.school}</p>
                      {edu.gpa && (
                        <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications or Awards */}
          {certifications.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Award className={`w-5 h-5 mr-2 ${currentTheme.icon}`} />
                Certifications
              </h3>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">{cert.name}</h4>
                      <p className="text-xs text-gray-600">{cert.issuer}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500">{cert.date}{cert.expiryDate && ` - ${cert.expiryDate}`}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}