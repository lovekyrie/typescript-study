/**
 * 值相等与引用相等：对象用 ==/=== 比较的是引用；深比较需库或自定义。
 * 业务中按 id 查找应比较 id 字段，不要直接比较对象字面量。
 */
// console.log({ a: 123 } == { a: 123 }); //false
// console.log({ a: 123 } === { a: 123 }); //false

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

// indexOf 比较的是 id 字符串，不是整个对象引用
const footIndex = list.map((i) => i.id).indexOf("foo");
console.log(footIndex); //0
