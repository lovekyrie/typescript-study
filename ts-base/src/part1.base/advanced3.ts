interface Obj5 {
  a: string;
  b: number;
  c: number;
}

type ReadonlyObj = Readonly<Obj5>;

type PartialObj = Partial<Obj5>;

type PickObj = Pick<Obj, "a" | "b">;

type RecordObj = Record<"x" | "y", Obj5>;
