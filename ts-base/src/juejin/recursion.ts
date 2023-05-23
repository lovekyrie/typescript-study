type DeepPromiseValueType<P extends Promise<unknown>> = 
  P extends Promise<infer ValueType> 
    ? ValueType extends Promise<unknown> 
      ? DeepPromiseValueType<ValueType>
        : ValueType
      : never
type ttt = Promise<Promise<Promise<Record<string, any>>>>
type DeepPromiseRes = DeepPromiseValueType<ttt>

type DeepPromiseValueType2<T> = 
  T extends Promise<infer ValueType> 
    ? DeepPromiseValueType2<ValueType>
      : T
type DeepPrmiseRes2 = DeepPromiseValueType2<Promise<Promise<Promise<number>>>>

type arr1 = [1, 2, 3, 4, 5]

type ReverseArr<Arr extends unknown[]> = 
  Arr extends [infer One, infer Two, infer Three, infer Four, infer Five] 
    ? [Five, Four, Three, Two, One] : never
type ReverseRes = ReverseArr<arr1>

type ReverseArr2<Arr extends unknown[]> = 
  Arr extends [infer First, ...infer Rest] 
    ? [...ReverseArr2<Rest>, First] : Arr
type ReverseRes2 = ReverseArr2<arr1>

type Includes<Arr extends unknown[], FindItem> = 
  Arr extends [infer First, ...infer Rest] 
    ? IsEqual<First, FindItem> extends true 
      ? true
        : Includes<Rest, FindItem>
      : false
type IsEqual<A, B> = (A extends B ? true :  false) & (B extends A ? true: false) 
type IncludesRes = Includes<[1, 2, 3, 4, 5], 4>
type IncludesRes2 = Includes<[1, 2, 3, 4, 5], 6>

type RemoveItem<Arr extends unknown[], Item, Result extends unknown[] = []> =
  Arr extends [infer First, ...infer Rest]
    ? IsEqual<First, Item> extends true
      ? RemoveItem<Rest, Item, Result>
      : RemoveItem<Rest, Item, [...Result, First]>
    : Result
type RemoveItemRes = RemoveItem<[1, 2, 2, 3], 2>

export type BuildArray<Length extends number, Ele = unknown, Arr extends unknown[] = []> =
  Arr['length'] extends Length
    ? Arr 
    : BuildArray<Length, Ele, [...Arr, Ele]>
type BuildArrayRes = BuildArray<5>

type ReplaceAll<Str extends string, From extends string, To extends string> = 
  Str extends `${infer Left}${From}${infer Right}` 
    ? `${Left}${To}${ReplaceAll<Right, From, To>}`
      : Str
type ReplaceAllRes = ReplaceAll<'guang guang guang', 'guang', 'dong'>