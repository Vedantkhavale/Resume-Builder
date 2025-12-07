import React from 'react';
import styles from './Template4.module.css';

export default function Template4({ data }) {
  return (
    <div className={styles.container}>
      {/* Header with Navy Background */}
      <div className={styles.header}>
        <h1 className={styles.name}>{data.name?.toUpperCase() || 'YOUR NAME'}</h1>
        <p className={styles.title}>{data.selectedStream || 'YOUR PROFESSIONAL TITLE'}</p>
      </div>

      {/* Two Column Layout */}
      <div className={styles.content}>
        {/* Left Sidebar */}
        <div className={styles.sidebar}>
          {/* Contact */}
          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarTitle}>CONTACT</h3>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📞</span>
                <span className={styles.contactText}>{data.phone || '123-456-7890'}</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>✉</span>
                <span className={styles.contactText}>{data.email || 'email@domain.com'}</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>🏠</span>
                <span className={styles.contactText}>{data.address || 'City, State'}</span>
              </div>
              {data.linkedInProfile && (
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>🔗</span>
                  <span className={styles.contactText}>{data.linkedInProfile}</span>
                </div>
              )}
            </div>
          </div>

          {/* Education */}
          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarTitle}>EDUCATION</h3>
            
            {data.Degree && (
              <div className={styles.eduItem}>
                <div className={styles.eduDegree}>{data.Degree.degreeName}</div>
                <div className={styles.eduSchool}>{data.Degree.collegeName}</div>
                {data.Degree.university && (
                  <div className={styles.eduDetails}>{data.Degree.university}</div>
                )}
                <div className={styles.eduYear}>{data.Degree.passingYear}</div>
                {data.Degree.percentage && (
                  <div className={styles.eduGrade}>Grade: {data.Degree.percentage}%</div>
                )}
              </div>
            )}

            {data.HSC && (
              <div className={styles.eduItem}>
                <div className={styles.eduDegree}>Higher Secondary</div>
                <div className={styles.eduSchool}>{data.HSC.school}</div>
                <div className={styles.eduYear}>{data.HSC.passingYear}</div>
              </div>
            )}
          </div>

          {/* Skills */}
          {data.skills && Object.values(data.skills).some(arr => arr?.length > 0) && (
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>SKILLS</h3>
              <ul className={styles.skillsList}>
                {Object.values(data.skills)
                  .flat()
                  .filter(Boolean)
                  .map((skill, i) => (
                    <li key={i} className={styles.skillItem}>{skill}</li>
                  ))}
              </ul>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Profile */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>PROFILE</h2>
            <p className={styles.profileText}>
              {data.isFresher 
                ? `Enthusiastic ${data.selectedStream || ''} graduate with strong academic background and passion for learning. Seeking to leverage technical skills and contribute to innovative projects in a professional environment.`
                : `Experienced ${data.selectedStream || 'professional'} with demonstrated history of delivering results. Strong technical skills combined with excellent communication and problem-solving abilities.`
              }
            </p>
          </div>

          {/* Professional Experience */}
          {!data.isFresher && data.experience && data.experience.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</h2>
              {data.experience.map((exp, i) => (
                <div key={i} className={styles.expItem}>
                  <div className={styles.expHeader}>
                    <div>
                      <h3 className={styles.expTitle}>{exp.jobTitle}</h3>
                      <div className={styles.expCompany}>{exp.company}</div>
                    </div>
                    <div className={styles.expDate}>
                      {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      {' - '}
                      {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                    </div>
                  </div>
                  <ul className={styles.expList}>
                    {exp.description.split('.').filter(Boolean).slice(0, 3).map((item, idx) => (
                      <li key={idx}>{item.trim()}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>PROJECTS</h2>
              {data.projects.map((proj, i) => (
                <div key={i} className={styles.projectItem}>
                  <h3 className={styles.projectTitle}>{proj.title}</h3>
                  <p className={styles.projectDesc}>{proj.description}</p>
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div className={styles.techStack}>
                      <strong>Technologies:</strong> {proj.techStack.join(' • ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Additional Sections */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>ACHIEVEMENTS & ACTIVITIES</h2>
            <ul className={styles.achievementsList}>
              <li>Active participant in technical workshops and seminars</li>
              <li>Member of professional organizations and student clubs</li>
              <li>Contributed to open-source projects and community initiatives</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}