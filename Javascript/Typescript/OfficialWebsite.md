# 官网梳理总结

## The Basics

### Static type-checking

```typescript
const message = "hello!";

message(); // error => This expression is not callable.Type 'String' has no call signatures.
```

### Non-exception Failures

```ts
const user = {
  name: "Daniel",
  age: 26,
};
user.location; // returns undefined
// 类型“{ name: string; age: number; }”上不存在属性“location”
```

上述例子在js中，访问location会返回undefined不会报错，但TypeScript中，下面的代码会产生一个关于未被定义的错误。

检查错误拼写

```ts
const announcement = "Hello World!";

// How quickly can you spot the typos?
announcement.toLocaleLowercase();
announcement.toLocalLowerCase();

// We probably meant to write this...
announcement.toLocaleLowerCase();
```

检查未调用的函数

```ts
function flipCoin() {
  // Meant to be Math.random()
  return Math.random < 0.5;
}
```

basic logic errors 检查基础逻辑错误

```ts
const value = Math.random() < 0.5 ? "a" : "b";
if (value !== "a") {
  // ...
} else if (value === "b") {
}
```

### Types for Tooling

当我们在代码中犯错时，TypeScript可以捕捉错误。但TypeScript也可以防止我们在一开始就犯这些错误。

类型检查器有信息来检查诸如我们是否在变量和其他属性上访问了正确的属性。一旦它掌握了这些信息，它也可以开始建议你可能要使用哪些属性。

这意味着TypeScript也可以被用于编辑代码，核心类型检查器可以在你在编辑器中输入时提供错误信息和代码完成。这就是人们在谈论TypeScript的工具时经常提到的部分内容。

```ts
// @noErrors
// @esModuleInterop
import express from "express";
const app = express();

app.get("/", function (req, res) {
  res.sen
//       ^|
});

app.listen(3000);
```

### tsc, the TypeScript compiler

```shell
npm install -g typescript
tsc hello.ts
```

```ts
// hello.ts
console.log("Hello world!");
```

```ts
// This is an industrial-grade general-purpose greeter function:
function greet(person, date) {
  console.log(`Hello ${person}, today is ${date}!`);
}

greet("Brendan"); // => Expected 2 arguments, but got 1.
```

### Explicit Types

```ts
// Up until now, we haven’t told TypeScript what person or date are. Let’s edit the code to tell TypeScript that person is a string, and that date should be a Date object. We’ll also use the toDateString() method on date.
function greet1(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
// Date() => date string
greet1("Maddison", Date()); // => Argument of type 'string' is not assignable to parameter of type 'Date'.
greet1("Maddison", new Date());
```

请记住，我们并不总是要写明确的类型注释。在许多情况下，TypeScript甚至可以为我们推断（或 "弄清"）类型，即使我们省略它们

```ts
let msg = "hello there!";
```

尽管我们没有告诉TypeScript msg的类型是字符串，但它还是能够理解。这是一个特点，当类型系统最终会推断出相同的类型时，最好不要添加注解。
