# 临时文档

## 一、交叉类型

交叉类型将多个类型合并为一个类型，相当于新类型具有这多个类型的所有特性，相当于是一种`并`的操作，通常在使用混入（`mixin`）的场合使用交叉类型，交叉类型的形式如：

```ts
T & U
```

例子：

```ts
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{}
    for (let key in first) {
        (<any>result)[key] = (<any>first)[key]
    }
    for (let key in second) {
        if (!result.hasOwnProperty(key)) {
            (<any>result)[key] = (<any>second)[id]
        }
    }
    return result
}
```

## 二、联合类型

联合类型用于限制传入的值的类型只能是`|`分隔的每个类型，如：`number | string | boolean`表示一个值的类型只能是`number`、`string`、`boolean`中的一种。
此外，如果一个值是联合类型，那么我们只能访问它们中共有的部分（共有的属性与方法），即相当于一种`交`的关系，如：

```typescript
interface Bird {
    fly()
    layEggs()
}
interface Fish {
    swim()
    layEggs()
}
let pet = getPet() // getPet()的返回值类型是`Bird | Fish` 
pet.layEggs() // 允许
pet.swim() // 报错
```

## 三、类型保护与区分类型

联合类型可以让一个值可以为不同的类型，但随之带来的问题就是访问非共同方法时会报错。那么该如何区分值的具体类型，以及如何访问共有成员？

### 1、使用类型断言

一个简单的处理方式，是使用类型断言，如：

```typescript
let pet = getPet()
if ((<Fish>pet).swim) {
    (<Fish>pet).swim()
} else {
    (<Bird>pet).fly()
}
```

### 2、使用类型保护

使用类型断言，我们就不得不每次都写一堆的尖括号，很麻烦。那么有没有更好的方式可以判断类型呢？答案是：使用类型保护，如写一个类型判断函数：

```typescript
function isFish(pet: Bird | Fish): pet is Fish {
    return (<Fish>pet).swim !== undefined
}
```

这种`param is SomeType`的形式，就是类型保护，我们可以用它来明确一个`联合类型`变量的具体类型，在调用时typescript就会将变量缩减为该具体类型，如此一来以下调用就是合法的了：

```typescript
if (isFish(pet)) {
    pet.swim() // 不会报错
} else {
    pet.fly()
}
```

允许这么做是因为：typescript能够通过类型保护知道`if`语句里的pet类型一定是`Fish`类型，而且`else`语句里的pet类型一定不是`Fish`类型，那么就是`Bird`类型了

### 3、typeof和instanceof

当我们使用了`typeof`和`instanceof`后，typescript就会自动限制类型为某一具体类型，从而我们可以安全地在语句体内使用具体类型的方法和属性，如：

```typescript
function show(param: number | string) {
    if (typeof param === 'number') {
        console.log(`${param} is number`)
    } else {
        console.log(`${param} is string`)
    }
}
```

但是`typeof`只支持`number`、`string`、`boolean`或者`symbol`（只有这些情况下可以被认为是类型保护）
对于类，我们则可以使用`instanceof`，如：

```typescript
let p = getRandomInstance()
if (p instanceof A) {
    p // 此时p会细化为A类型
}
if (p instanceof B) {
    p // 此时p会细化为B类型
}
```

typescript要求`instanceof`右侧是一个构造函数，而typescript会将其细化为：
1）此构造函数的`prototype`属性的类型（不为`any`的情况下）
2）构造签名所返回的类型的联合

### 4、可为null的类型

`null`和`undefined`可以赋给任何的类型，因为它们是所有其他类型的一个有效值，如：

```ts
// 以下语句均合法
let x1: number = null
let x2: string = null
let x3: boolean = null
let x4: undefined = null
let y1: number = undefined
let y2: string = undefined
let y3: boolean = undefined
let y4: null = undefined
```

在typescript里，我们可以使用`--strictNullChecks`标记，开启这个标记后，当我们声明一个变量时，就不会自动包含`null`或`undefined`，如：

```ts
// 开启`--strictNullChecks`后
// Type 'null' is not assignable to type 'number'.
let x1: number = null

// Type 'null' is not assignable to type 'string'.
let x2: string = null

// Type 'null' is not assignable to type 'boolean'.
let x3: boolean = null

// Type 'null' is not assignable to type 'undefined'.
let x4: undefined = null

// Type 'undefined' is not assignable to type 'number'.
let y1: number = undefined

// Type 'undefined' is not assignable to type 'string'.
let y2: string = undefined

// Type 'undefined' is not assignable to type 'boolean'.
let y3: boolean = undefined

// Type 'undefined' is not assignable to type 'null'.
let y4: null = undefined
```

但是我们可以手动使用`联合类型`来明确包含，如：

```ts
let x = 123
x = null // 报错
let y: number | null = 123
y = null // 允许
y = undefined // 报错，`undefined`不能赋值给`number | null`
```

当开启了`--strictNullChecks`，`可选参数/属性`就会被自动地加上`| undefined`，如：

```ts
function foo(x: number, y?: number) {
    return x + (y || 0)
}
foo(1, 2) // 允许
foo(1) // 允许
foo(1, undefined) // 允许
foo(1, null) // 报错，不允许将null赋值给`number | undefined`类型
```

## 四、类型别名

类型别名可以给现有的类型起个新名字，它和接口很像但又不一样，因为类型别名可以作用于原始值、联合类型、元组及其他任何需要手写的了类型，语法如：

> type 新名字 = 已有类型

如：`type Name = string`
别名不会新建一个类型，它只会创建一个新的名字来引用现有类型。所以在VSCode里将鼠标放在别名上时，显示的是所引用的那个类型

### 1、泛型别名

别名支持泛型，如：

```ts
type Container<T> = {
    value: T
}

let name: Container<string> = {
    value: 'RuphiLau'
}
```

但是类型别名不能出现在声明右侧的任何地方，如：

```ts
type Alias = Array<Alias> // 报错，别名Alias循环引用了自身
```

### 2、和接口的区别

1）错误信息、鼠标悬停时，不会使用别名，而是直接显示为所引用的类型
2）别名不能被`extends`和`implements`

### 3、字符串字面量类型

`字符串字面量类型`允许我们定义一个别名，类型为别名的变量只能取固定的几个值，如：

```ts
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out'
let x1: Easing = 'uneasy' // 报错: Type '"uneasy"' is not assignable to type 'Easing'
let x2: Easing = 'ease-in' // 允许
```

字符串字面量类型还能用于区分函数重载，如：

```ts
function createElement(tagName: 'img'): HTMLImageElement
function createElement(tagName: 'input'): HTMLInputElement
// ... 其他重载函数
function createElement(tagName: string): Element {
    // ...
}
```

### 4、可辨识联合

可以合并`字符串字面量类型`、`联合类型`、`类型保护`和`类型别名`来创建`可辨识联合`的高级模式（也称为`标签联合`或者`代数数据`类型），具有3个要素：
1）具有普通的字符串字面量属性——可辨识的特征
2）一个`类型别名`，用来包含了那些类型的联合——联合
3）此属性上的类型保护
创建一个`可辨识联合`类型，首先需要声明将要联合的接口，每个接口都要有一个可辨识的特征，如（`kind`属性）：

```ts
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
    radius: number
}
```

现在，各个接口之间还是没有关联的，所以我们需要使用`类型别名`来联合这几个接口，如：

```ts
type Shape = Square | Rectangle | Circle
```

现在，使用可辨识联合，如：

```ts
function area(s: Shape) {
    switch (s.kind) {
        case 'square':
            return s.size * s.size
        case 'rectangle':
            return s.height * s.width
        case 'circle':
            return Math.PI * s.radius ** 2
    }
}
```

## 五、多态的`this`类型

多态的`this`类型表示的是某个包含类或接口的子类型，例子：

```ts
class BasicCalculator {
    public constructor(protected value: number = 0) {
    }
    public currentValue(): number {
        return this.value
    }
    public add(operand: number): this {
        this.value += operand
        return this
    }
    public multiply(operand: number): this {
        this.value *= operand
        return this
    }
}

let v = new BasicCalculator(2).multiply(5).add(1).currentValue() // 11
```

由于使用了`this`类型，当子类继承父类的时候，新的类就可以直接使用之前的方法，而不需要做任何的改变，如：

```ts
class ScientificCalculator extends BasicCalculator {
    public cconstructor(value = 0) {
        super(value)
    }
    public sin() {
        this.value = Math.sin(this.value)
        return this
    }
}
let v = new BasicCalculator(2).multiply(5).sin().add(1).currentValue()
```

如果没有`this`类型，那么`ScientificCalculator`就不能够在继承`BasicCalculator`的同时还保持接口的连贯性。因为`multiply`方法会返回`BasicCalculator`类型，而`BasicCalculator`没有`sin`方法。然而，使用`this`类型，`multiply`就会返回`this`，在这里就是`ScientificCalculator`

## 六、索引类型

`索引类型`能使编译器能够检查使用了动态属性名的代码，如：
我们想要完成一个函数，它可以选取对象中的部分元素的值，那么：

```ts
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map(n => o[n])
}

interface Person {
    name: string
    age: number
}

let p: Person = {
    name: 'RuphiLau',
    age: 21
}

let res = pluck(p, ['name']) // 允许
```

以上代码解释如下：
1）首先，使用`keyof`关键字，它是`索引类型查询操作符`，它能够获得任何类型`T`上已知的公共属性名的联合。如例子中，`keyof T`相当于`'name' | 'age'`
2）然后，`K extends keyof T`表明K的取值限制于`'name' | 'age'`
3）而`T[K]`则代表对象里相应key的元素的类型，所以在例子中，p对象里的`name`属性，是string类型，所以此时`T[K]`相当于`Person[name]`，即相当于类型`string`，所以返回的是`string[]`，所以`res`的类型为`string[]`
所以，根据以上例子，举一反三有：

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key]
}
let obj = {
    name: 'RuphiLau',
    age: 21,
    male: true
}
let x1 = getProperty(obj, 'name') // 允许，x1的类型为string
let x2 = getProperty(obj, 'age') // 允许，x2的类型为number
let x3 = getProperty(obj, 'male') // 允许，x3的类型为boolean
let x4 = getProperty(obj, 'hobby') // 报错：Argument of type '"hobby"' is not assignable to parameter of type '"name" | "age" | "male"'.
```

**索引类型和字符串索引签名**
`keyof`和`T[K]`与字符串索引签名进行交互，如果有一个带有字符串索引签名的类型，那么`keyof T`为`string`，且`T[string]`为索引签名的类型，如：

```ts
interface Demo<T> {
    [key: string]: T
}
let keys: keyof Demo<boolean> // keys的类型为string
let value: Demo<number>['foo'] // value的类型为number
```

## 七、映射类型

我们可能会遇到这么一些需求：
1）将一个现有类型的每个属性都变为可选的，如：

```ts
interface Person {
    name: string
    age: number
}
```

可选版本为：

```ts
interface PersonPartial {
    name?: string
    age?: number
}
```

而现在typescript为我们提供了`映射类型`，能够使得这种转化更加方便，在映射类型里，新类型将以相同的形式去转换旧类型里每个属性，如以上例子可以改写为：

```ts
type Readonly<T> = {
    readonly [P in keyof T]: T[P]
}
type Partial<T> = {
    [P in keyof T]?: T[P]
}
type PersonReadonly = Readonly<Person>
type PersonPartial = Partial<Person>
```

我们还可以写出更多的通用`映射类型`，如：

```ts
// 可为空类型
type Nullable<T> {
    [P in keyof T]: T[P] | null
}

// 包装一个类型的属性
type Proxy<T> = {
    get(): T
    set(value: T): void
}
type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>
}
function proxify(o: T): Proxify<T> {
    // ...
}
let proxyProps = proxify(props)
```

### 由映射类型进行推断（拆包）

上面展示了如何包装一个类型，那么与之相反的就有拆包操作，示例如：

```ts
function unproxify<T>(t: Proxify<T>): T {
    let result = <T>{}
    for (const k in t) {
        result[k] = t[k].get()
    } 
    return result
}
let originalProps = unproxify(proxyProps)
```



