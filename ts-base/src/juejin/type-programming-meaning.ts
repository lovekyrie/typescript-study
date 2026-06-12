/**
 * 类型编程的实际意义
 *
 * 类型编程不是为了写复杂类型本身，而是在「类型之间存在关系」时，
 * 用条件类型、infer、模板字面量类型、映射类型、递归等能力计算出新类型。
 *
 * 常见价值：
 * 1. 返回值类型由参数类型推导出来，比如 Promise.all / Promise.race / currying。
 * 2. 运行时代码本来只需要宽泛类型，但通过类型编程可以得到更精准的提示和检查。
 * 3. 把一部分运行时规则同步表达在类型层，减少调用方猜测。
 */

export {};

// #region 案例一：parseQueryString 的返回类型提示

type QueryValue = string | string[];

type ParseParam<Param extends string> =
  Param extends `${infer Key}=${infer Value}`
    ? { [K in Key]: Value }
    : Record<string, QueryValue>;

type MergeValues<One, Other> =
  One extends Other
    ? One
    : Other extends unknown[]
      ? [One, ...Other]
      : [One, Other];

type MergeParams<
  OneParam extends Record<string, unknown>,
  OtherParam extends Record<string, unknown>,
> = {
  [Key in keyof OneParam | keyof OtherParam]:
    Key extends keyof OneParam
      ? Key extends keyof OtherParam
        ? MergeValues<OneParam[Key], OtherParam[Key]>
        : OneParam[Key]
      : Key extends keyof OtherParam
        ? OtherParam[Key]
        : never;
};

type ParseQueryString<Str extends string> =
  Str extends `${infer Param}&${infer Rest}`
    ? MergeParams<ParseParam<Param>, ParseQueryString<Rest>>
    : ParseParam<Str>;

function parseQueryString<Str extends string>(queryStr: Str): ParseQueryString<Str>;
function parseQueryString(queryStr: string): Record<string, QueryValue> {
  if (!queryStr.length) {
    return {};
  }

  const queryObj: Record<string, QueryValue> = {};

  queryStr.split("&").forEach((item) => {
    const [key, value = ""] = item.split("=");
    const current = queryObj[key];

    if (current === undefined) {
      queryObj[key] = value;
    }
    else if (Array.isArray(current)) {
      current.push(value);
    }
    else {
      queryObj[key] = [current, value];
    }
  });

  return queryObj;
}

const queryFromLiteral = parseQueryString("a=1&b=2&a=3");
type QueryFromLiteral = typeof queryFromLiteral;
// type QueryFromLiteral = {
//   a: ["1", "3"];
//   b: "2";
// }

const queryStrFromRuntime: string = "name=ts&level=advanced";
const queryFromRuntime = parseQueryString(queryStrFromRuntime);
type QueryFromRuntime = typeof queryFromRuntime;
// type QueryFromRuntime = Record<string, QueryValue>

// #endregion

// #region 案例二：Promise.all / Promise.race 的返回值类型

type PromiseAllResult<T extends readonly unknown[]> = {
  -readonly [P in keyof T]: Awaited<T[P]>;
};

type PromiseRaceResult<T extends readonly unknown[]> = Awaited<T[number]>;

const promiseList = [
  Promise.resolve(1),
  Promise.resolve("ts"),
  true,
] as const;

type AllResult = PromiseAllResult<typeof promiseList>;
// type AllResult = [number, string, true]

type RaceResult = PromiseRaceResult<typeof promiseList>;
// type RaceResult = number | string | true

// Promise.all 的返回值需要逐个提取参数中 Promise 的 value 类型；
// Promise.race 的返回值则是任意一个成员完成后的 value 联合类型。
// 这种「返回类型由参数类型计算出来」的场景，离不开类型编程。

// #endregion

// #region 案例三：currying 的函数类型转换

type CurriedFunc<Params extends readonly unknown[], Return> =
  Params extends readonly [infer Arg, ...infer Rest]
    ? (arg: Arg) => CurriedFunc<Rest, Return>
    : Return;

declare function currying<Func>(fn: Func):
  Func extends (...args: infer Params) => infer Result
    ? CurriedFunc<Params, Result>
    : never;

const sourceFunc = (a: string, b: number, c: boolean) => ({ a, b, c });

type CurriedSourceFunc = ReturnType<typeof currying<typeof sourceFunc>>;
// type CurriedSourceFunc =
//   (arg: string) => (arg: number) => (arg: boolean) => {
//     a: string;
//     b: number;
//     c: boolean;
//   }

// currying 的入参是一个函数，返回值是按参数列表逐层拆分后的函数。
// 参数个数不固定，因此类型层也要递归地拆 tuple、构造函数。

// #endregion
