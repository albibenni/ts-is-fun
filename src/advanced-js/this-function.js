var teacher = "Me";

function ask(question) {
  console.log(teacher, question);
}

function otherClass() {
  var teacher = "Not me";
  ask("Why?");
}

otherClass();

//****** ***********
//****** ***********

var teacher2 = "Me";

function ask2(question) {
  console.log("2: ", this.teacher2, question);
}

function otherClass2() {
  var myContext = {
    teacher2: "Not me",
  };
  ask2.call(myContext, "What?");
}

otherClass2();

//****** ***********
//****** ***********

function askk(question) {
  console.log(this.teacher, question);
}
var workshop = {
  teacher: "Suzy",
  ask: askk,
};

workshop.ask("How do I share stuff?");

//****** ***********
//****** ***********

function askk2(question) {
  console.log(this.teacher, question);
}
var workshop2 = {
  teacher: "Suzy",
};

askk2.call(workshop2, "How do I share stuff?");

//****** ***********
// this: hard binding
//****** ***********
//

const workshop3 = {
  teacher: "Same",
  ask(question) {
    console.log(this.teacher, question);
  },
};

setTimeout(workshop3.ask, 10, "Lost this?"); // lost this, goes to global scope
setTimeout(workshop3.ask.bind(workshop3), 10, "Hard bound this?");
