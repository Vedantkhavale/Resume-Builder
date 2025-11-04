import { createSlice } from "@reduxjs/toolkit";

const formSlice=createSlice({
    name:"form",
    initialState:{
        formData: {},
        currentStep: 1,
        educationStep: "HSC"
    },
    reducers:{
        setFormData:(state,action)=>{
            state.formData={...state.formData,...action.payload};
        },
         setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      if (state.currentStep > 1) state.currentStep -= 1;
    },
        clearFormData:(state)=>{
            state.formData={};
        },
          setEducationStep: (state, action) => {
      state.educationStep = action.payload;
    },
    }
});

export const {setFormData,clearFormData,setCurrentStep, nextStep, prevStep,setEducationStep}=formSlice.actions;
export default formSlice.reducer;