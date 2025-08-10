import { ResumeData } from '@/types/resume';

interface AcademicTemplateProps {
  data: ResumeData;
}

export default function AcademicTemplate({ data }: AcademicTemplateProps) {
  return (
    <div className="bg-white min-h-[842px] p-10">
      {/* Academic Header */}
      <div className="text-center mb-8 border-b-2 border-gray-800 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <h2 className="text-lg text-gray-700 font-medium mb-3">
          {data.personalInfo.jobTitle || 'Academic Position'}
        </h2>
        <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
          {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
        </div>
      </div>

      {/* Profile Summary - Research Interests */}
      {data.profileSummary && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Research Interests & Academic Summary
          </h3>
          <div className="bg-gray-50 p-4 border-l-4 border-gray-800">
            <p className="text-gray-700 leading-relaxed text-sm">{data.profileSummary}</p>
          </div>
        </div>
      )}

      {/* Education - Prominent Section */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
            Education
          </h3>
          <div className="space-y-6">
            {data.education.map((edu, index) => (
              <div key={index} className="border-l-2 border-gray-300 pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{edu.degree}</h4>
                    <p className="text-base font-semibold text-gray-700">{edu.field}</p>
                    <p className="text-gray-600">{edu.school}</p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-semibold">GPA:</span> {edu.gpa}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                </div>
                {/* Space for thesis/dissertation details */}
                <div className="mt-2 text-sm text-gray-600 italic">
                  {/* This could be expanded to include thesis title, advisor, etc. */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Work Experience - Academic Focus */}
      {data.workExperience.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
            Academic & Research Experience
          </h3>
          <div className="space-y-6">
            {data.workExperience.map((exp, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{exp.role}</h4>
                    <p className="text-base font-semibold text-gray-700">{exp.company}</p>
                    <p className="text-gray-600">{exp.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                  </div>
                </div>
                {exp.responsibilities.some(resp => resp.trim()) && (
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-2 text-sm">Key Responsibilities & Achievements:</h5>
                    <ul className="space-y-2">
                      {exp.responsibilities
                        .filter(resp => resp.trim())
                        .map((resp, respIndex) => (
                          <li key={respIndex} className="text-sm text-gray-700 flex items-start">
                            <span className="text-gray-500 mr-2 mt-1">•</span>
                            {resp}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills - Academic Categories */}
      {data.skills.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
            Academic Skills & Expertise
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Research Skills */}
            {data.skills.filter(skill => skill.type === 'hard').length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
                  Research & Technical Skills
                </h4>
                <ul className="space-y-1">
                  {data.skills
                    .filter(skill => skill.type === 'hard')
                    .map((skill, index) => (
                      <li key={index} className="text-sm text-gray-700">
                        • {skill.name}
                      </li>
                    ))}
                </ul>
              </div>
            )}
            
            {/* Soft Skills */}
            {data.skills.filter(skill => skill.type === 'soft').length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
                  Professional Skills
                </h4>
                <ul className="space-y-1">
                  {data.skills
                    .filter(skill => skill.type === 'soft')
                    .map((skill, index) => (
                      <li key={index} className="text-sm text-gray-700">
                        • {skill.name}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Additional Academic Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Certifications & Training */}
        {data.certifications.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide text-sm">
              Certifications & Training
            </h3>
            <div className="space-y-3">
              {data.certifications.map((cert, index) => (
                <div key={index} className="border-l-2 border-gray-300 pl-3">
                  <p className="font-semibold text-gray-900 text-sm">{cert.name}</p>
                  <p className="text-gray-600 text-xs">{cert.issuer}</p>
                  <p className="text-gray-500 text-xs">{cert.date}</p>
                  {cert.expiryDate && (
                    <p className="text-gray-400 text-xs">Expires: {cert.expiryDate}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide text-sm">
              Languages
            </h3>
            <div className="space-y-2">
              {data.languages.map((lang, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium text-gray-900 text-sm">{lang.name}</span>
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded capitalize">
                    {lang.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Professional Memberships & Hobbies */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide text-sm">
            Professional Activities
          </h3>
          {data.hobbies.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2 text-xs uppercase">Interests & Activities</h4>
              <div className="flex flex-wrap gap-1">
                {data.hobbies.map((hobby, index) => (
                  <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                    {hobby.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          {/* Space for professional memberships, conferences, etc. */}
          <div className="text-xs text-gray-500 italic">
            Professional memberships, conference presentations, and committee work can be added here.
          </div>
        </div>
      </div>
    </div>
  );
}