class A {
  a: number = 1
}

let { x, y, ...z } = {x:1, y:2, a:3, b:4}

let n = {x, y, ...z}
// n =1

let s = {} as A
// let s = <A>{}
s.a = 1

// namespace N {  // babel 处理不了的ts语法
//   export const n = 1
// }
// const enum E { A } // babel 处理不了的ts语法
// export = s