function multiplyBy2(num) {
  return num * 2;
}
console.log((multiplyBy2.stored = 5));
console.log(multiplyBy2(3)); // 6
console.log(multiplyBy2.stored); // 5
console.log(multiplyBy2.prototype); // {}

function userCreator(name, score) {
  this.name = name;
  this.score = score;
}
userCreator.prototype.increment = function () {
  this.score++;
};
userCreator.prototype.login = function () {
  console.log("login");
};
const user1 = new userCreator("Eva in function", 9);
user1.increment();

console.log(user1);

/// -- class is the same
class UserCreator {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
  increment() {
    this.score++;
  }
  login() {
    console.log("login");
  }
}
const user1asClass = new UserCreator("Eva in a class", 9);
user1asClass.increment();
console.log(user1asClass);
