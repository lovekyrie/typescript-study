/**
 * 枚举（enum）：命名常量集合，替代魔法数字/字符串
 *
 * 典型场景：角色、状态码等有限集合
 */
export {};

// ---------- 数字枚举：默认从 0 递增，有反向映射 Role[1] ----------
enum Role {
  Reporter = 1,
  Developer,
  Maintainer,
  Owner,
  Guest,
}

console.log(Role.Reporter); // 1
console.log(Role[1]); // "Reporter"

const Owner = Role.Owner;
// Owner = "x"; // 错误：不能把字符串赋给枚举成员类型

// ---------- 字符串枚举：无反向映射，调试友好 ----------
enum Message {
  Success = "恭喜你，成功了",
  Fail = "抱歉，失败了",
}

// ---------- 异构枚举（数字+字符串混用）：不推荐 ----------
enum Answer {
  N,
  Y = "Yes",
}

// ---------- 成员类型：const（编译期常量）与 computed（运行期） ----------
enum Char {
  a,
  b = Char.a,
  c = 1 + 3,
  d = Math.random(),
  e = "123".length,
  f = 4,
}

// ---------- const enum：编译内联，无运行时代码 ----------
const enum Month {
  Jan,
  Feb,
  Mar,
  Apr = Month.Mar + 1,
}
const month = [Month.Jan, Month.Feb, Month.Mar];

// ---------- 枚举类型比较：不同枚举互不兼容 ----------
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

const e: E = 0 as E;
const f: F = 0 as F;
const e1: E.a = E.a;
const e2: E.b = E.b;
const e3: E.a = E.a;

const g1: G = G.a;
const g2: G.a = G.a;

// ---------- 枚举 + 命名空间合并：给枚举挂工具函数 ----------
enum Weekday {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

namespace Weekday {
  /** 示例：判断是否为周末（命名与实现仅作演示） */
  export function isBusinessday(day: Weekday) {
    switch (day) {
      case Weekday.Saturday:
      case Weekday.Sunday:
        return true;
      default:
        return false;
    }
  }
}

const mon = Weekday.Monday;
const sun = Weekday.Sunday;
console.log(Weekday.isBusinessday(mon));
console.log(Weekday.isBusinessday(sun));
