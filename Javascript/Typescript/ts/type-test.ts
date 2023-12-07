// -----------------------类型断言（编译时类型转换）
// let num:number = 12345;
// let str:string = num as string; //err

// class A {
//   run () {
//     console.log('run run run');
//   }
//   jump () {
//     console.log('jump jump jump');
//   }
// }
// class B {
//   run (): void {
//     console.log('slow run');
//   }

//   cry () {
//     console.log('cry cry cry');
//   }
// }
// let a = new A();     //隐式转换a的类型
// let a1: A = new A(); //也可以显示的表明a1的类型

// let b = new B();
// // a = b;     //Err, 类型B不能直接赋值给类型A, 因为在B中没有定义jump方法
// // a = <A> b; //Err, ts中使用 `<>` 进行强制类型转换 ,错误原因同上

// let b1: any = new B();  //声明为any类型 any类型可以转成任意其它类型,反之亦然
// a = b1;    //OK
// b1 = a;    //OK

// var b2: any = new B();
// var newA = <A>b2;  //把b2的B类型转为A类型
// newA.run();        //OK, 打印 slow run
// newA.jump();       //编译期间不会有问题,  但是运行期间会出现异常 `newA.jump is not a function`



//-------------------------------------------------------
//子类方法重载
// class Base {
//   public test (): number {
//     return 1;
//   }
//   public test2 (): number {
//     return 2;
//   }
// }

// class Derived extends Base {
//   public test (): number {
//     return 3;
//   }
//   public test2 (): number {
//     return super.test();
//   }
// }


// ----------------------------------------------

// const foo = {};
// foo.bar = 123; // Error: 'bar' 属性不存在于 ‘{}’
// foo.bas = 'hello'; // Error: 'bas' 属性不存在于 '{}'

// interface Foo {
//   bar: number;
//   bas: string;
// }

// const foo = {} as Foo;
// foo.bar = 123;
// foo.bas = 'hello';

//----------------------- 泛型 -------------------------
function createArray<T>(length: number, value: T): Array<T>{
  let result: T[] = [];
  for (let i = 0; i < length; i++){
      result[i] = value
  }
  return result
}
console.log("数字", createArray(3, 1));
console.log("字符串", createArray(3, 'a'));

// ------------------- --strictNullChecks ---------------------
let a:number = null;
