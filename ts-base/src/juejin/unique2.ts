/**
 * keyof 与字面量收窄：class 仅公开成员、typeof、as const、readonly 元组匹配。
 * 类型体操里常需 as const，否则 number 宽化导致模式匹配失败。
 */

// keyof 只包含 public；protected/private 不会出现在 keyof 结果中
class Friend {
  public name: string
  protected age: number 
  private hobbies: string []

  constructor() {
    this.name = 'dong'
    this.age = 20
    this.hobbies = ['sleep', 'eat']
  }
}

type publicKeys = keyof Friend
type ClassPublicProps<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Obj[Key]
}
type ClassPublicPropsRes = ClassPublicProps<Friend>

// 默认推断：a、b 为 number，数组为 number[]
const obj = {
  a: 1,
  b: 2
}
type objType = typeof obj

const arr = [1, 2, 3]
type arrType = typeof arr

// as const：属性只读且字面量类型，元组长度固定
const ob2 = {
  a: 1,
  b: 2
} as const
type objType2 = typeof ob2

const arr2 = [1, 2, 3] as const
type arrType2 = typeof arr2

// 可变元组推断；as const 数组需 readonly 元组模式才能匹配
type ReverseArr<Arr> = Arr extends [infer A, infer B, infer C] ? [C, B, A]: never
type ReverseArrRes = ReverseArr<arrType2>

type ReverseArr2<Arr> = Arr extends readonly [infer A, infer B, infer C] ? [C, B, A]: never
type ReverseArrRes2 = ReverseArr2<arrType2>
