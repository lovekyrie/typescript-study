/**
 * 映射类型的进阶：重映射 key、readonly/?/-? 修饰符、按 value 类型过滤属性。
 * 是 Partial/Required/Readonly 等内置类型的手写版。
 */

// 给函数类型末尾追加一个参数（元组 ...Args 展开）
type AppendArgument<Func extends Function, Arg> =
  Func extends (...args: infer Args) => infer ReturnType
    ? (...args: [...Args, Arg]) => ReturnType : never
type AppendArgumentRes = AppendArgument<(name: string) => boolean, number>

// 索引类型映射：每个属性 value 变成三元组
type Mapping<Obj extends object> = {
  [Key in keyof Obj]: [Obj[Key], Obj[Key], Obj[Key]]
}
type MappingRes = Mapping<{a:1, b:2}>

// key 重映射 as Uppercase<Key>：生成新 key，丢弃旧 key
type UppercaseKey<Obj extends object> = {
  [Key in keyof Obj as Uppercase<Key & string>] : Obj[Key]
}
type UppercaseKeyRes = UppercaseKey<{guang: 1, dong: 2}>

// Record<string, any> 约束保证 key 可当作 string 做模板运算
type UppercaseKey1<Obj extends Record<string, any>> = {
  [Key in keyof Obj as Uppercase<Key & string>] : Obj[Key]
}

type ToReadonly<T> = {
  readonly [key in keyof T]: T[key]
}
type ReadonlyRes = ToReadonly<{name:string, age:number}>

type toPartial<T> = {
  [key in keyof T]? : T[key]
}
type PartialRes = toPartial<{name:string, age: number}>

// -readonly 去掉只读
type toMutable<T> = {
  -readonly [key in keyof T]: T[key]
}
type MutableRes = toMutable<{
  readonly name:string,
  age: number
}>

// -? 去掉可选 → 全部必填
type toRequired<T> = {
  [key in keyof T]-? : T[key]
}
type RequiredRes = toRequired<{
  name?: string,
  age: number
}>

// 只保留 value 能赋给 ValueType 的 key（不满足的 key 映射为 never 会被剔除）
type FilterByValueType<Obj extends Record<string, any>, ValueType> = {
  [key in keyof Obj as Obj[key] extends ValueType ? key: never] : Obj[key]
}

interface Person {
  nm: string
  age: number
  hobby: string[]
}
type FilterRes = FilterByValueType<Person, string | number>
