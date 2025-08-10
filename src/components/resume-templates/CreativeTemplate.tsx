import { ResumeData } from '@/types/resume';
import { Badge } from '@/components/ui/badge';

interface CreativeTemplateProps {
  data: ResumeData;
}

export default function CreativeTemplate({ data }: CreativeTemplateProps) {
  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 min-h-[842px] p-8">
      {/* Header with Creative Design */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl opacity-10"></div>
        <div className="relative text-center py-8">
          <div className="mb-4">
            {data.personalInfo.profilePicture ? (
              <img
                src={data.personalInfo.profilePicture}
                alt="Profile"
                className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {data.personalInfo.fullName ? data.personalInfo.fullName.charAt(0).toUpperCase() : 'Y'}
              </div>
            )}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {data.personalInfo.fullName || 'Your Name'}
          </h1>
          <h2 className="text-xl text-purple-600 font-semibold mb-4">
            {data.personalInfo.jobTitle || 'Job Title'}
          </h2>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            {data.personalInfo.email && <span className="bg-white px-3 py-1 rounded-full shadow-sm">📧 {data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span className="bg-white px-3 py-1 rounded-full shadow-sm">📱 {data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span className="bg-white px-3 py-1 rounded-full shadow-sm">📍 {data.personalInfo.location}</span>}
            {data.personalInfo.linkedin && <span className="bg-white px-3 py-1 rounded-full shadow-sm">💼 {data.personalInfo.linkedin}</span>}
            {data.personalInfo.website && <span className="bg-white px-3 py-1 rounded-full shadow-sm">🌐 {data.personalInfo.website}</span>}
          </div>
        </div>
      </div>

      {/* Profile Summary */}
      {data.profileSummary && (
        <div className="mb-8 bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-purple-600 mb-4 flex items-center">
            <span className="mr-2">✨</span> ABOUT ME
          </h3>
          <p className="text-gray-700 leading-relaxed">{data.profileSummary}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-purple-600 mb-4 flex items-center">
                <span className="mr-2">🚀</span> SKILLS
              </h3>
              <div className="space-y-4">
                {data.skills.filter(skill => skill.type === 'hard').length > 0 && (
                  <div>
                    <h4 className="font-semibold text-pink-600 mb-2">Technical</h4>
                    <div className="flex flex-wrap gap-2">
                      {data.skills
                        .filter(skill => skill.type === 'hard')
                        .map((skill, index) => (
                          <Badge key={index} className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                            {skill.name}
                          </Badge>
                        ))}
                    </div>
                  </div>
                )}
                {data.skills.filter(skill => skill.type === 'soft').length > 0 && (
                  <div>
                    <h4 className="font-semibold text-pink-600 mb-2">Soft Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {data.skills
                        .filter(skill => skill.type === 'soft')
                        .map((skill, index) => (
                          <Badge key={index} variant="outline" className="border-pink-300 text-pink-700">
                            {skill.name}
                          </Badge>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-purple-600 mb-4 flex items-center">
                <span className="mr-2">🌍</span> LANGUAGES
              </h3>
              <div className="space-y-3">
                {data.languages.map((lang, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{lang.name}</span>
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
                          style={{ 
                            width: lang.proficiency === 'native' ? '100%' : 
                                   lang.proficiency === 'advanced' ? '80%' :
                                   lang.proficiency === 'intermediate' ? '60%' : '40%'
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 capitalize">{lang.proficiency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies */}
          {data.hobbies.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-purple-600 mb-4 flex items-center">
                <span className="mr-2">🎨</span> INTERESTS
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.hobbies.map((hobby, index) => (
                  <Badge key={index} className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800">
                    {hobby.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Work Experience */}
          {data.workExperience.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-purple-600 mb-6 flex items-center">
                <span className="mr-2">💼</span> EXPERIENCE
              </h3>
              <div className="space-y-6">
                {data.workExperience.map((exp, index) => (
                  <div key={index} className="relative">
                    <div className="absolute left-0 top-0 w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"></div>
                    <div className="ml-8">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{exp.role}</h4>
                          <p className="text-lg font-semibold text-purple-600">{exp.company}</p>
                          <p className="text-gray-600">{exp.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </p>
                        </div>
                      </div>
                      {exp.responsibilities.some(resp => resp.trim()) && (
                        <ul className="mt-3 space-y-2">
                          {exp.responsibilities
                            .filter(resp => resp.trim())
                            .map((resp, respIndex) => (
                              <li key={respIndex} className="text-gray-700 flex items-start">
                                <span className="text-purple-400 mr-2 mt-1">◆</span>
                                {resp}
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
          {data.education.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-purple-600 mb-6 flex items-center">
                <span className="mr-2">🎓</span> EDUCATION
              </h3>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{edu.degree} in {edu.field}</h4>
                      <p className="text-purple-600 font-semibold">{edu.school}</p>
                      {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-purple-600 mb-4 flex items-center">
                <span className="mr-2">🏆</span> CERTIFICATIONS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.certifications.map((cert, index) => (
                  <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                    <p className="text-purple-600 text-sm">{cert.issuer}</p>
                    <p className="text-gray-500 text-xs">{cert.date}</p>
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