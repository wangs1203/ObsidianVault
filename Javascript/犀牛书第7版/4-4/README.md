# 属性访问表达式

## 4.4.1 条件属性访问

```js
var a;
var index = 0;
try {
  a[index++];
} catch (e) {
  index; //=> 1
}

a?.[index++];
index; // => 1
```

如果a的值是nullish值，则整个表达式立即求值为undefined。子表达式`index++`不会被求值。

> 如果a没有定义，那么访问属性中是否有side effect（副作用），都不会触发。
