function my_tuple(): readonly [number, string] {
  const t: readonly [number, string] = [10, "asdf"];
  return t;
}

function my_tuple_readonly(): readonly [number, string] {
  const t: readonly [number, string] = [10, "asdf"];
  return t;
}
console.log(my_tuple()[0]);
console.log(my_tuple()[1]);
console.log(my_tuple_readonly()[0]);
console.log(my_tuple_readonly()[1]);
