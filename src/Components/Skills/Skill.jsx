import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Skills.module.css";
import { skillMap } from "./SkillsData";
import { nextStep, setFormData } from "../../Redux/formSlice";

export default function Skill({ onNext }) {
  const dispatch = useDispatch();
  const persistedForm = useSelector((state) => state.form.formData || {});

  const [selectedStream, setSelectedStream] = useState(persistedForm.selectedStream || "");
  const [selectedSkills, setSelectedSkills] = useState(persistedForm.skills || {});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedStream) {
      const domain = skillMap[selectedStream];
      if (!domain) return;
      const keys = Object.keys(domain.displayCategories);
      const initial = {};
      keys.forEach((k) => {
        initial[k] = (persistedForm.skills && persistedForm.skills[k]) || [];
      });
      setSelectedSkills(initial);
    }
  }, [selectedStream]);

  useEffect(() => {
    if (!selectedStream && persistedForm.selectedStream) {
      setSelectedStream(persistedForm.selectedStream);
    }
  }, []);

  const handleStreamPick = (streamKey) => {
    setSelectedStream(streamKey);
    const domain = skillMap[streamKey];
    if (domain) {
      const initial = {};
      Object.keys(domain.displayCategories).forEach((k) => (initial[k] = []));
      setSelectedSkills(initial);
    }
    setErrors({});
  };

  const handleSkillToggle = (categoryKey, skill) => {
    setSelectedSkills((prev) => {
      const currentSkills = prev[categoryKey] || [];
      const updated = currentSkills.includes(skill)
        ? currentSkills.filter(s => s !== skill)
        : [...currentSkills, skill];
      return { ...prev, [categoryKey]: updated };
    });
  };

  const validateSkills = () => {
    const newErrors = {};
    
    if (!selectedStream) {
      newErrors.stream = "Please select a stream";
      setErrors(newErrors);
      return false;
    }

    const hasAnySkill = Object.values(selectedSkills).some(arr => arr && arr.length > 0);
    if (!hasAnySkill) {
      newErrors.skills = "Please select at least one skill";
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (!validateSkills()) {
      return;
    }

    dispatch(setFormData({ selectedStream, skills: selectedSkills }));
    dispatch(nextStep());
  };

  const renderStreamButtons = () => (
    <div className={styles.streams}>
      {Object.keys(skillMap).map((streamKey) => (
        <button
          key={streamKey}
          type="button"
          className={`${styles.streamBtn} ${selectedStream === streamKey ? styles.active : ""}`}
          onClick={() => handleStreamPick(streamKey)}
        >
          {streamKey}
        </button>
      ))}
    </div>
  );

  const renderSkillSelectors = () => {
    if (!selectedStream) return null;
    const domain = skillMap[selectedStream];
    if (!domain) return null;

    const { displayCategories, lists } = domain;

    return (
      <div className={styles.skillGrid}>
        {Object.keys(displayCategories).map((categoryKey) => (
          <div key={categoryKey} className={styles.skillBox}>
            <h4 className={styles.categoryTitle}>{displayCategories[categoryKey]}</h4>

            <div className={styles.skillChipsContainer}>
              {(lists[categoryKey] || []).map((skill) => {
                const isSelected = selectedSkills[categoryKey]?.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillToggle(categoryKey, skill)}
                    className={`${styles.skillChip} ${isSelected ? styles.skillChipSelected : ''}`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Which stream / domain do you belong to?</h2>
      <p className={styles.subtitle}>Select your field of study or expertise</p>

      {errors.stream && (
        <div className={styles.errorBanner}>
          <span className={styles.errorIcon}>⚠</span>
          {errors.stream}
        </div>
      )}

      {renderStreamButtons()}

      {selectedStream ? (
        <>
          <h3 className={styles.sectionTitle}>
            Select relevant skills for: <span className={styles.streamName}>{selectedStream}</span>
          </h3>

          {errors.skills && (
            <div className={styles.errorBanner}>
              <span className={styles.errorIcon}>⚠</span>
              {errors.skills}
            </div>
          )}

          {renderSkillSelectors()}

          <div className={styles.actions}>
            <button
              type="button"
              onClick={() => {
                setSelectedStream("");
                setSelectedSkills({});
                setErrors({});
              }}
              className={styles.changeButton}
            >
              ← Change Stream
            </button>

            <button
              type="button"
              onClick={handleSave}
              className={styles.saveButton}
            >
              Save & Continue →
            </button>
          </div>
        </>
      ) : (
        <div className={styles.hintBox}>
          <p className={styles.hint}>
            👆 Pick a stream above to start selecting your skills
          </p>
        </div>
      )}
    </div>
  );
}