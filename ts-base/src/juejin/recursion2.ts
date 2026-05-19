/**
 * 字符串递归与深度只读：拆字符成联合、反转、DeepReadonly 跳过函数。
 * DeepReadonly 用 Obj extends any 触发联合分发，逐层映射嵌套对象。
 */

// 一次 infer 四个字符（固定窗口）；更通用见 StringToUnion2
type StringToUnion<Str extends string> = 
  Str extends `${infer One}${infer Two}${infer Three}${infer Four}` 
    ? One | Two | Three | Four
      : never
type StringToUnionRes = StringToUnion<'dong'>

// 每次取首字符 | 递归剩余
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

// 联合分发 + 递归：对象属性只读，嵌套 object 继续 DeepReadonly，函数保持原样
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
