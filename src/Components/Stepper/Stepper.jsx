import React, { useState } from 'react'
import  styles from './Stepper.module.css';

export default function Stepper({steps,currentStep}) {

   

  return (
    <div className={styles.steppercontainer}>
      <div className={styles.stepper}>
        {steps.map((label, index) => (
          <div
            key={index}
            className={`${styles.step} 
              ${index +1 === currentStep ? `${styles.active}` : ""} 
              ${index+1 < currentStep ? `${styles.completed}` : ""}`}
            // onClick={() => setCurrentStep(index)}
          >
            <div className={styles.circle}>{index + 1}</div>
            <div className={styles.label}>{label}</div>
          </div>
        ))}
      </div>

    
    </div>
  )
}
