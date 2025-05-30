class Car {
  constructor(
    public make: string,
    public model: string,
    public year: number,
  ) {}
  // like this.make = make
}

const myCar = new Car("Honda", "Accord", 2017);
myCar.make;
//     ^|
