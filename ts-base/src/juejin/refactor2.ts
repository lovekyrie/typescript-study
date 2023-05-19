type AppendArgument<Func extends Function, Arg> =
  Func extends (...args: infer Args) => infer ReturnType
    ? (...args: [...Args, Arg]) => ReturnType : never
type AppendArgumentRes = AppendArgument<(name: string) => boolean, number>

// 索引类型的重新构造
type Mapping<Obj extends object> = {
  [Key in keyof Obj]: [Obj[Key], Obj[Key], Obj[Key]]
}
type MappingRes = Mapping<{a:1, b:2}>

// 重映射
type UppercaseKey<Obj extends object> = {
  [Key in keyof Obj as Uppercase<Key & string>] : Obj[Key]
}
type UppercaseKeyRes = UppercaseKey<{guang: 1, dong: 2}>

// 约束Obj的key为string类型
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

type toMutable<T> = {
  -readonly [key in keyof T]: T[key]
}
type MutableRes = toMutable<{
  readonly name:string,
  age: number
}>

type toRequired<T> = {
  [key in keyof T]-? : T[key]
}
type RequiredRes = toRequired<{
  name?: string,
  age: number
}>

type FilterByValueType<Obj extends Record<string, any>, ValueType> = {
  [key in keyof Obj as Obj[key] extends ValueType ? key: never] : Obj[key]
}

interface Person {
  nm: string
  age: number
  hobby: string[]
}
type FilterRes = FilterByValueType<Person, string | number>