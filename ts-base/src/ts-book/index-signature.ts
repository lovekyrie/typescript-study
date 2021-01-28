interface Foo {
  [key: string]: number;
  x: number;
  y: number;
}

interface Bar {
  [key: string]: number;
  x: number;
  // y: string; //Error y属性必须为number类型
}

let foo: Foo = {
  x: 1,
  y: 2,
};

console.log(foo["x"]);

const x = "x";
console.log(foo[x]);

//使用一组有限的字符串字面量
type Index = "a" | "b" | "c";
type FromIndex = { [k in Index]?: number };

const good: FromIndex = { b: 1, c: 2 };

//Error:
// `{b:1,c:2,d:3}` 不能分配给 'FromIndex'
//对象字面量只能指定已知类型,'d'不存在'FromIndex'上
// const bad: FromIndex = { b: 1, c: 2, d: 3 };
