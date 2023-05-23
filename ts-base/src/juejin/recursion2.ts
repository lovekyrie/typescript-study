type StringToUnion<Str extends string> = 
  Str extends `${infer One}${infer Two}${infer Three}${infer Four}` 
    ? One | Two | Three | Four
      : never
type StringToUnionRes = StringToUnion<'dong'>

type StringToUnion2<Str extends string> =
  Str extends `${infer First}${infer Rest}`
    ?  First | StringToUnion2<Rest> 
      : never
type StringToUnionRes2 = StringToUnion2<'hello'>

type ReverseStr<Str extends string, Result extends string = ''> = 
  Str extends `${infer First}${infer Rest}`
    ? ReverseStr<Rest, `${First}${Result}`>
      :  Result
type ReverseStrRes = ReverseStr<'hello'>

type DeepReadonly<Obj extends Record<string, any>> = 
  Obj extends any 
    ? {
      readonly [key in keyof Obj] :
        Obj[key] extends object 
          ? Obj[key] extends Function
            ? Obj[key]
            : DeepReadonly<Obj[key]>
          : Obj[key]
    } 
    : never
type obj = {
  a: {
    b: {
      c: {
        f: () => 'dong',
        d: {
          e: {
            guang: string
          }
        }
      }
    }
  }
}
type DeepReadonlyRes = DeepReadonly<obj>
