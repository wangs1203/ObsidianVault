# 浅拷贝/深拷贝

```js
// 测试的obj对象
const obj = {
    // =========== 1.基础数据类型 ===========
    num: 0, // number
    str: '', // string
    bool: true, // boolean
    unf: undefined, // undefined
    nul: null, // null
    sym: Symbol('sym'), // symbol
    bigN: BigInt(1n), // bigint

    // =========== 2.Object类型 ===========
    // 普通对象
    obj: {
        name: '我是一个对象',
        id: 1
    },
    // 数组
    arr: [0, 1, 2],
    // 函数
    func: function () {
        console.log('我是一个函数')
    },
    // 日期
    date: new Date(0),
    // 正则
    reg: new RegExp('/我是一个正则/ig'),
    // Map
    map: new Map().set('mapKey', 1),
    // Set
    set: new Set().add('set'),
    // =========== 3.其他 ===========
    [Symbol('1')]: 1  // Symbol作为key
};

// 4.添加不可枚举属性
Object.defineProperty(obj, 'innumerable', {
    enumerable: false,
    value: '不可枚举属性'
});

// 5.设置原型对象
Object.setPrototypeOf(obj, {
    proto: 'proto'
})

// 6.设置loop成循环引用的属性
obj.loop = obj
```

> 在JavaScript中，基础类型值的复制是直接拷贝一份新的一模一样的数据，这两份数据相互独立，互不影响。而引用类型值（Object类型）的复制是传递对象的引用（也就是对象所在的内存地址，即指向对象的指针），相当于多个变量指向同一个对象，那么只要其中的一个变量对这个对象进行修改，其他的变量所指向的对象也会跟着修改（因为它们指向的是同一个对象）。

## 浅拷贝

* `Object.assign(target, ...sources)`
* `let objClone = { ...obj };`
* `const new_array = old_array.concat(value1[, value2[, ...[, valueN]]])`
* `arr.slice([begin[, end]])`

```js
function shallowClone(target) {
    if (typeof target === 'object' && target !== null) {
        const cloneTarget = Array.isArray(target) ? [] : {};
        for (let prop in target) {
            if (target.hasOwnProperty(prop)) {
                cloneTarget[prop] = target[prop];
            }
        }
        return cloneTarget;
    } else {
        return target;
    }
}

// 测试
const shallowCloneObj = shallowClone(obj)

shallowCloneObj === obj  // false，返回的是一个新对象
shallowCloneObj.arr === obj.arr  // true，对于对象类型只拷贝了引用
```

[for...in](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)语句以任意顺序遍历一个对象的除Symbol以外的可枚举属性，包含原型上的属性。

## 深拷贝

评价一个深拷贝是否完善，请检查以下问题是否都实现了：
基本类型数据是否能拷贝？
键和值都是基本类型的普通对象是否能拷贝？
Symbol作为对象的key是否能拷贝？
Date和RegExp对象类型是否能拷贝？
Map和Set对象类型是否能拷贝？
Function对象类型是否能拷贝？（函数我们一般不用深拷贝）
对象的原型是否能拷贝？
不可枚举属性是否能拷贝？
循环引用是否能拷贝？

方法1：JSON.stringify()

JSON.stringfy() 其实就是将一个 JavaScript 对象或值转换为 JSON 字符串，最后再用 JSON.parse() 的方法将JSON 字符串生成一个新的对象。（点这了解：JSON.stringfy()、JSON.parse()）

从以上结果我们可知JSON.stringfy() 存在以下一些问题：

* 执行会报错：存在BigInt类型、循环引用。
* 拷贝Date引用类型会变成字符串。
* 键值会消失：对象的值中为Function、Undefined、Symbol 这几种类型，。
* 键值变成空对象：对象的值中为Map、Set、RegExp这几种类型。
* 无法拷贝：不可枚举属性、对象的原型链。

方法2：递归基础版深拷贝

```js
function deepClone(target) {
    if (typeof target === 'object' && target) {
        let cloneObj = {}
        for (const key in target) { // 遍历
            const val = target[key]
            if (typeof val === 'object' && val) {
                cloneObj[key] = deepClone(val) // 是对象就再次调用该函数递归
            } else {
                cloneObj[key] = val // 基本类型的话直接复制值
            }
        }
        return cloneObj
    } else {
        return target;
    }
}

// 开头的测试obj存在循环引用，除去这个条件进行测试
const clonedObj = deepClone(obj)

// 测试
clonedObj === obj  // false，返回的是一个新对象
clonedObj.arr === obj.arr  // false，说明拷贝的不是引用
```

该基础版本存在许多问题：

* 不能处理循环引用,如果存在循环引用的话，以上代码会导致无限递归，从而使得堆栈溢出。
* 只考虑了`Object`对象，而`Array`对象、`Date`对象、`RegExp`对象、`Map`对象、`Set`对象都变成了`Object`对象，且值也不正确。
* 丢失了属性名为`Symbol`类型的属性。
* 丢失了不可枚举的属性。
* 原型上的属性也被添加到拷贝的对象中了。

方法3：递归完美版深拷贝

1. 不能处理循环引用 => 借助`ES6`推出的[`WeakMap`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)对象，该对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的. 使用 WeakMap 作为一个Hash表来进行查询
2. 只考虑了`Object`对象 => 当参数为`Date`、`RegExp`、`Function`、`Map`、`Set`，则直接生成一个新的实例返回
3. 属性名为`Symbol`的属性/丢失了不可枚举的属性 => 针对能够遍历对象的不可枚举属性以及`Symbol`类型，我们可以使用`Reflect.ownKeys()`
    > 注：Reflect.ownKeys(obj)相当于[...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)]
4. 原型上的属性 =>`Object.getOwnPropertyDescriptors()`设置属性描述对象，以及`Object.create()`方式继承原型链

```js
function deepClone(target) {
  // WeakMap作为记录对象Hash表（用于防止循环引用）
  const map = new WeakMap();

  // 判断是否为object类型的辅助函数，减少重复代码
  function isObject(target) {
    return (
      (typeof target === "object" && target) || typeof target === "function"
    );
  }

  function clone(data) {
    // 基础类型直接返回值
    if (!isObject(data)) {
      return data;
    }

    // 日期或者正则对象则直接构造一个新的对象返回
    if ([Date, RegExp].includes(data.constructor)) {
      return new data.constructor(data);
    }

    // 处理函数对象
    if (typeof data === "function") {
      return new Function("return " + data.toString())();
    }

    // 如果该对象已存在，则直接返回该对象
    const exist = map.get(data);
    if (exist) {
      return exist;
    }

    // 处理Map对象
    if (data instanceof Map) {
      const result = new Map();
      map.set(data, result);
      data.forEach((val, key) => {
        // 注意：map中的值为object的话也得深拷贝
        if (isObject(val)) {
          result.set(key, clone(val));
        } else {
          result.set(key, val);
        }
      });
      return result;
    }

    // 处理Set对象
    if (data instanceof Set) {
      const result = new Set();
      map.set(data, result);
      data.forEach((val) => {
        // 注意：set中的值为object的话也得深拷贝
        if (isObject(val)) {
          result.add(clone(val));
        } else {
          result.add(val);
        }
      });
      return result;
    }

    // 收集键名（考虑了以Symbol作为key以及不可枚举的属性）
    const keys = Reflect.ownKeys(data);
    // 利用 Object 的 getOwnPropertyDescriptors 方法可以获得对象的所有属性以及对应的属性描述
    const allDesc = Object.getOwnPropertyDescriptors(data);
    // 结合 Object 的 create 方法创建一个新对象，并继承传入原对象的原型链， 这里得到的result是对data的浅拷贝
    const result = Object.create(Object.getPrototypeOf(data), allDesc);

    // 新对象加入到map中，进行记录
    map.set(data, result);

    // Object.create()是浅拷贝，所以要判断并递归执行深拷贝
    keys.forEach((key) => {
      const val = data[key];
      if (isObject(val)) {
        // 属性值为 对象类型 或 函数对象 的话也需要进行深拷贝
        result[key] = clone(val);
      } else {
        result[key] = val;
      }
    });
    return result;
  }

  return clone(target);
}

// 测试
const clonedObj = deepClone(obj);
clonedObj === obj; // false，返回的是一个新对象
clonedObj.arr === obj.arr; // false，说明拷贝的不是引用
clonedObj.func === obj.func; // false，说明function也复制了一份
clonedObj.proto; // proto，可以取到原型的属性
```

在遍历`Object`类型数据时，我们需要把`Symbol`类型的键名也考虑进来，所以不能通过`Object.keys`获取键名或`for...in`方式遍历，而是通过`Reflect.ownKeys()`获取所有自身的键名（`getOwnPropertyNames`和`getOwnPropertySymbols`函数将键名组合成数组也行：`[...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)]）`，然后再遍历递归，最终实现拷贝。

------------------------

参考链接：https://blog.csdn.net/cc18868876837/article/details/114918262