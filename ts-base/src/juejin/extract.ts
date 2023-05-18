type p = Promise<"guang">;
type GetValueType<P> = P extends Promise<infer Value> ? Value : never;
type GetValueResult = GetValueType<p>;

//#region 数组类型

// get first element
type arr = [1, 2, 3];
type GetFirst<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]] ? First : never;
type getFirstResult = GetFirst<arr>;

// get last element
type GetLast<Arr extends unknown[]> = Arr extends [...unknown[], infer Last] ? Last : never;
type getLastResult = GetLast<arr>;

// array pop element
type PopArr<Arr extends unknown[]> = Arr extends [] ? [] : Arr extends [...infer Rest, unknown] ? Rest : never;
type popResult = PopArr<arr>;
type popResult2 = PopArr<[]>;

// array shift element
type shiftArr<Arr extends unknown[]> = Arr extends [] ? [] : Arr extends [unknown, ...infer Rest] ? Rest : never;
type shiftResult = shiftArr<arr>;

//#endregion

//#region 字符串类型

// string starts with
type StartWith<Str extends string, Prefix extends string> = Str extends `${Prefix}${string}` ? true : false;
type StartsWithRes = StartWith<'guang and dong', 'guang'>
type StartsWithRes1 = StartWith<'guang and dong', 'dong'>

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
