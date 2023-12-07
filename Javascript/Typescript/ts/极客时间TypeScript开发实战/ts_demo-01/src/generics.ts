function log<T>(value: T): T {
  console.log(value)
  return value
}

log<string[]>(['string1','string2'])

log([1])

// ---------  ---------
/* 不仅可以用泛型定义一个函数，还可以定义一个函数类型 */
// type Log = <T>(value: T) => T  等价于 typeof log
type Log = <T>(value: T) => T
type Log2 = typeof log

let myLog: Log = log
let myLog2: Log2 = log

// ----- 泛型接口 -----
// interface Log3  等价于 type Log = <T>(value: T) => T
interface Log3 {
  <T>(value: T): T // 泛型仅约束了接口函数
}

interface Log4<T = string> {
  (value: T): T
}
let myLog4: Log4<number> = log
myLog4(2)