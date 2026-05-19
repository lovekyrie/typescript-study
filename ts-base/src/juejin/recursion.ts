/**
 * 递归类型综合练习：Promise 解包、数组反转/包含/删除、BuildArray、全局替换。
 * BuildArray 被 useArray.ts 复用，是「用元组表示自然数」的基础构件。
 */

type DeepPromiseValueType<P extends Promise<unknown>> = 
  P extends Promise<infer ValueType> 
    ? ValueType extends Promise<unknown> 
      ? DeepPromiseValueType<ValueType>
        : ValueType
      : never
type ttt = Promise<Promise<Promise<Record<string, any>>>>
type DeepPromiseRes = DeepPromiseValueType<ttt>

// 更简写法：一直 infer 直到不再是 Promise
type DeepPromiseValueType2<T> = 
  T extends Promise<infer ValueType> 
    ? DeepPromiseValueType2<ValueType>
      : T
type DeepPrmiseRes2 = DeepPromiseValueType2<Promise<Promise<Promise<number>>>>

type arr1 = [1, 2, 3, 4, 5]

// 定长五元组反转（仅适用于固定长度）
type ReverseArr<Arr extends unknown[]> = 
  Arr extends [infer One, infer Two, infer Three, infer Four, infer Five] 
    ? [Five, Four, Three, Two, One] : never
type ReverseRes = ReverseArr<arr1>

// 通用：先递归反转 Rest，再把 First 接到末尾
type ReverseArr2<Arr extends unknown[]> = 
  Arr extends [infer First, ...infer Rest] 
    ? [...ReverseArr2<Rest>, First] : Arr
type ReverseRes2 = ReverseArr2<arr1>

type IsEqual<A, B> = (A extends B ? true :  false) & (B extends A ? true: false) 

type Includes<Arr extends unknown[], FindItem> = 
  Arr extends [infer First, ...infer Rest] 
    ? IsEqual<First, FindItem> extends true 
      ? true
        : Includes<Rest, FindItem>
      : false
type IncludesRes = Includes<[1, 2, 3, 4, 5], 4>
type IncludesRes2 = Includes<[1, 2, 3, 4, 5], 6>

// 累加器 Result：相等则跳过，否则收集 First
type RemoveItem<Arr extends unknown[], Item, Result extends unknown[] = []> =
  Arr extends [infer First, ...infer Rest]
    ? IsEqual<First, Item> extends true
      ? RemoveItem<Rest, Item, Result>
      : RemoveItem<Rest, Item, [...Result, First]>
    : Result
type RemoveItemRes = RemoveItem<[1, 2, 2, 3], 2>

// 构造长度为 Length 的元组（export 供 useArray 使用）
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
