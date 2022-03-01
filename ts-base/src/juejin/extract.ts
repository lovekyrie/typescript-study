type p = Promise<"guang">;
type GetValueType<P> = P extends Promise<infer Value> ? Value : never;
type GetValueResult = GetValueType<p>;

//#region 数组类型

// get first element
type arr = [1, 2, 3];
type GetFirst<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]] ? First : never;
type getFirstResult = GetFirst<arr>;

// get last element
type GetLast<Arr extends unknown[]> = Arr extends [...unknown[], infer Last] ? Last : never;
type getLastResult = GetLast<arr>;

// array pop element
type PopArr<Arr extends unknown[]> = Arr extends [] ? [] : Arr extends [...infer Rest, unknown] ? Rest : never;
type popResult = PopArr<arr>;
type popResult2 = PopArr<[]>;

// array shift element
type shiftArr<Arr extends unknown[]> = Arr extends [] ? [] : Arr extends [unknown, ...infer Rest] ? Rest : never;
type shiftResult = shiftArr<arr>;

//#endregion

//#region 字符串类型

// string starts with
type StartWith<Str extends string, Prefix extends string> = Str extends `${Prefix}${string}` ? true : false;

//#endregion
