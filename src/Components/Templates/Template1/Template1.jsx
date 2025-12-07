import React from 'react';
import styles from './Template1.module.css';

export default function Template1({ data }) {
  return (
    <div className={styles.container}>
      {/* Left Sidebar */}
      <div className={styles.sidebar}>
        {/* Profile Image Placeholder */}
        <div className={styles.profileSection}>
          <div className={styles.profileImage}>
            <svg viewBox="0 0 100 100" className={styles.avatarIcon}>
              <circle cx="50" cy="35" r="18" fill="#fff" />
              <path d="M20 85 Q20 60 50 60 Q80 60 80 85 Z" fill="#fff" />
            </svg>
          </div>
        </div>

        {/* Contact Section */}
        <div className={styles.sidebarSection}>
          <h3 className={styles.sidebarTitle}>CONTACT</h3>
          <div className={styles.contactItem}>
            <span className={styles.icon}>📞</span>
            <span className={styles.contactText}>{data.phone || '+1234567890'}</span>
          </div>
          <div className={styles.contactItem}>
            <span className={styles.icon}>✉</span>
            <span className={styles.contactText}>{data.email || 'email@example.com'}</span>
          </div>
          <div className={styles.contactItem}>
            <span className={styles.icon}>📍</span>
            <span className={styles.contactText}>{data.address || 'City, State'}</span>
          </div>
          {data.linkedInProfile && (
            <div className={styles.contactItem}>
              <span className={styles.icon}>🔗</span>
              <span className={styles.contactText}>{data.linkedInProfile}</span>
            </div>
          )}
        </div>

        {/* Skills Section */}
        {data.skills && Object.values(data.skills).some(arr => arr?.length > 0) && (
          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarTitle}>KEY SKILLS</h3>
            <div className={styles.skillsList}>
              {Object.values(data.skills)
                .flat()
                .filter(Boolean)
                .map((skill, i) => (
                  <div key={i} className={styles.skillItem}>• {skill}</div>
                ))}
            </div>
          </div>
        )}

        {/* Languages */}
        <div className={styles.sidebarSection}>
          <h3 className={styles.sidebarTitle}>LANGUAGES</h3>
          <div className={styles.languageItem}>
            <span>English</span>
            <span className={styles.proficiency}>(Native / Fluent)</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.name}>{data.name?.toUpperCase() || '[YOUR FULL NAME]'}</h1>
          <p className={styles.tagline}>
            Aspiring {data.Degree?.stream || 'Your Career Field'} | {data.selectedStream || 'Job Role'}
          </p>
        </div>

        {/* Career Objective */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIcon}>🎯</span>
            <h2 className={styles.sectionTitle}>CAREER OBJECTIVE</h2>
          </div>
          <p className={styles.objectiveText}>
            Motivated {data.selectedStream || 'professional'} graduate seeking an opportunity to
            apply technical skills and contribute to innovative projects. Eager to learn and grow in a
            dynamic environment.
          </p>
        </div>

        {/* Education */}
        {(data.Degree || data.HSC || data.SSC) && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon}>🎓</span>
              <h2 className={styles.sectionTitle}>EDUCATION</h2>
            </div>

            {data.Degree && (
              <div className={styles.educationItem}>
                <div className={styles.eduHeader}>
                  <span className={styles.eduDegree}>{data.Degree.degreeName}</span>
                  <span className={styles.eduYear}>{data.Degree.passingYear}</span>
                </div>
                <div className={styles.eduInstitution}>{data.Degree.collegeName}</div>
                {data.Degree.university && (
                  <div className={styles.eduUniversity}>{data.Degree.university}</div>
                )}
                {data.Degree.percentage && (
                  <div className={styles.eduPercentage}>Grade: {data.Degree.percentage}%</div>
                )}
              </div>
            )}

            {data.HSC && (
              <div className={styles.educationItem}>
                <div className={styles.eduHeader}>
                  <span className={styles.eduDegree}>Higher Secondary Certificate (HSC)</span>
                  <span className={styles.eduYear}>{data.HSC.passingYear}</span>
                </div>
                <div className={styles.eduInstitution}>{data.HSC.school}</div>
                {data.HSC.percentage && (
                  <div className={styles.eduPercentage}>Grade: {data.HSC.percentage}%</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon}>📁</span>
              <h2 className={styles.sectionTitle}>PROJECTS</h2>
            </div>

            {data.projects.map((proj, i) => (
              <div key={i} className={styles.projectItem}>
                <div className={styles.projectHeader}>
                  <span className={styles.projectTitle}>{proj.title}</span>
                </div>
                <p className={styles.projectDesc}>{proj.description}</p>
                {proj.techStack && proj.techStack.length > 0 && (
                  <div className={styles.techList}>
                    <strong>Technologies:</strong> {proj.techStack.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {!data.isFresher && data.experience && data.experience.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon}>💼</span>
              <h2 className={styles.sectionTitle}>EXPERIENCE</h2>
            </div>

            {data.experience.map((exp, i) => (
              <div key={i} className={styles.experienceItem}>
                <div className={styles.expHeader}>
                  <span className={styles.expTitle}>{exp.jobTitle}</span>
                  <span className={styles.expDate}>
                    {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    {exp.startDate && exp.endDate && ' - '}
                    {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                  </span>
                </div>
                <div className={styles.expCompany}>{exp.company}</div>
                <p className={styles.expDesc}>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Extracurricular Activities */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIcon}>⭐</span>
            <h2 className={styles.sectionTitle}>EXTRACURRICULAR ACTIVITIES</h2>
          </div>
          <ul className={styles.activitiesList}>
            <li>Active participant in college technical events and workshops</li>
            <li>Volunteer work in community service programs</li>
          </ul>
        </div>
      </div>
    </div>
  );
}