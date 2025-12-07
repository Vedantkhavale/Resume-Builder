import React from 'react';
import styles from './Template3.module.css';

export default function Template3({ data }) {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.nameSection}>
          <h1 className={styles.name}>{data.name?.toUpperCase() || 'YOUR NAME'}</h1>
          <h2 className={styles.subtitle}>
            {data.Degree?.degreeName || data.selectedStream || 'Your Professional Title'}
          </h2>
        </div>
        <div className={styles.contactSection}>
          <div className={styles.contactRow}>
            <span className={styles.contactIcon}>📧</span>
            <span>{data.email || 'email@example.com'}</span>
          </div>
          <div className={styles.contactRow}>
            <span className={styles.contactIcon}>📞</span>
            <span>{data.phone || '+1234567890'}</span>
          </div>
          <div className={styles.contactRow}>
            <span className={styles.contactIcon}>📍</span>
            <span>{data.address || 'City, State'}</span>
          </div>
          {data.linkedInProfile && (
            <div className={styles.contactRow}>
              <span className={styles.contactIcon}>🔗</span>
              <span className={styles.link}>{data.linkedInProfile}</span>
            </div>
          )}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className={styles.content}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          {/* Work Experience */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>WORK EXPERIENCE</h3>
            
            {!data.isFresher && data.experience && data.experience.length > 0 ? (
              data.experience.map((exp, i) => (
                <div key={i} className={styles.experienceItem}>
                  <div className={styles.expHeader}>
                    <div>
                      <h4 className={styles.jobTitle}>{exp.jobTitle}</h4>
                      <div className={styles.company}>{exp.company}</div>
                    </div>
                    <div className={styles.dateLocation}>
                      <div className={styles.date}>
                        {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        {' - '}
                        {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'current'}
                      </div>
                    </div>
                  </div>
                  <ul className={styles.responsibilities}>
                    {exp.description.split('.').filter(Boolean).map((item, idx) => (
                      <li key={idx}>{item.trim()}</li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <div className={styles.fresherNote}>
                <p>Recent graduate seeking entry-level position to apply academic knowledge and develop professional skills.</p>
              </div>
            )}
          </div>

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>PROJECTS</h3>
              {data.projects.map((proj, i) => (
                <div key={i} className={styles.projectItem}>
                  <h4 className={styles.projectTitle}>{proj.title}</h4>
                  <p className={styles.projectDesc}>{proj.description}</p>
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div className={styles.technologies}>
                      <strong>Technologies:</strong> {proj.techStack.join(', ')}
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
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>EDUCATION</h3>
            
            {data.Degree && (
              <div className={styles.eduItem}>
                <h4 className={styles.degree}>{data.Degree.degreeName}</h4>
                <div className={styles.institution}>{data.Degree.collegeName}</div>
                {data.Degree.university && (
                  <div className={styles.university}>{data.Degree.university}</div>
                )}
                <div className={styles.eduYear}>{data.Degree.passingYear}</div>
                {data.Degree.percentage && (
                  <div className={styles.grade}>GPA: {data.Degree.percentage}%</div>
                )}
              </div>
            )}

            {data.HSC && (
              <div className={styles.eduItem}>
                <h4 className={styles.degree}>Higher Secondary Certificate</h4>
                <div className={styles.institution}>{data.HSC.school}</div>
                <div className={styles.eduYear}>{data.HSC.passingYear}</div>
                {data.HSC.percentage && (
                  <div className={styles.grade}>Score: {data.HSC.percentage}%</div>
                )}
              </div>
            )}

            {data.SSC && (
              <div className={styles.eduItem}>
                <h4 className={styles.degree}>Secondary School Certificate</h4>
                <div className={styles.institution}>{data.SSC.school}</div>
                <div className={styles.eduYear}>{data.SSC.passingYear}</div>
              </div>
            )}
          </div>

          {/* Skills */}
          {data.skills && Object.values(data.skills).some(arr => arr?.length > 0) && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>SKILLS</h3>
              <ul className={styles.skillsList}>
                {Object.values(data.skills)
                  .flat()
                  .filter(Boolean)
                  .map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
              </ul>
            </div>
          )}

          {/* Certifications */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>LICENSES</h3>
            <div className={styles.certItem}>
              <div className={styles.certName}>Professional Certification</div>
              <div className={styles.certDetails}>License ID: XXXX-XXXX</div>
            </div>
          </div>

          {/* Activities */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>ACTIVITIES</h3>
            <ul className={styles.activitiesList}>
              <li>Active member of professional associations</li>
              <li>Participant in industry conferences and workshops</li>
              <li>Volunteer work in community programs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}