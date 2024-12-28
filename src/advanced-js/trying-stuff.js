function closure() {
  let count = 0;
  function increment() {
    count++;
    console.log(count);
  }
  function getCount() {
    return count;
  }
  return {
    increment,
    getCount,
  };
}

const c = closure();
c.increment();
console.log(c.getCount());
