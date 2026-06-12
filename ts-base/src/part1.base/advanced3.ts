/**
 * 内置工具类型：Readonly、Partial、Pick、Record
 */
import type { Obj } from "./advanced2";

interface Obj5 {
  a: string;
  b: number;
  c: number;
}

/** 全部属性只读 */
type ReadonlyObj = Readonly<Obj5>;

/** 全部属性可选 */
type PartialObj = Partial<Obj5>;

/** 全部属性必填 */
type RequiredObj = Required<Obj5>;

/** 挑选部分属性 */
type PickObj = Pick<Obj, "a" | "b">;

/** 构造键到值的映射 */
type RecordObj = Record<"x" | "y", Obj5>;

/** 排除部分属性 */
type OmitObj = Omit<Obj5, "a">;

