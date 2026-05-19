/**
 * 联合类型未收窄：Student | Player 只有 name 是公共字段
 */
interface Student {
  name: string;
  marks: number;
}

interface Player {
  name: string;
  score: number;
}

let printInfo = (person: Student | Player): void => {
  // console.log(`${person.name} received ${person.marks} marks`);
  // 错误：marks 在 Player 上不存在
};
