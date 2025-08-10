import { ResumeData } from '@/types/resume';
import { Badge } from '@/components/ui/badge';

interface ModernTechTemplateProps {
  data: ResumeData;
}

export default function ModernTechTemplate({ data }: ModernTechTemplateProps) {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-[842px] p-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <h2 className="text-xl text-blue-600 font-semibold mb-4">
          {data.personalInfo.jobTitle || 'Job Title'}
        </h2>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {data.personalInfo.email && <span>📧 {data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>📱 {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>📍 {data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span>💼 {data.personalInfo.linkedin}</span>}
          {data.personalInfo.website && <span>🌐 {data.personalInfo.website}</span>}
        </div>
      </div>

      {/* Profile Summary */}
      {data.profileSummary && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-4 border-blue-500">
            ABOUT ME
          </h3>
          <p className="text-gray-700 leading-relaxed">{data.profileSummary}</p>
        </div>
      )}

      {/* Skills Section */}
      {data.skills.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-4 border-blue-500">
            TECHNICAL SKILLS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.skills.filter(skill => skill.type === 'hard').length > 0 && (
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">Hard Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {data.skills
                    .filter(skill => skill.type === 'hard')
                    .map((skill, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        {skill.name}
                      </Badge>
                    ))}
                </div>
              </div>
            )}
            {data.skills.filter(skill => skill.type === 'soft').length > 0 && (
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">Soft Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {data.skills
                    .filter(skill => skill.type === 'soft')
                    .map((skill, index) => (
                      <Badge key={index} variant="outline" className="border-blue-300 text-blue-700">
                        {skill.name}
                      </Badge>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Work Experience */}
      {data.workExperience.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-4 border-blue-500">
            EXPERIENCE
          </h3>
          <div className="space-y-6">
            {data.workExperience.map((exp, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{exp.role}</h4>
                    <p className="text-lg font-semibold text-blue-600">{exp.company}</p>
                    <p className="text-gray-600">{exp.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700 bg-blue-50 px-3 py-1 rounded">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                  </div>
                </div>
                {exp.responsibilities.some(resp => resp.trim()) && (
                  <ul className="mt-3 space-y-1">
                    {exp.responsibilities
                      .filter(resp => resp.trim())
                      .map((resp, respIndex) => (
                        <li key={respIndex} className="text-gray-700 flex items-start">
                          <span className="text-blue-500 mr-2 mt-1">▶</span>
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
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-4 border-blue-500">
            EDUCATION
          </h3>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{edu.degree} in {edu.field}</h4>
                    <p className="text-blue-600 font-semibold">{edu.school}</p>
                    {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700 bg-blue-50 px-3 py-1 rounded">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 pb-1 border-b-2 border-blue-500">
              CERTIFICATIONS
            </h3>
            <div className="space-y-2">
              {data.certifications.map((cert, index) => (
                <div key={index} className="bg-white rounded p-3 shadow-sm">
                  <h4 className="font-semibold text-gray-900 text-sm">{cert.name}</h4>
                  <p className="text-xs text-blue-600">{cert.issuer}</p>
                  <p className="text-xs text-gray-500">{cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 pb-1 border-b-2 border-blue-500">
              LANGUAGES
            </h3>
            <div className="space-y-2">
              {data.languages.map((lang, index) => (
                <div key={index} className="bg-white rounded p-3 shadow-sm">
                  <p className="font-semibold text-gray-900 text-sm">{lang.name}</p>
                  <p className="text-xs text-blue-600 capitalize">{lang.proficiency}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hobbies */}
        {data.hobbies.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 pb-1 border-b-2 border-blue-500">
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
  );
}