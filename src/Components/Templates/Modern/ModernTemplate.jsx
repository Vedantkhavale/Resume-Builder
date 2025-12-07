import React from 'react';
import styles from './ModernTemplate.module.css';

export default function ModernTemplate({ data }) {
  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <h1 className={styles.name}>{data.name || 'Your Name'}</h1>
        <div className={styles.contactInfo}>
          {data.email && <span className={styles.contactItem}>✉ {data.email}</span>}
          {data.phone && <span className={styles.contactItem}>📞 {data.phone}</span>}
          {data.address && <span className={styles.contactItem}>📍 {data.address}</span>}
        </div>
        {(data.linkedInProfile || data.portfolioOrGitHub) && (
          <div className={styles.linksInfo}>
            {data.linkedInProfile && (
              <span className={styles.linkItem}>🔗 {data.linkedInProfile}</span>
            )}
            {data.portfolioOrGitHub && (
              <span className={styles.linkItem}>💼 {data.portfolioOrGitHub}</span>
            )}
          </div>
        )}
      </div>

      {/* Education Section */}
      {(data.Degree || data.HSC || data.SSC) && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>🎓 Education</h2>
          
          {data.Degree && (
            <div className={styles.item}>
              <div className={styles.itemTitle}>{data.Degree.degreeName}</div>
              <div className={styles.itemSubtitle}>{data.Degree.collegeName}</div>
              <div className={styles.itemDetails}>
                {data.Degree.university && `${data.Degree.university} • `}
                {data.Degree.passingYear} 
                {data.Degree.percentage && ` • ${data.Degree.percentage}%`}
              </div>
            </div>
          )}

          {data.HSC && (
            <div className={styles.item}>
              <div className={styles.itemSubtitleBold}>Higher Secondary Certificate (HSC)</div>
              <div className={styles.itemText}>
                {data.HSC.board} • {data.HSC.school}
                {data.HSC.stream && ` • ${data.HSC.stream}`}
              </div>
              <div className={styles.itemDetails}>
                {data.HSC.passingYear}
                {data.HSC.percentage && ` • ${data.HSC.percentage}%`}
              </div>
            </div>
          )}

          {data.SSC && (
            <div className={styles.item}>
              <div className={styles.itemSubtitleBold}>Secondary School Certificate (SSC)</div>
              <div className={styles.itemText}>
                {data.SSC.board} • {data.SSC.school}
              </div>
              <div className={styles.itemDetails}>
                {data.SSC.passingYear}
                {data.SSC.percentage && ` • ${data.SSC.percentage}%`}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Skills Section */}
      {data.skills && Object.values(data.skills).some(arr => arr?.length > 0) && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>💡 Skills</h2>
          <div className={styles.skillsContainer}>
            {Object.values(data.skills)
              .flat()
              .filter(Boolean)
              .map((skill, i) => (
                <span key={i} className={styles.skillChip}>{skill}</span>
              ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {data.projects && data.projects.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>📁 Projects</h2>
          {data.projects.map((proj, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.itemTitle}>{proj.title}</div>
              <div className={styles.itemDescription}>{proj.description}</div>
              {proj.techStack && proj.techStack.length > 0 && (
                <div className={styles.techStack}>
                  <span className={styles.techLabel}>Tech Stack:</span>
                  {proj.techStack.map((tech, j) => (
                    <span key={j} className={styles.techChip}>{tech}</span>
                  ))}
                </div>
              )}
              {proj.github && (
                <div className={styles.projectLink}>🔗 GitHub: {proj.github}</div>
              )}
              {proj.demo && (
                <div className={styles.projectLink}>🌐 Demo: {proj.demo}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Experience Section */}
      {!data.isFresher && data.experience && data.experience.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>💼 Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.itemTitle}>{exp.jobTitle}</div>
              <div className={styles.itemSubtitleBold}>{exp.company}</div>
              {(exp.startDate || exp.endDate) && (
                <div className={styles.itemDetails}>
                  {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  {exp.startDate && exp.endDate && ' - '}
                  {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                </div>
              )}
              <div className={styles.itemDescription}>{exp.description}</div>
            </div>
          ))}
        </div>
      )}

      {data.isFresher && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>💼 Experience</h2>
          <div className={styles.fresherText}>
            🌱 Fresher - Seeking opportunities to apply my skills and grow professionally
          </div>
        </div>
      )}
    </div>
  );
}