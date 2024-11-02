type Datetypes = keyof Date;

type DateString = Datetypes & string;
type DateSymbols = Datetypes & Symbol;
type DateNumber = Datetypes & number;
//
//
//---
const obj = {
  name: "alb",
  email: "some@mail",
};

//type objWrong = keyof obj //! -- not working for values

type objTypeof = typeof obj; // full obj type
/* ?
    const obj = {
      name: "alb",
      email: "some@mail",
    };
*/
type objKeys = keyof typeof obj; // keys of the obj
/*
    "name", "email"
*/
