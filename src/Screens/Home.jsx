import React, { useState } from 'react'
import PersonalInfo from '../Components/PersonalInfo/PersonalInfo'
import Stepper from '../Components/Stepper/Stepper'
import Education from '../Components/Eductaion/Education';
import { useDispatch, useSelector } from 'react-redux';
import Skill from '../Components/Skills/Skill';
import Project from '../Components/Project/Project';
import Experience from '../Components/Experience/Experience';
import ResumePreview from '../Components/ResumePreview/ResumePreview';
import styles from './Home.module.css';
import { prevStep } from '../Redux/formSlice';
import ResumePreviewPage from '../Components/ResumePreview/ResumePreviewPage';

export default function Home() {
  const steps = ["Personal Info", "Education", "Skills", "Projects", "Experience","Preview"];
  const forms = useSelector((state) => state.form);
  const currentStep = useSelector((state) => state.form.currentStep);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const dispatch=useDispatch();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.mainCard}>
          <h1 className={styles.mainTitle}>
            Professional Resume Builder
          </h1>

          <Stepper steps={steps} currentStep={currentStep} />

          <div className={styles.stepContent}>
            {currentStep === 1 && <PersonalInfo currentStep={currentStep} />}
            {currentStep === 2 && <Education currentStep={currentStep} />}
            {currentStep === 3 && <Skill currentStep={currentStep} />}
            {currentStep === 4 && <Project />}
            {currentStep === 5 && <Experience />}
            {currentStep === 6 && <ResumePreviewPage 
            formData={forms.formData}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}/>}
          </div>

          {currentStep !== 6 && <div className={styles.previewButtonContainer}>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={styles.previewButton}
            >
              {showPreview ? 'Hide Preview' : '👁️ Preview Resume'}
            </button>
          </div>}

          <div className={styles.navigationButtons}>
  {currentStep > 1 && (
    <button
      className={styles.backButton}
      onClick={() => dispatch(prevStep())}
    >
      ← Back
    </button>
  )}
</div>
        </div>

        {showPreview && (
          <ResumePreview
            formData={forms.formData}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            onClose={() => setShowPreview(false)}
          />
        )}
      </div>
    </div>
  );
}