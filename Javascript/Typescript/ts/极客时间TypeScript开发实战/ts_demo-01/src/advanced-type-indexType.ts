let obj1 = {
  a:1,
  b:2,
  c:3
}
function getValues(obj: any, keys: string[]){
  return keys.map(key => obj[key])
}
console.log(getValues(obj1, ['a','b']))
console.log(getValues(obj1, ['e','f']))

// keyof T
interface Obj {
  a: number
  b: string
}
let key: keyof Obj

// T[K]
let value: Obj['a']

// T extends U

function getValues1<T, K extends keyof T>(obj: T, keys: K[]): T[K][]{
  return keys.map(key => obj[key])
}
console.log(getValues1(obj1, ['a','b']))
// console.log(getValues1(obj1, ['e','f']))