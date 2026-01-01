const a = 7;

console.log(a);
console.log(a << 1);
console.log(a << 3);
console.log((a << 1) >> 1);
console.log((a << 2) >> 1);

console.log(-100000000000 >>> 1);

//NOTE: to convert negative number to unsigned int
console.log(-1 >>> 0);

//NOTE: using typed array to store unsigned int
const t: Uint32Array = new Uint32Array(1);
t[0] = -1;
console.log(t[0]);

//NOTE: using Buffer to store unsigned int
const buf = Buffer.alloc(4);
buf.writeUInt32BE(4294967295, 0);
console.log(buf.readUInt32BE(0));
