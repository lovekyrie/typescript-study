/**
 * 字面量类型：把具体字符串/数字/true/false 当作类型，用于枚举式 API。
 * 联合字面量可限制参数只能是若干固定值之一。
 */

let foo: "Hello";

//foo = "Bar"; //Error 'bar'不能赋值给类型'Hello'

type CardinalDirection = "North" | "South" | "East" | "West";
function move(distance: number, direction: CardinalDirection) {
  //
}
move(1, "North");
//move(1, "Nurth"); //Error

type OneToFive = 1 | 2 | 3 | 4 | 5;
type Bools = true | false;
