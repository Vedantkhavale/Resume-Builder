import React from 'react';
import styles from './Template2.module.css';

export default function Template2({ data }) {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.nameSection}>
          <h1 className={styles.firstName}>{data.name?.split(' ')[0] || 'First'}</h1>
          <h1 className={styles.lastName}>{data.name?.split(' ').slice(1).join(' ') || 'Last Name'}</h1>
        </div>
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>{data.email || 'youremail@domain.com'}</div>
          <div className={styles.contactItem}>{data.phone || '+1234567890'}</div>
          <div className={styles.contactItem}>{data.address || 'City, State'}</div>
        </div>
      </div>

      {/* Professional Summary */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {data.Degree?.degreeName ? `${data.Degree.degreeName} Graduate` : 'Professional'} Summary
        </h2>
        <p className={styles.summaryText}>
          {data.isFresher 
            ? `Recent ${data.selectedStream || ''} graduate with strong foundation in core concepts. Eager to apply academic knowledge in a professional setting and contribute to innovative projects.`
            : `Experienced ${data.selectedStream || 'professional'} with proven track record in delivering quality results. Skilled in multiple technologies and passionate about continuous learning.`
          }
        </p>
      </div>

      {/* Two Column Layout */}
      <div className={styles.twoColumn}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          {/* Experience */}
          {!data.isFresher && data.experience && data.experience.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Experience</h2>
              {data.experience.map((exp, i) => (
                <div key={i} className={styles.experienceItem}>
                  <div className={styles.expHeader}>
                    <h3 className={styles.expTitle}>{exp.jobTitle}</h3>
                    <span className={styles.expDate}>
                      {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      {' - '}
                      {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                    </span>
                  </div>
                  <div className={styles.expCompany}>{exp.company}</div>
                  <p className={styles.expDesc}>{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Projects</h2>
              {data.projects.map((proj, i) => (
                <div key={i} className={styles.projectItem}>
                  <h3 className={styles.projectTitle}>{proj.title}</h3>
                  <p className={styles.projectDesc}>{proj.description}</p>
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div className={styles.techStack}>
                      {proj.techStack.map((tech, j) => (
                        <span key={j} className={styles.techTag}>{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          {/* Education */}
          {(data.Degree || data.HSC) && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Education</h2>
              
              {data.Degree && (
                <div className={styles.eduItem}>
                  <h3 className={styles.eduDegree}>{data.Degree.degreeName}</h3>
                  <div className={styles.eduCollege}>{data.Degree.collegeName}</div>
                  <div className={styles.eduDetails}>
                    {data.Degree.university && <span>{data.Degree.university}</span>}
                    <span className={styles.eduYear}>{data.Degree.passingYear}</span>
                  </div>
                  {data.Degree.percentage && (
                    <div className={styles.eduGrade}>Grade: {data.Degree.percentage}%</div>
                  )}
                </div>
              )}

              {data.HSC && (
                <div className={styles.eduItem}>
                  <h3 className={styles.eduDegree}>Higher Secondary</h3>
                  <div className={styles.eduCollege}>{data.HSC.school}</div>
                  <div className={styles.eduDetails}>
                    <span className={styles.eduYear}>{data.HSC.passingYear}</span>
                  </div>
                  {data.HSC.percentage && (
                    <div className={styles.eduGrade}>Grade: {data.HSC.percentage}%</div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Skills */}
          {data.skills && Object.values(data.skills).some(arr => arr?.length > 0) && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Skills</h2>
              <div className={styles.skillsGrid}>
                {Object.entries(data.skills).map(([category, skills]) => 
                  skills && skills.length > 0 && (
                    <div key={category} className={styles.skillCategory}>
                      <h4 className={styles.skillCategoryTitle}>
                        {category.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <div className={styles.skillBars}>
                        {skills.slice(0, 4).map((skill, i) => (
                          <div key={i} className={styles.skillBar}>
                            <span className={styles.skillName}>{skill}</span>
                            <div className={styles.barContainer}>
                              <div className={styles.barFill} style={{width: `${85 - i * 5}%`}}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Interests */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Interests</h2>
            <div className={styles.interestsList}>
              <span className={styles.interestItem}>Technology</span>
              <span className={styles.interestItem}>Innovation</span>
              <span className={styles.interestItem}>Learning</span>
              <span className={styles.interestItem}>Problem Solving</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}