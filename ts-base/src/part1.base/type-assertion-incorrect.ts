//类型断言 （当我们比ts更了解自己定义的类型时）
// return a value
let getStuff = (type: string): any => {
  switch (type) {
    case "string":
      return "Apple";
    case "number":
      return 3.1415926;
    case "boolean":
      return false;
  }
};

// get some value
let apple = getStuff("string");
let pi = getStuff("number");
let isApplePie = getStuff("boolean");

// 这些报错需要执行node type-assertion-incorrect.js 才会出现

// let app:any
console.log(apple.toFixed(2));
// TypeError: apple.toFixed(2) is not a function

// let pi: any
console.log(pi.toUpperCase());
// TypeError: pi.toUpperCase is not a function

// let isApple: any
console.log(isApplePie + 1);
