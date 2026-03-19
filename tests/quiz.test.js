const { calculatePercentage, getGrade, isPass, getFeedback } = require("../js/data");

// Test 1: Grade calculation logic
describe("getGrade", () => {
  test("returns A+ for 90% and above", () => {
    expect(getGrade(90)).toBe("A+");
    expect(getGrade(100)).toBe("A+");
  });
  test("returns A for 80-89%", () => {
    expect(getGrade(80)).toBe("A");
    expect(getGrade(89)).toBe("A");
  });
  test("returns B for 70-79%", () => {
    expect(getGrade(70)).toBe("B");
  });
  test("returns C for 60-69%", () => {
    expect(getGrade(60)).toBe("C");
  });
  test("returns D for 50-59%", () => {
    expect(getGrade(50)).toBe("D");
  });
  test("returns F for below 50%", () => {
    expect(getGrade(49)).toBe("F");
    expect(getGrade(0)).toBe("F");
  });
});

// Test 2: Score percentage calculation
describe("calculatePercentage", () => {
  test("calculates correct percentage", () => {
    expect(calculatePercentage(7, 10)).toBe(70);
    expect(calculatePercentage(10, 10)).toBe(100);
    expect(calculatePercentage(0, 10)).toBe(0);
  });
  test("returns 0 when total is 0", () => {
    expect(calculatePercentage(5, 0)).toBe(0);
  });
  test("rounds to nearest integer", () => {
    expect(calculatePercentage(1, 3)).toBe(33);
    expect(calculatePercentage(2, 3)).toBe(67);
  });
});

// Test 3: Pass/Fail determination logic
describe("isPass", () => {
  test("returns true for 50% and above", () => {
    expect(isPass(50)).toBe(true);
    expect(isPass(100)).toBe(true);
    expect(isPass(75)).toBe(true);
  });
  test("returns false for below 50%", () => {
    expect(isPass(49)).toBe(false);
    expect(isPass(0)).toBe(false);
  });
});

// Bonus: Feedback via switch statement
describe("getFeedback", () => {
  test("returns appropriate feedback for each grade", () => {
    expect(getFeedback("A+")).toContain("Outstanding");
    expect(getFeedback("F")).toContain("did not pass");
  });
});
