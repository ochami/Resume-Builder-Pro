'use client';

import { useState } from 'react';
import { ResumeData } from '@/types/resume';
import { Briefcase, GraduationCap, Award, Mail, Phone, MapPin, Globe, Linkedin, ExternalLink, User } from 'lucide-react';

interface CreativeInfographicTemplateProps {
  data: ResumeData;
}

export default function CreativeInfographicTemplate({ data }: CreativeInfographicTemplateProps) {
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

  // Color schemes with improved contrast
  const accentColors = {
    primary: 'bg-purple-700',
    secondary: 'bg-teal-600',
    accent: 'bg-orange-600',
    light: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-300',
    textOnLight: 'text-gray-800',
    textOnDark: 'text-white'
  };

  // Projects section (using hobbies as projects for creative professionals)
  const projects = hobbies.filter(hobby => hobby.name.trim());

  if (atsView) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white p-8 font-montserrat text-black">
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

          {/* Summary */}
          {profileSummary && (
            <div>
              <h3 className="text-lg font-bold mb-2 uppercase border-b-2 border-black pb-1">Professional Summary</h3>
              <p className="text-sm leading-relaxed">{profileSummary}</p>
            </div>
          )}

          {/* Experience */}
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

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-3 uppercase border-b-2 border-black pb-1">Projects</h3>
              <p className="text-sm">{projects.map(project => project.name).join(', ')}</p>
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
    <div className="w-full max-w-4xl mx-auto bg-white font-poppins creative-infographic">
      {/* ATS Toggle Button */}
      <div className="no-print sticky top-4 z-10 flex justify-end mb-4 pr-4">
        <button
          onClick={() => setAtsView(!atsView)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            atsView 
              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
              : 'bg-purple-700 text-white hover:bg-purple-800'
          }`}
        >
          {atsView ? 'Visual View' : 'ATS View'}
        </button>
      </div>

      {/* Header Section */}
      <div className="relative bg-purple-700 text-white py-16 px-8 text-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-repeat" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                 backgroundSize: '60px 60px'
               }}>
          </div>
        </div>

        {/* Profile Picture */}
        <div className="relative z-10 mb-6">
          {personalInfo.profilePicture ? (
            <div className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-2xl overflow-hidden">
              <img
                src={personalInfo.profilePicture}
                alt={personalInfo.fullName || 'Profile Picture'}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-2xl bg-white bg-opacity-20 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">
                {personalInfo.fullName ? getInitials(personalInfo.fullName) : '?'}
              </span>
            </div>
          )}
        </div>

        {/* Name and Title */}
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <h2 className="text-xl md:text-2xl font-medium mb-4 opacity-90">
            {personalInfo.jobTitle || 'Creative Professional'}
          </h2>
          
          {/* Value Statement */}
          <p className="text-lg italic opacity-80 max-w-2xl mx-auto">
            "Driving brand growth through innovative design and creative solutions"
          </p>
        </div>
      </div>

      <div className="px-8 py-12">
        {/* Summary Section */}
        {profileSummary && (
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center mr-3">
                <User className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">About Me</h3>
            </div>
            <div className="ml-11 p-6 bg-purple-50 rounded-lg">
              <p className="text-gray-800 leading-relaxed text-justify font-medium">
                {profileSummary}
              </p>
            </div>
          </div>
        )}

        {/* Skills Section */}
        {(hardSkills.length > 0 || softSkills.length > 0) && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mr-3">
                <Award className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Skills & Expertise</h3>
            </div>
            
            <div className="ml-11 space-y-6">
              {hardSkills.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-800">Technical Skills</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {hardSkills.map((skill, index) => (
                      <div key={skill.id} className="timeline-item" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-800">{skill.name}</span>
                          <span className="text-xs text-gray-600 font-semibold">Expert</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="skill-bar bg-purple-700 h-3 rounded-full"
                            style={{ '--bar-width': `${Math.min(90 + (index * 5), 100)}%` } as React.CSSProperties}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {softSkills.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-800">Soft Skills</h4>
                  <div className="flex flex-wrap gap-3">
                    {softSkills.map((skill, index) => (
                      <span
                        key={skill.id}
                        className={`timeline-item px-4 py-2 bg-purple-50 text-gray-800 rounded-full text-sm font-semibold border border-purple-300`}
                        style={{ animationDelay: `${index * 0.1}s` }}
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

        {/* Experience Timeline */}
        {workExperience.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center mr-3">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Experience</h3>
            </div>
            
            <div className="ml-11">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-purple-700"></div>
                
                {workExperience.map((exp, index) => (
                  <div key={exp.id} className="relative timeline-item mb-8" style={{ animationDelay: `${index * 0.2}s` }}>
                    {/* Timeline Dot */}
                    <div className="absolute left-4 w-4 h-4 bg-purple-700 rounded-full border-4 border-white shadow-lg"></div>
                    
                    <div className="ml-12">
                      <div className="p-6 bg-purple-50 rounded-lg border-l-4 border-purple-700">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-1">{exp.role}</h4>
                            <p className="text-lg font-semibold text-gray-800">{exp.company}</p>
                            {exp.location && (
                              <p className="text-sm text-gray-700 flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {exp.location}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center mt-2 md:mt-0">
                            <div className="px-3 py-1 bg-purple-700 text-white rounded-full text-sm font-medium">
                              {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                            </div>
                          </div>
                        </div>
                        
                        {exp.responsibilities.some(resp => resp.trim()) && (
                          <ul className="space-y-2">
                            {exp.responsibilities
                              .filter(resp => resp.trim())
                              .map((resp, respIndex) => (
                                <li key={respIndex} className="flex items-start text-sm text-gray-800">
                                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                  <span className="font-medium">{resp}</span>
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center mr-3">
                <ExternalLink className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Featured Projects</h3>
            </div>
            
            <div className="ml-11 grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div key={project.id} className="timeline-item" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="p-6 bg-purple-50 rounded-lg border border-purple-300 hover:shadow-lg transition-shadow">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{project.name}</h4>
                    <p className="text-sm text-gray-700 font-medium">Creative project showcasing innovative design and execution.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Certifications */}
        {(education.length > 0 || certifications.length > 0) && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mr-3">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Education & Credentials</h3>
            </div>
            
            <div className="ml-11 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Education */}
              {education.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-800">Education</h4>
                  <div className="space-y-4">
                    {education.map((edu, index) => (
                      <div key={edu.id} className="timeline-item" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-300">
                          <h5 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h5>
                          <p className="text-sm text-gray-800 font-medium">{edu.school}</p>
                          {edu.gpa && (
                            <p className="text-xs text-gray-700 font-medium">GPA: {edu.gpa}</p>
                          )}
                          <p className="text-xs text-gray-600 mt-1">{edu.startDate} - {edu.endDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Certifications */}
              {certifications.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-800">Certifications</h4>
                  <div className="space-y-4">
                    {certifications.map((cert, index) => (
                      <div key={cert.id} className="timeline-item" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-300">
                          <h5 className="font-bold text-gray-900">{cert.name}</h5>
                          <p className="text-sm text-gray-800 font-medium">{cert.issuer}</p>
                          <p className="text-xs text-gray-700 font-medium mt-1">
                            {cert.date}
                            {cert.expiryDate && ` - ${cert.expiryDate}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center mr-3">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Languages</h3>
            </div>
            
            <div className="ml-11 flex flex-wrap gap-4">
              {languages.map((language, index) => (
                <div key={language.id} className="timeline-item" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="px-6 py-3 bg-purple-700 text-white rounded-full text-sm font-medium">
                    {language.name} ({language.proficiency})
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="p-8 bg-purple-700 text-white rounded-lg">
          <h3 className="text-2xl font-bold mb-6 text-center">Let's Connect</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {personalInfo.email && (
              <div className="flex items-center justify-center space-x-3">
                <Mail className="w-5 h-5" />
                <span className="text-sm">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center justify-center space-x-3">
                <Phone className="w-5 h-5" />
                <span className="text-sm">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="w-5 h-5" />
                <span className="text-sm">{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center justify-center space-x-3">
                <Linkedin className="w-5 h-5" />
                <span className="text-sm">LinkedIn</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center justify-center space-x-3">
                <Globe className="w-5 h-5" />
                <span className="text-sm">Website</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}