/**
 * 联合类型上的字符串递归：驼峰、数组/联合批量转换、BEM 命名、全组合。
 * 体会「联合分发」：CamelcaseUnion 对每个成员单独套用同一套规则。
 */

// 下划线转驼峰：每次吃掉 _X 并把 X 大写
type Camelcase<Str extends string> =
  Str extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${Camelcase<Rest>}`
    : Str

// 元组：逐元素递归 Camelcase
type CamelcaseArr<Arr extends unknown[]> =
  Arr extends [infer Item, ...infer Rest]
    ? [Camelcase<Item & string>,...CamelcaseArr<Rest>]
    : []
type CamelcaseArrRes = CamelcaseArr<['aa_aa_aa', 'bb_bb_bb', 'cc_cc_cc']>

// 联合：Str 为联合时 extends 会对每个成员分发
type CamelcaseUnion<Item extends string> =
  Item extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${CamelcaseUnion<Rest>}`
    : Item
type CamelcaseUnionRes = CamelcaseUnion<'aa_aa_aa' | 'bb_bb_bb' | 'cc_cc_cc'>

// 模板字面量 + 索引访问：Element[number]、Modifiers[number] 取联合
type BEM<Block extends string, Element extends string[], Modifiers extends string[]> =
  `${Block}_${Element[number]}--${Modifiers[number]}`
type BEMRes = BEM<'guang', ['aaa', 'bbb'], ['warning', 'success']>

type Combination<A extends string, B extends string> =
  A | B | `${A}${B}` | `${B}${A}`

// 递归穷举：每次固定 A，与「剩余字母的全组合」做 Combination
type AllCombinations<A extends string, B extends string = A> = 
  A extends A ? Combination<A, AllCombinations<Exclude<B, A>>> : never
type AllCombinationsRes = AllCombinations<'A' | 'B' | 'C'>

