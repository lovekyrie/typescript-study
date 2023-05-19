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