// const my_arr = [1, 3, 4, 51, 3];
//
// while (typeof (el = my_arr.shift()) !== "undefined") {
//   console.log(el);
// }
//
// console.log(my_arr);

const names = ["Andrew", "Tyrone", "Paul", "Maria", "Gayatri"];
let i: string | undefined;

while (typeof (i = names.shift()) !== "undefined") {
  console.log(i);
}

console.log(names);

// Andrew, Tyrone, Paul, Maria, Gayatri
