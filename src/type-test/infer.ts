export {};

type Result = boolean extends true ? 1 : 0;

export const func = (check: boolean) => {
  return "123123123";
};

type FuncResult = ReturnType<typeof func>;

// type ReturnType<T extends (...args: any) => any> = T extends (
//   ...args: any
// ) => infer R
//   ? R
//   : any;

// type Result2 = typeof func extends (...args: any) => infer R ? R : any;
type Result2 = typeof func extends (...args: any) => any ? 1 : 0;

//String Example
export const str = () =>
  `hello_world-friend`.replace(/(_|-)/g, (item) => `${item}${item}${item}`);
