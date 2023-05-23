type Camelcase<Str extends string> =
  Str extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${Camelcase<Rest>}`
    : Str

type CamelcaseArr<Arr extends unknown[]> =
  Arr extends [infer Item, ...infer Rest]
    ? [Camelcase<Item & string>,...CamelcaseArr<Rest>]
    : []
type CamelcaseArrRes = CamelcaseArr<['aa_aa_aa', 'bb_bb_bb', 'cc_cc_cc']>

type CamelcaseUnion<Item extends string> =
  Item extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${CamelcaseUnion<Rest>}`
    : Item
type CamelcaseUnionRes = CamelcaseUnion<'aa_aa_aa' | 'bb_bb_bb' | 'cc_cc_cc'>

type BEM<Block extends string, Element extends string[], Modifiers extends string[]> =
  `${Block}_${Element[number]}--${Modifiers[number]}`
type BEMRes = BEM<'guang', ['aaa', 'bbb'], ['warning', 'success']>

