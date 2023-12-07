// 映射类型
/** 同态 不会创建新的属性 */
/** */
interface Obj1 {
  a: string;
  b: number;
  c: boolean;
}

type ReadonlyObj = Readonly<Obj1>

// type Rfd<T> = {
//   [P in keyof T]?: T[P]
// }
// type Rfd = {
//   [P in keyof Obj1]?: Obj1[P]
// }

type PartialObj = Partial<Obj1>


type PickObj = Pick<Obj1, 'a' | 'b'>

/** 会创建新的属性 */
// Record
type RecordObj = Record<'x' | 'y', Obj>

// ------- 条件类型 ------
// T extends U ? X : Y  // 如果类型T可以被赋值类型U 那么结果就是X 否则为Y
type TypeName<T> =
  T extends string ? 'string' :
  T extends number ? 'number' :
  T extends boolean ? 'boolean' :
  T extends undefined ? 'undefined' :
  T extends Function ? 'function' :
  'object'

type T1 = TypeName<string>

type T2 = TypeName<string[]>


// 分布式条件类型
// (A | B) extends U ? X : Y
// (A extends U ? X : Y | B extends U ? X : Y)
type T3 = TypeName<string | string[]>

type Diff<T, U> = T extends U ? never : T

type T4 = Diff<'a'|'b'|'c', 'a'|'e'>
// Diff<'a', 'a' | 'e'> | Diff<'b', 'a' | 'e'> | Diff<'c', 'a'|'e'>
// never | 'b' | 'c'

type NotNull<T> = Diff<T, undefined | null>

type T5 = NotNull<string | number | undefined | null>

// Exclude<T, U> 内置实现 Diff

// NotNullable<T> 内置实现 NotNull

// Extract<T, U> 与 Exclude相反

type T6 = Extract<'a'|'b'|'c', 'a'|'e'>

// ReturnType<T>

type T7 = ReturnType<() => string>