class QueenNumber {
  private data: any[] = [];
  push = (item: number) => this.data.push(item);
  pop = (): number => this.data.shift();
}

const queen = new QueenNumber();

queen.push(0);
//queen.push("1");

//创建一个泛型类
class Queen<T> {
  private data: T[] = [];
  push = (item: T) => this.data.push(item);
  pop = (): T | undefined => this.data.shift();
}

//简单的使用
const queen1 = new Queen<number>();
queen1.push(0);
//queen1.push("1");

/**
A simple toy example is a function that takes a list of items and returns a reversed list of items. 
The constraint here is between what is passed in to the function and what is returned by the function:
 */
function reverseF<T>(items: T[]): T[] {
  const toreturn = [];
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

/**
 * Similarly if you pass in an array of string[] to the reverse function the returned result 
 is also an array of string[] and you get similar type safety as shown below:
 */
const strArr = ["1", "2"];
let reversedStrs = reverseF(strArr);

//reversedStrs = [1, 2]; // Error!

//In fact JavaScript arrays already have a .reverse function and TypeScript does indeed use generics to define its structure:
interface Array<T> {
  reverse(): T[];
}

const numArr1 = [1, 2];
let reverseArr1 = numArr1.reverse();

//reverseArr1 = ["1", "2"]; // Error!

//为创建的成员函数添加泛型
class Utility {}
