let foo: ReadonlyArray<number> = [1, 2, 3];

console.log(foo[0]);

//foo.push(4);
foo = foo.concat(4);

console.log(foo);
