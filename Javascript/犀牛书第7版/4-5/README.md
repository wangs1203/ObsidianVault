# 调用表达式

```js
// fn 未定义
let index = 0;
fn(index++) // => Uncaught ReferenceError: fn is not defined
index; // => 0
function fn () {}
fn(index++)
index; // => 1
```

求值调用表达式时，首先求值函数表达式，然后求值参数表达式以产生参数值的列表。如果函数表达式的值不是函数，则会抛出ReferenceError。如果是函数表达式，按照函数定义时参数的顺序给参数赋值，之后再执行函数体。

```js
// fn 未定义
fn() // => Uncaught ReferenceError: fn is not defined

// fn 定义了值，但非函数表达式调用会报类型错误，而不是未定义时报出的引用错误
let fn = null; // fn = （非函数类型）
fn(); // Uncaught TypeError: fa is not a function
```
