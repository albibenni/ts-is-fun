function userCreator(name, score) {
  const newUser = {};
  newUser.name = name;
  newUser.score = score;
  newUser.increment = function () {
    newUser.score++;
    console.log(newUser.score);
  };
  return newUser;
}
const user1 = userCreator("Will", 3);
const user2 = userCreator("Tim", 5);
console.log(user1.hasOwnProperty("score")); // true
console.log(user1.hasOwnProperty("name")); // true
console.log(user1.hasOwnProperty("toString")); // false
user1.increment();
