console.log("keyof.ts");
type Point = { x: number; y: number };
type P = keyof Point;
// ? keyof Point => 'x' | 'y'

type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
// ? number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
// ? string | number
