var workshop = (function Module(teacher) {
  var publicAPI = { ask };
  return publicAPI;

  //****

  function ask(question) {
    console.log(teacher, question);
  }
})("Kayle");

workshop.ask("It's a module, am I right?");
// Kayle It's a module, am I right?
//
//
// example of closure and closing over variable changing over time
// module means the ability to encapsulate, here we can make function private
//
//
// *****
//

function WorshopModule(teacher) {
  var publicAPI = { ask };
  return publicAPI;

  //*****
  function ask(question) {
    console.log(teacher, question);
  }
}
var workshop = WorshopModule("Kayle");

workshop.ask("It's a module, right?");
// Kayle It's a module, right?
