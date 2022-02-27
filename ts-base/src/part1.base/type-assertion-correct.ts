// return a value
// export 防止重名报错
export {};
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

// get some values
let apple = getStuff("string");
let pi = getStuff("number");
let isApplePie = getStuff("boolean") as boolean;

// Compilation Error: Property 'toFixed' does not exist on type 'string'.
// console.log((apple as string).toFixed(2))
console.log((apple as number).toFixed(2));

// Compilation Error: Property 'toUpperCase' does not exist on type 'number'.
// console.log((<number>pi).toUpperCase())
console.log((<string>pi).toUpperCase());

// Complation Error: Operator '+' cannot be applied to types 'boolean' and 'number'
// console.log(isApplePie+1)
