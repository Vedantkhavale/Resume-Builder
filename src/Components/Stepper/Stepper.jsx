import React from 'react';
import styles from './Stepper.module.css';

export default function Stepper({ steps, currentStep }) {
  const stepIcons = ['👤', '🎓', '💡', '📁', '💼'];

  return (
    <div className={styles.steppercontainer}>
      <div className={styles.stepper}>
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div
              key={index}
              className={`${styles.step} 
                ${isActive ? styles.active : ''} 
                ${isCompleted ? styles.completed : ''}`}
            >
              <div className={styles.circle}>
                {isCompleted ? '✓' : stepIcons[index] || stepNumber}
              </div>
              <div className={styles.label}>{label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}