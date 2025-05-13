// eslint-disable-next-line @typescript-eslint/no-unused-vars
function reverseBits(n: number): number {
  n = ((n & 0xffff0000) >>> 16) | ((n & 0x0000ffff) << 16);
  n = ((n & 0xff00ff00) >>> 8) | ((n & 0x00ff00ff) << 8);
  n = ((n & 0xf0f0f0f0) >>> 4) | ((n & 0x0f0f0f0f) << 4);
  n = ((n & 0xcccccccc) >>> 2) | ((n & 0x33333333) << 2);
  n = ((n & 0xaaaaaaaa) >>> 1) | ((n & 0x55555555) << 1);
  return n >>> 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function reverseBitsClassic(n: number): number {
  let ret: number = 0;
  let power: number = 31;
  while (n) {
    ret += (n & 1) << power;
    n = n >>> 1;
    power -= 1;
  }
  return ret >>> 0;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const nnn = "11111111111111111111111111111101";

console.log("what");

// console.log(reverseBits(parseInt(n)));

function test() {
  console.log(1 | 2);
  console.log(1 & 2);
}

function test2(num: number) {
  const bitRep = (num >>> 0).toString(2);
  console.log("binary representation decimal", bitRep);
  console.log("bit len as int - dec, ", bitRep.length);
  const bitRepNat = num.toString(2);
  console.log("binary representation nat", bitRepNat);
  console.log("bit len naturals, ", bitRepNat.length);
  console.log(num);

  console.log(num >>> 1);
  console.log(num >>> 0);
  console.log("END");
}
console.log("--------");
test();
console.log("--------");
test2(100);
test2(-100);
console.log("--------");
