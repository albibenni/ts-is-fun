function transformToObjects(numberArray: number[]) {
  // Todo: Add your logic
  // should return an array of objects
  return numberArray.map((n) => ({
    val: n,
  }));
}

const res = transformToObjects([1, 2, 4]);
console.log(res);

