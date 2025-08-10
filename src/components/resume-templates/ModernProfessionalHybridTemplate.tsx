'use client';

import { useState } from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, ExternalLink, User, Briefcase, GraduationCap, Award, Languages } from 'lucide-react';

interface ModernProfessionalHybridTemplateProps {
  data: ResumeData;
}

export default function ModernProfessionalHybridTemplate({ data }: ModernProfessionalHybridTemplateProps) {
  const [atsView, setAtsView] = useState(false);
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

  // Group skills by category (for better organization)
  const skillCategories = {
    'Technical Skills': hardSkills,
    'Soft Skills': softSkills,
    'Languages': languages.map(lang => ({ ...lang, id: lang.id + '_lang', name: lang.name }))
  };

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
    <div className="w-full max-w-4xl mx-auto bg-white font-inter modern-professional-hybrid">
      {/* ATS Toggle Button */}
      <div className="no-print sticky top-4 z-10 flex justify-end mb-4 pr-4">
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
        {/* Left Column (30-35% width) */}
        <div className="w-full md:w-1/3 bg-[#f7f9fc] p-6 order-2 md:order-1">
          {/* Profile Picture */}
          {personalInfo.profilePicture && (
            <div className="mb-6 text-center">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-gray-200">
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
            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-300">Contact</h3>
            <div className="space-y-3">
              {personalInfo.email && (
                <div className="flex items-center text-sm text-gray-700">
                  <Mail className="w-4 h-4 mr-3 text-blue-600" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center text-sm text-gray-700">
                  <Phone className="w-4 h-4 mr-3 text-blue-600" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center text-sm text-gray-700">
                  <MapPin className="w-4 h-4 mr-3 text-blue-600" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center text-sm text-gray-700">
                  <Linkedin className="w-4 h-4 mr-3 text-blue-600" />
                  <span>LinkedIn</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center text-sm text-gray-700">
                  <Globe className="w-4 h-4 mr-3 text-blue-600" />
                  <span>Website</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {(hardSkills.length > 0 || softSkills.length > 0) && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-300">Skills</h3>
              <div className="space-y-4">
                {hardSkills.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Technical Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {hardSkills.map((skill) => (
                        <span
                          key={skill.id}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {softSkills.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Soft Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {softSkills.map((skill) => (
                        <span
                          key={skill.id}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium"
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

          {/* Languages */}
          {languages.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-300">Languages</h3>
              <div className="space-y-2">
                {languages.map((language) => (
                  <div key={language.id} className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">{language.name}</span>
                    <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                      {language.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-300">Certifications</h3>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-sm">
                    <h4 className="font-medium text-gray-800">{cert.name}</h4>
                    <p className="text-gray-600">{cert.issuer}</p>
                    <p className="text-gray-500 text-xs">{cert.date}{cert.expiryDate && ` - ${cert.expiryDate}`}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (65-70% width) */}
        <div className="w-full md:w-2/3 bg-white p-8 order-1 md:order-2">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
              {personalInfo.jobTitle || 'Professional Title'}
            </h2>
            
            {/* Personal Headline */}
            <p className="text-lg text-gray-600 italic mb-4">
              Driving operations excellence across banking ecosystems
            </p>
          </div>

          {/* Professional Summary */}
          {profileSummary && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Professional Summary
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify">
                {profileSummary}
              </p>
            </div>
          )}

          {/* Summary of Qualifications */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <Award className="w-5 h-5 mr-2 text-blue-600" />
              Summary of Qualifications
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start text-sm text-gray-700">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Proven track record of delivering operational excellence and process optimization</span>
              </li>
              <li className="flex items-start text-sm text-gray-700">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Expertise in financial systems analysis and cross-functional team leadership</span>
              </li>
              <li className="flex items-start text-sm text-gray-700">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Strong analytical skills with ability to translate complex data into actionable insights</span>
              </li>
              <li className="flex items-start text-sm text-gray-700">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Excellent communication and stakeholder management capabilities</span>
              </li>
            </ul>
          </div>

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                Work Experience
              </h3>
              <div className="space-y-6">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-blue-200 pl-4">
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
                        <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                    </div>
                    
                    {exp.responsibilities.some(resp => resp.trim()) && (
                      <ul className="space-y-1 mt-3">
                        {exp.responsibilities
                          .filter(resp => resp.trim())
                          .map((resp, index) => (
                            <li key={index} className="flex items-start text-sm text-gray-700">
                              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span>{resp}</span>
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
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
        </div>
      </div>
    </div>
  );
}