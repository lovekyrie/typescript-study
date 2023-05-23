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