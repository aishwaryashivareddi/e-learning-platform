const courses = [
  {
    id: 1,
    title: "HTML & CSS Fundamentals",
    description: "Learn semantic HTML5 and modern CSS3 from scratch.",
    icon: "bi-filetype-html",
    color: "#e44d26",
    lessons: [
      "Introduction to HTML5",
      "Semantic Elements & Structure",
      "Forms and Input Types",
      "CSS Selectors & Specificity",
      "Flexbox & Grid Layout",
      "Responsive Design with Media Queries"
    ],
    totalLessons: 6
  },
  {
    id: 2,
    title: "JavaScript Essentials",
    description: "Master core JavaScript concepts and DOM manipulation.",
    icon: "bi-filetype-js",
    color: "#f7df1e",
    lessons: [
      "Variables, Types & Operators",
      "Control Flow & Loops",
      "Functions & Scope",
      "Arrays & Objects",
      "DOM Manipulation",
      "Events & Event Handling",
      "Async JavaScript & Promises"
    ],
    totalLessons: 7
  },
  {
    id: 3,
    title: "React for Beginners",
    description: "Build modern UIs with React components and hooks.",
    icon: "bi-filetype-jsx",
    color: "#61dafb",
    lessons: [
      "JSX & Components",
      "Props & State",
      "Hooks: useState & useEffect",
      "Conditional Rendering",
      "Lists & Keys",
      "React Router Basics"
    ],
    totalLessons: 6
  },
  {
    id: 4,
    title: "Node.js & Express",
    description: "Server-side JavaScript with REST API development.",
    icon: "bi-hdd-network",
    color: "#68a063",
    lessons: [
      "Node.js Runtime & Modules",
      "Express Setup & Routing",
      "Middleware & Error Handling",
      "REST API Design",
      "Database Integration"
    ],
    totalLessons: 5
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which HTML element is used for the largest heading?",
    options: ["<h6>", "<heading>", "<h1>", "<head>"],
    correct: 2
  },
  {
    id: 2,
    question: "What does CSS stand for?",
    options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
    correct: 1
  },
  {
    id: 3,
    question: "Which keyword declares a block-scoped variable in JavaScript?",
    options: ["var", "let", "define", "dim"],
    correct: 1
  },
  {
    id: 4,
    question: "What is the correct syntax for an arrow function?",
    options: ["function => ()", "=> function()", "() => {}", "function() =>"],
    correct: 2
  },
  {
    id: 5,
    question: "Which method converts a JSON string to a JavaScript object?",
    options: ["JSON.stringify()", "JSON.parse()", "JSON.toObject()", "JSON.convert()"],
    correct: 1
  },
  {
    id: 6,
    question: "What does the 'async' keyword do?",
    options: [
      "Makes a function synchronous",
      "Makes a function return a Promise",
      "Stops function execution",
      "Declares a variable"
    ],
    correct: 1
  },
  {
    id: 7,
    question: "Which CSS property creates a grid container?",
    options: ["display: flex", "display: grid", "display: block", "display: table"],
    correct: 1
  },
  {
    id: 8,
    question: "What is the default HTTP method for a form submission?",
    options: ["POST", "PUT", "GET", "PATCH"],
    correct: 2
  },
  {
    id: 9,
    question: "Which React hook manages component state?",
    options: ["useEffect", "useContext", "useState", "useRef"],
    correct: 2
  },
  {
    id: 10,
    question: "What does REST stand for?",
    options: [
      "Representational State Transfer",
      "Remote Execution Standard Technology",
      "Reliable Server Transmission",
      "Resource State Tracking"
    ],
    correct: 0
  }
];

function calculatePercentage(score, total) {
  if (total <= 0) return 0;
  return Math.round((score / total) * 100);
}

function getGrade(percentage) {
  if (percentage >= 90) return "A+";
  else if (percentage >= 80) return "A";
  else if (percentage >= 70) return "B";
  else if (percentage >= 60) return "C";
  else if (percentage >= 50) return "D";
  else return "F";
}

function isPass(percentage) {
  return percentage >= 50;
}

function getFeedback(grade) {
  switch (grade) {
    case "A+": return "Outstanding! You have mastered this topic!";
    case "A":  return "Excellent work! You have a strong understanding.";
    case "B":  return "Good job! Keep practicing to improve further.";
    case "C":  return "Fair performance. Review the lessons again.";
    case "D":  return "You barely passed. Revisit the course material.";
    case "F":  return "You did not pass. Please retake the quiz after studying.";
    default:   return "Complete the quiz to see your feedback.";
  }
}

const Storage = {
  get(key) {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : null;
    } catch { return null; }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getProgress() {
    return this.get("courseProgress") || {};
  },
  setProgress(courseId, completed) {
    const progress = this.getProgress();
    progress[courseId] = completed;
    this.set("courseProgress", progress);
  },
  getCompletedLessons(courseId) {
    const progress = this.getProgress();
    return progress[courseId] || 0;
  },
  saveQuizResult(result) {
    const results = this.get("quizResults") || [];
    results.push(result);
    this.set("quizResults", results);
  },
  getQuizResults() {
    return this.get("quizResults") || [];
  },
  getProfile() {
    return this.get("learnerProfile") || {
      name: "Aishwarya Shivareddi",
      email: "aishwaryashivareddi@gmail.com",
      joined: "Feb 2026",
      role: "Learner"
    };
  },
  getUserId() {
    return this.get("userId") || 2;
  },
  setUserId(id) {
    this.set("userId", id);
  }
};

function loadQuizData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(quizQuestions);
    }, 1500);
  });
}

async function fetchQuiz() {
  const questions = await loadQuizData();
  return questions;
}

// Fetch courses from backend API, fallback to local data
async function fetchCoursesFromApi() {
  try {
    if (typeof Api === 'undefined') return null;
    const apiCourses = await Api.getCourses();
    if (!apiCourses || !apiCourses.length) return null;
    // Enrich with lessons from API
    const enriched = [];
    for (const c of apiCourses) {
      const lessons = await Api.getLessons(c.courseId) || [];
      const icons = ['bi-filetype-html','bi-filetype-js','bi-filetype-jsx','bi-hdd-network'];
      const colors = ['#e44d26','#f7df1e','#61dafb','#68a063'];
      const idx = enriched.length;
      enriched.push({
        id: c.courseId,
        title: c.title,
        description: c.description,
        icon: icons[idx % icons.length],
        color: colors[idx % colors.length],
        lessons: lessons.map(l => l.title),
        totalLessons: lessons.length
      });
    }
    return enriched;
  } catch { return null; }
}

// Fetch quiz questions from backend API, fallback to local data
async function fetchQuizFromApi(courseId) {
  try {
    if (typeof Api === 'undefined') return null;
    const quizzes = await Api.getQuizzes(courseId);
    if (!quizzes || !quizzes.length) return null;
    const quiz = await Api.getQuizQuestions(quizzes[0].quizId);
    if (!quiz || !quiz.questions || !quiz.questions.length) return null;
    return { quizId: quiz.quizId, questions: quiz.questions };
  } catch { return null; }
}


function initNav(activePage) {
  const links = document.querySelectorAll("nav.main-nav a");
  links.forEach(link => {
    if (link.getAttribute("data-page") === activePage) {
      link.setAttribute("data-active", "true");
    }
  });
  const hamburger = document.querySelector(".hamburger");
  const navList = document.querySelector("nav.main-nav ul");
  if (hamburger && navList) {
    hamburger.addEventListener("click", () => navList.classList.toggle("open"));
  }
}

// Export for Jest (Node.js environment)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { calculatePercentage, getGrade, isPass, getFeedback, courses, quizQuestions };
}
