function userCreator(name, score) {
  const newUser = Object.create(userFunctionStore);
  newUser.name = name;
  newUser.score = score;
  return newUser;
}
const userFunctionStore = {
  increment: function () {
    // const add1 = () => {
    //   // with function this.score is undefinde
    //   this.score++;
    //   console.log(this.score);
    // };
    function add1() {
      this.score++;
      console.log(this.score);
    }
    add1.call(this); // else use the call to bind this obj
  },
};
const user1 = userCreator("Will", 3);
const user2 = userCreator("Tim", 5);
user1.increment();
