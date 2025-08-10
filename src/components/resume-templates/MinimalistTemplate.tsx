import { ResumeData } from '@/types/resume';

interface MinimalistTemplateProps {
  data: ResumeData;
}

export default function MinimalistTemplate({ data }: MinimalistTemplateProps) {
  return (
    <div className="bg-white min-h-[842px] p-12 text-black">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-normal mb-2">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <h2 className="text-lg font-normal text-gray-700 mb-4">
          {data.personalInfo.jobTitle || 'Job Title'}
        </h2>
        <div className="text-sm text-gray-600 space-y-1">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.linkedin && <div>{data.personalInfo.linkedin}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>

      {/* Profile Summary */}
      {data.profileSummary && (
        <div className="mb-6">
          <h3 className="text-lg font-normal mb-2 uppercase tracking-wide">Summary</h3>
          <p className="text-sm leading-relaxed text-gray-700">{data.profileSummary}</p>
        </div>
      )}

      {/* Work Experience */}
      {data.workExperience.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-normal mb-4 uppercase tracking-wide">Experience</h3>
          <div className="space-y-4">
            {data.workExperience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h4 className="text-base font-normal">{exp.role}</h4>
                    <p className="text-sm text-gray-700">{exp.company} | {exp.location}</p>
                  </div>
                  <div className="text-sm text-gray-600 text-right">
                    <p>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                </div>
                {exp.responsibilities.some(resp => resp.trim()) && (
                  <ul className="mt-2 space-y-1 ml-4">
                    {exp.responsibilities
                      .filter(resp => resp.trim())
                      .map((resp, respIndex) => (
                        <li key={respIndex} className="text-sm text-gray-700 list-disc">
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
        <div className="mb-6">
          <h3 className="text-lg font-normal mb-4 uppercase tracking-wide">Education</h3>
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-base font-normal">{edu.degree} in {edu.field}</h4>
                    <p className="text-sm text-gray-700">{edu.school}</p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-sm text-gray-600 text-right">
                    <p>{edu.startDate} - {edu.endDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-normal mb-3 uppercase tracking-wide">Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.skills.filter(skill => skill.type === 'hard').length > 0 && (
              <div>
                <h4 className="text-sm font-normal mb-2 text-gray-700">Technical Skills</h4>
                <p className="text-sm text-gray-600">
                  {data.skills
                    .filter(skill => skill.type === 'hard')
                    .map(skill => skill.name)
                    .join(', ')}
                </p>
              </div>
            )}
            {data.skills.filter(skill => skill.type === 'soft').length > 0 && (
              <div>
                <h4 className="text-sm font-normal mb-2 text-gray-700">Soft Skills</h4>
                <p className="text-sm text-gray-600">
                  {data.skills
                    .filter(skill => skill.type === 'soft')
                    .map(skill => skill.name)
                    .join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Additional Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div>
            <h3 className="text-base font-normal mb-3 uppercase tracking-wide">Certifications</h3>
            <div className="space-y-2">
              {data.certifications.map((cert, index) => (
                <div key={index}>
                  <p className="font-normal">{cert.name}</p>
                  <p className="text-gray-600">{cert.issuer} | {cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div>
            <h3 className="text-base font-normal mb-3 uppercase tracking-wide">Languages</h3>
            <div className="space-y-1">
              {data.languages.map((lang, index) => (
                <div key={index}>
                  <p className="font-normal">{lang.name} - {lang.proficiency}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hobbies */}
        {data.hobbies.length > 0 && (
          <div>
            <h3 className="text-base font-normal mb-3 uppercase tracking-wide">Interests</h3>
            <p className="text-gray-600">
              {data.hobbies.map(hobby => hobby.name).join(', ')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}