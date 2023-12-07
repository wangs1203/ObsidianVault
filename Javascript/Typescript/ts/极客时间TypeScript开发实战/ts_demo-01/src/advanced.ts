// 类型推断
// let a // any
// let a = 1 // number
// let a = '' // string
// let a = true // boolean
// let a = [] // any[]
// let a = [1] // number[]
let a = null // any
let b = [1, null] //  (number | null)[]
/* strictNullChecks为false时  推断为 number[]*/

let c = (x = 1) => x + 1 // c: (x?: number) => number

// window.onkeydown = (event: KeyboardEvent) => {
//   // console.log(event)
// }
// ------- 类型断言 -------
interface Foo {
  bar: number
}
// let foo = {} as Foo;
// let foo = {};
// (foo as Foo).bar = 1;

let foo: Foo = {
  bar: 1
}


// ------- 类型兼容性 -------
/**
 * X 兼容 Y： X（目标类型） = Y（源类型）
 */
/* 仅适用部分情况（接口兼容性） 源类型必须具备目标类型的必要属性 */
let s: string = 'a'
/* strictNullChecks 为false时， 字符串变量可以赋值null */
/* 字符串类型兼容null类型 / null 是字符串类型的子类型 */
// let ss: string = null;

// ------- 接口兼容性 -------
interface X {
  a: any
  b: any
}

interface Y {
  a: any
  b: any
  c: any
}
let xx: X = {a: 1, b: 2}
let yy: Y = {a: 1, b: 2, c: 3}
/* 只要一个接口（X）包含另一个接口（Y）所有定义属性，那么X是Y的子类型 / X类型兼容Y类型 */
xx = yy
// yy = xx //  TS2741: Property 'c' is missing in type 'X' but required in type 'Y'.

// ------- 函数兼容性 -------
type Handler = (a: number, b: number) => void
function hof(handler: Handler){
  return handler
}
// Handler - 目标类型  /  hof传入的参数 - 源类型
// 1，必要条件 参数个数，
let handler1 = (a:number) => {}
hof(handler1)
let handler2 = (a: number, b: number, c: number) => {}
// hof(handler2) //  TS2345: Argument of type '(a: number, b: number, c: number) => void' is not assignable to parameter of type 'Handler'.

// ------- 可选参数和剩余参数 -------
let aa = (p1: number, p2: number) => {}
let bb = (p1: number, p2?: number) => {}
let cc = (...args: number[]) => {}
/* 固定参数兼容可选参数和剩余参数 */
aa = bb
aa = cc
/**
 * 可选参数不兼容固定参数和剩余参数,
 * strictFunctionTypes为false时 可选参数兼容固定参数和剩余参数
*/
// bb = aa;
// bb = cc;

/* 剩余参数兼容固定参数和可选参数 */
cc = aa;
cc = bb;

// 2，参数类型
let handler3 = (a:string) => {}
// hof(handler3); // TS2345: Argument of type '(a: string) => void' is not assignable to parameter of type 'Handler'.

interface Point3D {
  x: number
  y: number
  z: number
}
interface Point2D {
  x: number
  y: number
}
// 与接口兼容性相反，多的兼容少的
/**
 * strictFunctionTypes为false时 p2d 兼容 p3d
*/
let p3d = (point: Point3D) => {}
let p2d = (point: Point2D) => {}
p3d = p2d // p3d兼容p2d
// p2d = p3d // TS2322: Type '(point: Point3D) => void' is not assignable to type '(point: Point2D) => void'.
// p3d = p2d p2d = p3d 这种函数的参数可互相赋值，称为函数参数的双向斜变

// 3，返回值类型
/* 目标函数的返回值必须与源函数的返回值类型一致或者为其子类型 */
let ff = () => ({name: 'Alice'})
let gg = () => ({name: 'Alice', location: 'Beijing'})
/* ff返回值类型 是gg返回值类型的子类型，少兼容多 */
ff = gg
// gg = ff

// ------ 函数重载 ------
/**
 * 函数重载列表中的函数为目标函数，具体实现为源函数
 * 在重载列表中，目标函数的参数要多于源函数的参数
 * 且返回值类型要符合要求
 */
function overload(a: number, b: number): number
function overload(a: string, b: string): string
function overload(a: any, b: any): any {}
// function overload(a: any, b: any) {} // TS2394: This overload signature is not compatible with its implementation signature.
// function overload(a: any, b: any, c:any): any {} // TS2394: This overload signature is not compatible with its implementation signature.

// ------ 枚举兼容性 ------
enum Fruit {
  Apple, Banana
}
enum Color {
  Red, Yellow
}

let fruit: Fruit.Apple = 12
let no: number = Fruit.Apple
// 枚举之间不兼容
// let color: Color = Fruit.Apple // TS2322: Type 'Fruit.Apple' is not assignable to type 'Color'.

// ------ 类兼容性 ------
/**
 * 在比较两个类是否兼容时，静态成员和构造函数是不参与比较的
 * 如果两个类具有相同的实例成员，那么他们的实例相互兼容
 * 两个类中含有私有成员，那么他们的实例不互相兼容，这种情况只有父类和子类是互相兼容的
 */
class A {
  constructor(p: number, q: number){}
  id: number = 1
  private name: string = ''
}
class B {
  static s = 1
  constructor(p: number) {}
  id: number = 2
  private name: string = ''
}
let aaa = new A(1, 2)
let bbb = new B(1)
// aaa = bbb
// bbb = aaa

class AChild extends A {}

let aaaChild = new AChild(1,2)
aaaChild = aaa
aaa = aaaChild

// ------ 泛型兼容性 ------
/**
 * 在泛型在被使用时，接口兼容性会被影响
 */
interface Empty<T> {
  value: T
}
// let obj1: Empty<number> = {};
// let obj2: Empty<string> = {};
// obj1 = obj2
// obj2 = obj1

let log1 = <T>(x: T): T => {
  console.log('x')
  return x
}
let log2 = <U>(y: U): U => {
  console.log('y')
  return y
}
log1 = log2
log2 = log1