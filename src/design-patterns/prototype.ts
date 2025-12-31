interface Prototype {
  clone(): Prototype;
}

abstract class Shape implements Prototype {
  x: number;
  y: number;
  color: string;
  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  abstract clone(): Shape;
  abstract draw(): void;
}

class Circle extends Shape {
  radius: number;
  constructor(x: number, y: number, color: string, radius: number) {
    super(x, y, color);
    this.radius = radius;
  }
  override clone(): Shape {
    return new Circle(this.x, this.y, this.color, this.radius);
  }

  override draw(): void {
    console.log(
      `Circle at (${this.x},${this.y}), radius: ${this.radius}, color: ${this.color}`,
    );
  }
}
class Rectangle extends Shape {
  width: number;
  height: number;
  constructor(
    x: number,
    y: number,
    color: string,
    width: number,
    height: number,
  ) {
    super(x, y, color);
    this.width = width;
    this.height = height;
  }

  clone(): Rectangle {
    return new Rectangle(this.x, this.y, this.color, this.width, this.height);
  }

  draw(): void {
    console.log(
      `Rectangle at (${this.x},${this.y}), ${this.width}x${this.height}, color: ${this.color}`,
    );
  }
}

// Shape registry - stores prototypes
class ShapeRegistry {
  private shapes = new Map<string, Shape>();

  register(key: string, shape: Shape): void {
    this.shapes.set(key, shape);
  }

  get(key: string): Shape | undefined {
    const shape = this.shapes.get(key);
    return shape?.clone();
  }
}
// Usage
const registry = new ShapeRegistry();

registry.register("red-circle", new Circle(0, 0, "red", 10));
registry.register("blue-rect", new Rectangle(0, 0, "blue", 20, 30));

const circle1 = registry.get("red-circle");
if (circle1) {
  circle1.x = 100;
  circle1.y = 50;
  circle1.draw(); // Circle at (100,50), radius: 10, color: red
}

const circle2 = registry.get("red-circle");
if (circle2) {
  circle2.x = 200;
  circle2.y = 150;
  circle2.draw(); // Circle at (200,150), radius: 10, color: red
}
