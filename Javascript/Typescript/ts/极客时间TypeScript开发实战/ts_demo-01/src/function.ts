// 函数定义
function addFn1(x: number, y: number) {
  return x + y
}
// 只有函数定义没有实现
let addFn2: (x:number, y:number) => number

type addFn3 = (x:number, y:number) => number

interface AddFn4 {
  (x: number, y: number): number
}

// addFn1(1, 2, 3)
// addFn1(1)
addFn1(1, 2)

function addFn5(x: number, y?: number) {
  return y ? x + y: x
}

addFn5(1);


function addFn6(x:number, y = 0, z:number, q = 1){
  return x + y + z + q
}
console.log(addFn6(1, undefined, 3))

function addFn7(x: number, ...rest: number[]){
  return x + rest.reduce((pre,cur) => pre + cur, 1)
}
console.log(addFn7(1,2,3,4,5)) // 16

// ----- 函数重载 -----
function addFn8(...args: number[]): number;
function addFn8(...args: string[]): string;
function addFn8(...args: any[]) {
  let first = args[0]
  if (typeof first === 'string') {
    return args.join('')
  } else if (typeof first === 'number'){
    return args.reduce((prev, cur) => prev + cur)
  }
}
console.log(addFn8(1,2,3,4))
console.log(addFn8('Hello','World','!'))