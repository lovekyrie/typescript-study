/**
 * 泛型类与泛型函数：队列容器、reverseF 保持元素类型、Array.reverse 的类型定义。
 * 展示「入参类型 → 出参类型」在编译期的联动约束。
 */

// 非泛型：data 为 any[]，push/pop 无类型约束
class QueenNumber {
  private data: any[] = [];
  push = (item: number) => this.data.push(item);
  pop = (): number => this.data.shift();
}

const queen = new QueenNumber();

queen.push(0);
//queen.push("1");

class Queen<T> {
  private data: T[] = [];
  push = (item: T) => this.data.push(item);
  pop = (): T | undefined => this.data.shift();
}

const queen1 = new Queen<number>();
queen1.push(0);
//queen1.push("1");

function reverseF<T>(items: T[]): T[] {
  const toreturn: T[] = [];
  for (let i = items.length - 1; i > 0; i--) {
    toreturn.push(items[i]);
  }
  return toreturn;
}

const sample = [1, 2, 3];
let reversed = reverseF(sample);

//reversed[0] = '1' // Error!
//reversed = ["1", "2"]; // Error!

reversed[0] = 1; // Okay
reversed = [1, 2]; // Okay

const strArr = ["1", "2"];
let reversedStrs = reverseF(strArr);

//reversedStrs = [1, 2]; // Error!

// 内置 reverse 同样用泛型保证元素类型不变
interface Array<T> {
  reverse(): T[];
}

const numArr1 = [1, 2];
let reverseArr1 = numArr1.reverse();

//reverseArr1 = ["1", "2"]; // Error!

class Utility {}
