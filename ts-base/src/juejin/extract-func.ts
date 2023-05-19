type GetParameters<Func extends Function> = 
  Func extends (...args: infer Args) => unknown ? Args : never

type ParametersRes = GetParameters<(name:string, age:number) => string>

type GetReturnType<Func extends Function> = 
  Func extends (...args: unknown[]) => infer ReturnType ? ReturnType: never

type ReturnTypeRes = GetReturnType<() => 'dong'>

class Dong {
  name: string

  constructor() {
    this.name = 'dong'
  }

  hello(this: Dong) {
    return 'Hello, I\'m ' +  this.name
  }
}
const dong = new Dong()
dong.hello()

// dong.hello.call({xxx: 111})
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

type GetInstanceType<ConstructorType extends new(...args: any) => any> = 
  ConstructorType extends new(...args: any) => infer InstanceType 
    ? InstanceType : any
type GetInstanceTypeRes = GetInstanceType<PersonConstructor>

type GetConstructorParameters<ConstructorType extends new(...args: any) => any> = 
  ConstructorType extends new(...args: infer ParametersType) => any 
    ? ParametersType : any
type GetConstructorParametersRes = GetConstructorParameters<PersonConstructor>

