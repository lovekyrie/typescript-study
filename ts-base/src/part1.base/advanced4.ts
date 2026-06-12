/**
 * 条件类型、infer、分布式条件类型、内置 Exclude/NonNullable/Extract/ReturnType
 */
type TypeName<T> = T extends string
  ? "string"
  : T extends number
    ? "number"
    : T extends boolean
      ? "boolean"
      : T extends undefined
        ? "undefined"
        : T extends Function
          ? "function"
          : "object";

type T1 = TypeName<string>;
type T2 = TypeName<string[]>;

/** 联合类型在 extends 中会分布到每个成员上 */
type T3 = TypeName<string | string[]>;

type Diff<T, U> = T extends U ? never : T;
type T4 = Diff<"a" | "b" | "c", "a" | "e">; // "b" | "c"

type NotNull<T> = Diff<T, null | undefined>;
type T5 = NotNull<string | number | undefined | null>;

type T6 = NonNullable<string | number | undefined | null>;

/** 提取联合类型中的部分类型 */
type T7 = Extract<"a" | "b" | "c", "a" | "e">; // "a"

type T8 = ReturnType<() => string>;

/** 排除联合类型中的部分 */
type T9 = Exclude<"a" | "b" | "c", "a">

/** 排除对象字面量的某些key值 */
type O = Omit<{ a: string; b: number; c: boolean }, "a">;

/** 提取对象字面量的某些key值 */
type P = Pick<{ a: string; b: number; c: boolean }, "a" | "b">;
