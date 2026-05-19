/**
 * 模板字面量 + 递归类型：把 query 字符串解析成对象类型。
 * 演示 infer 拆 key=value、MergeParams 合并同名键、数组累加多值。
 */

// 单个 "key=value" → { key: value }，否则空对象
type ParseParam<Param extends string> = Param extends `${infer Key}=${infer Value}` ?
  { [K in Key] : Value} : {}

// 同名键合并：类型相同取其一；对方是数组则展开，否则包成二元组
type MergeValues<One, Other> = One extends Other ? One: Other extends unknown[]? [One, ...Other]: [One, Other]

// 两个 Record 按键并集合并，冲突键走 MergeValues
type MergeParams<OneParam extends Record<string, any>, OtherParam extends Record<string, any>> = 
  {
    [Key in keyof OneParam | keyof OtherParam]: 
      Key extends keyof OneParam
        ? Key extends keyof OtherParam
          ? MergeValues<OneParam[Key], OtherParam[Key]>
            : OneParam[Key]
        : Key extends keyof OtherParam
          ? OtherParam[Key]
            : never
  }

// "a=1&b=2" → 先拆首段，再递归 Rest，最后用 MergeParams 拼起来
type ParseQueryString<Str extends string> = 
  Str extends `${infer Param}&${infer Rest}`
    ? MergeParams<ParseParam<Param>, ParseQueryString<Rest>>
      : ParseParam<Str>

type Res = ParseQueryString<'a=1&b=2&c=3'>
