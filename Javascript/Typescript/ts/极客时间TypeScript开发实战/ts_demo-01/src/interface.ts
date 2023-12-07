interface List {
  readonly id:number;
  name: string;
  // 字符串索引签名
  // [x: string]: any
  // 可选属性
  age?: number;
}

interface Result {
  data: List[]
}

function render(result: Result) {
  result.data.forEach((value) => {
    console.log('value.id,value.name :>> ', value.id,value.name);
    if (value.age) {
      console.log(value.age);
    }
    // value.id++ // Error: TS2540: Cannot assign to 'id' because it is a read-only property.
  })
}

const result = {
  data: [
    {id: 1, name: 'A', sex: 'male'},
    {id: 2, name: 'B', age: 10},
  ]
}

render(result);
// render({
//   data: [
//     {id: 1, name: 'A', sex: 'male'},
//     {id: 2, name: 'B'},
//   ]
// })
// TS2322: Type '{ id: number; name: string; sex: string; }' is not assignable to type 'List'.

// render({
//   data: [
//     {id: 1, name: 'A', sex: 'male'},
//     {id: 2, name: 'B'},
//   ]
// } as Result) // 类型断言

// render(<Result>{
//   data: [
//     {id: 1, name: 'A', sex: 'male'},
//     {id: 2, name: 'B'},
//   ]
// }) // <>类型断言  在ts中会引起歧义不推荐使用，个人理解 可读性也不如as断言

interface StringArray {
  [index: number]: string
}

let chars: StringArray = ['A', 'B']

interface Names {
  [x:string]: string // any
  // y: number
  [z: number]: string
  // [z: number]: number // TS2413: Numeric index type 'number' is not assignable to string index type 'string'.
}

// let add1: (x: number, y: number) => number

interface ADD {
  (x: number, y: number): number
}
let add2: ADD = (a,b)=> a+b;
// (x: number, y: number) => number 与 interface ADD 声明 效果是等价的

type AddFn = (x: number, y: number) => number;
// let add3: AddFn;

let add1:AddFn = (a, b) => a + b

// ----------
interface Lib {
  (): void
  version: string
  doSomething(): void
}

function getLib () {
  let lib: Lib = (() => {}) as Lib;
  lib.version = '1.0'
  lib.doSomething = () => {}
  return lib
}

let lib1 = getLib();
lib1();
lib1.doSomething();

let lib2 = getLib();