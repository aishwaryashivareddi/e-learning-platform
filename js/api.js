const API_BASE = "http://localhost:5000/api";

const Api = {
  async request(url, options = {}) {
    try {
      const res = await fetch(`${API_BASE}${url}`, {
        headers: { "Content-Type": "application/json" },
        ...options,
      });
      if (!res.ok) return null;
      if (res.status === 204) return true;
      return await res.json();
    } catch {
      return null;
    }
  },

  // Users
  async register(fullName, email, password) {
    return this.request("/users/register", { method: "POST", body: JSON.stringify({ fullName, email, password }) });
  },
  async getUser(id) { return this.request(`/users/${id}`); },
  async updateUser(id, data) { return this.request(`/users/${id}`, { method: "PUT", body: JSON.stringify(data) }); },

  // Courses
  async getCourses() { return this.request("/courses"); },
  async getCourse(id) { return this.request(`/courses/${id}`); },
  async createCourse(data) { return this.request("/courses", { method: "POST", body: JSON.stringify(data) }); },
  async updateCourse(id, data) { return this.request(`/courses/${id}`, { method: "PUT", body: JSON.stringify(data) }); },
  async deleteCourse(id) { return this.request(`/courses/${id}`, { method: "DELETE" }); },

  // Lessons
  async getLessons(courseId) { return this.request(`/courses/${courseId}/lessons`); },
  async createLesson(data) { return this.request("/lessons", { method: "POST", body: JSON.stringify(data) }); },

  // Quizzes
  async getQuizzes(courseId) { return this.request(`/quizzes/${courseId}`); },
  async getQuizQuestions(quizId) { return this.request(`/quizzes/${quizId}/questions`); },
  async createQuiz(data) { return this.request("/quizzes", { method: "POST", body: JSON.stringify(data) }); },
  async addQuestion(data) { return this.request("/questions", { method: "POST", body: JSON.stringify(data) }); },
  async submitQuiz(quizId, userId, answers) {
    return this.request(`/quizzes/${quizId}/submit`, { method: "POST", body: JSON.stringify({ userId, answers }) });
  },

  // Results
  async getResults(userId) { return this.request(`/results/${userId}`); },
};
