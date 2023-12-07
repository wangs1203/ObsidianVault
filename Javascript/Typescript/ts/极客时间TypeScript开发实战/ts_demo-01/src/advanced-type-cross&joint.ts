// ------ 交叉类型 ------
/** 取所有类型的并集 */
interface DogInterface {
  run(): void
}
interface CatInterface {
  jump(): void
}
let pet: DogInterface & CatInterface = {
  run(){},
  jump(){}
}

// ------ 联合类型 ------
/** 联合类型： 声明的类型并不确定，可以为多个类型中的一个 */
let aaaa:number | string = 1 // 'a'
let bbbb: 'a' | 'b' = 'a' // 'b'
let cccc: 1 | 2 | 3 = 1;

class Dog2 implements DogInterface {
  run() {}
  eat() {}
}
class Cat2 implements CatInterface {
  jump() {}
  eat() {}
}
enum Master { Boy, Girl }
function getPet(master: Master) {
  let pet  = master === Master.Boy ? new Dog2() : new Cat2()
  pet.eat()

  return pet
}

interface Square {
  kind: 'square'
  size: number
}
interface Rectangle {
  kind: 'rectangle'
  width: number
  height: number
}
interface Circle {
  kind: 'circle'
  r: number
}
type Shape = Square | Rectangle | Circle
function area(s: Shape) {
  switch (s.kind) {
    case 'square':
      return s.size * s.size
    case 'rectangle':
      return s.height * s.width
    case 'circle':
      return Math.PI * s.r ** 2
    default:
      return ((e: never) => {throw new Error(e)})(s)
  }
}
console.log(area({kind:'circle',r:1}))