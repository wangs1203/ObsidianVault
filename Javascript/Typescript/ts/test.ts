
// let arrayFibonacci3: (number | string | boolean)[] = [1, 1, '2', false, 5, 8];

// interface Foo {
//   bar: number;
//   bas: string;
// }
// const foo = {} as Foo;
// foo.bar = 123;
// foo.bas = 'hello';

// interface Bar {
//   bar: number;
//   bas: string;
// }

// const bar: Bar = {
//   // 编译器将会提供 Foo 属性的代码提示
  
// };
// bar.bar = 123;
// bar.bas = 'hello';

//class Queue {
  //private data = [];
  //push = item => this.data.push(item);
  //pop = () => this.data.shift();
//}

// 创建一个泛型类
class Queue<T> {
  private data :T[] = [];
  push = (item: T) => this.data.push(item);
  pop = (): T | undefined => this.data.shift();
}

// 简单的使用
const queue = new Queue<number>();
queue.push(0);
// queue.push('1'); // Error：不能推入一个 `string`，只有 number 类型被允许



// function reverse<T>(items: string[]): T[] {
//   const toreturn = [];
//   for (let i = items.length - 1; i >= 0; i--) {
//     toreturn.push(items[i]);
//   }
//   return toreturn;
// }
// const sample = [1, 2, 3];
// let reversed = reverse(sample);

// reversed[0] = '1'; // Error
// reversed = ['1', '2']; // Error

// reversed[0] = 1; // ok
// reversed = [1, 2]; // ok

// const iTakeSomethingAndPassItAnErr = (x: (err: Error, data: any) => void) => {
//   /* 做一些其他的 */
//   x()
// };
// iTakeSomethingAndPassItAnErr(()=>null)

// class Animal {
//   feet: number;
//   constructor(name: string, numFeet: number) {}
//   conl () {
//   	console.log(this.feet);
//   }
// }
class Animal {
  protected feet: number;
}












