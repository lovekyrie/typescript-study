/**
 * 泛型函数最简形态：K extends keyof T 约束 key，返回类型 T[K] 与属性类型联动。
 * 编译期保证 obj[key] 的类型安全。
 */

function getPropValue<T extends object, K extends keyof T>(obj:T, key: K ): T[K] {
  return obj[key]
}
