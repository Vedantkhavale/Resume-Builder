import React from 'react';
import styles from './MinimalTemplate.module.css';

export default function MinimalTemplate({ data }) {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.name}>{data.name || 'Your Name'}</h1>
        <div className={styles.contactInfo}>
          {data.email}
          {data.phone && ` • ${data.phone}`}
          {data.address && ` • ${data.address}`}
        </div>
        {(data.linkedInProfile || data.portfolioOrGitHub) && (
          <div className={styles.linksInfo}>
            {data.linkedInProfile && <span>{data.linkedInProfile}</span>}
            {data.linkedInProfile && data.portfolioOrGitHub && <span> • </span>}
            {data.portfolioOrGitHub && <span>{data.portfolioOrGitHub}</span>}
          </div>
        )}
      </div>

      {/* Education */}
      {(data.Degree || data.HSC || data.SSC) && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>EDUCATION</h2>

          {data.Degree && (
            <div className={styles.item}>
              <div className={styles.itemTitle}>{data.Degree.degreeName}</div>
              <div className={styles.itemSubtitle}>
                {data.Degree.collegeName}
                {data.Degree.university && ` • ${data.Degree.university}`}
              </div>
              <div className={styles.itemDetails}>
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

      {/* Skills */}
      {data.skills && Object.values(data.skills).some(arr => arr?.length > 0) && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>SKILLS</h2>
          <div className={styles.item}>
            <div className={styles.skillsText}>
              {Object.values(data.skills).flat().filter(Boolean).join(', ')}
            </div>
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>PROJECTS</h2>
          {data.projects.map((proj, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.itemSubtitleBold}>{proj.title}</div>
              <div className={styles.itemText}>{proj.description}</div>
              {proj.techStack && proj.techStack.length > 0 && (
                <div className={styles.itemDetails}>
                  {proj.techStack.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {!data.isFresher && data.experience && data.experience.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>EXPERIENCE</h2>
          {data.experience.map((exp, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.itemSubtitleBold}>{exp.jobTitle}</div>
              <div className={styles.itemText}>{exp.company}</div>
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
          <h2 className={styles.sectionTitle}>EXPERIENCE</h2>
          <div className={styles.item}>
            <div className={styles.fresherText}>
              Fresher - Looking for opportunities to contribute and grow
            </div>
          </div>
        </div>
      )}
    </div>
  );
}