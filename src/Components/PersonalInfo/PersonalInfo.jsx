import React, { useState } from 'react';
import { nextStep, setFormData } from '../../Redux/formSlice';
import styles from './PersonalInfo.module.css';
import { useDispatch, useSelector } from 'react-redux';

export default function PersonalInfo({ currentStep }) {
  const dispatch = useDispatch();
  const storedData = useSelector((state) => state.form.formData);

  const [personalInfo, setPersonalInfo] = useState({
    name: storedData.name || '',
    email: storedData.email || '',
    phone: storedData.phone || '',
    address: storedData.address || '',
    linkedInProfile: storedData.linkedInProfile || '',
    portfolioOrGitHub: storedData.portfolioOrGitHub || ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (type, e) => {
    const val = e.target.value;
    
    if (type === "name") {
      if (!/^[a-zA-Z\s]*$/.test(val)) return;
    }

    if (type === "phone") {
      if (!/^\d*$/.test(val)) return;
      if (val.length === 11) return;
    }

    setPersonalInfo((prev) => ({ ...prev, [type]: val }));
    setErrors((prev) => ({ ...prev, [type]: "" }));
  };

  const validateForm = () => {
    const newError = {};
    
    if (!personalInfo.name.trim()) {
      newError.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(personalInfo.name)) {
      newError.name = "Name should contain only letters";
    }

    if (!personalInfo.email.trim()) {
      newError.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
      newError.email = "Enter a valid email address";
    }

    if (!personalInfo.phone.trim()) {
      newError.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(personalInfo.phone)) {
      newError.phone = "Phone must be 10 digits";
    }

    if (!personalInfo.address.trim()) {
      newError.address = "Address is required";
    }

    setErrors(newError);
    return Object.keys(newError).length === 0;
  };

  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    dispatch(setFormData(personalInfo));
    dispatch(nextStep());
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Personal Information</h3>
      <p className={styles.subtitle}>Let's start with your basic details</p>
      
      <form onSubmit={handlePersonalInfoSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          {/* Name */}
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Full Name <span className={styles.required}>*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={personalInfo.name}
              onChange={(e) => handleChange("name", e)}
              placeholder="John Doe"
              className={`${styles.input} ${errors.name ? styles.errorInput : ""}`}
            />
            {errors.name && <p className={styles.errorText}>{errors.name}</p>}
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address <span className={styles.required}>*</span>
            </label>
            <input
              id="email"
              name="email"
              type="text"
              value={personalInfo.email}
              onChange={(e) => handleChange("email", e)}
              placeholder="john.doe@example.com"
              className={`${styles.input} ${errors.email ? styles.errorInput : ""}`}
            />
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          </div>

          {/* Phone */}
          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              Phone Number <span className={styles.required}>*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => handleChange("phone", e)}
              placeholder="9876543210"
              className={`${styles.input} ${errors.phone ? styles.errorInput : ""}`}
            />
            {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
          </div>

          {/* Address */}
          <div className={styles.formGroup}>
            <label htmlFor="address" className={styles.label}>
              Address <span className={styles.required}>*</span>
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={personalInfo.address}
              onChange={(e) => handleChange("address", e)}
              placeholder="Mumbai, Maharashtra"
              className={`${styles.input} ${errors.address ? styles.errorInput : ""}`}
            />
            {errors.address && <p className={styles.errorText}>{errors.address}</p>}
          </div>

          {/* LinkedIn */}
          <div className={styles.formGroup}>
            <label htmlFor="linkedInProfile" className={styles.label}>
              LinkedIn Profile <span className={styles.optional}>(Optional)</span>
            </label>
            <input
              id="linkedInProfile"
              name="linkedInProfile"
              type="text"
              value={personalInfo.linkedInProfile}
              onChange={(e) => handleChange("linkedInProfile", e)}
              placeholder="linkedin.com/in/johndoe"
              className={styles.input}
            />
          </div>

          {/* Portfolio/GitHub */}
          <div className={styles.formGroup}>
            <label htmlFor="portfolioOrGitHub" className={styles.label}>
              Portfolio / GitHub <span className={styles.optional}>(Optional)</span>
            </label>
            <input
              id="portfolioOrGitHub"
              name="portfolioOrGitHub"
              type="text"
              value={personalInfo.portfolioOrGitHub}
              onChange={(e) => handleChange("portfolioOrGitHub", e)}
              placeholder="github.com/johndoe"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.button}>
            Save & Continue →
          </button>
        </div>
      </form>
    </div>
  );
}