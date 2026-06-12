/**
 * 泛型工具类型基础：keyof、T[K]、泛型函数约束
 */
let obj3 = {
  a: 1,
  b: 2,
  c: 3,
};

/** K extends keyof T：keys 只能是 obj 已有键，返回值类型为对应属性类型 */
function getValues<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map((key) => obj[key]);
}
console.log(getValues(obj3, ["a", "b"]));
// getValues(obj3, ["d"]); // 错误：'d' 不是 keyof T

export interface Obj {
  a: number;
  b: string;
}

// Obj 是别名，所以悬停不会展示 'a' | 'b'
export type Key = keyof Obj
export type Key1 = keyof {a: number, b: string}

let value: Obj["a"]; // 索引访问类型
