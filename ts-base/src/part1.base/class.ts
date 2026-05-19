/**
 * 类：抽象类、继承、访问修饰符、静态成员、多态、链式调用
 */
abstract class Animal {
  eat() {
    console.log("eat");
  }
  /** 抽象方法：子类必须实现 */
  abstract sleep(): void;
}

class Dog extends Animal {
  sleep() {
    console.log("dog sleep");
  }
  constructor(name: string) {
    super();
    this.name = name;
  }
  public name: string = "dog";
  run() {}
  private pri() {} // 仅本类
  protected pro() {} // 本类及子类
  readonly legs: number = 4; // 只读，初始化后不可改
  static food: string = "bones"; // 静态属类，不属实例
}

let dog = new Dog("wangwang");
// dog.pri();  // 错误：私有
// dog.pro();  // 错误：protected 仅子类可访问
dog.eat();
console.log(Dog.food);

class Husky extends Dog {
  /** 构造函数参数属性：public color 自动成为实例属性 */
  constructor(name: string, public color: string) {
    super(name);
    this.pro(); // 子类可访问 protected
  }
}

class Cat extends Animal {
  sleep() {
    console.log("cat sleep");
  }
}

/** 多态：用父类型引用子类实例 */
let animals: Animal[] = [dog, new Cat()];
animals.forEach((i) => i.sleep());

/** 链式调用：方法返回 this */
class Workflow {
  step1() {
    return this;
  }
  step2() {
    return this;
  }
}
new Workflow().step1().step2();

/** 子类方法返回 this 时，链式类型会收窄为子类 */
class myWorkflow extends Workflow {
  next() {
    return this;
  }
}
new myWorkflow().next().step1().next().step2();
