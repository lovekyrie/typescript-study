// 数组和元组的重新构造
type Push<Arr extends unknown[], E> = [...Arr, E]
type PushRes = Push<[1, 2, 3], 4>

type Unshift<Arr extends unknown[], E> = [E, ...Arr]
type UnshiftRes = Unshift<[1, 2, 3], 0>

type tuple1 = [1, 2] 
type tuple2 = ['guang', 'dong']

type tuple = [[1, 'guang'], [2, 'dong']]

type Zip<One extends [unknown, unknown], Other extends [unknown, unknown]> = 
  One extends [infer OneFirst, infer OneSecond] 
    ? Other extends [infer OtherFirst, infer OtherSecond]
      ? [[OneFirst, OtherFirst], [OneSecond, OtherSecond]] : []
        : []
type ZipRes = Zip<tuple1, tuple2>

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

type DropSubStr<Str extends string, Substr extends string> =
  Str extends `${infer Prefix}${Substr}${infer Suffix}`
    ? DropSubStr<`${Prefix}${Suffix}`, Substr> : Str
type DropRes = DropSubStr<'dong~~~', '~'>