/**
 * 用 infer 从函数/构造签名中提取：参数、返回值、this、实例、构造参数。
 * 对应内置工具类型 Parameters、ReturnType、InstanceType 等的实现思路。
 */

// 函数参数：匹配 (...args: infer Args) => unknown
type GetParameters<Func extends Function> = 
  Func extends (...args: infer Args) => unknown ? Args : never

type ParametersRes = GetParameters<(name:string, age:number) => string>

// 返回值：infer 出现在 => 右侧
type GetReturnType<Func extends Function> = 
  Func extends (...args: unknown[]) => infer ReturnType ? ReturnType: never

type ReturnTypeRes = GetReturnType<() => 'dong'>

class Dong {
  name: string

  constructor() {
    this.name = 'dong'
  }

  // 显式 this: Dong，脱离实例调用时类型检查更严
  hello(this: Dong) {
    return 'Hello, I\'m ' +  this.name
  }
}
const dong = new Dong()
dong.hello()

// dong.hello.call({xxx: 111}) // 运行时可调，但类型上 this 不匹配

type GetThisParameterType<T> = 
  T extends (this: infer ThisType, ...args: any[]) => any
    ? ThisType : unknown
type GetThisParameterTyperes = GetThisParameterType<typeof dong.hello>

interface Person {
  nm: string
}

interface PersonConstructor {
  new(nm: string): Person
}

// new 签名的 infer 得到实例类型
type GetInstanceType<ConstructorType extends new(...args: any) => any> = 
  ConstructorType extends new(...args: any) => infer InstanceType 
    ? InstanceType : any
type GetInstanceTypeRes = GetInstanceType<PersonConstructor>

// 构造函数的参数列表
type GetConstructorParameters<ConstructorType extends new(...args: any) => any> = 
  ConstructorType extends new(...args: infer ParametersType) => any 
    ? ParametersType : any
type GetConstructorParametersRes = GetConstructorParameters<PersonConstructor>

