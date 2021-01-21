interface A {
  x: number;
  //y: string;
  foo(bar: number): number;
  foo(bar: "a"): string;
}

interface A {
  y: number;
  foo(bar: string): string;
  foo(bar: number[]): number[];
  foo(bar: "b"): string;
}

let mergeA: A = {
  x: 1,
  y: 1,
  foo(bar: any) {
    return 1 as any;
  },
};

class C {}
namespace C {
  export let state = 1;
}
console.log(C.state);

function Lib() {}
namespace Lib {
  export let version = "1.0";
}
console.log(Lib.version);

enum Color {
  Red,
  Yellow,
  Blue,
}
namespace Color {
  export function mix() {}
}
console.log(Color);
