// skillsData.js
export const skillMap = {
  "Engineering / IT": {
    displayCategories: {
      programmingLanguages: "Programming Languages",
      frontend: "Frontend",
      backend: "Backend",
      databases: "Databases",
      tools: "Tools",
      softSkills: "Soft Skills",
    },
    lists: {
      programmingLanguages: [
        "JavaScript",
        "TypeScript",
        "Java",
        "Python",
        "C",
        "C++",
        "Go",
        "Ruby",
        "Kotlin",
      ],
      frontend: ["HTML", "CSS", "React", "Angular", "Vue", "Svelte"],
      backend: ["Node.js", "Spring Boot", "Django", "Flask", "Express", "Laravel"],
      databases: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "SQLite"],
      tools: ["Git", "GitHub", "Docker", "Postman", "Jenkins", "VS Code"],
      softSkills: ["Problem Solving", "Communication", "Teamwork", "Time Management"],
    },
  },

  Commerce: {
    displayCategories: {
      accounting: "Accounting & Finance",
      tools: "Tools",
      softSkills: "Soft Skills",
    },
    lists: {
      accounting: ["Tally ERP", "Bookkeeping", "Financial Analysis", "GST Filing"],
      tools: ["Excel", "QuickBooks", "Zoho Books"],
      softSkills: ["Attention to Detail", "Communication", "Analytical Thinking"],
    },
  },

  Arts: {
    displayCategories: {
      creative: "Creative Skills",
      digitalTools: "Digital Tools",
      languages: "Languages",
      softSkills: "Soft Skills",
    },
    lists: {
      creative: ["Sketching", "Painting", "Acting", "Creative Writing", "Photography"],
      digitalTools: ["Photoshop", "Illustrator", "Figma", "Canva"],
      languages: ["English", "Hindi", "Marathi", "Spanish"],
      softSkills: ["Creativity", "Presentation", "Storytelling"],
    },
  },

  Science: {
    displayCategories: {
      labSkills: "Laboratory Skills",
      software: "Software / Tools",
      softSkills: "Soft Skills",
    },
    lists: {
      labSkills: ["Spectroscopy", "Chromatography", "Microscopy"],
      software: ["MATLAB", "R", "Python", "SPSS"],
      softSkills: ["Analytical Thinking", "Observational Skills"],
    },
  },

  Management: {
    displayCategories: {
      management: "Management Skills",
      tools: "Tools",
      softSkills: "Soft Skills",
    },
    lists: {
      management: ["Leadership", "Project Management", "Stakeholder Management"],
      tools: ["MS Excel", "JIRA", "Asana", "Trello"],
      softSkills: ["Decision Making", "Communication", "Negotiation"],
    },
  },

  // add more streams/domains as needed...
};
