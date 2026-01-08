import React from 'react';
import styles from './Stepper.module.css';
import { useDispatch } from 'react-redux';
import { setCurrentStep } from '../../Redux/formSlice';

export default function Stepper({ steps, currentStep }) {
   const dispatch = useDispatch();
  const stepIcons = ['👤', '🎓', '💡', '📁', '💼','👁️'];
const handleStepClick = (stepNumber) => {
    // Allow only backward navigation or current step
    if (stepNumber <= currentStep) {
       if (stepNumber <= currentStep) {
      dispatch(setCurrentStep(stepNumber));
    }
    }
  };
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
               onClick={() => handleStepClick(stepNumber)}
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