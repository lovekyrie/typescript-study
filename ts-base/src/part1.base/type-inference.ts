// 类型推断
//#region 这里的推断都是从右向左推断
// export = {};
let aTypeInfer = 1;
let b = [1, null, "a"];
let c = { x: 1, y: "a" };
let d = (x = 1) => x + 1;
//#endregion

// 从左往右的推断
window.onkeydown = (event: KeyboardEvent) => {
  // button属性不属于keydownEvent
  // console.log(event.button);
};

interface FooTypeInfer {
  bar: number;
}
//let foo={} as Foo
//let foo = <Foo>{};

let fooInfer: FooTypeInfer = {
  bar: 1,
};
//foo.bar = 1;
