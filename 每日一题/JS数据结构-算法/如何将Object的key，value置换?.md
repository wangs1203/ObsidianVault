# 如何将Object的key，value置换?

```js
var data = { firstName: 'John', lastName: 'Doe', email: 'john.doe@gmail.com'};
```

方法一

```js
var output = Object.entries(data).reduce((obj, [key, value]) => (obj[value] = key, obj) ,{});

console.log(output);
```

方法二

```js
let output = {};
for(let key in data) {
  output[data[key]] = key;
}

console.log(output);
```
