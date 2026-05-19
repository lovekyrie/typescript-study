/**
 * 类型编程入门：infer 取元组首项、交叉类型、never、映射类型与 key 重映射。
 * 适合对照 Res1~Res5 在 IDE 里悬停查看推导结果。
 */

// infer：从元组模式 [T, ...Rest] 中推断首元素类型
type First<Tuple extends unknown[]> = Tuple extends [infer T, ...infer Rest] ? T : never

type Res1 = First<[1, 2, 3]>

// 交叉类型 &：同名字段合并为交集；不兼容字段会变成 never
type ObjType = { a: number } & { c: boolean }

type Res2 = { a: number } & { c: boolean } extends ObjType ? true : false

// 无交集 → never（如 string & number）
type Res3 = 'aaaa' & 2222

// 映射类型：遍历 keyof T，把每个属性变成三元组
type MapType<T> = {
  [Key in keyof T]: [T[Key], T[Key], T[Key]]
}

type Res4 = MapType<{a:1, b:2}>

// key 重映射 as：新 key 由旧 key 模板拼接，value 仍为原类型
type MapeKeyType<T> = {
  [Key in keyof T as `${Key & string}${Key & string}${Key & string}` ]: [T[Key], T[Key], T[Key]]
}

type Res5 = MapeKeyType<{a:1, b:2}>
