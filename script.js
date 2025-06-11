   // Grade Points mapping
    const gradePointsMap = {
      "O": 10,
      "A+": 9,
      "A": 8,
      "B+": 7,
      "B": 6,
      "C": 5,
      "RA": 0, // Re-appear / Fail
      "Ab": 0  // Absent
    };

    // Tab functionality
    function openTab(tabName) {
      const tabs = document.getElementsByClassName("tab");
      const tabContents = document.getElementsByClassName("tab-content");
      
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
        tabContents[i].classList.remove("active");
      }
      
      document.getElementById(tabName).classList.add("active");
      event.currentTarget.classList.add("active");
      
      // Initialize containers when switching tabs
      if (tabName === 'gpa-calculator' && document.getElementById('courses-container').children.length === 0) {
        document.getElementById('courses-container').appendChild(createCourseInput());
      }
      if (tabName === 'cgpa-calculator' && document.getElementById('semesters-container').children.length === 0) {
        document.getElementById('semesters-container').appendChild(createSemesterInput());
      }
    }

    // Grade Predictor Calculation
function calculateGrade() {
  const internal = parseFloat(document.getElementById('internal').value);
  const target = parseFloat(document.getElementById('target').value);
  const maxExternal = 40;
  const resultElement = document.getElementById('grade-result');

  if (isNaN(internal) || internal < 0 || internal > 60) {
    resultElement.innerHTML = "⚠️ Please enter a valid internal mark (0–60).";
    return;
  }
  if (isNaN(target) || target < 0 || target > 100) {
    resultElement.innerHTML = "⚠️ Please enter a valid target total mark (0–100).";
    return;
  }

  // Calculate required external marks out of 40
  const requiredExternal = Math.ceil(target - internal);

  // Convert required external marks (out of 40) to semester marks (out of 75)
  const requiredSemester = (requiredExternal * (75 / 40)).toFixed(1);

  let status = "";
    if (requiredExternal <= 0) {
        resultElement.innerHTML = "✅ You already have enough marks!<br><br>" +
                                 `Semester marks needed: ${requiredSemester}/75`;
      } else if (requiredExternal > maxExternal) {
        resultElement.innerHTML = `❌ You need ${requiredExternal}/40 in externals (not possible)<br><br>` +
                                 `Semester marks needed: ${requiredSemester}/75<br><br>` +
                                 "Try aiming for a lower grade.";
      } else {
        resultElement.innerHTML = `🎯 External marks needed: ${requiredExternal}/40<br><br>` +
                                 `Semester marks needed: ${requiredSemester}/75`;
      }
    }




    // Create a course input row
    function createCourseInput() {
      const div = document.createElement("div");
      div.className = "course";

      // Credits input
      const credits = document.createElement("input");
      credits.type = "number";
      credits.placeholder = "Credits";
      credits.min = 1;
      credits.required = true;

      // Grade select
      const gradeSelect = document.createElement("select");
      gradeSelect.required = true;
      const grades = ["O", "A+", "A", "B+", "B", "C", "RA", "Ab"];
      grades.forEach(g => {
        const option = document.createElement("option");
        option.value = g;
        option.textContent = g;
        gradeSelect.appendChild(option);
      });

      // Remove button
      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.textContent = "Remove";
      removeBtn.className = "btn-danger";
      removeBtn.title = "Remove this course";
      removeBtn.onclick = () => div.remove();

      div.appendChild(credits);
      div.appendChild(gradeSelect);
      div.appendChild(removeBtn);

      return div;
    }

    // Create a semester input row for CGPA
    function createSemesterInput() {
      const div = document.createElement("div");
      div.className = "semester";

      // Semester GPA input
      const gpaInput = document.createElement("input");
      gpaInput.type = "number";
      gpaInput.placeholder = "Semester GPA (e.g. 8.5)";
      gpaInput.min = 0;
      gpaInput.max = 10;
      gpaInput.step = 0.01;
      gpaInput.required = true;

      // Semester Credits input
      const creditsInput = document.createElement("input");
      creditsInput.type = "number";
      creditsInput.placeholder = "Total Credits";
      creditsInput.min = 1;
      creditsInput.required = true;

      // Remove button
      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.textContent = "Remove";
      removeBtn.className = "btn-danger";
      removeBtn.title = "Remove this semester";
      removeBtn.onclick = () => div.remove();

      div.appendChild(gpaInput);
      div.appendChild(creditsInput);
      div.appendChild(removeBtn);

      return div;
    }

    // GPA Calculation
   // Grade to points mapping
const gradePoints = {
  "O": 10,
  "A+": 9,
  "A": 8,
  "B+": 7,
  "B": 6,
  "C": 5,
  "W": 0,
  "*": 0,
  "Ab": 0,
  "I": 0,
  "F": 0
};

// Complete course data for 2021 regulation
const courseData = {
  "CSE": {
    "1": [
      { name: "Foreign Language", credits: 3 },
      { name: "Philosophy of Engineering", credits: 2 },
      { name: "Calculus and Linear Algebra", credits: 4 },
      { name: "Chemistry", credits: 5 },
      { name: "Introduction to Computational Biology", credits: 2 },
      { name: "Programming for Problem Solving", credits: 4 },
      { name: "Basic Civil & Mechanical Workshop", credits: 2 }
    ],
    "2": [
      { name: "Communicative English", credits: 3 },
      { name: "Advanced Calculus & Complex Analysis", credits: 4 },
      { name: "Semiconductor Physics", credits: 5 },
      { name: "Engineering Graphics & Design", credits: 2 },
      { name: "Electrical & Electronics Engg", credits: 4 },
      { name: "Object Oriented Design and Programming", credits: 3 }
    ],
    "3": [
      { name: "Transforms & Boundary Value Problems", credits: 4 },
      { name: "Design Thinking & Methodology", credits: 3 },
      { name: "Computer Organization & Architecture", credits: 4 },
      { name: "Data Structures & Algorithms", credits: 4 },
      { name: "Operating Systems", credits: 4 },
      { name: "Advanced Programming Practice", credits: 4 }
    ],
    "4": [
      { name: "Probability & Queueing Theory", credits: 4 },
      { name: "Design & Analysis of Algorithms", credits: 4 },
      { name: "Database Management Systems", credits: 4 },
      { name: "Artificial Intelligence", credits: 3 },
      { name: "Professional Elective-I", credits: 3 },
      { name: "Social Engineering", credits: 2 },
      { name: "Universal Human Values", credits: 3 }
    ],
    "5": [
      { name: "Discrete Mathematics", credits: 4 },
      { name: "Formal Language & Automata", credits: 3 },
      { name: "Computer Networks", credits: 4 },
      { name: "Machine Learning", credits: 3 },
      { name: "Professional Elective-II", credits: 3 },
      { name: "Open Elective-I", credits: 3 },
      { name: "Community Connect", credits: 1 }
    ],
    "6": [
      { name: "Data Science", credits: 2 },
      { name: "Software Engineering & Project Management", credits: 3 },
      { name: "Compiler Design", credits: 3 },
      { name: "Professional Elective-III", credits: 3 },
      { name: "Professional Elective-IV", credits: 3 },
      { name: "Open Elective-II", credits: 3 },
      { name: "Project/MOOC", credits: 3 }
    ],
    "7": [
      { name: "Behavioral Psychology", credits: 3 },
      { name: "Professional Elective-V", credits: 3 },
      { name: "Professional Elective-VI", credits: 3 },
      { name: "Professional Elective-VII", credits: 3 },
      { name: "Professional Elective-VIII", credits: 3 },
      { name: "Open Elective-III", credits: 3 }
    ],
    "8": [
      { name: "Major Project/Internship", credits: 15 }
    ]
  },
  "AI-ML": {
    "1": [
      { name: "Communicative English", credits: 3 },
      { name: "Calculus & Linear Algebra", credits: 4 },
      { name: "Semiconductor Physics", credits: 5 },
      { name: "Engineering Graphics & Design", credits: 2 },
      { name: "Electrical & Electronics Engg", credits: 4 },
      { name: "Programming for Problem Solving", credits: 4 }
    ],
    "2": [
      { name: "Foreign Language", credits: 3 },
      { name: "Philosophy of Engineering", credits: 2 },
      { name: "Advanced Calculus & Complex Analysis", credits: 4 },
      { name: "Chemistry", credits: 5 },
      { name: "Introduction to Computational Biology", credits: 2 },
      { name: "Object Oriented Programming", credits: 3 },
      { name: "Workshop", credits: 2 }
    ],
    "3": [
      { name: "Transforms & Boundary Value Problems", credits: 4 },
      { name: "Design Thinking & Methodology", credits: 3 },
      { name: "Computer Organization & Architecture", credits: 4 },
      { name: "Data Structures & Algorithms", credits: 4 },
      { name: "Operating Systems", credits: 4 },
      { name: "Advanced Programming Practice", credits: 4 }
    ],
    "4": [
      { name: "Probability & Queueing Theory", credits: 4 },
      { name: "Design & Analysis of Algorithms", credits: 4 },
      { name: "Database Management Systems", credits: 4 },
      { name: "Artificial Intelligence", credits: 3 },
      { name: "Professional Elective-I", credits: 3 },
      { name: "Social Engineering", credits: 2 },
      { name: "Universal Human Values", credits: 3 }
    ],
    "5": [
      { name: "Discrete Mathematics", credits: 4 },
      { name: "Formal Language & Automata", credits: 3 },
      { name: "Computer Networks", credits: 4 },
      { name: "Machine Learning", credits: 3 },
      { name: "Professional Elective-II", credits: 3 },
      { name: "Open Elective-I", credits: 3 },
      { name: "Community Connect", credits: 1 }
    ],
    "6": [
      { name: "Data Science", credits: 2 },
      { name: "Software Engineering & Project Management", credits: 3 },
      { name: "Compiler Design", credits: 3 },
      { name: "Professional Elective-III", credits: 3 },
      { name: "Professional Elective-IV", credits: 3 },
      { name: "Open Elective-II", credits: 3 },
      { name: "Project/MOOC", credits: 3 }
    ],
    "7": [
      { name: "Behavioral Psychology", credits: 3 },
      { name: "Professional Elective-V", credits: 3 },
      { name: "Professional Elective-VI", credits: 3 },
      { name: "Deep Learning Techniques", credits: 4 },
      { name: "Report Writing", credits: 2 },
      { name: "Open Elective-III", credits: 3 }
    ],
    "8": [
      { name: "Major Project/Internship", credits: 15 }
    ]
  },
  "Big Data Analytics": {
    "1": [
      { name: "Foreign Language", credits: 3 },
      { name: "Philosophy of Engineering", credits: 2 },
      { name: "Calculus & Linear Algebra", credits: 4 },
      { name: "Chemistry", credits: 5 },
      { name: "Introduction to Computational Biology", credits: 2 },
      { name: "Programming for Problem Solving", credits: 4 },
      { name: "Workshop", credits: 2 }
    ],
    "2": [
      { name: "Communicative English", credits: 3 },
      { name: "Advanced Calculus & Complex Analysis", credits: 4 },
      { name: "Semiconductor Physics", credits: 5 },
      { name: "Engineering Graphics & Design", credits: 2 },
      { name: "Electrical & Electronics Engg", credits: 4 },
      { name: "Object Oriented Programming", credits: 3 }
    ],
    "3": [
      { name: "Transforms & Boundary Value Problems", credits: 4 },
      { name: "Design Thinking & Methodology", credits: 3 },
      { name: "Fundamentals of Data Science", credits: 5 },
      { name: "Data Structures & Algorithms", credits: 4 },
      { name: "Operating Systems", credits: 4 },
      { name: "Advanced OOP", credits: 3 }
    ],
    "4": [
      { name: "Probability & Statistics", credits: 4 },
      { name: "Design & Analysis of Algorithms", credits: 4 },
      { name: "Database Management Systems", credits: 4 },
      { name: "Artificial Intelligence", credits: 3 },
      { name: "Professional Elective-I", credits: 3 },
      { name: "Social Engineering", credits: 2 },
      { name: "Universal Human Values", credits: 3 }
    ],
    "5": [
      { name: "Discrete Mathematics", credits: 4 },
      { name: "Formal Language & Automata", credits: 3 },
      { name: "Computer Networks", credits: 4 },
      { name: "Machine Learning for Data Analytics", credits: 3 },
      { name: "Professional Elective-II", credits: 3 },
      { name: "Open Elective-I", credits: 3 },
      { name: "Community Connect", credits: 1 }
    ],
    "6": [
      { name: "Full Stack Development", credits: 2 },
      { name: "Software Engineering & Project Management", credits: 3 },
      { name: "Compiler Design", credits: 3 },
      { name: "Professional Elective-III", credits: 3 },
      { name: "Professional Elective-IV", credits: 3 },
      { name: "Open Elective-II", credits: 3 },
      { name: "Project/MOOC", credits: 3 }
    ],
    "7": [
      { name: "Behavioral Psychology", credits: 3 },
      { name: "Professional Elective-V", credits: 3 },
      { name: "Professional Elective-VI", credits: 3 },
      { name: "Professional Elective-VII", credits: 3 },
      { name: "Professional Elective-VIII", credits: 3 },
      { name: "Open Elective-III", credits: 3 }
    ],
    "8": [
      { name: "Major Project/Internship", credits: 15 }
    ]
  },
  "Cybersecurity": {
    "1": [
      { name: "Foreign Language", credits: 3 },
      { name: "Philosophy of Engineering", credits: 2 },
      { name: "Calculus & Linear Algebra", credits: 4 },
      { name: "Chemistry", credits: 5 },
      { name: "Introduction to Computational Biology", credits: 2 },
      { name: "Programming for Problem Solving", credits: 4 },
      { name: "Workshop", credits: 2 }
    ],
    "2": [
      { name: "Communicative English", credits: 3 },
      { name: "Advanced Calculus & Complex Analysis", credits: 4 },
      { name: "Semiconductor Physics", credits: 5 },
      { name: "Engineering Graphics & Design", credits: 2 },
      { name: "Electrical & Electronics Engg", credits: 4 },
      { name: "Object Oriented Programming", credits: 3 }
    ],
    "3": [
      { name: "Numerical Methods & Analysis", credits: 4 },
      { name: "Design Thinking & Methodology", credits: 3 },
      { name: "Computer Organization & Architecture", credits: 4 },
      { name: "Data Structures & Algorithms", credits: 4 },
      { name: "Operating Systems", credits: 4 },
      { name: "Advanced Programming Practice", credits: 4 }
    ],
    "4": [
      { name: "Probability & Queueing Theory", credits: 4 },
      { name: "Design & Analysis of Algorithms", credits: 4 },
      { name: "Database Management Systems", credits: 4 },
      { name: "Artificial Intelligence", credits: 3 },
      { name: "Professional Elective-I", credits: 3 },
      { name: "Social Engineering", credits: 2 },
      { name: "Universal Human Values", credits: 3 }
    ],
    "5": [
      { name: "Discrete Mathematics", credits: 4 },
      { name: "Formal Language & Automata", credits: 3 },
      { name: "Computer Networks", credits: 4 },
      { name: "Security Risk Management Principles", credits: 3 },
      { name: "Professional Elective-II", credits: 3 },
      { name: "Open Elective-I", credits: 3 },
      { name: "Community Connect", credits: 1 }
    ],
    "6": [
      { name: "Data Science", credits: 2 },
      { name: "Software Engineering & Project Management", credits: 3 },
      { name: "Malware Analysis", credits: 3 },
      { name: "Professional Elective-III", credits: 3 },
      { name: "Professional Elective-IV", credits: 3 },
      { name: "Open Elective-II", credits: 3 },
      { name: "Project/MOOC", credits: 3 }
    ],
    "7": [
      { name: "Behavioral Psychology", credits: 3 },
      { name: "Professional Elective-V", credits: 3 },
      { name: "Professional Elective-VI", credits: 3 },
      { name: "Professional Elective-VII", credits: 3 },
      { name: "Professional Elective-VIII", credits: 3 },
      { name: "Open Elective-III", credits: 3 }
    ],
    "8": [
      { name: "Major Project/Internship", credits: 15 }
    ]
  },
  "IT": {
    "1": [
      { name: "Foreign Language", credits: 3 },
      { name: "Philosophy of Engineering", credits: 2 },
      { name: "Calculus & Linear Algebra", credits: 4 },
      { name: "Chemistry", credits: 5 },
      { name: "Introduction to Computational Biology", credits: 2 },
      { name: "Programming for Problem Solving", credits: 4 },
      { name: "Workshop", credits: 2 }
    ],
    "2": [
      { name: "Communicative English", credits: 3 },
      { name: "Advanced Calculus & Complex Analysis", credits: 4 },
      { name: "Semiconductor Physics", credits: 5 },
      { name: "Engineering Graphics & Design", credits: 2 },
      { name: "Electrical & Electronics Engg", credits: 4 },
      { name: "Object Oriented Programming", credits: 3 }
    ],
    "3": [
      { name: "Numerical Methods & Analysis", credits: 4 },
      { name: "Design Thinking & Methodology", credits: 3 },
      { name: "Computer Organization & Architecture", credits: 4 },
      { name: "Data Structures & Algorithms", credits: 4 },
      { name: "Operating Systems", credits: 4 },
      { name: "Advanced Programming Practice", credits: 4 }
    ],
    "4": [
      { name: "Probability & Queueing Theory", credits: 4 },
      { name: "Design & Analysis of Algorithms", credits: 4 },
      { name: "Database Management Systems", credits: 4 },
      { name: "Artificial Intelligence", credits: 3 },
      { name: "Professional Elective-I", credits: 3 },
      { name: "Social Engineering", credits: 2 },
      { name: "Universal Human Values", credits: 3 }
    ],
    "5": [
      { name: "Discrete Mathematics", credits: 4 },
      { name: "Formal Language & Automata", credits: 3 },
      { name: "Computer Networks", credits: 4 },
      { name: "Big Data Essentials", credits: 3 },
      { name: "Professional Elective-II", credits: 3 },
      { name: "Open Elective-I", credits: 3 },
      { name: "Community Connect", credits: 1 }
    ],
    "6": [
      { name: "Data Science", credits: 2 },
      { name: "Software Engineering Perspectives", credits: 3 },
      { name: "Information Retrieval Techniques", credits: 3 },
      { name: "Professional Elective-III", credits: 3 },
      { name: "Professional Elective-IV", credits: 3 },
      { name: "Open Elective-II", credits: 3 },
      { name: "Project/MOOC", credits: 3 }
    ],
    "7": [
      { name: "Behavioral Psychology", credits: 3 },
      { name: "Professional Elective-V", credits: 3 },
      { name: "Professional Elective-VI", credits: 3 },
      { name: "Professional Elective-VII", credits: 3 },
      { name: "Professional Elective-VIII", credits: 3 },
      { name: "Open Elective-III", credits: 3 }
    ],
    "8": [
      { name: "Major Project/Internship", credits: 15 }
    ]
  },
  "ECE": {
    "1": [
      { name: "Communicative English", credits: 3 },
      { name: "Calculus & Linear Algebra", credits: 4 },
      { name: "Physics (EM Theory)", credits: 5 },
      { name: "Engineering Graphics & Design", credits: 2 },
      { name: "Electrical & Electronics Engg", credits: 4 }
    ],
    "2": [
      { name: "Foreign Language", credits: 3 },
      { name: "Philosophy of Engineering", credits: 2 },
      { name: "Advanced Calculus & Complex Analysis", credits: 4 },
      { name: "Chemistry", credits: 5 },
      { name: "Electronic System & PCB Design", credits: 3 },
      { name: "Programming for Problem Solving", credits: 4 },
      { name: "Biology", credits: 2 },
      { name: "Workshop", credits: 2 }
    ],
    "3": [
      { name: "Transforms & Boundary Value Problems", credits: 4 },
      { name: "Social Engineering", credits: 2 },
      { name: "Computer Organization & Architecture", credits: 4 },
      { name: "Solid State Devices", credits: 3 },
      { name: "Digital Logic Design", credits: 3 },
      { name: "EM Theory & Interference", credits: 3 },
      { name: "Devices & Digital IC Lab", credits: 2 },
      { name: "Universal Human Values", credits: 3 }
    ],
    "4": [
      { name: "Probability & Stochastic Process", credits: 4 },
      { name: "Analog & Linear Electronic Circuits", credits: 3 },
      { name: "Signal Processing", credits: 3 },
      { name: "Analog Circuits Lab", credits: 2 },
      { name: "Artificial Intelligence", credits: 3 },
      { name: "Professional Elective-I", credits: 3 },
      { name: "Design Thinking & Methodology", credits: 3 }
    ],
    "5": [
      { name: "Discrete Mathematics", credits: 4 },
      { name: "Microprocessor & Interfacing", credits: 4 },
      { name: "VLSI Design", credits: 3 },
      { name: "VLSI Design Lab", credits: 2 },
      { name: "Professional Elective-II", credits: 3 },
      { name: "Open Elective-I", credits: 3 },
      { name: "Community Connect", credits: 1 }
    ],
    "6": [
      { name: "Data Science", credits: 2 },
      { name: "Analog & Digital Communication", credits: 3 },
      { name: "Microwave & Optical Comm", credits: 3 },
      { name: "Communication Lab", credits: 2 },
      { name: "Professional Elective-III", credits: 3 },
      { name: "Professional Elective-IV", credits: 3 },
      { name: "Open Elective-II", credits: 3 },
      { name: "Project/MOOC", credits: 3 }
    ],
    "7": [
      { name: "Behavioral Psychology", credits: 3 },
      { name: "Wireless Comm & Antenna Systems", credits: 3 },
      { name: "Computer Comm & Network Security", credits: 3 },
      { name: "Professional Elective-V", credits: 3 },
      { name: "Professional Elective-VI", credits: 3 },
      { name: "Open Elective-III", credits: 3 }
    ],
    "8": [
      { name: "Major Project/Internship", credits: 15 }
    ]
  },
  "Biotechnology": {
    "1": [
      { name: "Communicative English", credits: 3 },
      { name: "Calculus & Linear Algebra", credits: 4 },
      { name: "Physics (EM Theory)", credits: 5 },
      { name: "Engineering Graphics & Design", credits: 2 },
      { name: "Electrical & Electronics Engg", credits: 4 }
    ],
    "2": [
      { name: "Foreign Language", credits: 3 },
      { name: "Philosophy of Engineering", credits: 2 },
      { name: "Advanced Calculus & Complex Analysis", credits: 4 },
      { name: "Chemistry", credits: 5 },
      { name: "Cell Biology", credits: 2 },
      { name: "Programming for Problem Solving", credits: 4 },
      { name: "Biochemistry", credits: 3 },
      { name: "Workshop", credits: 2 }
    ],
    "3": [
      { name: "Basic Chemical Engineering", credits: 3 },
      { name: "Social Engineering", credits: 2 },
      { name: "Biochemistry Lab", credits: 2 },
      { name: "Microbiology", credits: 3 },
      { name: "Microbiology Lab", credits: 2 },
      { name: "Bioprocess Principles", credits: 3 },
      { name: "Bioprocess Principles Lab", credits: 2 },
      { name: "Genetics & Cytogenetics", credits: 3 },
      { name: "Universal Human Values", credits: 3 }
    ],
    "4": [
      { name: "Chemical Engg Principles", credits: 4 },
      { name: "Artificial Intelligence", credits: 3 },
      { name: "Molecular Biology", credits: 3 },
      { name: "Molecular Biology Lab", credits: 2 },
      { name: "Bioprocess Engineering", credits: 3 },
      { name: "Bioprocess Engg Lab", credits: 2 },
      { name: "Professional Elective-I", credits: 3 },
      { name: "Design Thinking & Methodology", credits: 3 }
    ],
    "5": [
      { name: "Bio-Statistics", credits: 4 },
      { name: "Gene Manipulation & Genomics", credits: 4 },
      { name: "Immunology", credits: 4 },
      { name: "Protein Engineering", credits: 3 },
      { name: "Professional Elective-II", credits: 3 },
      { name: "Open Elective-I", credits: 3 },
      { name: "Community Connect", credits: 1 }
    ],
    "6": [
      { name: "Data Science", credits: 2 },
      { name: "Animal Biotechnology", credits: 3 },
      { name: "Animal Biotech Lab", credits: 2 },
      { name: "Plant Biotechnology", credits: 3 },
      { name: "Professional Elective-III", credits: 3 },
      { name: "Open Elective-II", credits: 3 },
      { name: "Project/MOOC", credits: 3 }
    ],
    "7": [
      { name: "Plant Biotech Lab", credits: 2 },
      { name: "Bio Separation Technology", credits: 4 },
      { name: "Professional Elective-IV", credits: 3 },
      { name: "Professional Elective-V", credits: 3 },
      { name: "Open Elective-III", credits: 3 },
      { name: "Behavioral Psychology", credits: 3 }
    ],
    "8": [
      { name: "Major Project/Internship", credits: 15 }
    ]
  },
  "EEE": {
    "1": [
      { name: "Communicative English", credits: 3 },
      { name: "Calculus & Linear Algebra", credits: 4 },
      { name: "Physics (EM Theory)", credits: 5 },
      { name: "Engineering Graphics & Design", credits: 2 },
      { name: "Electrical & Electronics Engg", credits: 4 }
    ],
    "2": [
      { name: "Foreign Language", credits: 3 },
      { name: "Philosophy of Engineering", credits: 2 },
      { name: "Advanced Calculus & Complex Analysis", credits: 4 },
      { name: "Chemistry", credits: 5 },
      { name: "Electric Circuits", credits: 3 },
      { name: "Programming for Problem Solving", credits: 4 },
      { name: "Biology", credits: 2 },
      { name: "Workshop", credits: 2 }
    ],
    "3": [
      { name: "Transforms & Computational Techniques", credits: 4 },
      { name: "Social Engineering", credits: 2 },
      { name: "Applied Engg Mechanics", credits: 3 },
      { name: "Analog Electronics", credits: 4 },
      { name: "EM Theory", credits: 3 },
      { name: "Electrical Machines-I", credits: 3 },
      { name: "Universal Human Values", credits: 3 }
    ],
    "4": [
      { name: "Probability & Statistics", credits: 4 },
      { name: "Digital System Design", credits: 4 },
      { name: "Electrical Machines-II", credits: 3 },
      { name: "Artificial Intelligence", credits: 3 },
      { name: "Control Systems", credits: 3 },
      { name: "Sensors & Instruments", credits: 3 },
      { name: "Design Thinking & Methodology", credits: 3 }
    ],
    "5": [
      { name: "Discrete Mathematics", credits: 4 },
      { name: "Power Electronics", credits: 4 },
      { name: "Digital Signal Processing", credits: 3 },
      { name: "Power System-I", credits: 3 },
      { name: "Professional Elective-I", credits: 3 },
      { name: "Open Elective-I", credits: 3 },
      { name: "Community Connect", credits: 1 }
    ],
    "6": [
      { name: "Data Science", credits: 2 },
      { name: "Power System-II", credits: 4 },
      { name: "Microcontroller", credits: 3 },
      { name: "Professional Elective-II", credits: 3 },
      { name: "Professional Elective-III", credits: 3 },
      { name: "Open Elective-II", credits: 3 },
      { name: "Project/MOOC", credits: 3 }
    ],
    "7": [
      { name: "Behavioral Psychology", credits: 3 },
      { name: "Professional Elective-IV", credits: 3 },
      { name: "Professional Elective-V", credits: 3 },
      { name: "Professional Elective-VI", credits: 3 },
      { name: "Professional Elective-VII", credits: 3 },
      { name: "Open Elective-III", credits: 3 }
    ],
    "8": [
      { name: "Major Project/Internship", credits: 15 }
    ]
  }
};

// DOM manipulation functions
function onCourseChange() {
  const course = document.getElementById("course").value;
  const semesterSelect = document.getElementById("semester");
  const semLabel = document.getElementById("semLabel");
  const subjectsTable = document.getElementById("subjectsTable");
  const calcBtn = document.getElementById("calcBtn");
  const resultDiv = document.getElementById("result");
  const subjectsBody = document.getElementById("subjectsBody");

  // Clear previous data
  subjectsBody.innerHTML = "";
  resultDiv.innerText = "";
  subjectsTable.style.display = "none";
  calcBtn.style.display = "none";

  if (!course) {
    semesterSelect.style.display = "none";
    semLabel.style.display = "none";
    semesterSelect.innerHTML = '<option value="">-- Select Semester --</option>';
    return;
  }

  // Populate semesters dropdown
  const semesters = Object.keys(courseData[course]).sort((a, b) => a - b);
  semesterSelect.innerHTML = '<option value="">-- Select Semester --</option>';
  semesters.forEach(sem => {
    semesterSelect.innerHTML += `<option value="${sem}">Semester ${sem}</option>`;
  });

  // Show semester selection
  semesterSelect.style.display = "inline-block";
  semLabel.style.display = "inline-block";
}

function loadSubjects() {
  const course = document.getElementById("course").value;
  const semester = document.getElementById("semester").value;
  const subjectsBody = document.getElementById("subjectsBody");
  const subjectsTable = document.getElementById("subjectsTable");
  const calcBtn = document.getElementById("calcBtn");
  const resultDiv = document.getElementById("result");

  // Clear previous data
  subjectsBody.innerHTML = "";
  resultDiv.innerText = "";

  if (!course || !semester) {
    subjectsTable.style.display = "none";
    calcBtn.style.display = "none";
    return;
  }

  const subjects = courseData[course][semester] || [];

  if (subjects.length === 0) {
    subjectsBody.innerHTML = '<tr><td colspan="3">No subjects found for this semester</td></tr>';
    subjectsTable.style.display = "table";
    calcBtn.style.display = "none";
    return;
  }

  // Populate subjects table
  subjects.forEach(subj => {
    const row = document.createElement("tr");
    
    // Subject name cell
    const nameCell = document.createElement("td");
    nameCell.textContent = subj.name;
    row.appendChild(nameCell);
    
    // Credits cell
    const creditCell = document.createElement("td");
    creditCell.textContent = subj.credits;
    row.appendChild(creditCell);
    
    // Grade selection cell
    const gradeCell = document.createElement("td");
    const select = document.createElement("select");
    select.className = "grade-select";
    select.dataset.credits = subj.credits;
    
    // Add all grade options
    Object.keys(gradePoints).forEach(grade => {
      const option = document.createElement("option");
      option.value = grade;
      option.textContent = grade;
      select.appendChild(option);
    });
    
    gradeCell.appendChild(select);
    row.appendChild(gradeCell);
    
    subjectsBody.appendChild(row);
  });

  // Show table and calculate button
  subjectsTable.style.display = "table";
  calcBtn.style.display = "inline-block";
}

function calculateGPA() {
  const gradeSelects = document.querySelectorAll(".grade-select");
  let totalCredits = 0;
  let totalPoints = 0;
  const resultDiv = document.getElementById("result");

  // Calculate total points and credits
  gradeSelects.forEach(select => {
    const grade = select.value;
    const credits = parseInt(select.dataset.credits);
    const points = gradePoints[grade];

    totalCredits += credits;
    totalPoints += points * credits;
  });


  if (totalCredits === 0) {
    resultDiv.textContent = "Cannot calculate GPA - no credits selected";
    resultDiv.style.color = "red";
    return;
  }

  // Calculate and display GPA
  const gpa = totalPoints / totalCredits;
  resultDiv.innerHTML = `
    <div class="result-container">
      <h3>GPA Result</h3>
      <p>Total Grade Points: ${totalPoints.toFixed(2)}</p>
      <p>Total Credits: ${totalCredits}</p>
      <p class="gpa-value">Your GPA: <strong>${gpa.toFixed(3)}</strong></p>
    </div>
  `;
  resultDiv.style.color = "#27ae60";
}

document.addEventListener("DOMContentLoaded", function() {
 
  document.getElementById("course").addEventListener("change", onCourseChange);
  document.getElementById("semester").addEventListener("change", loadSubjects);
  document.getElementById("calcBtn").addEventListener("click", calculateGPA);
  

  onCourseChange();
});

    // CGPA Calculation
    function calculateCGPA() {
      const semesters = [];
      const semesterDivs = document.getElementById('semesters-container').querySelectorAll(".semester");
      
      for (const div of semesterDivs) {
        const inputs = div.querySelectorAll("input");
        const gpa = inputs[0].value.trim();
        const credits = inputs[1].value.trim();
        
        if (!gpa || !credits) {
          alert("Please fill all semester details.");
          return;
        }
        
        semesters.push({ gpa, credits });
      }
      
      let totalGradePoints = 0;
      let totalCredits = 0;
      
      for (const sem of semesters) {
        const gpa = parseFloat(sem.gpa);
        const credits = parseFloat(sem.credits);
        
        if (isNaN(gpa) || isNaN(credits)) {
          alert("Please enter valid GPA and credits for all semesters.");
          return;
        }
        
        totalGradePoints += gpa * credits;
        totalCredits += credits;
      }
      
      if (totalCredits === 0) {
        document.getElementById('cgpa-result').textContent = "Please add at least one semester.";
        return;
      }
      
      const cgpa = totalGradePoints / totalCredits;
      document.getElementById('cgpa-result').textContent = `Your CGPA is: ${cgpa.toFixed(2)} (Percentage: ${(cgpa * 10).toFixed(2)}%)`;
    }


    document.addEventListener('DOMContentLoaded', function() {

      document.getElementById('add-course-btn').addEventListener('click', () => {
        document.getElementById('courses-container').appendChild(createCourseInput());
      });
      
      document.getElementById('add-semester-btn').addEventListener('click', () => {
        document.getElementById('semesters-container').appendChild(createSemesterInput());
      });
      
   
      document.getElementById('courses-container').appendChild(createCourseInput());
      document.getElementById('semesters-container').appendChild(createSemesterInput());
    });
    // Helper to create a semester input row
function createSemesterInput() {
  const semesterDiv = document.createElement('div');
  semesterDiv.className = 'semester';

  // Semester label
  const label = document.createElement('label');
  label.textContent = `Semester ${document.querySelectorAll('.semester').length + 1}:`;
  label.style.fontWeight = '600';
  label.style.marginRight = '10px';

  // GPA input
  const gpaInput = document.createElement('input');
  gpaInput.type = 'number';
  gpaInput.step = '0.01';
  gpaInput.min = '0';
  gpaInput.max = '10';
  gpaInput.placeholder = 'GPA (e.g. 8.5)';
  gpaInput.required = true;

  // Credits input
  const creditsInput = document.createElement('input');
  creditsInput.type = 'number';
  creditsInput.min = '1';
  creditsInput.placeholder = 'Credits (e.g. 24)';
  creditsInput.required = true;

  // Remove button
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = 'Remove';
  removeBtn.onclick = function() {
    semesterDiv.remove();
  };

  semesterDiv.appendChild(label);
  semesterDiv.appendChild(gpaInput);
  semesterDiv.appendChild(creditsInput);
  semesterDiv.appendChild(removeBtn);

  return semesterDiv;
}

// Add semester on button click
document.getElementById('add-semester-btn').onclick = function() {
  document.getElementById('semesters-container').appendChild(createSemesterInput());
};

  document.addEventListener("DOMContentLoaded", function() {
    var typed = new Typed('#typed-text', {
      strings: ['Your easy and accurate academic tool'],
      typeSpeed: 45,
      showCursor: true,
      cursorChar: '|'
    });
  });
