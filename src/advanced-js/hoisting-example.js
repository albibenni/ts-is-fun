var teacher = "Kayle";
otherTeacher();

function otherTeacher() {
  console.log(teacher); //! undefined teacher because of the scopes
  var teacher = "suzy";
}

// other example

// var hoisting
// ususally bad
aTeacher = "Kayle";
var aTeacher;

// function hoisting?
// pretty usefull
getTeacher();

function getTeacher() {
  return teacher;
}
