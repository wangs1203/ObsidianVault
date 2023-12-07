// 泛型类
class Log5<T> {
  /* 泛型不能应用与类的静态成员 */
  run(value: T) {
    console.log(value);
    return value
  }
}
let log5 = new Log5<number>()
// log5.run('23') // Error: TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.

let log51 = new Log5()
log51.run({a:1})
log51.run(1)

// ---- 泛型约束 -----
interface Length {
  length: number
}
// function logFn<T>(value: T): T {
function logFn<T extends Length>(value: T): T {
  // console.log(value, value.length) // TS2339: Property 'length' does not exist on type 'T'.
  console.log(value, value.length)
  return value
}
/* T extends Length T受到Length 接口约束，T泛型必须包含有length属性 */
logFn([])
logFn('faaaa')
logFn({length:1})
// logFn(12) // TS2345: Argument of type 'number' is not assignable to parameter of type 'Length'.