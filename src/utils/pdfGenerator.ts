export const generatePDF = async (elementId: string, filename: string = 'resume.pdf', exportFormat: 'normal' | 'ats' = 'normal') => {
  // Check if we're on the client side
  if (typeof window === 'undefined') {
    throw new Error('PDF generation can only be done on the client side');
  }

  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Resume preview element not found');
  }

  // Create a completely clean HTML structure for PDF generation
  const createCleanHTML = (originalElement: HTMLElement) => {
    // Extract text content and structure while ignoring all styling
    const extractContent = (node: Node): string => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent || '';
      }
      
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        const tagName = element.tagName.toLowerCase();
        
        // Skip hidden elements
        if (element.classList.contains('hidden') || 
            element.style.display === 'none' || 
            element.style.visibility === 'hidden') {
          return '';
        }
        
        // Skip images in ATS mode
        if (exportFormat === 'ats' && tagName === 'img') {
          return '';
        }
        
        // Handle images specially for normal mode
        if (exportFormat === 'normal' && tagName === 'img') {
          const src = element.getAttribute('src');
          const alt = element.getAttribute('alt') || 'Profile Picture';
          if (src && src.startsWith('data:image')) {
            // For base64 images, create an img tag with proper styling
            const className = element.className;
            let imgStyle = '';
            
            if (className.includes('rounded-full')) {
              imgStyle = 'border-radius: 50%; ';
            }
            if (className.includes('w-32')) {
              imgStyle += 'width: 128px; height: 128px; ';
            } else if (className.includes('w-20')) {
              imgStyle += 'width: 80px; height: 80px; ';
            } else {
              imgStyle += 'max-width: 150px; max-height: 150px; ';
            }
            
            imgStyle += 'object-fit: cover; border: 2px solid #d1d5db; display: block; margin: 0 auto;';
            
            return `<img src="${src}" alt="${alt}" style="${imgStyle}" />`;
          }
          return '';
        }
        
        let content = '';
        
        // Process children
        for (let i = 0; i < element.childNodes.length; i++) {
          content += extractContent(element.childNodes[i]);
        }
        
        // Wrap content in appropriate HTML tags based on element type
        if (content.trim()) {
          switch (tagName) {
            case 'h1':
              const h1Parent = element.parentElement?.className || '';
              let h1Color = '#000000';
              if (h1Parent.includes('bg-slate-800')) h1Color = '#ffffff';
              else if (h1Parent.includes('bg-purple-600')) h1Color = '#ffffff';
              else if (h1Parent.includes('text-white')) h1Color = '#ffffff';
              return `<h1 style="font-size: 24px; font-weight: bold; margin: 20px 0 10px 0; color: ${h1Color};">${content}</h1>`;
            case 'h2':
              const h2Parent = element.parentElement?.className || '';
              let h2Color = '#000000';
              if (h2Parent.includes('bg-slate-800')) h2Color = '#ffffff';
              else if (h2Parent.includes('bg-purple-600')) h2Color = '#ffffff';
              else if (h2Parent.includes('text-white')) h2Color = '#ffffff';
              return `<h2 style="font-size: 20px; font-weight: bold; margin: 15px 0 8px 0; color: ${h2Color};">${content}</h2>`;
            case 'h3':
              const h3Parent = element.parentElement?.className || '';
              let h3Color = '#000000';
              let h3BorderColor = '#000000';
              if (h3Parent.includes('bg-slate-800')) {
                h3Color = '#ffffff';
                h3BorderColor = '#94a3b8';
              } else if (h3Parent.includes('bg-purple-600')) {
                h3Color = '#ffffff';
                h3BorderColor = '#e9d5ff';
              } else if (h3Parent.includes('text-white')) {
                h3Color = '#ffffff';
                h3BorderColor = '#e9d5ff';
              }
              return `<h3 style="font-size: 18px; font-weight: bold; margin: 12px 0 6px 0; color: ${h3Color}; border-bottom: 2px solid ${h3BorderColor}; padding-bottom: 2px;">${content}</h3>`;
            case 'h4':
              const h4Parent = element.parentElement?.className || '';
              let h4Color = '#000000';
              if (h4Parent.includes('bg-slate-800')) h4Color = '#ffffff';
              else if (h4Parent.includes('bg-purple-600')) h4Color = '#ffffff';
              else if (h4Parent.includes('text-white')) h4Color = '#ffffff';
              else if (h4Parent.includes('bg-purple-100')) h4Color = '#7c3aed';
              return `<h4 style="font-size: 16px; font-weight: bold; margin: 10px 0 5px 0; color: ${h4Color};">${content}</h4>`;
            case 'p':
              const pParent = element.parentElement?.className || '';
              let pColor = '#000000';
              if (pParent.includes('bg-slate-800')) pColor = '#e2e8f0';
              else if (pParent.includes('bg-purple-600')) pColor = '#ffffff';
              else if (pParent.includes('text-white')) pColor = '#ffffff';
              else if (pParent.includes('bg-purple-100')) pColor = '#6b21a8';
              return `<p style="font-size: 14px; line-height: 1.5; margin: 8px 0; color: ${pColor};">${content}</p>`;
            case 'div':
            case 'section':
              // Check if this div contains layout classes
              const classes = element.className;
              if (classes.includes('flex') && classes.includes('flex-col') && classes.includes('md:flex-row')) {
                // Two-column layout container
                return `<div style="display: flex; flex-direction: row; width: 100%; min-height: 29.7cm;">${content}</div>`;
              }
              if (classes.includes('w-full') && classes.includes('md:w-[35%]') && classes.includes('bg-slate-800')) {
                // Left sidebar with dark background
                return `<div style="width: 35%; background-color: #1e293b; color: #ffffff; padding: 1.5rem; box-sizing: border-box;">${content}</div>`;
              }
              if (classes.includes('w-full') && classes.includes('md:w-[65%]') && classes.includes('bg-white')) {
                // Right main content
                return `<div style="width: 65%; background-color: #ffffff; color: #000000; padding: 1.5rem; box-sizing: border-box;">${content}</div>`;
              }
              if (classes.includes('flex') && classes.includes('items-start')) {
                return `<div style="display: flex; align-items: flex-start; gap: 20px; margin: 10px 0;">${content}</div>`;
              }
              if (classes.includes('grid') && classes.includes('grid-cols-3')) {
                return `<div style="display: grid; grid-template-columns: 1fr 2fr; gap: 20px; margin: 10px 0;">${content}</div>`;
              }
              if (classes.includes('space-y-6')) {
                return `<div style="margin-bottom: 20px;">${content}</div>`;
              }
              // Creative Infographic specific layouts
              if (classes.includes('bg-purple-600') && classes.includes('text-white')) {
                // Header section with purple background
                return `<div style="background-color: #9333ea; color: #ffffff; padding: 4rem 2rem; text-align: center; position: relative; overflow: hidden;">${content}</div>`;
              }
              if (classes.includes('bg-purple-100')) {
                // Light purple accent boxes
                return `<div style="background-color: #f3e8ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #9333ea;">${content}</div>`;
              }
              if (classes.includes('bg-teal-500')) {
                // Teal accent elements
                return `<div style="background-color: #14b8a6; color: #ffffff; padding: 0.5rem; border-radius: 50%; display: inline-block; width: 2rem; height: 2rem; text-align: center; line-height: 1rem;">${content}</div>`;
              }
              if (classes.includes('bg-orange-500')) {
                // Orange accent elements
                return `<div style="background-color: #f97316; color: #ffffff; padding: 0.5rem; border-radius: 50%; display: inline-block; width: 2rem; height: 2rem; text-align: center; line-height: 1rem;">${content}</div>`;
              }
              if (classes.includes('grid') && classes.includes('md:grid-cols-2')) {
                // Two-column grid layout
                return `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 1rem 0;">${content}</div>`;
              }
              return `<div style="margin: 10px 0;">${content}</div>`;
            case 'ul':
              return `<ul style="margin: 8px 0; padding-left: 20px;">${content}</ul>`;
            case 'li':
              const liParent = element.parentElement?.className || '';
              let liColor = '#000000';
              if (liParent.includes('bg-slate-800')) liColor = '#e2e8f0';
              else if (liParent.includes('bg-purple-600')) liColor = '#ffffff';
              else if (liParent.includes('text-white')) liColor = '#ffffff';
              else if (liParent.includes('bg-purple-100')) liColor = '#6b21a8';
              return `<li style="font-size: 14px; line-height: 1.4; margin: 4px 0; color: ${liColor};">${content}</li>`;
            case 'span':
              // Check if this is in a dark or colored sidebar by looking at parent classes
              const parentClasses = element.parentElement?.className || '';
              let spanColor = '#000000';
              if (parentClasses.includes('bg-slate-800')) spanColor = '#ffffff';
              else if (parentClasses.includes('bg-purple-600')) spanColor = '#ffffff';
              else if (parentClasses.includes('text-white')) spanColor = '#ffffff';
              else if (parentClasses.includes('bg-purple-100')) spanColor = '#6b21a8';
              return `<span style="font-size: 14px; color: ${spanColor};">${content}</span>`;
            case 'strong':
            case 'b':
              const strongParentClasses = element.parentElement?.className || '';
              let strongColor = '#000000';
              if (strongParentClasses.includes('bg-slate-800')) strongColor = '#ffffff';
              else if (strongParentClasses.includes('bg-purple-600')) strongColor = '#ffffff';
              else if (strongParentClasses.includes('text-white')) strongColor = '#ffffff';
              else if (strongParentClasses.includes('bg-purple-100')) strongColor = '#7c3aed';
              return `<strong style="font-weight: bold; color: ${strongColor};">${content}</strong>`;
            default:
              return content;
          }
        }
      }
      
      return '';
    };

    // Extract the raw content
    const rawContent = extractContent(originalElement);
    
    // Create a clean HTML structure with format-specific styling
    const isATS = exportFormat === 'ats';
    const cleanHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Resume</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: ${isATS ? 'Times New Roman, serif' : 'Arial, sans-serif'};
            font-size: ${isATS ? '12px' : '14px'};
            line-height: ${isATS ? '1.4' : '1.5'};
            color: #000000;
            background-color: #ffffff;
            width: 8.5in;
            padding: ${isATS ? '0.75in' : '0.5in'};
          }
          
          .resume-container {
            max-width: 100%;
            margin: 0 auto;
          }
          
          .header {
            text-align: ${isATS ? 'left' : 'center'};
            margin-bottom: ${isATS ? '15px' : '20px'};
            ${isATS ? '' : 'border-bottom: 2px solid #1f2937; padding-bottom: 10px;'}
          }
          
          .section {
            margin-bottom: ${isATS ? '12px' : '20px'};
          }
          
          .section-title {
            font-size: ${isATS ? '14px' : '18px'};
            font-weight: bold;
            margin-bottom: ${isATS ? '6px' : '10px'};
            ${isATS ? 'text-transform: uppercase;' : ''}
            ${isATS ? '' : 'border-bottom: 2px solid #1f2937; padding-bottom: 2px;'}
            color: ${isATS ? '#000000' : '#1f2937'};
          }
          
          .two-column {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: ${isATS ? '15px' : '20px'};
          }
          
          .contact-info {
            font-size: ${isATS ? '11px' : '12px'};
            margin-bottom: ${isATS ? '3px' : '5px'};
          }
          
          .experience-item, .education-item {
            margin-bottom: ${isATS ? '10px' : '15px'};
          }
          
          .experience-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: ${isATS ? '3px' : '5px'};
          }
          
          .company, .school {
            font-weight: bold;
          }
          
          .date {
            font-size: ${isATS ? '11px' : '12px'};
            color: ${isATS ? '#666666' : '#4b5563'};
          }
          
          .location {
            font-size: ${isATS ? '11px' : '12px'};
            color: ${isATS ? '#666666' : '#4b5563'};
            margin-bottom: ${isATS ? '3px' : '5px'};
          }
          
          .skills-container {
            display: flex;
            flex-wrap: wrap;
            gap: ${isATS ? '3px' : '5px'};
            margin-bottom: ${isATS ? '8px' : '10px'};
          }
          
          .skill {
            ${isATS ? 
              'background-color: transparent; padding: 0; border-radius: 0; font-size: 11px; border: none; margin: 0; display: inline; color: #000000;' :
              'background-color: #e5e7eb; padding: 2px 6px; border-radius: 3px; font-size: 12px; border: 1px solid #d1d5db; color: #374151;'
            }
          }
          
          .badge {
            ${isATS ? 
              'background-color: transparent; color: #000000; padding: 0; border-radius: 0; font-size: 11px; border: none; display: inline; margin: 0;' :
              'background-color: #f3f4f6; color: #374151; padding: 2px 6px; border-radius: 3px; font-size: 12px; border: 1px solid #d1d5db; display: inline-block; margin: 2px;'
            }
          }
          
          /* Image styling - hide in ATS mode */
          img {
            ${isATS ? 'display: none;' : 'max-width: 150px; max-height: 150px; object-fit: cover;'}
          }
          
          /* ATS-specific optimizations */
          ${isATS ? `
            ul {
              list-style-type: disc;
              margin-left: 20px;
              margin-bottom: 8px;
            }
            
            li {
              margin-bottom: 2px;
            }
            
            .skill-separator {
              margin: 0 4px;
            }
            
            /* Remove all decorative elements */
            .decorative {
              display: none;
            }
          ` : ''}
          
          @media print {
            body {
              margin: 0;
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="resume-container">
          ${rawContent}
        </div>
      </body>
      </html>
    `;

    return cleanHTML;
  };

  try {
    // Create clean HTML from the original element
    const cleanHTML = createCleanHTML(element);
    
    // Create a blob from the clean HTML
    const blob = new Blob([cleanHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      throw new Error('Failed to open print window. Please allow popups and try again.');
    }
    
    // Write the HTML to the new window
    printWindow.document.write(cleanHTML);
    printWindow.document.close();
    
    // Wait for the content to load, then trigger print
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      
      // Close the window after printing
      setTimeout(() => {
        printWindow.close();
      }, 1000);
    };
    
    // Clean up the object URL
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
    
    return true;
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};