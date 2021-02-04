//使用一个字符串字面量作为一个类型
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
