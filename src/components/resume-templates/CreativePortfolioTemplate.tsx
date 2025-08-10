import { ResumeData } from '@/types/resume';
import { Badge } from '@/components/ui/badge';

interface CreativePortfolioTemplateProps {
  data: ResumeData;
}

export default function CreativePortfolioTemplate({ data }: CreativePortfolioTemplateProps) {
  return (
    <div className="bg-white min-h-[842px] p-8">
      {/* Creative Portfolio Template - Circular Profile Picture Centered */}
      <div className="space-y-8">
        {/* Header Section with Centered Profile Picture */}
        <div className="text-center mb-8">
          {/* Circular Profile Picture */}
          {data.personalInfo.profilePicture && (
            <div className="mb-6">
              <img
                src={data.personalInfo.profilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg mx-auto"
              />
            </div>
          )}
          
          {/* Name and Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {data.personalInfo.fullName || 'Your Name'}
          </h1>
          <h2 className="text-xl text-gray-700 mb-4">
            {data.personalInfo.jobTitle || 'Job Title'}
          </h2>
          
          {/* Contact Information */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-6">
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

        {/* Profile Summary */}
        {data.profileSummary && (
          <div className="text-center mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              ABOUT ME
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed max-w-2xl mx-auto">
              {data.profileSummary}
            </p>
          </div>
        )}

        {/* Skills Section */}
        {data.skills.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
              SKILLS & EXPERTISE
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center">
                <h4 className="font-semibold text-sm mb-2 text-gray-700">Technical</h4>
                <div className="flex flex-wrap gap-1 justify-center">
                  {data.skills
                    .filter(skill => skill.type === 'hard')
                    .map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill.name}
                      </Badge>
                    ))}
                </div>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-sm mb-2 text-gray-700">Creative</h4>
                <div className="flex flex-wrap gap-1 justify-center">
                  {data.skills
                    .filter(skill => skill.type === 'soft')
                    .map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill.name}
                      </Badge>
                    ))}
                </div>
              </div>
              <div className="text-center col-span-2 md:col-span-1">
                <h4 className="font-semibold text-sm mb-2 text-gray-700">Languages</h4>
                <div className="flex flex-wrap gap-1 justify-center">
                  {data.languages.map((lang, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {lang.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Work Experience */}
        {data.workExperience.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
              EXPERIENCE
            </h3>
            <div className="space-y-6">
              {data.workExperience.map((exp, index) => (
                <div key={index} className="border-l-4 border-gray-300 pl-4">
                  <div className="mb-2">
                    <h4 className="font-bold text-gray-900">{exp.role}</h4>
                    <p className="text-sm font-medium text-gray-700">{exp.company}</p>
                    <p className="text-sm text-gray-600">{exp.location}</p>
                    <p className="text-sm text-gray-500 italic">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
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

        {/* Two Column Section for Education and Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                EDUCATION
              </h3>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index} className="text-center">
                    <h4 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h4>
                    <p className="text-sm font-medium text-gray-700">{edu.school}</p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                    )}
                    <p className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications and Hobbies */}
          <div className="space-y-6">
            {/* Certifications */}
            {data.certifications.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                  CERTIFICATIONS
                </h3>
                <div className="space-y-3">
                  {data.certifications.map((cert, index) => (
                    <div key={index} className="text-center">
                      <div className="font-medium text-gray-900">{cert.name}</div>
                      <div className="text-sm text-gray-600">{cert.issuer}</div>
                      <div className="text-sm text-gray-500">{cert.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hobbies */}
            {data.hobbies.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                  INTERESTS
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
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
    </div>
  );
}