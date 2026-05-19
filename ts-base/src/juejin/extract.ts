/**
 * infer 入门：从 Promise、数组、字符串中提取类型，并实现 trim/replace 等工具类型。
 * 建议按 region 顺序阅读，每段对应一类「模式匹配」场景。
 */

type p = Promise<"guang">;
type GetValueType<P> = P extends Promise<infer Value> ? Value : never;
type GetValueResult = GetValueType<p>;

//#region 数组类型

type arr = [1, 2, 3];
// 首部： [First, ...]
type GetFirst<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]] ? First : never;
type getFirstResult = GetFirst<arr>;

// 尾部：[..., Last]
type GetLast<Arr extends unknown[]> = Arr extends [...unknown[], infer Last] ? Last : never;
type getLastResult = GetLast<arr>;

type PopArr<Arr extends unknown[]> = Arr extends [] ? [] : Arr extends [...infer Rest, unknown] ? Rest : never;
type popResult = PopArr<arr>;
type popResult2 = PopArr<[]>;

type shiftArr<Arr extends unknown[]> = Arr extends [] ? [] : Arr extends [unknown, ...infer Rest] ? Rest : never;
type shiftResult = shiftArr<arr>;

//#endregion

//#region 字符串类型

// 前缀匹配：Str 能否拆成 Prefix + 任意后缀
type StartWith<Str extends string, Prefix extends string> = Str extends `${Prefix}${string}` ? true : false;
type StartsWithRes = StartWith<'guang and dong', 'guang'>
type StartsWithRes1 = StartWith<'guang and dong', 'dong'>

// 只替换第一次出现
 type ReplaceStr< Str extends string, From extends string, To extends string> = 
  Str extends `${infer Prefix}${From}${infer Suffix}` ? `${Prefix}${To}${Suffix}`: Str
type ReplaceRes = ReplaceStr<"Guangguang's best friends is ?", "?", "Donggong">
type ReplaceRes1 = ReplaceStr<"abc", "?", "Dongdong">

type TrimStrRight<Str extends string> = 
  Str extends  `${infer Rest}${' ' | '\t' | '\n'}`
    ? TrimStrRight<Rest> : Str
type TrimRightRes = TrimStrRight<'guang       '>

type TrimStrLeft<Str extends string> = 
  Str extends `${' ' | '\t' | '\n'}${infer Rest}`
    ? TrimStrLeft<Rest> : Str
type TrimLeftRes = TrimStrLeft<'      guang'>

type TrimStr<Str extends string> = TrimStrLeft<TrimStrRight<Str>>
type TrimRes = TrimStr<'   dong    '>


//#endregion
