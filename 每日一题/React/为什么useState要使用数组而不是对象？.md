# 为什么useState要使用数组而不是对象？

1. `useState`运用了JS解构赋值的思想

    - 数组的元素是按次序排列的,数组解构时变量的取值由数组元素的位置决定,变量名可以任意命名。
    - 数组的元素是按次序排列的,数组解构时变量的取值由元素的位置决定,变量名可以任意命名。
    - 对象的属性则没有次序,解构时变量名必须与属性同名才能取到正确的值
    - 因此使用数组会更灵活,可以任意命名`state`和修改`state`的方法

2. （useState内部实现)之所以使用数组的原因 因为`useState`内部原理把`state`声明成一个数组,需要顺序一一对应

    ```jsx
    function Com(){
        const [num,setNum] = useState(0)
        return (
          <div className="num">
            <p>{num}</p>
            <p>
              <button onClick={()=>setNum(num+1)}>增加<button>
            </p>
          </div>
        )
      }
    ```

    每点击一次button,num就会增加1,组件就会重新render

3. 自己实现useState代码

    ```js
    let _state = [];//全局_state用来存储state的值,避免重新渲染的时候被useState重置为初始值
    let index = 0;
    const useState = initialValue => {
      const currentIndex = index;
      _state[currentIndex] = _state[currentIndex] === undefined ? initialValue:_state[currentIndex];
      const setState = (newValue)=>{
        _state[currentIndex] = newValue
        render()
      }
      index +=1

      return [_state[currentIndex], setState]
    }
    ```
