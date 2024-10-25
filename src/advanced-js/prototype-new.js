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
const user1 = new userCreator("Eva", 9);
user1.increment();

console.log(user1);
