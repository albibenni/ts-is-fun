export {};

type Result = boolean extends true ? 1 : 0;

export const func = (check: boolean) => {
  return "123123123";
};

// type ReturnType<T extends (...args: any) => any> = T extends (
//   ...args: any
// ) => infer R
//   ? R
//   : any;

//String Example
export const str = () =>
  `hello_world-friend`.replace(/(_|-)/g, (item) => `${item}${item}${item}`);

type Result2 = typeof func extends (...args: any) => infer R ? R : 0; // R is the inferred type

const notMatching = {};

type Result3 = typeof notMatching extends (...args: any) => infer R ? R : never; // R is the inferred type

type FakeReturnType<T> = T extends (...args: any) => infer R ? R : never;

type FuncResult = FakeReturnType<typeof notMatching>;

const myString = () => {
  return "hello_world-friend" as const;
};

type FakeReturnType2<T> = T extends ((...args: any) => infer R extends string)
  ? `${R}_return_type`
  : never;

type FuncResult2 = FakeReturnType2<typeof myString>;
