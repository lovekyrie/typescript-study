/**
 * 元组与字符串的类型级操作：push/unshift、zip、首字母大写、驼峰、删子串。
 * 统一用 infer + 递归 Rest 处理「剩余部分」。
 */

type Push<Arr extends unknown[], E> = [...Arr, E]
type PushRes = Push<[1, 2, 3], 4>

type Unshift<Arr extends unknown[], E> = [E, ...Arr]
type UnshiftRes = Unshift<[1, 2, 3], 0>

type tuple1 = [1, 2] 
type tuple2 = ['guang', 'dong']

type tuple = [[1, 'guang'], [2, 'dong']]

// 定长二元组 zip：两路同时 infer 首对
type Zip<One extends [unknown, unknown], Other extends [unknown, unknown]> = 
  One extends [infer OneFirst, infer OneSecond] 
    ? Other extends [infer OtherFirst, infer OtherSecond]
      ? [[OneFirst, OtherFirst], [OneSecond, OtherSecond]] : []
        : []
type ZipRes = Zip<tuple1, tuple2>

// 不定长：首对 zip 后递归 OneRest / OtherRest
type Zip2<One extends unknown[], Other extends unknown[]> = 
  One extends [infer OneFirst, ...infer OneRest] 
    ? Other extends [infer OtherFirst, ...infer OtherRest] 
      ? [[OneFirst, OtherFirst], ...Zip2<OneRest, OtherRest>] : []
        : []
type Zip2Res = Zip2<[1, 2, 3, 4, 5], ['guang', 'dong', 'is', 'best', 'friend']>

type CapitalizeStr<Str extends string> = 
  Str extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${Rest}` : Str
type CapitalizeRes = CapitalizeStr<'guang'>

type CamelCase<Str extends string> =
  Str extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${CamelCase<Rest>}`
      : Str
type CamelCaseRes = CamelCase<'dong_dong_dong'>

// 递归删除所有 Substr 出现
type DropSubStr<Str extends string, Substr extends string> =
  Str extends `${infer Prefix}${Substr}${infer Suffix}`
    ? DropSubStr<`${Prefix}${Suffix}`, Substr> : Str
type DropRes = DropSubStr<'dong~~~', '~'>
