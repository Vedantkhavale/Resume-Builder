import React, { useState } from 'react'
import PersonalInfo from '../Components/PersonalInfo/PersonalInfo'
import Stepper from '../Components/Stepper/Stepper'
import Education from '../Components/Eductaion/Education';
import { useSelector } from 'react-redux';
import Skill from '../Components/Skills/Skill';

export default function Home() {
    const steps = ["Personal Info", "Education", "Skills", "Projects", "Experience"];
  // const [currentStep, setCurrentStep] = useState(1);
   const forms = useSelector((state) => state.form);
  const currentStep = useSelector((state) => state.form.currentStep);
  console.log("forms",forms)
  return (
    <div>
      
        <Stepper steps={steps} currentStep={currentStep}/>

      
      {
        currentStep ===1 &&
        <PersonalInfo  currentStep={currentStep}/>
      }

      {
        currentStep ===2 &&
        <Education  currentStep={currentStep}/>
      }

      {
        currentStep === 3 &&
        <Skill currentStep={currentStep}/>
      }
    </div>
  )
}
