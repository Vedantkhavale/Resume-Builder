import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label, Row, Col } from "reactstrap";
import styles from "./Education.module.css";
// import DatePicker from "react-datepicker";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, setEducationStep, setFormData } from "../../Redux/formSlice";

export default function Education() {
  const [errors, setErrors] = useState({});
   const formData = useSelector((state) => state.form.formData);
   const educationStep = useSelector((state) => state.form.educationStep);
   

const [activeForm, setActiveForm] = useState(educationStep || "HSC");
   const dispatch=useDispatch();
console.log("formData",formData)
  const [educationData, setEducationData] = useState({
    HSC: { board: "", school: "", stream: "", passingYear: "", percentage: "" },
    SSC: { board: "", school: "", passingYear: "", percentage: "" },
    Degree: { degreeName: "", collegeName: "", university: "", percentage: "" },
  });


const [universityOptions, setUniversityOptions] = useState([]);
const [uniLoading, setUniLoading] = useState(false);

useEffect(() => {
  dispatch(setEducationStep(activeForm));
}, [activeForm, dispatch]);


const fetchUniversities = async (search) => {
  try {
    setUniLoading(true);
    const res = await axios.get(
      // `https://universities.hipolabs.com/search?name=${encodeURIComponent(search)}`
       `http://universities.hipolabs.com/search?country=India`
    );
    const names = res.data.map((u) => ({
      label: u.name,
      value: u.name,
    }));
    console.log("res",names);
    setUniversityOptions(names);
  } catch (err) {
    console.error("University fetch error", err);
  } finally {
    setUniLoading(false);
  }
};

// In your useEffect to trigger maybe on mount or when component loads
useEffect(() => {
  fetchUniversities(); // Maybe fetch a initial list or no filter
}, []);



// In your component, you could use debounce as user types to fetch suggestions




  const handleChange = (section, field, value) => {
    setEducationData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  // ✅ Validation function
  const validate = (section) => {
    const formData = educationData[section];
    const newErrors = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = "This field is required";
    });

    if (formData.passingYear && !/^\d{4}$/.test(formData.passingYear)) {
      newErrors.passingYear = "Enter a valid 4-digit year";
    }

    if (
      formData.percentage &&
      (isNaN(formData.percentage) ||
        formData.percentage < 0 ||
        formData.percentage > 100)
    ) {
      newErrors.percentage = "Percentage must be between 0 and 100";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = (section) => {
  if (!validate(section)) return;

  console.log("✅ Submitted:", educationData[section]);

  const updatedFormData = {
    ...formData,
    [section]: educationData[section],
  };

  dispatch(setFormData(updatedFormData));

  if (section === "HSC") {
    setActiveForm("SSC");
    dispatch(setEducationStep("SSC"));git push -u origin main
  } else if (section === "SSC") {
    setActiveForm("Degree");
    dispatch(setEducationStep("Degree"));
  } else {
    dispatch(setEducationStep("Completed"));
    // alert("🎉 All education details saved successfully!");
     dispatch(nextStep());
  }
};



  const renderInput = (section, field, label, type = "text") => (
    <FormGroup className={styles.fieldContainer}>
      <Label>{label}</Label>
      <Input
        type={type}
        value={educationData[section][field]}
        onChange={(e) => handleChange(section, field, e.target.value)}
          className={`${styles.input} ${errors[field] ? styles.errorInput : ""}`}
      />
      {errors[field] && <p className={styles.errorText}>{errors[field]}</p>}
    </FormGroup>
  );

const renderDate = (section, field, label) => (
  <FormGroup className={styles.fieldContainer}>
    <Label>{label}</Label>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
     <DatePicker
  views={["year"]}
  label={label}
  value={
    educationData[section][field]
      ? new Date(educationData[section][field], 0)
      : null
  }
  onChange={(newValue) => {
    if (newValue)
      handleChange(section, field, newValue.getFullYear().toString());
  }}
  slotProps={{
    textField: {
      fullWidth: true,
      size: "small",
      placeholder: "Select Year",
      error: !!errors[field],
      helperText: errors[field],
      sx: {
        "& .MuiInputBase-root": {
          borderRadius: "8px",
          height: "40px", // ✅ matches TextField height
        },
        "& .MuiInputBase-input": {
          padding: "8px 10px",
          fontSize: "0.95rem",
        },
      },
    },
  }}
/>

    </LocalizationProvider>
    {/* {errors[field] && <p className={styles.errorText}>{errors[field]}</p>} */}
  </FormGroup>
);



  const renderForm = (section) => {
    const forms = {
      HSC: (
        <>
          <Row>
            <Col md={6}>{renderInput("HSC", "board", "Board Name")}</Col>
            <Col md={6}>{renderInput("HSC", "school", "School Name")}</Col>
          </Row>
          <Row>
            <Col md={6}>{renderInput("HSC", "stream", "Stream")}</Col>
            <Col md={6}>{renderDate("HSC", "passingYear", "Passing Year")}</Col>
          </Row>
          <Row>
            <Col md={6}>{renderInput("HSC", "percentage", "Percentage")}</Col>
          </Row>
          <div className={styles.buttonContainer}>
            <Button color="primary" onClick={() => handleSubmit("HSC")}>
              Save & Next
            </Button>
          </div>
        </>
      ),
      SSC: (
        <>
          <Row>
            <Col md={6}>{renderInput("SSC", "board", "Board Name")}</Col>
            <Col md={6}>{renderInput("SSC", "school", "School Name")}</Col>
          </Row>
          <Row>
            <Col md={6}>{renderDate("SSC", "passingYear", "Passing Year")}</Col>
            <Col md={6}>{renderInput("SSC", "percentage", "Percentage")}</Col>
          </Row>
          <div className={styles.buttonContainer}>
            <Button color="primary" onClick={() => handleSubmit("SSC")}>
              Save & Next
            </Button>
          </div>
        </>
      ),
      Degree: (
        <>
          <Row>
            <Col md={6}>{renderInput("Degree", "degreeName", "Degree Name")}</Col>
            <Col md={6}>{renderInput("Degree", "collegeName", "College Name")}</Col>
          </Row>
          <Row>
            <Col md={6}>
            <FormGroup className={styles.fieldContainer}>
  <Label>University</Label>
  <Autocomplete
    options={universityOptions}
    loading={uniLoading}
    onInputChange={(event, newInputValue) => {
      if (newInputValue.length > 2) fetchUniversities(newInputValue);
    }}
    onChange={(event, newValue) => {
      handleChange("Degree", "university", newValue?.label || "");
    }}
    value={
      universityOptions.find(
        (opt) => opt.label === educationData.Degree.university
      ) || null
    }
    fullWidth
    renderInput={(params) => (
      <TextField
        {...params}
        label="University"
        fullWidth
        size="small"
        placeholder="Select University"
        error={!!errors.university}
        helperText={errors.university}
        sx={{
          "& .MuiInputBase-root": { borderRadius: "8px", height: "40px"},
        }}

        
      />
    )}
  />
</FormGroup>

            </Col>
            <Col md={6}>{renderInput("Degree", "percentage", "Percentage")}</Col>
          </Row>
            <Row>
            <Col md={6}>{renderDate("Degree", "passingYear", "Passing Year")}</Col>
            </Row>
          <div className={styles.buttonContainer}>
            <Button color="success" onClick={() => handleSubmit("Degree")}>
              Finish
            </Button>
          </div>
        </>
      ),
    };
    return <Form>{forms[section]}</Form>;
  };

  return (
    <div className={styles.container}>
      {["HSC", "SSC", "Degree"].map((section) => (
        <div key={section} className={styles.section}>
          <div
            className={styles.header}
            onClick={() => setActiveForm(section)}
          >
            <span>{section}</span>
            <span>{activeForm === section ? "▲" : "▼"}</span>
          </div>
          {activeForm === section && (
            <div className={styles.formContainer}>{renderForm(section)}</div>
          )}
        </div>
      ))}
    </div>
  );
}
