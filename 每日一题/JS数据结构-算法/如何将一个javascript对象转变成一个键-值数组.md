# 如何将一个javascript对象转变成一个键/值数组？

```js
var data = { firstName: 'John', lastName: 'Doe', email: 'john.doe@gmail.com' }
```

## 方法一

```js
var output = Object.entries(data).map(([key, value]) => ({key,value}));

console.log(output);
```

## 方法二

```js
var output = Object.entries(data).reduce((arr,[key, value]) => [...arr,{key,value}],[]);

console.log(output);
```

## 方法三

```js
var result = [];

for(var key in data)
{
    if(data.hasOwnProperty(key))
    {
        result.push({
            key: key,
            value: data[key]
        });
    }
}
console.log(result)
```
