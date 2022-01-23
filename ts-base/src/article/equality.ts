console.log({ a: 123 } == { a: 123 }); //false
console.log({ a: 123 } === { a: 123 }); //false

// to do such checks use the deep-equal npm package e.g.
import deepEqual from "deep-equal";

console.log(deepEqual({ a: 123 }, { a: 123 })); //true

type IdDisplay = {
  id: string;
  display: string;
};

const list: IdDisplay[] = [
  {
    id: "foo",
    display: "Foo Select",
  },
  {
    id: "foo",
    display: "Bar Select",
  },
];

const footIndex = list.map((i) => i.id).indexOf("foo");
console.log(footIndex); //0
