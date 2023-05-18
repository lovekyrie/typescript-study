type First<Tuple extends unknown[]> = Tuple extends [infer T, ...infer Rest] ? T : never

type Res1 = First<[1, 2, 3]>

// 交叉类型 & （同一类型会被合并，不同类型会被舍弃）
type ObjType = { a: number } & { c: boolean }

type Res2 = { a: number } & { c: boolean } extends ObjType ? true : false

// never
type Res3 = 'aaaa' & 2222

// 映射类型
type MapType<T> = {
  [Key in keyof T]: [T[Key], T[Key], T[Key]]
}

type Res4 = MapType<{a:1, b:2}>

type MapeKeyType<T> = {
  [Key in keyof T as `${Key & string}${Key & string}${Key & string}` ]: [T[Key], T[Key], T[Key]]
}

type Res5 = MapeKeyType<{a:1, b:2}>