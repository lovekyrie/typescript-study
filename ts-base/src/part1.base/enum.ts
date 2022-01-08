/**
 * 解决问题： 通过在角色判断函数里面使用的role根据不同值处理不同逻辑
 * 1) 可读性差：很难记住数字的含义
 * 2) 可维护性差：硬编码，牵一发动全身
 */

//数字枚举
enum Role {
  Reporter = 1,
  Developer,
  Maintainer,
  Owner,
  Guest,
}

// 实现原理通过反向映射
console.log(Role.Reporter);
console.log(Role[1]);

//通常用 =1初始化,因为在枚举类型值里，它能让你做一个安全可靠的检查

const Owner = Role.Owner;
//类型安全
//Owner = "not a member of cart suit"; // Error: string 不能辅助给`Owner`

//字符串枚举 不能反向映射
enum Message {
  Success = "恭喜你，成功了",
  Fail = "抱歉，失败了",
}

//异构枚举 不建议使用
enum Answer {
  N,
  Y = "Yes",
}

//枚举成员(只读，声明了就不能修改)
// Role.Reporter = 0;
enum Char {
  // const member
  a,
  b = Char.a,
  c = 1 + 3, //编译时时出结果
  // computed member
  d = Math.random(),
  e = "123".length, //执行时出结果
  f = 4, //枚举成员必须初始化值，为什么上面的a不用？ 因为在computed枚举属性的后面
}

//常量枚举
const enum Month {
  Jan,
  Feb,
  Mar,
  Apr = Month.Mar + 1,
  // May = () => 5  字面量或者计算值为枚举的表达式
}
// 常量枚举运行时结果没有
const month = [Month.Jan, Month.Feb, Month.Mar];

//枚举类型
enum E {
  a,
  b,
}
enum F {
  a = 0,
  b = 1,
}

enum G {
  a = "apple",
  b = "banana",
}

const e: E = 3;
const f: F = 3;
//console.log(e === f); 不同的枚举类型不能比较

const e1: E.a = 3;
const e2: E.b = 3;
const e3: E.a = 3;
//console.log(e1 === e2);
//console.log(e1 === e3);

const g1: G = G.a;
const g2: G.a = G.a;
