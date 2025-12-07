// ProjectBuilder.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Chip,
  Autocomplete,
  IconButton
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import styles from "./Project.module.css";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, setEducationStep, setFormData } from "../../Redux/formSlice";


const makeEmptyProject = (streamKey) => {
  const tpl = templates[streamKey] || templates.Default;
  const project = {};
  tpl.fields.forEach((f) => {
    if (f.type === "features") project[f.key] = [""]; // features array
    else if (f.type === "chips") project[f.key] = [];
    else project[f.key] = "";
  });
  return project;
};

// projectTemplates.js
export const templates = {
  "Engineering / IT": {
    displayName: "Engineering / IT",
    fields: [
      { key: "title", label: "Project Title", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "techStack", label: "Tech Stack", type: "chips", required: false, optionsKey: "techOptions" },
      { key: "features", label: "Features", type: "features", required: false },
      { key: "duration", label: "Duration", type: "text", required: false },
      { key: "github", label: "GitHub Link", type: "url", required: false },
      { key: "demo", label: "Live Demo", type: "url", required: false }
    ],
    options: {
      techOptions: [
        "JavaScript","TypeScript","React","Angular","Vue","Node.js","Express","Spring Boot",
        "Java","Python","Django","Flask","SQL","MySQL","PostgreSQL","MongoDB","Docker","Kubernetes","AWS"
      ]
    }
  },

  Commerce: {
    displayName: "Commerce",
    fields: [
      { key: "title", label: "Project Title", type: "text", required: true },
      { key: "domain", label: "Domain (e.g., Finance, Marketing)", type: "text", required: false },
      { key: "objective", label: "Objective / Summary", type: "textarea", required: true },
      { key: "tools", label: "Tools Used", type: "chips", optionsKey: "toolsOptions", required: false },
      { key: "outcome", label: "Outcome / Learning", type: "textarea", required: false },
      { key: "duration", label: "Duration", type: "text", required: false }
    ],
    options: {
      toolsOptions: ["Excel","QuickBooks","Zoho Books","Power BI","SPSS","Tableau"]
    }
  },

  Arts: {
    displayName: "Arts",
    fields: [
      { key: "title", label: "Project Title", type: "text", required: true },
      { key: "theme", label: "Theme / Topic", type: "text", required: false },
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "tools", label: "Tools Used", type: "chips", optionsKey: "toolsOptions", required: false },
      { key: "impact", label: "Impact / Exhibition / Outcome", type: "textarea", required: false },
      { key: "duration", label: "Duration", type: "text", required: false }
    ],
    options: {
      toolsOptions: ["Photoshop","Illustrator","Figma","Canva","Lightroom"]
    }
  },

  // fallback / default stream
  Default: {
    displayName: "General",
    fields: [
      { key: "title", label: "Project Title", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "tools", label: "Tools / Technologies", type: "chips", optionsKey: "toolsOptions", required: false },
      { key: "duration", label: "Duration", type: "text", required: false }
    ],
    options: {
      toolsOptions: ["MS Office","Google Sheets","Any Tool"]
    }
  }
};


export default function Project({ onNext }) {
  const dispatch = useDispatch();
  const persisted = useSelector((s) => s.form.formData || {}); // existing form data
  const selectedStream = persisted.selectedStream || "Engineering / IT";

  // initialize projects from redux if present, else a single empty project
  const [projects, setProjects] = useState(() => {
    if (persisted.projects && Array.isArray(persisted.projects) && persisted.projects.length)
      return persisted.projects;
    return [makeEmptyProject(selectedStream)];
  });

  useEffect(() => {
    // If user changes stream in other step, reset projects to template for new stream
    // (but preserve if user already had projects for that stream)
    if (!persisted.projects || persisted.selectedStream !== selectedStream) {
      setProjects([makeEmptyProject(selectedStream)]);
    }
    // eslint-disable-next-line
  }, [selectedStream]);

  const tpl = templates[selectedStream] || templates.Default;
  const options = tpl.options || {};

  const updateProjectField = (index, key, value) => {
    setProjects((prev) => {
      const p = [...prev];
      p[index] = { ...p[index], [key]: value };
      return p;
    });
  };

  const addFeature = (pIndex) => {
    setProjects((prev) => {
      const p = [...prev];
      p[pIndex] = { ...p[pIndex], features: [...(p[pIndex].features || []), ""] };
      return p;
    });
  };

  const updateFeature = (pIndex, fIndex, value) => {
    setProjects((prev) => {
      const p = [...prev];
      const f = [...(p[pIndex].features || [])];
      f[fIndex] = value;
      p[pIndex] = { ...p[pIndex], features: f };
      return p;
    });
  };

  const removeFeature = (pIndex, fIndex) => {
    setProjects((prev) => {
      const p = [...prev];
      const f = [...(p[pIndex].features || [])];
      f.splice(fIndex, 1);
      p[pIndex] = { ...p[pIndex], features: f.length ? f : [""] };
      return p;
    });
  };

  const addProject = () => setProjects((p) => [...p, makeEmptyProject(selectedStream)]);
  const removeProject = (index) => setProjects((p) => p.filter((_, i) => i !== index));

  const validateProject = (project) => {
    const errs = {};
    tpl.fields.forEach((f) => {
      if (f.required) {
        if (f.type === "features") {
          const arr = project[f.key] || [];
          if (!arr.some((it) => (it || "").trim())) errs[f.key] = `${f.label} required`;
        } else if (f.type === "chips") {
          // optional often; keep required logic if desired
          if ((project[f.key] || []).length === 0) errs[f.key] = `${f.label} required`;
        } else {
          if (!(project[f.key] || "").toString().trim()) errs[f.key] = `${f.label} required`;
        }
      }
      if (f.type === "url" && project[f.key]) {
        try {
          // quick URL check
          new URL(project[f.key]);
        } catch {
          errs[f.key] = "Enter a valid URL";
        }
      }
    });
    return errs;
  };

  const handleSave = () => {
    // Validate all projects
    const allErrors = projects.map((proj) => validateProject(proj));
    const hasError = allErrors.some((e) => Object.keys(e).length > 0);
    if (hasError) {
      // Show first error as alert (or you can integrate a fancy UI)
      const firstIdx = allErrors.findIndex((e) => Object.keys(e).length > 0);
      const firstErrKey = Object.keys(allErrors[firstIdx])[0];
      alert(`Please fill: ${firstErrKey} in project ${firstIdx + 1}`);
      return;
    }

    // dispatch into redux
    dispatch(setFormData({ projects, selectedStream }));
   dispatch(nextStep());
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Projects ({tpl.displayName})</Typography>

      {projects.map((project, idx) => (
        <Card key={idx} className={styles.card}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h6">Project {idx + 1}</Typography>
              {projects.length > 1 && (
                <IconButton color="error" onClick={() => removeProject(idx)}>
                  <Delete />
                </IconButton>
              )}
            </Box>

            {tpl.fields.map((field) => {
              const value = project[field.key];
              if (field.type === "text")
                return (
                  <TextField
                    key={field.key}
                    label={field.label}
                    value={value}
                    onChange={(e) => updateProjectField(idx, field.key, e.target.value)}
                    fullWidth
                    size="small"
                    sx={{ mb: 1 }}
                  />
                );

              if (field.type === "textarea")
                return (
                  <TextField
                    key={field.key}
                    label={field.label}
                    value={value}
                    onChange={(e) => updateProjectField(idx, field.key, e.target.value)}
                    fullWidth
                    size="small"
                    multiline
                    minRows={3}
                    sx={{ mb: 1 }}
                  />
                );

              if (field.type === "url")
                return (
                  <TextField
                    key={field.key}
                    label={field.label}
                    value={value}
                    onChange={(e) => updateProjectField(idx, field.key, e.target.value)}
                    fullWidth
                    size="small"
                    sx={{ mb: 1 }}
                  />
                );

              if (field.type === "chips") {
                const opts = options[field.optionsKey] || [];
                return (
                  <Autocomplete
                    key={field.key}
                    multiple
                    freeSolo
                    options={opts}
                    value={value || []}
                    onChange={(e, v) => updateProjectField(idx, field.key, v)}
                    renderTags={(val, getTagProps) => val.map((option, i) => (
                      <Chip key={option} label={option} {...getTagProps({ index: i })} />
                    ))}
                    renderInput={(params) => (
                      <TextField {...params} label={field.label} size="small" placeholder={`Add ${field.label}`} />
                    )}
                    sx={{ mb: 1 }}
                  />
                );
              }

              if (field.type === "features") {
                const list = value || [""];
                return (
                  <Box key={field.key} sx={{ mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>{field.label}</Typography>
                    {list.map((feat, fi) => (
                      <Box key={fi} display="flex" gap={1} alignItems="center" sx={{ mb: 1 }}>
                        <TextField
                          value={feat}
                          onChange={(e) => updateFeature(idx, fi, e.target.value)}
                          fullWidth
                          size="small"
                          placeholder={`Feature ${fi + 1}`}
                        />
                        <IconButton
                          color="error"
                          onClick={() => removeFeature(idx, fi)}
                          disabled={list.length === 1}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    ))}
                    <Button startIcon={<Add />} onClick={() => addFeature(idx)} size="small">Add Feature</Button>
                  </Box>
                );
              }

              return null;
            })}
          </CardContent>
        </Card>
      ))}

      <Box display="flex" gap={1} mb={2}>
        <Button variant="outlined" startIcon={<Add />} onClick={addProject}>Add Another Project</Button>
        <Button variant="contained" color="primary" onClick={handleSave}>Save Projects</Button>
      </Box>
    </Box>
  );
}
