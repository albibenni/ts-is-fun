function fetchSomething(): any {
  throw new Error("Function not implemented.");
}

// normal way to assign teacher with fallback
var teacher;
try {
  teacher = fetchSomething();
} catch (err) {
  teacher = "Kayle";
}

//! with IIFE
var teacherIIFE = (function getTeacher() {
  try {
    return fetchSomething();
  } catch (error) {
    return "Kayle";
  }
})();
