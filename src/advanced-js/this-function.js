var teacher = "Me";

function ask(question) {
  console.log(teacher, question);
}

function otherClass() {
  var teacher = "Not me";
  ask("Why?");
}

otherClass();

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
