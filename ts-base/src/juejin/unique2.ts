// keyof 只能拿到class的public索引，private和protected的索引会被忽略
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

// typescript默认推导出来的类型并不是字面量常量
const obj = {
  a: 1,
  b: 2
}
type objType = typeof obj

const arr = [1, 2, 3]
type arrType = typeof arr

// 但是类型编程很多时候需要推导出字面量，这时候就需要as const
const ob2 = {
  a: 1,
  b: 2
} as const
type objType2 = typeof ob2

const arr2 = [1, 2, 3] as const
type arrType2 = typeof arr2

// 当时用arrType2用来做类型推导的时候，推导过程中需要加上readonly, 否则会匹配不出来
type ReverseArr<Arr> = Arr extends [infer A, infer B, infer C] ? [C, B, A]: never
type ReverseArrRes = ReverseArr<arrType2>

type ReverseArr2<Arr> = Arr extends readonly [infer A, infer B, infer C] ? [C, B, A]: never
type ReverseArrRes2 = ReverseArr2<arrType2>