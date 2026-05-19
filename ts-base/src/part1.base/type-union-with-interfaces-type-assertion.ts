/**
 * 用类型断言访问联合类型某一成员（需自己保证运行时真是该类型）
 */
export {};

interface Student {
  name: string;
  marks: number;
}

interface Player {
  name: string;
  score: number;
}

let printInfo = (person: Student | Player): void => {
  console.log(`${person.name} received ${(person as Student).marks} marks.`);
};

const ross: Student = { name: "Ross Geller", marks: 98 };
printInfo(ross);
