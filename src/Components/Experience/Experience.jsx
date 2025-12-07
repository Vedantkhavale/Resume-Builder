import React, { useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../../Redux/formSlice";
import styles from "./Experience.module.css";

export default function Experience() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData);

  const [isFresher, setIsFresher] = useState(formData.isFresher || false);
  const [experienceList, setExperienceList] = useState(
    formData.experience || [
      {
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]
  );
  const [errors, setErrors] = useState({});

  const addExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeExperience = (index) => {
    setExperienceList(experienceList.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...experienceList];
    updated[index][field] = value;
    setExperienceList(updated);
    
    const errorKey = `${index}_${field}`;
    if (errors[errorKey]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };

  const validateExperience = () => {
    if (isFresher) return true;

    const newErrors = {};
    
    experienceList.forEach((exp, index) => {
      if (!exp.jobTitle.trim()) {
        newErrors[`${index}_jobTitle`] = "Job title is required";
      }
      if (!exp.company.trim()) {
        newErrors[`${index}_company`] = "Company name is required";
      }
      if (!exp.description.trim()) {
        newErrors[`${index}_description`] = "Description is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateExperience()) {
      return;
    }

    dispatch(
      setFormData({
        ...formData,
        experience: isFresher ? [] : experienceList,
        isFresher: isFresher,
      })
    );

    alert("✅ Resume completed successfully! You can now preview and download your resume.");
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Experience Details</h3>
      <p className={styles.subtitle}>Tell us about your professional journey</p>

      <div className={styles.fresherCheck}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={isFresher}
            onChange={() => setIsFresher(!isFresher)}
            className={styles.checkbox}
          />
          <span className={styles.checkboxText}>
            I am a Fresher (No Work Experience)
          </span>
        </label>
      </div>

      {!isFresher &&
        experienceList.map((exp, index) => (
          <div key={index} className={styles.experienceCard}>
            <div className={styles.cardHeader}>
              <h5 className={styles.cardTitle}>
                <span className={styles.badge}>Experience {index + 1}</span>
              </h5>
              {experienceList.length > 1 && (
                <button
                  onClick={() => removeExperience(index)}
                  className={styles.removeButton}
                  type="button"
                >
                  ✕ Remove
                </button>
              )}
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Job Title <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Software Engineer"
                  value={exp.jobTitle}
                  onChange={(e) => handleChange(index, "jobTitle", e.target.value)}
                  className={`${styles.input} ${errors[`${index}_jobTitle`] ? styles.errorInput : ""}`}
                />
                {errors[`${index}_jobTitle`] && (
                  <p className={styles.errorText}>{errors[`${index}_jobTitle`]}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Company Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Tech Solutions Inc."
                  value={exp.company}
                  onChange={(e) => handleChange(index, "company", e.target.value)}
                  className={`${styles.input} ${errors[`${index}_company`] ? styles.errorInput : ""}`}
                />
                {errors[`${index}_company`] && (
                  <p className={styles.errorText}>{errors[`${index}_company`]}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Start Date</label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Start Date"
                    value={exp.startDate ? new Date(exp.startDate) : null}
                    onChange={(newVal) =>
                      handleChange(index, "startDate", newVal?.toISOString() || "")
                    }
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        className: styles.datePicker
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>End Date</label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="End Date (or Present)"
                    value={exp.endDate ? new Date(exp.endDate) : null}
                    onChange={(newVal) =>
                      handleChange(index, "endDate", newVal?.toISOString() || "")
                    }
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        className: styles.datePicker
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Job Description <span className={styles.required}>*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Describe your responsibilities, achievements, and tools used..."
                value={exp.description}
                onChange={(e) => handleChange(index, "description", e.target.value)}
                className={`${styles.textarea} ${errors[`${index}_description`] ? styles.errorInput : ""}`}
              />
              {errors[`${index}_description`] && (
                <p className={styles.errorText}>{errors[`${index}_description`]}</p>
              )}
            </div>
          </div>
        ))}

      {!isFresher && (
        <button
          onClick={addExperience}
          className={styles.addButton}
          type="button"
        >
          <span className={styles.addIcon}>+</span> Add More Experience
        </button>
      )}

      <div className={styles.buttonContainer}>
        <button
          onClick={handleSubmit}
          className={styles.submitButton}
          type="button"
        >
          Complete Resume ✓
        </button>
      </div>
    </div>
  );
}