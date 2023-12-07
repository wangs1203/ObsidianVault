// -----------  类（1）：继承和成员修饰符 ----------
class Dog {
  // private constructor(name: string){ /* 构造器添加private修饰符，既不能被实例化，也不能被继承*/

  // protected constructor(name: string){ /* 构造器添加protected修饰符，不能被实例化，可继承 相当于基类*/
  constructor(name: string){
    this.name = name
    // this.legs = 4
  }
  /* 与es 不同 实例属性必须有初始值或在构造函数内初始化 */
  /* public修饰符 默认在ts的class所有成员都是 public */
  // 实例属性 非原型属性
  public name: string = 'dog'
  // 原型方法
  run() {}
  /* 私有成员只能在类的本身调用，不能在类的实例，不能被子类调用 */
  private pri() {
  }
  /* 受保护成员 -> 只能在类或子类访问，不能在类实例中访问 */
  protected pro() {
  }
  /* 只读成员 -> 成员也必须要初始化（初始值） */
  readonly legs: number = 4
  /* 静态成员 ->  只能通过类名来调用,子类可以继承父类的静态属性 */
  static food:string = 'bones'
}

console.log(Dog.prototype)
const dog1 = new Dog('WangWang')
console.log(dog1)
console.log(dog1.run)
// dog1.pri() // Error: TS2341: Property 'pri' is private and only accessible within class 'Dog'.
// dog1.pro() // TS2445: Property 'pro' is protected and only accessible within class 'Dog' and its subclasses.
console.log(Dog.food);
// console.log(dog1.food); // TS2576: Property 'food' is a static member of type 'Dog'.

class Husky extends Dog {
  constructor(name: string, public color:string){
    super(name)
    this.color = color
    // this.pri() // TS2341: Property 'pri' is private and only accessible within class 'Dog'.
    this.pro()
  }
  // color: string;
  jump(){
    super.pro()
  }
}
console.log(Husky.food)

// ----------- 类（2）：抽象类与多态 ----------
/* 抽象类就是只能被继承，而不能实例化的类 */
/* 多态就是在父类定义抽象方法，在多个派生类中实现抽象方法的具体实现 */
abstract class Animal {
  eat() {
    console.log('eat')
  }
  /* 抽象方法 只定义方法，不实现 */
  abstract sleep(): void
}
// let animal = new Animal(); //  S2511: Cannot create an instance of an abstract class.

class Dog1 extends Animal {
  constructor(name: string) {
    super()
    this.name = name
  }
  name: string
  run (){}
  sleep (){
    console.log('dog sleep')
  }
}
let dog11 = new Dog1 ('wang-wang')

dog11.eat()

class Cat extends Animal {
  sleep () {
    console.log('cat sleep')
  }
}
let cat = new Cat();
let animals: Animal[] = [dog11, cat];
animals.forEach((i) => {
  // 多态 ，在代码执行时区分不同对象 执行具体实现方法
  i.sleep()
})
// -------------------
/* this 类型  （类型？？？？） */
class WorkFlow {
  step1() {
    return this
  }
  step2() {
    return this
  }
}
new WorkFlow().step1().step2()

class TeamFlow extends WorkFlow {
  next(){
    return this;
  }
}
new TeamFlow().next().step1().next().step2();
