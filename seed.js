const API = "http://localhost:5000/api";
const post = (url, body) => fetch(`${API}${url}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then(r => r.json());

async function seed() {
  // Register user
  const user = await post("/users/register", { fullName: "Aishwarya Shivareddi", email: "aishwarya@learnhub.com", password: "Learn123!" }).catch(() => null);
  const userId = user?.userId || 1;
  console.log("User:", userId);

  // Courses
  const coursesData = [
    { title: "HTML & CSS Fundamentals", description: "Learn semantic HTML5 and modern CSS3 from scratch.", lessons: ["Introduction to HTML5","Semantic Elements & Structure","Forms and Input Types","CSS Selectors & Specificity","Flexbox & Grid Layout","Responsive Design with Media Queries"] },
    { title: "JavaScript Essentials", description: "Master core JavaScript concepts and DOM manipulation.", lessons: ["Variables, Types & Operators","Control Flow & Loops","Functions & Scope","Arrays & Objects","DOM Manipulation","Events & Event Handling","Async JavaScript & Promises"] },
    { title: "React for Beginners", description: "Build modern UIs with React components and hooks.", lessons: ["JSX & Components","Props & State","Hooks: useState & useEffect","Conditional Rendering","Lists & Keys","React Router Basics"] },
    { title: "Node.js & Express", description: "Server-side JavaScript with REST API development.", lessons: ["Node.js Runtime & Modules","Express Setup & Routing","Middleware & Error Handling","REST API Design","Database Integration"] }
  ];

  for (const cd of coursesData) {
    const course = await post("/courses", { title: cd.title, description: cd.description, createdBy: userId });
    console.log("Course:", course.courseId, course.title);
    for (let i = 0; i < cd.lessons.length; i++) {
      await post("/lessons", { courseId: course.courseId, title: cd.lessons[i], content: `Lesson content for: ${cd.lessons[i]}`, orderIndex: i + 1 });
    }
  }

  // Quiz for course 1
  const quiz = await post("/quizzes", { courseId: 1, title: "Web Fundamentals Quiz" });
  console.log("Quiz:", quiz.quizId);

  const questions = [
    { questionText: "Which HTML element is used for the largest heading?", optionA: "<h6>", optionB: "<heading>", optionC: "<h1>", optionD: "<head>", correctAnswer: "C" },
    { questionText: "What does CSS stand for?", optionA: "Creative Style Sheets", optionB: "Cascading Style Sheets", optionC: "Computer Style Sheets", optionD: "Colorful Style Sheets", correctAnswer: "B" },
    { questionText: "Which keyword declares a block-scoped variable in JavaScript?", optionA: "var", optionB: "let", optionC: "define", optionD: "dim", correctAnswer: "B" },
    { questionText: "What is the correct syntax for an arrow function?", optionA: "function => ()", optionB: "=> function()", optionC: "() => {}", optionD: "function() =>", correctAnswer: "C" },
    { questionText: "Which method converts a JSON string to a JavaScript object?", optionA: "JSON.stringify()", optionB: "JSON.parse()", optionC: "JSON.toObject()", optionD: "JSON.convert()", correctAnswer: "B" },
    { questionText: "What does the async keyword do?", optionA: "Makes a function synchronous", optionB: "Makes a function return a Promise", optionC: "Stops function execution", optionD: "Declares a variable", correctAnswer: "B" },
    { questionText: "Which CSS property creates a grid container?", optionA: "display: flex", optionB: "display: grid", optionC: "display: block", optionD: "display: table", correctAnswer: "B" },
    { questionText: "What is the default HTTP method for a form submission?", optionA: "POST", optionB: "PUT", optionC: "GET", optionD: "PATCH", correctAnswer: "C" },
    { questionText: "Which React hook manages component state?", optionA: "useEffect", optionB: "useContext", optionC: "useState", optionD: "useRef", correctAnswer: "C" },
    { questionText: "What does REST stand for?", optionA: "Representational State Transfer", optionB: "Remote Execution Standard Technology", optionC: "Reliable Server Transmission", optionD: "Resource State Tracking", correctAnswer: "A" }
  ];

  for (const q of questions) {
    await post("/questions", { quizId: quiz.quizId, ...q });
  }

  console.log("Seed complete!");
}

seed();
