/** 接口只能约束类的公有成员, 不能约束类的构造器 */
interface Human {
  name: string
  eat(): void
  // new (name: string): void // TS2420: Class 'Asian' incorrectly implements interface 'Human'.
}

class Asian implements Human {
  constructor(name: string) {
    this.name = name
  }
  // private name: string
  name: string
  eat() {}

  sleep() {

  }
}

// ------ interface 的 继承 -----
interface Man extends Human {
  run(): void
}

interface Child {
  cry(): void
}

interface Boy extends Man,Child {

}

let boy: Boy = {
  name:' lee',
  run(){
    console.log('run')
  },
  eat(){},
  cry(){}
}

// ------ interface 继承 Class -------
class Auto {
  state = 1
  private state2 = 0 // C不是Auto的子类，自然不能包含Auto的非公有成员
  protected state3 = 0
}

interface AutoInterface extends Auto {}

// class C implements AutoInterface { // TS2420: Class 'C' incorrectly implements interface 'AutoInterface'.
//   state = 1
// }

/* Auto的子类也可以实现AutoInterface */
/* 接口在抽离类的成员的时候，不仅抽离了公有成员，还抽离了私有成员与受保护成员 */
class Bus extends Auto implements AutoInterface {
// class Bus extends Auto {
  constructor(){
    super()
  }
}
console.log(new Bus())

// let autoI: AutoInterface = {
//   state:1,
//   state2:2,
//   state3:1
// }