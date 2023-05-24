type IsAny<T>  = 'dong' extends ('guang' & T) ? true : false
// 'dong' 和 'guang' 可以替换成任意两个不同的类型
type IsAnyRes = IsAny<any>
type ISAnyRes1 = IsAny<'guang'>

// can't compare any to other type value
type IsEqual<A, B> = (A extends B ? true: false) & (B extends A ? true: false)
type IsEqualRes = IsEqual<'a', any>

type IsEqual2<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false
type NotEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? false : true
type IsEqual2Res = IsEqual2<'a', any>

type IsUnion<A, B = A> = A extends A ? [B] extends [A] ? false : true : never
type IsUnionRes = IsUnion<'a' | 'b'>
type IsUnionRes2 = IsUnion<1>

type TestNever<T> = T extends number ? 1 : 2
type TestNeverRes = TestNever<never>

type IsNever<T> = [T] extends [never] ? true : false
type IsNeverRes = IsNever<never>

type TestAny<T> = T extends number ? 1 : 2
// 1 | 2
type TestAnyRes = TestAny<any>

type Len = [1, 2, 3]['length']
type Len2 = number[]['length']
type IsTuple<T> = T extends [...params: infer Eles] ? NotEqual<Eles['length'], number> : false
type IsTupleRes = IsTuple<[1, 2, 3]>
type IsTupleRes2 = IsTuple<number[]>

type UnionToIntersection<U> = (U extends U ? (x: U) => unknown : never) extends (x: infer R) => unknown
  ? R : never
type UnionToIntersectionRes = UnionToIntersection<{guang: 1} | {dong: 2}>

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

type RemoveIndexSignature<Obj extends Record<string, any>> = {
  [Key in keyof Obj as Key extends `${infer Str}` ? Str : never] : Obj[Key]
}
type RemoveIndexSignatureRes = RemoveIndexSignature<{
  [key: string]: any
  sleep(): void
}>




