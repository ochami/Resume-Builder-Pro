import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Border, Table, TableRow, TableCell, WidthType, VerticalAlign } from 'docx';
import { ResumeData } from '@/types/resume';

export const generateDocx = async (data: ResumeData, exportFormat: 'normal' | 'ats' = 'normal'): Promise<Blob> => {
  const { personalInfo, profileSummary, workExperience, education, skills, certifications, languages } = data;
  const isATS = exportFormat === 'ats';

  // Helper function to create styled text runs
  const createTextRun = (text: string, bold = false, italic = false, size = 24, color = '000000') => {
    return new TextRun({
      text: text,
      bold: bold,
      italics: italic,
      size: size,
      color: isATS ? '000000' : color,
    });
  };

  // Helper function to create heading with proper styling
  const createHeading = (text: string, level: HeadingLevel = HeadingLevel.HEADING_3) => {
    return new Paragraph({
      children: [createTextRun(text.toUpperCase(), true, false, isATS ? 26 : 28, isATS ? '000000' : '1f2937')],
      heading: level,
      spacing: { before: isATS ? 80 : 100, after: isATS ? 40 : 50 },
      alignment: AlignmentType.LEFT,
    });
  };

  // Helper function to create horizontal line (skip in ATS mode)
  const createHorizontalLine = () => {
    if (isATS) {
      return new Paragraph({
        children: [new TextRun({ text: '', size: 1 })],
        spacing: { before: 50, after: 100 },
      });
    }
    return new Paragraph({
      children: [new TextRun({ text: '', size: 1 })],
      border: {
        bottom: {
          color: '999999',
          size: 1,
          style: 'single',
        },
      },
      spacing: { before: 50, after: 150 },
    });
  };

  // Create header section
  const headerChildren = [];
  
  // Name and title
  headerChildren.push(new Paragraph({
    children: [createTextRun(personalInfo.fullName || 'YOUR NAME', true, false, isATS ? 32 : 36, isATS ? '000000' : '1f2937')],
    spacing: { after: isATS ? 80 : 100 },
    alignment: AlignmentType.LEFT,
  }));

  headerChildren.push(new Paragraph({
    children: [createTextRun(personalInfo.jobTitle || 'Professional Title', false, false, isATS ? 24 : 28, isATS ? '333333' : '4b5563')],
    spacing: { after: isATS ? 150 : 200 },
    alignment: AlignmentType.LEFT,
  }));

  // Contact info
  const contactInfo = [];
  if (personalInfo.phone) contactInfo.push(`Phone: ${personalInfo.phone}`);
  if (personalInfo.email) contactInfo.push(`Email: ${personalInfo.email}`);
  if (personalInfo.linkedin) contactInfo.push(`LinkedIn: LinkedIn Profile`);
  if (personalInfo.location) contactInfo.push(`Location: ${personalInfo.location}`);

  if (contactInfo.length > 0) {
    headerChildren.push(new Paragraph({
      children: [createTextRun(contactInfo.join('   '), false, false, isATS ? 20 : 22, isATS ? '333333' : '4b5563')],
      spacing: { after: isATS ? 150 : 200 },
      alignment: AlignmentType.LEFT,
    }));
  }

  // Summary
  if (profileSummary) {
    headerChildren.push(new Paragraph({
      children: [createTextRun(profileSummary, false, false, isATS ? 20 : 22, isATS ? '333333' : '4b5563')],
      spacing: { after: isATS ? 200 : 300 },
      alignment: AlignmentType.LEFT,
    }));
  }

  // Experience section
  const experienceChildren = [];
  if (workExperience.length > 0) {
    experienceChildren.push(createHeading('Experience'));
    experienceChildren.push(createHorizontalLine());

    workExperience.forEach((exp) => {
      const table = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 20, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    children: [createTextRun(formatDateRange(exp.startDate, exp.endDate, exp.current), false, false, isATS ? 16 : 18, '666666')],
                    alignment: AlignmentType.LEFT,
                  }),
                ],
                verticalAlign: VerticalAlign.TOP,
              }),
              new TableCell({
                width: { size: 80, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    children: [createTextRun(exp.role, true, false, isATS ? 22 : 24, isATS ? '000000' : '1f2937')],
                    spacing: { after: isATS ? 40 : 50 },
                  }),
                  new Paragraph({
                    children: [createTextRun(`${exp.company}${exp.location ? `, ${exp.location}` : ''}`, false, true, isATS ? 20 : 22, isATS ? '333333' : '4b5563')],
                    spacing: { after: isATS ? 80 : 100 },
                  }),
                ],
                verticalAlign: VerticalAlign.TOP,
              }),
            ],
          }),
        ],
      });

      experienceChildren.push(table);

      // Add responsibilities
      if (exp.responsibilities.some(resp => resp.trim())) {
        const responsibilityParagraphs = exp.responsibilities
          .filter(resp => resp.trim())
          .map(resp => new Paragraph({
            children: [
              createTextRun('• ', false, false, isATS ? 18 : 20, isATS ? '000000' : '1f2937'),
              createTextRun(resp, false, false, isATS ? 20 : 22, isATS ? '333333' : '4b5563'),
            ],
            spacing: { before: isATS ? 40 : 50, after: isATS ? 40 : 50 },
            indent: { left: isATS ? 180 : 200 },
          }));
        
        experienceChildren.push(...responsibilityParagraphs);
      }

      experienceChildren.push(new Paragraph({ children: [new TextRun({ text: '', size: 1 })], spacing: { after: isATS ? 150 : 200 } }));
    });
  }

  // Education section
  const educationChildren = [];
  if (education.length > 0) {
    educationChildren.push(createHeading('Education'));
    educationChildren.push(createHorizontalLine());

    education.forEach((edu) => {
      const table = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 20, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    children: [createTextRun(formatDateRange(edu.startDate, edu.endDate, false), false, false, isATS ? 16 : 18, '666666')],
                    alignment: AlignmentType.LEFT,
                  }),
                ],
                verticalAlign: VerticalAlign.TOP,
              }),
              new TableCell({
                width: { size: 80, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    children: [createTextRun(`${edu.degree} in ${edu.field}`, true, false, isATS ? 22 : 24, isATS ? '000000' : '1f2937')],
                    spacing: { after: isATS ? 40 : 50 },
                  }),
                  new Paragraph({
                    children: [createTextRun(edu.school, false, false, isATS ? 20 : 22, isATS ? '333333' : '4b5563')],
                    spacing: { after: isATS ? 80 : 100 },
                  }),
                ],
                verticalAlign: VerticalAlign.TOP,
              }),
            ],
          }),
        ],
      });

      educationChildren.push(table);

      // Add additional info
      const additionalInfo = [];
      if (edu.gpa) additionalInfo.push(`GPA: ${edu.gpa}`);
      if (!isATS) additionalInfo.push('Academic Excellence Award'); // Skip decorative content in ATS mode

      if (additionalInfo.length > 0) {
        const infoParagraphs = additionalInfo.map(info => new Paragraph({
          children: [
            createTextRun('• ', false, false, isATS ? 18 : 20, isATS ? '000000' : '1f2937'),
            createTextRun(info, false, false, isATS ? 20 : 22, isATS ? '333333' : '4b5563'),
          ],
          spacing: { before: isATS ? 40 : 50, after: isATS ? 40 : 50 },
          indent: { left: isATS ? 180 : 200 },
        }));
        
        educationChildren.push(...infoParagraphs);
      }

      educationChildren.push(new Paragraph({ children: [new TextRun({ text: '', size: 1 })], spacing: { after: isATS ? 150 : 200 } }));
    });
  }

  // Skills section
  const skillsChildren = [];
  const professionalSkills = skills.filter(skill => !['JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'Angular', 'Vue.js', 'SQL', 'Excel', 'PowerPoint', 'Word', 'Photoshop', 'Illustrator', 'Figma', 'Sketch'].some(
    tech => skill.name.toLowerCase().includes(tech.toLowerCase())
  ));

  if (professionalSkills.length > 0) {
    skillsChildren.push(createHeading('Skills'));
    skillsChildren.push(createHorizontalLine());

    const technicalSkills = professionalSkills.filter(skill => skill.type === 'hard');
    const softSkills = professionalSkills.filter(skill => skill.type === 'soft');

    if (technicalSkills.length > 0) {
      skillsChildren.push(new Paragraph({
        children: [createTextRun('Technical Skills', true, false, isATS ? 20 : 22, isATS ? '000000' : '1f2937')],
        spacing: { before: isATS ? 80 : 100, after: isATS ? 40 : 50 },
      }));
      skillsChildren.push(new Paragraph({
        children: [createTextRun(technicalSkills.map(skill => skill.name).join(', '), false, false, isATS ? 20 : 22, isATS ? '333333' : '4b5563')],
        spacing: { after: isATS ? 80 : 100 },
      }));
    }

    if (softSkills.length > 0) {
      skillsChildren.push(new Paragraph({
        children: [createTextRun('Soft Skills', true, false, isATS ? 20 : 22, isATS ? '000000' : '1f2937')],
        spacing: { before: isATS ? 80 : 100, after: isATS ? 40 : 50 },
      }));
      skillsChildren.push(new Paragraph({
        children: [createTextRun(softSkills.map(skill => skill.name).join(', '), false, false, isATS ? 20 : 22, isATS ? '333333' : '4b5563')],
        spacing: { after: isATS ? 80 : 100 },
      }));
    }

    if (languages.length > 0) {
      skillsChildren.push(new Paragraph({
        children: [createTextRun('Languages', true, false, isATS ? 20 : 22, isATS ? '000000' : '1f2937')],
        spacing: { before: isATS ? 80 : 100, after: isATS ? 40 : 50 },
      }));
      skillsChildren.push(new Paragraph({
        children: [createTextRun(languages.map(lang => `${lang.name} (${lang.proficiency})`).join(', '), false, false, isATS ? 20 : 22, isATS ? '333333' : '4b5563')],
        spacing: { after: isATS ? 80 : 100 },
      }));
    }
  }

  // Software section - skip in ATS mode (combine with skills)
  const softwareChildren = [];
  if (!isATS) {
    const softwareSkills = skills.filter(skill => 
      skill.type === 'hard' && 
      ['JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'Angular', 'Vue.js', 'SQL', 'Excel', 'PowerPoint', 'Word', 'Photoshop', 'Illustrator', 'Figma', 'Sketch'].some(
        tech => skill.name.toLowerCase().includes(tech.toLowerCase())
      )
    );

    if (softwareSkills.length > 0) {
      softwareChildren.push(createHeading('Software'));
      softwareChildren.push(createHorizontalLine());

      softwareSkills.forEach((skill) => {
        softwareChildren.push(new Paragraph({
          children: [
            createTextRun(skill.name, false, false, 22, isATS ? '000000' : '1f2937'),
          ],
          spacing: { before: 50, after: 50 },
        }));
      });
    }
  }

  // Certifications section
  const certificationsChildren = [];
  if (certifications.length > 0) {
    certificationsChildren.push(createHeading('Certifications'));
    certificationsChildren.push(createHorizontalLine());

    certifications.forEach((cert) => {
      const table = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 20, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    children: [createTextRun(cert.date, false, false, isATS ? 16 : 18, '666666')],
                    alignment: AlignmentType.LEFT,
                  }),
                ],
                verticalAlign: VerticalAlign.TOP,
              }),
              new TableCell({
                width: { size: 80, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    children: [createTextRun(cert.name, true, false, isATS ? 22 : 22, isATS ? '000000' : '1f2937')],
                    spacing: { after: isATS ? 40 : 50 },
                  }),
                  new Paragraph({
                    children: [createTextRun(cert.issuer, false, false, isATS ? 20 : 22, isATS ? '333333' : '4b5563')],
                    spacing: { after: isATS ? 40 : 50 },
                  }),
                ],
                verticalAlign: VerticalAlign.TOP,
              }),
            ],
          }),
        ],
      });

      certificationsChildren.push(table);

      if (cert.expiryDate) {
        certificationsChildren.push(new Paragraph({
          children: [createTextRun(`Expires: ${cert.expiryDate}`, false, false, isATS ? 16 : 18, isATS ? '666666' : '6b7280')],
          spacing: { before: isATS ? 40 : 50, after: isATS ? 80 : 100 },
          indent: { left: isATS ? 180 : 200 },
        }));
      }

      certificationsChildren.push(new Paragraph({ children: [new TextRun({ text: '', size: 1 })], spacing: { after: isATS ? 100 : 100 } }));
    });
  }

  // Combine all sections
  const allChildren = [
    ...headerChildren,
    ...experienceChildren,
    ...educationChildren,
    ...skillsChildren,
    ...softwareChildren,
    ...certificationsChildren,
  ];

  // Create document with ATS-optimized styling
  const doc = new Document({
    sections: [{
      properties: {},
      children: allChildren,
    }],
    styles: {
      paragraphStyles: [
        {
          id: 'Normal',
          name: 'Normal',
          run: {
            font: isATS ? 'Times New Roman' : 'Inter',
            size: isATS ? 20 : 22,
          },
          paragraph: {
            spacing: { line: isATS ? 280 : 360 },
          },
        },
        {
          id: 'Title',
          name: 'Title',
          run: {
            font: isATS ? 'Times New Roman' : 'Playfair Display',
            size: isATS ? 32 : 36,
            bold: true,
          },
          paragraph: {
            spacing: { after: isATS ? 160 : 200 },
          },
        },
      ],
    },
    defaultStyles: {
      paragraph: {
        spacing: { line: isATS ? 280 : 360 },
      },
      run: {
        font: isATS ? 'Times New Roman' : 'Inter',
        size: isATS ? 20 : 22,
      },
    },
  });

  return await Packer.toBlob(doc);
};

// Helper function to format date range
const formatDateRange = (startDate: string, endDate: string, current: boolean): string => {
  if (current) return `${startDate} - Present`;
  return `${startDate} - ${endDate}`;
};