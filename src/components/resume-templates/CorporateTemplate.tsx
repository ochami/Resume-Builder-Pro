import { ResumeData } from '@/types/resume';
import { Badge } from '@/components/ui/badge';

interface CorporateTemplateProps {
  data: ResumeData;
}

export default function CorporateTemplate({ data }: CorporateTemplateProps) {
  return (
    <div className="bg-white min-h-[842px] p-8">
      {/* Corporate Template - Two Column Layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="col-span-1 space-y-6">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 border-b-2 border-gray-900 pb-1">
              CONTACT
            </h3>
            <div className="space-y-2 text-sm">
              {data.personalInfo.email && (
                <div>{data.personalInfo.email}</div>
              )}
              {data.personalInfo.phone && (
                <div>{data.personalInfo.phone}</div>
              )}
              {data.personalInfo.location && (
                <div>{data.personalInfo.location}</div>
              )}
              {data.personalInfo.linkedin && (
                <div>{data.personalInfo.linkedin}</div>
              )}
              {data.personalInfo.website && (
                <div>{data.personalInfo.website}</div>
              )}
            </div>
          </div>

          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 border-b-2 border-gray-900 pb-1">
                SKILLS
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-sm mb-1">Hard Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {data.skills
                      .filter(skill => skill.type === 'hard')
                      .map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill.name}
                        </Badge>
                      ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Soft Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {data.skills
                      .filter(skill => skill.type === 'soft')
                      .map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill.name}
                        </Badge>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 border-b-2 border-gray-900 pb-1">
                LANGUAGES
              </h3>
              <div className="space-y-1 text-sm">
                {data.languages.map((lang, index) => (
                  <div key={index}>
                    <span className="font-medium">{lang.name}</span> - {lang.proficiency}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 border-b-2 border-gray-900 pb-1">
                CERTIFICATIONS
              </h3>
              <div className="space-y-2 text-sm">
                {data.certifications.map((cert, index) => (
                  <div key={index}>
                    <div className="font-medium">{cert.name}</div>
                    <div className="text-gray-600">{cert.issuer}</div>
                    <div className="text-gray-500">{cert.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-6">
          {/* Header */}
          <div className="text-center border-b-2 border-gray-900 pb-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
            <h2 className="text-lg text-gray-700">
              {data.personalInfo.jobTitle || 'Job Title'}
            </h2>
          </div>

          {/* Profile Summary */}
          {data.profileSummary && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 border-b-2 border-gray-900 pb-1">
                PROFILE
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {data.profileSummary}
              </p>
            </div>
          )}

          {/* Work Experience */}
          {data.workExperience.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 border-b-2 border-gray-900 pb-1">
                EXPERIENCE
              </h3>
              <div className="space-y-4">
                {data.workExperience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h4 className="font-bold text-gray-900">{exp.role}</h4>
                        <p className="text-sm font-medium text-gray-700">{exp.company}</p>
                        <p className="text-sm text-gray-600">{exp.location}</p>
                      </div>
                      <div className="text-sm text-gray-600 text-right">
                        <p>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                      </div>
                    </div>
                    {exp.responsibilities.some(resp => resp.trim()) && (
                      <ul className="text-sm text-gray-700 space-y-1 ml-4">
                        {exp.responsibilities
                          .filter(resp => resp.trim())
                          .map((resp, respIndex) => (
                            <li key={respIndex} className="list-disc">
                              {resp}
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
          {data.education.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 border-b-2 border-gray-900 pb-1">
                EDUCATION
              </h3>
              <div className="space-y-3">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h4>
                        <p className="text-sm font-medium text-gray-700">{edu.school}</p>
                        {edu.gpa && (
                          <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>{edu.startDate} - {edu.endDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies */}
          {data.hobbies.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 border-b-2 border-gray-900 pb-1">
                INTERESTS
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.hobbies.map((hobby, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {hobby.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}