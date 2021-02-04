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

function reverse<T>(items: T[]): T[] {
  const toreturn = [];
  for (let i = items.length - 1; i > 0; i--) {
    toreturn.push(items[i]);
  }
  return toreturn;
}

const sample = [1, 2, 3];
let reversed = reverse(sample);

//reversed[0]='1'
//reversed = ["1", "2"];

reversed[0] = 1;
reversed = [1, 2];

//为创建的成员函数添加泛型
class Utility {}
