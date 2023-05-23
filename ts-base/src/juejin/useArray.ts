import { BuildArray } from './recursion'

type Add<Num1 extends number, Num2 extends number> =
  [...BuildArray<Num1>, ...BuildArray<Num2>]['length']
type AddRes = Add<37, 24>

type Subtract<Num1 extends number, Num2 extends number> =
  BuildArray<Num1> extends [...arr1: BuildArray<Num2>, ...arr2: infer Rest]
    ? Rest['length']
    : never
type SubtractRes = Subtract<37, 24>

type Multiply<Num1 extends number, Num2 extends number, Result extends unknown[] = []> =
  Num2 extends 0 ? Result['length'] : Multiply<Num1, Subtract<Num2, 1>, [...BuildArray<Num1>, ...Result]>
type MultiplyRes = Multiply<3, 222>

type Divide<Num1 extends number, Num2 extends number, CountArr extends unknown[] = []> =
  Num1 extends 0 ? CountArr['length'] : Divide<Subtract<Num1, Num2>, Num2, [unknown, ...CountArr]>
type DivideRes = Divide<30, 5>

type StrLen<Str extends string, CountArr extends unknown[] = []> =
  Str extends `${string}${infer Rest}` ? StrLen<Rest, [...CountArr, unknown]> : CountArr['length']
type StrLenRes = StrLen<'hello world'>

type GreateThan<Num1 extends number, Num2 extends number, CountArr extends unknown[] = []> =
  Num1 extends Num2 
    ? false
    : CountArr['length'] extends Num2
      ? true
      : CountArr['length'] extends Num1
        ? false
        : GreateThan<Num1, Num2, [...CountArr, unknown]>
type GreateThanRes = GreateThan<5, 3>
type GreateThanRes2 = GreateThan<3, 4>

type FibonacciLoop<PreArr extends unknown[], CurrentArr extends unknown[], IndexArr extends unknown[] = [], 
  Num extends number = 1> =
  IndexArr['length'] extends Num 
    ? CurrentArr['length']
    : FibonacciLoop<CurrentArr, [...PreArr, ...CurrentArr], [...IndexArr, unknown], Num>
type Fibonacci<Num extends number> = FibonacciLoop<[1], [], [], Num>

type FibonacciRes = Fibonacci<8>