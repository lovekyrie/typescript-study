/**
 * 类型层面的「判等」与元类型检测：any、never、联合、元组、可选/必填、索引签名。
 * 难点在 any/never 的 distributive 行为，需用 [] 包裹或函数类型技巧绕过。
 */

// any 与任意类型做交叉仍为 any，故 'dong' extends ('guang' & T) 仅 T 为 any 时为 true
type IsAny<T>  = 'dong' extends ('guang' & T) ? true : false
type IsAnyRes = IsAny<any>
type ISAnyRes1 = IsAny<'guang'>

// 双向 extends 对 any 会失真，慎用
type IsEqual<A, B> = (A extends B ? true: false) & (B extends A ? true: false)
type IsEqualRes = IsEqual<'a', any>

// 用泛型函数类型比较，避免 any 污染（社区常见 IsEqual 写法）
type IsEqual2<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false
type NotEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? false : true
type IsEqual2Res = IsEqual2<'a', any>

// 联合：A extends A 分发后，若 [B] extends [A] 说明 B 比联合更「窄」→ 是联合
type IsUnion<A, B = A> = A extends A ? [B] extends [A] ? false : true : never
type IsUnionRes = IsUnion<'a' | 'b'>
type IsUnionRes2 = IsUnion<1>

// never 在条件类型中不会进入 true/false 分支，得到 never 而非 1|2
type TestNever<T> = T extends number ? 1 : 2
type TestNeverRes = TestNever<never>

// [T] extends [never] 可区分 never
type IsNever<T> = [T] extends [never] ? true : false
type IsNeverRes = IsNever<never>

// any 两边分支都成立 → 1 | 2
type TestAny<T> = T extends number ? 1 : 2
type TestAnyRes = TestAny<any>

type Len = [1, 2, 3]['length']
type Len2 = number[]['length']

// 可变参数元组 length 是具体数字；数组 length 是 number
type IsTuple<T> = T extends [...params: infer Eles] ? NotEqual<Eles['length'], number> : false
type IsTupleRes = IsTuple<[1, 2, 3]>
type IsTupleRes2 = IsTuple<number[]>

// 协变位置 infer：联合转成交叉
type UnionToIntersection<U> = (U extends U ? (x: U) => unknown : never) extends (x: infer R) => unknown
  ? R : never
type UnionToIntersectionRes = UnionToIntersection<{guang: 1} | {dong: 2}>

// {} extends Pick<Obj, key> 为真 → 该 key 可选（未赋值时 Pick 为空对象）
type GetOptional<Obj extends Record<string, any>> =  {
  [key in keyof Obj as {} extends Pick<Obj, key> ? key : never] : Obj[key]
}
type GetOptionalRes = GetOptional<{
  name: string
  age?: number
}>

type IsRequired<Key extends keyof Obj, Obj> = 
  {} extends Pick<Obj, Key> ? never : Key
type GetRequired<Obj extends Record<string, any>> = {
  [Key in keyof Obj as IsRequired<Key, Obj>] : Obj[Key]
}
type GetRequiredRes = GetRequired<{
  name: string
  age?: number
}>

// 模板字面量 key 保留，number/symbol 等索引签名 key 变为 never 被过滤
type RemoveIndexSignature<Obj extends Record<string, any>> = {
  [Key in keyof Obj as Key extends `${infer Str}` ? Str : never] : Obj[Key]
}
type RemoveIndexSignatureRes = RemoveIndexSignature<{
  [key: string]: any
  sleep(): void
}>



