/**
 * 访问修饰符：public（默认）、protected、private
 */
class Person {
  protected name: string; // 子类可访问，外部不可
  constructor(name: string) {
    this.name = name;
  }
}

class Employee extends Person {
  private department: string; // 仅 Employee 内部
  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }
  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
// console.log(howard.department); // 错误：private
