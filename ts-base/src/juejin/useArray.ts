/**
 * 用元组长度模拟数字：加减乘除、字符串长度、比较、斐波那契。
 * 核心技巧：BuildArray<N> 得到长度为 N 的元组，['length'] 即数字字面量。
 */
import { BuildArray } from './recursion'

// 加法：两段元组合并后的 length
type Add<Num1 extends number, Num2 extends number> =
  [...BuildArray<Num1>, ...BuildArray<Num2>]['length']
type AddRes = Add<37, 24>

// 减法：大元组能否拆成 [Num2 长度前缀, ...Rest]
type Subtract<Num1 extends number, Num2 extends number> =
  BuildArray<Num1> extends [...arr1: BuildArray<Num2>, ...arr2: infer Rest]
    ? Rest['length']
    : never
type SubtractRes = Subtract<37, 24>

// 乘法：Num2 次把 Num1 长度的块累加到 Result
type Multiply<Num1 extends number, Num2 extends number, Result extends unknown[] = []> =
  Num2 extends 0 ? Result['length'] : Multiply<Num1, Subtract<Num2, 1>, [...BuildArray<Num1>, ...Result]>
type MultiplyRes = Multiply<3, 222>

// 除法：反复减 Num2，CountArr 记录次数
type Divide<Num1 extends number, Num2 extends number, CountArr extends unknown[] = []> =
  Num1 extends 0 ? CountArr['length'] : Divide<Subtract<Num1, Num2>, Num2, [unknown, ...CountArr]>
type DivideRes = Divide<30, 5>

// 字符串长度：每次剥掉一个字符，计数元组 +1
type StrLen<Str extends string, CountArr extends unknown[] = []> =
  Str extends `${string}${infer Rest}` ? StrLen<Rest, [...CountArr, unknown]> : CountArr['length']
type StrLenRes = StrLen<'hello world'>

// 大于：同步递增 CountArr，先碰到 Num2 则 false，先碰到 Num1 则 true
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

// 斐波那契：Pre/Current 两列元组按位相加，IndexArr 控制迭代次数
type FibonacciLoop<PreArr extends unknown[], CurrentArr extends unknown[], IndexArr extends unknown[] = [], 
  Num extends number = 1> =
  IndexArr['length'] extends Num 
    ? CurrentArr['length']
    : FibonacciLoop<CurrentArr, [...PreArr, ...CurrentArr], [...IndexArr, unknown], Num>
type Fibonacci<Num extends number> = FibonacciLoop<[1], [], [], Num>

type FibonacciRes = Fibonacci<8>
