import React from 'react';
import styles from './ResumePreview.module.css';
import ClassicTemplate from '../Templates/Classic/ClassicTemplate';
import ModernTemplate from '../Templates/Modern/ModernTemplate';
import MinimalTemplate from '../Templates/MinimalTemplate/MinimalTemplate';
import Template1 from '../Templates/Template1/Template1';
import html2pdf from 'html2pdf.js';
import Template2 from '../Templates/Template2/Template2';
import Template3 from '../Templates/Template3/Template3';
import Template4 from '../Templates/Template4/Template4';

export default function ResumePreviewPage({ formData, selectedTemplate, setSelectedTemplate, onClose }) {
  const renderTemplate = () => {
      switch (selectedTemplate) {
        case 'modern':
          return <ModernTemplate data={formData} />;
        case 'classic':
          return <ClassicTemplate data={formData} />;
        case 'minimal':
          return <MinimalTemplate data={formData} />;
          case 'Template1':
            return <Template1 data={formData}/> ;
            case 'Template2':
            return <Template2 data={formData}/> ;
            case 'Template3':
            return <Template3 data={formData}/> ;
            case 'Template4':
            return <Template4 data={formData}/> ;
        default:
          return <ModernTemplate data={formData} />;
      }
    };
  
    const handleDownload = () => {
      // alert('📥 PDF Download Feature\n\nTo enable PDF download, install html2pdf.js:\n\nnpm install html2pdf.js\n\nThen uncomment the code in handleDownload function.');
      
      // Uncomment below after installing html2pdf.js
      
      
      
      const element = document.getElementById('resume-content');
      const opt = {
        margin: 0,
        filename: `${formData.name || 'resume'}_resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save();
      
    };
  
    return (
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
             <div style={{
                    display: "flex",
    justifyContent: "end",
    paddingRight: "30px"
             }}>
          <div className={styles.headerActions}>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className={styles.templateSelect}
            >
              <option value="modern">🎨 Modern</option>
              <option value="classic">📜 Classic</option>
              <option value="minimal">✨ Minimal</option>
              <option value="Template1">Template1</option>
                 <option value="Template2">Template2</option>
                    <option value="Template3">Template3</option>
                       <option value="Template4">Template4</option>
            </select>
          
          </div>
        </div>
          {/* Resume Content */}
          <div className={styles.content}>
            <div id="resume-content" className={styles.resumeContainer}>
              {renderTemplate()}
            </div>
          </div>
      </div>
    );
}
