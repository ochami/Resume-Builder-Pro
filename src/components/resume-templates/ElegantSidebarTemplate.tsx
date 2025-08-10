import { ResumeData } from '@/types/resume';

interface ElegantSidebarTemplateProps {
  data: ResumeData;
}

export default function ElegantSidebarTemplate({ data }: ElegantSidebarTemplateProps) {
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

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg print:shadow-none">
      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row min-h-[29.7cm]">
        {/* Left Sidebar - 35% width */}
        <div className="w-full md:w-[35%] bg-slate-800 text-white p-6 print:p-4">
          {/* Profile Picture */}
          {personalInfo.profilePicture && (
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={personalInfo.profilePicture}
                  alt={personalInfo.fullName || 'Profile Picture'}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Fallback initials if no profile picture */}
          {!personalInfo.profilePicture && personalInfo.fullName && (
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 rounded-full bg-slate-700 border-4 border-white shadow-lg flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {getInitials(personalInfo.fullName)}
                </span>
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 border-b-2 border-slate-600 pb-2">Contact</h3>
            <div className="space-y-2 text-sm">
              {personalInfo.email && (
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-slate-400 rounded-full mr-3"></span>
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-slate-400 rounded-full mr-3"></span>
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-slate-400 rounded-full mr-3"></span>
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-slate-400 rounded-full mr-3"></span>
                  <span className="text-slate-300">LinkedIn</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-slate-400 rounded-full mr-3"></span>
                  <span className="text-slate-300">Website</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {(hardSkills.length > 0 || softSkills.length > 0) && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 border-b-2 border-slate-600 pb-2">Skills</h3>
              
              {hardSkills.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2 text-slate-300">Technical Skills</h4>
                  <div className="space-y-2">
                    {hardSkills.map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between text-xs mb-1">
                          <span>{skill.name}</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-slate-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {softSkills.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-slate-300">Soft Skills</h4>
                  <div className="space-y-2">
                    {softSkills.map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between text-xs mb-1">
                          <span>{skill.name}</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-slate-400 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 border-b-2 border-slate-600 pb-2">Languages</h3>
              <div className="space-y-2">
                {languages.map((language) => (
                  <div key={language.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{language.name}</span>
                      <span className="text-slate-300 capitalize">{language.proficiency}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-slate-400 h-2 rounded-full"
                        style={{ 
                          width: language.proficiency === 'native' ? '100%' :
                                  language.proficiency === 'fluent' ? '90%' :
                                  language.proficiency === 'advanced' ? '80%' :
                                  language.proficiency === 'intermediate' ? '60%' :
                                  language.proficiency === 'beginner' ? '40%' : '50%'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - 65% width */}
        <div className="w-full md:w-[65%] p-6 print:p-4 bg-white">
          {/* Name and Job Title */}
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <h2 className="text-xl text-gray-600 font-medium">
              {personalInfo.jobTitle || 'Professional Title'}
            </h2>
          </div>

          {/* Profile Summary */}
          {profileSummary && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-slate-800 pb-2">Profile Summary</h3>
              <p className="text-gray-700 leading-relaxed text-justify">
                {profileSummary}
              </p>
            </div>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-slate-800 pb-2">Work Experience</h3>
              <div className="space-y-6">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="border-l-4 border-slate-800 pl-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{exp.role}</h4>
                        <p className="text-gray-700 font-medium">{exp.company}</p>
                        {exp.location && (
                          <p className="text-sm text-gray-600">{exp.location}</p>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mt-1 sm:mt-0">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </div>
                    </div>
                    {exp.responsibilities.some(resp => resp.trim()) && (
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {exp.responsibilities
                          .filter(resp => resp.trim())
                          .map((resp, index) => (
                            <li key={index} className="text-sm leading-relaxed">{resp}</li>
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
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-slate-800 pb-2">Education</h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="border-l-4 border-slate-800 pl-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{edu.degree} in {edu.field}</h4>
                        <p className="text-gray-700 font-medium">{edu.school}</p>
                        {edu.gpa && (
                          <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mt-1 sm:mt-0">
                        {edu.startDate} - {edu.endDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-slate-800 pb-2">Certifications</h3>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id} className="border-l-4 border-slate-800 pl-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{cert.name}</h4>
                        <p className="text-gray-700 font-medium">{cert.issuer}</p>
                      </div>
                      <div className="text-sm text-gray-600 mt-1 sm:mt-0">
                        {cert.date}
                        {cert.expiryDate && ` - ${cert.expiryDate}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies/Projects */}
          {hobbies.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-slate-800 pb-2">Interests & Projects</h3>
              <div className="flex flex-wrap gap-2">
                {hobbies.map((hobby) => (
                  <span
                    key={hobby.id}
                    className="px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-sm border border-slate-300"
                  >
                    {hobby.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}