abstract class Animal {
  eat() {
    console.log("eat");
  }
  abstract sleep(): void;
}

class Dog extends Animal {
  sleep() {
    console.log("dog eat");
  }
  constructor(name: string) {
    super();
    this.name = name;
  }
  public name: string = "dog";
  run() {}
  private pri() {}
  protected pro() {}
  readonly legs: number = 4;
  static food: string = "bones";
}

console.log(Dog.prototype);
let dog = new Dog("wangwang");
console.log(dog);
//私有属性，只能在Dog中访问
//dog.pri()
//保护，只能在Dog及其子类
//dog.pro();
dog.eat();
console.log(Dog.food);

class Husky extends Dog {
  constructor(name: string, public color: string) {
    super(name);
    this.color = color;
    this.pro();
  }
  //color: string;
}
console.log(Husky.food);

class Cat extends Animal {
  sleep() {
    console.log("cat sleep");
  }
}
let cat = new Cat();

let animals: Animal[] = [dog, cat];
animals.forEach((i) => {
  i.sleep();
});

class Workflow {
  step1() {
    return this;
  }
  step2() {
    return this;
  }
}
new Workflow().step1().step2();

class myWorkflow extends Workflow {
  next() {
    return this;
  }
}

new myWorkflow().next().step1().next().step2();
