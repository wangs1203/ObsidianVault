// 原始类型
let bool: boolean = true
let num: number | null | undefined = 123
let str: string = 'abc'
// str = 123  // err: TS2322: Type 'number' is not assignable to type 'string'. 不能将类型“number”分配给类型“string”。ts(2322)

// 数组
let arr1: number[] = [1,2,3]
let arr2: Array<number | string> = [1,2,3,'4']

// 元组  -》 特殊的数组， 限制了数组元素的类型和个数
let tuple: [number, string] = [0, '1']

// 元组越界问题
// tuple.push(2)
// console.log(tuple)
// tuple[2]; // Error :TS2493: Tuple type '[number, string]' of length '2' has no element at index '2'.

// 函数
let add = (x: number, y: number) => x + y

let compute: (x: number, y:number) => number
compute = (a,b) => a+b

// 对象
// let obj: object = {x:1, y:2}
// obj.x = 3 // Error: TS2339: Property 'x' does not exist on type 'object'.
let obj: {x:number,y:number} = {x:1, y:2}
obj.x = 3

// symbol
let s1: symbol = Symbol();
let s2 = Symbol();
console.log('s1 :>> ', s1);
console.log('s2 :>> ', s2);
console.log(s1 === s2)

// undefined null
let und: undefined = undefined;
let nu: null = null;

// und = 1; // Error TS2322: Type '1' is not assignable to type 'undefined'.
// nu = 1; // TS2322: Type '1' is not assignable to type 'null'.

/**
 * strictNullChecks：true tsconfig.json
 * 严格模式会报错
 * 严格模式 num修改为联合类型
 * let num: number | null | undefined = 123
 * 不会报错
 */
num = null // TS2322: Type 'undefined' is not assignable to type 'number'.
num = undefined // TS2322: Type 'null' is not assignable to type 'number'.

// void
let noReturn = () => {};

// any
let x
x = 1
x = []
x = {}
x = () => {}

// never
let error = () => {
  throw new Error('error')
}
let endless = () => {
  while(true){}
}