import React, { useState } from 'react'
import { Button, Form, FormGroup, Input,Label } from 'reactstrap'
import { nextStep, setFormData } from '../../Redux/formSlice';
import styles from './PersonalInfo.module.css'
import { useDispatch } from 'react-redux';

export default function PersonalInfo({currentStep,setCurrentStep}) {
const dispatch=useDispatch();

  const [personalInfo,setPersonalInfo]=useState({
name:"",
email:"",
phone:"",
address:"",
linkedInProfile:"",
portfolioOrGitHub:""
// profileImage: null
  });

   const [errors, setErrors] = useState({});


const handleChange = (type, e) => {
    const val = e.target.value;
     if (type === "name") {
    if (!/^[a-zA-Z\s]*$/.test(val)) return; 
  }

   if (type === "phone") {
    if (!/^\d*$/.test(val)) return; 
    if(val.length===11) return;
  }


    setPersonalInfo((prev) => ({ ...prev, [type]: val }));
    setErrors((prev) => ({ ...prev, [type]: "" })); // clear error while typing
  };

  const validateForm=()=>{
    const newError={};
    Object.keys(personalInfo).forEach((key)=>{
      if (key === "linkedInProfile" || key === "portfolioOrGitHub") return;

      if(!personalInfo[key].trim()){
        newError[key]="Field is required";
      }
    });

    if (personalInfo.name && !/^[a-zA-Z\s]+$/.test(personalInfo.name)) {
    newError.name = "Name should contain only letters";
  }

  if (personalInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
    newError.email = "Enter a valid email address";
  }

  if (personalInfo.phone && !/^\d{10}$/.test(personalInfo.phone)) {
    newError.phone = "Phone must be 10 digits";
  }


    setErrors(newError);
    return Object.keys(newError).length===0;
  }

  const handlePersonalInfoSubmit=(e)=>{
     e.preventDefault();
    if(!validateForm()){
      return;
    }

dispatch(setFormData(personalInfo));
    // setCurrentStep(currentStep+1);
    dispatch(nextStep());
  }
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Personal Information</h3>
      <Form onSubmit={handlePersonalInfoSubmit} className={styles.form}>
        {/* Name */}
        <FormGroup className={styles.formGroup}>
          <Label for="name" className={styles.label}>Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={personalInfo.name}
            onChange={(e) => handleChange("name", e)}
            placeholder="Enter your name"
           className={`${styles.input} ${errors.name ? styles.errorInput : ""}`}
          />
            {errors.name && <p className={styles.errorText}>{errors.name}</p>}
        </FormGroup>

        {/* Email */}
        <FormGroup className={styles.formGroup}>
          <Label for="email" className={styles.label}>Email</Label>
          <Input
            id="email"
            name="email"
            type="text"
            value={personalInfo.email}
            onChange={(e) => handleChange("email", e)}
            placeholder="Enter your email"
            className={`${styles.input} ${errors.email ? styles.errorInput : ""}`}
          />
            {errors.name && <p className={styles.errorText}>{errors.email}</p>}
        </FormGroup>

        {/* Phone */}
        <FormGroup className={styles.formGroup}>
          <Label for="phone" className={styles.label}>Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => handleChange("phone", e)}
            placeholder="Enter your phone"
           className={`${styles.input} ${errors.phone ? styles.errorInput : ""}`}
          />
            {errors.name && <p className={styles.errorText}>{errors.phone}</p>}
        </FormGroup>

        {/* Address */}
        <FormGroup className={styles.formGroup}>
          <Label for="address" className={styles.label}>Address</Label>
          <Input
            id="address"
            name="address"
            type="textarea"
            value={personalInfo.address}
            onChange={(e) => handleChange("address", e)}
            placeholder="Enter your address"
            className={`${styles.textarea} ${errors.address ? styles.errorInput : ""}`}
          />
            {errors.name && <p className={styles.errorText}>{errors.address}</p>}
        </FormGroup>

        {/* LinkedIn */}
        <FormGroup className={styles.formGroup}>
          <Label for="linkedInProfile" className={styles.label}>LinkedIn Profile</Label>
          <Input
            id="linkedInProfile"
            name="linkedInProfile"
            type="text"
            value={personalInfo.linkedInProfile}
            onChange={(e) => handleChange("linkedInProfile", e)}
            placeholder="Enter your LinkedIn profile"
            className={`${styles.input} ${errors.linkedInProfile ? styles.errorInput : ""}`}
          />
            {errors.name && <p className={styles.errorText}>{errors.linkedInProfile}</p>}
        </FormGroup>

        {/* Portfolio/GitHub */}
        <FormGroup className={styles.formGroup}>
          <Label for="portfolioOrGitHub" className={styles.label}>Portfolio / GitHub</Label>
          <Input
            id="portfolioOrGitHub"
            name="portfolioOrGitHub"
            type="text"
            value={personalInfo.portfolioOrGitHub}
            onChange={(e) => handleChange("portfolioOrGitHub", e)}
            placeholder="Enter your portfolio or GitHub link"
            className={`${styles.input} ${errors.portfolioOrGitHub ? styles.errorInput : ""}`}
          />
           {errors.name && <p className={styles.errorText}>{errors.portfolioOrGitHub}</p>}
        </FormGroup>

        <Button color="primary" type="submit" className={styles.button}>
          Submit
        </Button>
      </Form>
    </div>
  )
}
