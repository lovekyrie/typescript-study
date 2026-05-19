/**
 * 泛型：函数泛型、泛型类、泛型约束 extends
 */
function log<T>(value: T): T {
  console.log(value);
  return value;
}
log<string[]>(["a", "b", "c"]);
// 类型推断：省略泛型参数时由实参推断
log(["a", "b", "c"]);

// type Log = <T>(value: T) => T;
// interface Log<T> { (value: T): T }

/** 泛型类：类型参数在实例化时确定 */
class Log<T> {
  run(value: T) {
    console.log(value);
    return value;
  }
}

let log1 = new Log<number>();
log1.run(1);
let log2 = new Log(); // 未指定时由 run 的实参推断
log2.run({ a: 1 });

/** 泛型约束：T 必须具有 length 属性 */
interface Length {
  length: number;
}
function logAdvance<T extends Length>(value: T): T {
  console.log(value, value.length);
  return value;
}

logAdvance([1]);
logAdvance("123");
logAdvance({ length: 3 });
