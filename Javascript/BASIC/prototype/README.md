# 从__proto__和prototype来深入理解JS对象和原型链

## \__proto__和prototype

## \__proto__

引用《JavaScript权威指南》的一段描述：

> Every JavaScript object has a second JavaScript object (or null ,
> but this is rare) associated with it. This second object is known as a prototype, and the first object inherits properties from the prototype.
> 每个JS对象一定对应一个原型对象，并从原型对象继承属性和方法

**对象\__proto__属性的值就是它所对应的原型对象：**

```javascript
var one = {x: 1};
var two = new Object();
one.__proto__ === Object.prototype // true
two.__proto__ === Object.prototype // true
one.toString === one.__proto__.toString // true
```

上面的代码应该已经足够解释清楚`__proto__`了😁。好吧，显然还不够，或者说带来了新的问题：`Object.prototype`是什么？凭什么说`one`和`two`的原型就是`Object.prototype`？

### `prototype`

首先来说说`prototype`属性，不像每个对象都有`__proto__`属性来标识自己所继承的原型，只有函数才有`prototype`属性。

为什么只有函数才有`prototype`属性？ES规范就这么定的。

开玩笑了，其实函数在JS中真的很特殊，是所谓的_一等公民_。JS不像其它面向对象的语言，它没有类（`class`，ES6引进了这个关键字，但更多是语法糖）的概念。JS通过函数来模拟类。

当你创建函数时，JS会为这个函数自动添加`prototype`属性，~~值是空对象~~ **值是一个有 constructor 属性的对象，不是空对象**。而一旦你把这个函数当作构造函数（`constructor`）调用（即通过`new`关键字调用），那么JS就会帮你创建该构造函数的实例，实例继承构造函数`prototype`的所有属性和方法（实例通过设置自己的`__proto__`指向承构造函数的`prototype`来实现这种继承）。

#### 小结

虽然对不熟悉的人来说还有点绕，但JS正是通过`__proto__`和`prototype`的合作实现了原型链，以及对象的继承。

构造函数，通过`prototype`来存储要共享的属性和方法，也可以设置`prototype`指向现存的对象来继承该对象。

对象的`__proto__`指向自己构造函数的`prototype`。`obj.__proto__.__proto__...`的原型链由此产生，包括我们的操作符`instanceof`正是通过探测`obj.__proto__.__proto__... === Constructor.prototype`来验证`obj`是否是`Constructor`的实例。

回到开头的代码，`two = new Object()`中`Object`是构造函数，所以`two.__proto__`就是`Object.prototype`。至于`one`，ES规范定义对象字面量的原型就是`Object.prototype`。

### 更深一步的探讨

我们知道JS是单继承的，`Object.prototype`是原型链的顶端，所有对象从它继承了包括`toString`等等方法和属性。

`Object`本身是构造函数，继承了`Function.prototype`;`Function`也是对象，继承了`Object.prototype`。这里就有一个_鸡和蛋_的问题：

```javascript
Object instanceof Function // true
Function instanceof Object // true
```

什么情况下会出现鸡和蛋的问题呢？[就是声明一个包含所有集合的集合啊！好了，你们知道这是罗素悖论，但并不妨碍PL中这样设计。](http://zhi.hu/o3gl)

那么具体到JS，ES规范是怎么说的？

> Function**本身就是函数**，`Function.__proto__`是标准的内置对象`Function.prototype`。
>
> `Function.prototype.__proto__`是标准的内置对象`Object.prototype`。

以上均翻译自<http://www.ecma-international.org/ecma-262/5.1/#sec-15，_鸡和蛋_的问题就是这么出现和设计的：>**`Function`继承`Function`本身，`Function.prototype`继承`Object.prototype`。**

1. `Function.prototype`和`Function.__proto__`都指向`Function.prototype`，这就是鸡和蛋的问题怎么出现的。
2. `Object.prototype.__proto__ === null`，说明原型链到`Object.prototype`终止。

## `Object`和`Function`的鸡和蛋的问题

ES5关于`Object`和`Function`的规定：

[Object](http://www.ecma-international.org/ecma-262/5.1/#sec-15.2)

[Function](http://www.ecma-international.org/ecma-262/5.1/#sec-15.3)

从上面的规定再结合其它，理出以下几点：

1. 原型链的尽头（root）是`Object.prototype`。**所有对象均从Object.prototype继承属性。**

   ![prototype](https://cloud.githubusercontent.com/assets/8046480/12535625/323a624a-c2c4-11e5-87d7-6fb84d61e93b.png)

2. `Function.prototype`和`Function.__proto__`为**同一对象**。

   ![function prototype](https://cloud.githubusercontent.com/assets/8046480/12536077/4ae9c5e6-c2d4-11e5-93c1-b7b0dc6d0975.png)

   这意味着： **Object/Array/String等等构造函数本质上和Function一样，均继承于Function.prototype。**

3. `Function.prototype`直接继承root（`Object.prototype`）。

   ![function object](https://cloud.githubusercontent.com/assets/8046480/12536056/ad146a24-c2d3-11e5-84c9-952b125d5950.png)

   通过这点我们可以弄清 **继承的原型链：Object.prototype(root)<---Function.prototype<---Function|Object|Array...。** 如下图所示：

   ![img](https://cloud.githubusercontent.com/assets/8046480/12536189/7d82c74c-c2d8-11e5-831a-fb3119f2baf2.png)

以上3点比较容易理解，或者说规范里就这样定义的。由以上3点导出我们最后的问题：`Object`和`Function`的鸡和蛋的问题。

回答这个问题，必须首先更深入一层去理解`Function.prototype`这个对象，因为它是导致`Function instanceof Object`和`Object instanceof Function`都为`true`的原因。

回归规范，摘录2点：

1. `Function.prototype`是个不同于一般函数（对象）的函数（对象）。

   > The Function prototype object is itself a Function object (its [[Class]] is "Function") that, when invoked, accepts any arguments and returns undefined.
   >
   > The value of the [[Prototype]] internal property of the Function prototype object is the standard built-in Object prototype object (15.2.4). The initial value of the [[Extensible]] internal property of the Function prototype object is true.
   >
   > The Function prototype object does not have a valueOf property of its own; however, it inherits the valueOf property from the Object prototype Object.

   1. `Function.prototype`像普通函数一样可以调用，但总是返回`undefined`。
   2. 普通函数实际上是`Function`的实例，即普通函数继承于`Function.prototype`。`func.__proto__ === Function.prototype`。
   3. `Function.prototype`继承于`Object.prototype`，并且没有`prototype`这个属性。`func.prototype`是普通对象，`Function.prototype.prototype`是`null`。
   4. 所以，`Function.prototype`其实是个另类的函数，可以独立于/先于`Function`产生。

2. `Object`本身是个（构造）函数，是`Function`的实例，即`Object.__proto__`就是`Function.prototype`。

   > The value of the [[Prototype]] internal property of the Object constructor is the standard built-in Function prototype object.
   >
   > The value of the [[Prototype]] internal property of the Object prototype object is null, the value of the [[Class]] internal property is "Object", and the initial value of the [[Extensible]] internal property is true.

**最后总结：先有Object.prototype（原型链顶端），Function.prototype继承Object.prototype而产生，最后，Function和Object和其它构造函数继承Function.prototype而产生。**

**Object.prototype 是对象吗？**

1. 当然是。`An object is a collection of properties and has a single prototype object. The prototype may be the null value.` 这是object的定义，`Object.prototype`显然是符合这个定义的。
2. 但是，**Object.prototype并不是Object的实例。** 这也很好理解`Object.prototype.__proto__`是`null`。

[![2017-04-19 8 11 34](https://cloud.githubusercontent.com/assets/8046480/25179424/70df0ace-253c-11e7-9e65-ad33eecd6df9.png)](https://cloud.githubusercontent.com/assets/8046480/25179424/70df0ace-253c-11e7-9e65-ad33eecd6df9.png)

这已经某种程度上解开了鸡和蛋的问题：**Object.prototype是对象，但它不是通过Object函数创建的。**

下面我们来看`Function/Function.prototype`：

[![2017-04-19 8 20 59](https://cloud.githubusercontent.com/assets/8046480/25179753/c4eec734-253d-11e7-8246-460fbc7c5cb3.png)](https://cloud.githubusercontent.com/assets/8046480/25179753/c4eec734-253d-11e7-8246-460fbc7c5cb3.png)

似乎可以看出一点东西：

在chrome的console中，`Array.prototype`以数组的形式输出，`Map.prototype`以Map的形式输出，`Function.prototype`输出`function () { [native code] }`... 可以反过来讲继承了某个`prototype`，console就认为是对应的类型（以`prototype`来判断）。

[![2017-04-19 8 32 46](https://cloud.githubusercontent.com/assets/8046480/25180289/f851efaa-253f-11e7-98d7-6bd800c67432.png)](https://cloud.githubusercontent.com/assets/8046480/25180289/f851efaa-253f-11e7-98d7-6bd800c67432.png)

就上图而言，我们有疑惑的其实就是为什么 **Function.prototype 和 Function.__proto__是同一个对象**？

1. `Function`本身也是function。
2. `Function.prototype`是所有function的原型（包括`Function`自己）。
3. 但反过来，`Function.prototype`和`Function`并没有反向的什么关系（除了正向的`Function`继承了`Function.prototype`）。

所以疑惑就可以解除了：`Function.prototype` 和 `Function.__proto__`相同不代表`Function`这个函数是由自身创建的。先有了`Function.prototype`这个对象（其实也是函数，下面说明），然后才有了其它函数而已。

那么问题来了，**Function.prototype/Function.__proto__是 function 吗（对比开头的问题）？**

1. 当然是。比如我们可以正常执行`Function.prototype()`。当然，还是看定义更好：

   > member of the Object type that may be invoked as a subroutine. In addition to its properties, a function contains executable code and state that determine how it behaves when invoked. A function’s code may or may not be written in ECMAScript.
   > ECMAScript function objects encapsulate parameterized ECMAScript code closed over a lexical environment and support the dynamic evaluation of that code. An ECMAScript function object is an ordinary object and has the same internal slots and the same internal methods as other ordinary objects.

2. 然而 `Function.prototype` 不是 `Function` 的实例。

下面附加一幅图帮助理解：

[![2017-04-19 9 17 51](https://cloud.githubusercontent.com/assets/8046480/25181935/ad5b76c8-2545-11e7-9d0c-627a49b6d81f.png)](https://cloud.githubusercontent.com/assets/8046480/25181935/ad5b76c8-2545-11e7-9d0c-627a49b6d81f.png)
