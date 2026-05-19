/**
 * 类与接口：implements 实现接口、接口继承、多接口继承、类实现接口形状
 */
export default {};

/** 人类：接口描述“能做什么”，不关心具体实现 */
interface Human {
  name: string;
  eat(): void;
}

/** 类实现接口：必须提供接口要求的全部成员 */
class Asian implements Human {
  constructor(name: string) {
    this.name = name;
  }
  name: string;
  eat() {}
  age: number = 0; // 类可有接口未声明的额外成员
  sleep() {}
}

/** 接口继承：Man 在 Human 基础上增加 run */
interface Man extends Human {
  run(): void;
}

interface Child {
  cry(): void;
}

/** 多接口继承：Boy 同时满足 Man 与 Child */
interface Boy extends Man, Child {}

/** 对象字面量可直接满足接口结构（鸭子类型） */
let boy: Boy = {
  name: "",
  run() {},
  eat() {},
  cry() {},
};

class Auto {
  state = 1;
  // private state2 = 0; // 私有成员不能通过 implements 暴露
}

/** 接口可继承类：继承类的“公共/受保护”成员形状（不含 private） */
interface AutoInterface extends Auto {}

class CClass implements AutoInterface {
  state = 2; // 必须兼容父类/接口中的 state 类型
}

/** 类可同时 extends 与 implements */
class Bus extends Auto implements AutoInterface {}
