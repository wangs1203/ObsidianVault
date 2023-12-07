转载 [小程序折腾记 - Taro(1.2.x)开发一个微信小程序下来的要点梳理及爬坑姿势(篇幅有点长)](https://cloud.tencent.com/developer/article/1395610)

# 小程序折腾记 - Taro(1.2.x)开发一个微信小程序下来的要点梳理及爬坑姿势

## 前言

在`Taro 0.x`的时候就写过一个小玩意,虽然没什么人玩. 最近正好看到`Taro 1.2.x`已经发布了

类`React`风格的小程序框架,部分地方针对小程序做了妥协.找点东西试试水,看看改进如何了.

刚好公司有个需求做个手机端的举报管理的程序, 开会上揽了过来;

对于这个框架,你除了需要有`React`的基本功外, 还需要这两方面的知识;

- [小程序自家的文档](https://link.juejin.im/?target=https%3A%2F%2Fdevelopers.weixin.qq.com%2Fminiprogram%2Fdev%2F):`Taro`的大部分组件都是基于官方API封装的
- [Taro官方文档:](https://link.juejin.im/?target=https%3A%2F%2Fnervjs.github.io%2Ftaro%2Fdocs%2FREADME.html): 特别这几篇>> [开发前注意](https://link.juejin.im/?target=https%3A%2F%2Fnervjs.github.io%2Ftaro%2Fdocs%2Fbefore-dev-remind.html)/[特殊问题处理](https://link.juejin.im/?target=https%3A%2F%2Fnervjs.github.io%2Ftaro%2Fdocs%2Fspecials.html)/[最佳实践](https://link.juejin.im/?target=https%3A%2F%2Fnervjs.github.io%2Ftaro%2Fdocs%2Fbest-practice.html)/[`Async await`的支持](https://link.juejin.im/?target=https%3A%2F%2Fnervjs.github.io%2Ftaro%2Fdocs%2Fasync-await.html)

虽这个项目(仅微信端)不是很大,梳理下还是有挺多东东的,其他废话不多说,直入主题

---

## 问题汇总

### 生命周期及`JSX`的`{}`不支持箭头函数

用箭头函数会出现不可控的结果;

最常见的就是报错;

- `JSX`里面仅支持`onClick={this.xxxx.bind(this,args)`这种写法
- 生命周期用了会导致,`store`亦或者`render`的结果异常(比如执行顺序和值的错误)
- 至于其他常规函数则支持箭头函数的写法

---

### 动态样式

虽说Taro官方支持`CSS Module`,若是你考虑多平台的话..还是建议用常规的命名规划来维护好一些

至于`className`的动态`css class`处理..我倾向于使用`classnames`这个库

[classname](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FJedWatson%2Fclassnames): 最普通的用法如下

```jsx
import classnames from 'classnames'

 <View className={classnames({
  "tab-operator": true,
  "show": userIdList.length>0,
  "hide": userIdList.length === 0 
})}>
  <View className="tab-content-top-counter">
    <View className="left-text">{userIdList.length === 0 ?'如需操作条目请勾选下面条目!':`选中了${userIdList.length}条`}</View>
    {userIdList.length === 0 ? null : <View className="unselect" onClick={this.unselect.bind(this)}>取消</View>}
   
</View>

```

---

### 自己封装的组件提示类型缺失的(TS)

比如你封装的组件里面依赖了`Taro`封装的一些组件,这时候暴露这个组件,

就会缺失你自己加进去的特性,导致编辑器会提示有错误信息..

最简便的就是用`type`或者`interface`,这样就不会报错了.比如下面

```tsx
//方式一
type staticPropsSearchPanel={
  open: boolean,
  onClose?: () => void
} 

// 也可以用interface ,与上面的区别,比较明显的是这个可以继承其他的
// 方式二
interface staticPropsSearchPanel {
     open: boolean,
     onClose?: () => void
}

class SearchPanel extends Component<staticPropsSearchPanel>{}
```

---

### 组件支持程度

-  不支持函数式组件:[具体看官方说法](https://link.juejin.im/?target=https%3A%2F%2Fnervjs.github.io%2Ftaro%2Fdocs%2Fspec-for-taro.html%23%E4%B8%8D%E6%94%AF%E6%8C%81%E6%97%A0%E7%8A%B6%E6%80%81%E7%BB%84%E4%BB%B6) 截止`1.2.x`依旧不支持,只能写成 `class xx extends Component`这种  
-  不支持同个文件内直接多个`class xx extends`且被引用  

---

### 允许几种状态管理器的接入?

`dva`,`mobx`,`redux` 都有对应`taro`接入方案,后两者是`taro`官方维护

---

### 是否支持`alias`

最新版是支持的(可用),在`config`目录暴露了配置文件,当然很多其他`webpack`的配置也有一些直接暴露

![img](https://ask.qcloudimg.com/http-save/yehe-2749152/luikw9hd5e.png?imageView2/2/w/1620)

至于`eslint`不识别`alias`符号的,这个暂时无解,我试过社区的一些方案,好像没啥用!

---

### 路由跳转注意点

- 中划线的坑 跳转的路由不支持中划线(目前),以后未知

开发模式和真机调试可以正常编译,打包上传就不能识别了...浪费我很多时间..

- 路径的坑

跳转的`url`必须**全路径**!!!!!,比如

```jsx
// 重定向,会提供返回按钮
Taro.redirectTo({ url: '/pages/list/index' })

// 重载整个程序,关闭其他所有页面(清除堆栈的页面),然后打开你指定的页面
// 这个非常适合鉴权失败或者过期的时候.只打开注册页面
Taro.reLaunch({ url:'/pages/login/index'})

//还有其他`navigate`这些,基本都是微信文档写到的东西,taro封装了下
```

---

### 鉴权页面渲染突兀的改善姿势!

若是你在第一个页面做鉴权跳转,很容易就遇到渲染部分再跳转的

给人的视觉反馈不是很好,对于此,写一个中间鉴权页面作为第一页,跳转会改善很多(视觉上)

因为效果可以定制,而不渲染很多没必要的组件

比如我的,我的入口页面就是`auth`

```jsx
import './index.less';

import { View } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';

class Auth extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: 'xx小助手'
  }


  static options = {
    addGlobalClass: true
  }

  // 有token就可以进入内容区域,至于token是否有效是在里面去判断的;
  // 没有token乖乖去登录
  componentDidShow() {
    const token = Taro.getStorageSync('token');
    if (!!token) {
      Taro.redirectTo({ url: '/pages/list/index' })
      return
    }
    Taro.redirectTo({ url: '/pages/login/index' })
  
  }

  render() {
    return (
      <View className='auth-page'>loading....</View>
    )
  }
}

export default Auth
```

---

### `componentDidShow`的注意点

`previewImage`(图片的点击全屏预览),在关掉后会再次触发该生命周期..

所以把请求放这里的需要自己权衡下..比如我的列表展开后,点击图片关闭后导致列表重刷;

挪到了`componentWillMount`就不会受`previewImage`的影响

---

### `mobx`的接入及数据观察?

`mobx`的接入和常规的接入差不多,用法基本也一致..

就是从`mobx-react`变成`@tarojsw/mobx`,由`taro`封装来提供

至于`devtools`这种.小程序目前只能从开发者工具看到,

虽然没专业的`devtools`那么清晰,但是总体上可以看到数据的组织和响应,如图

![img](https://ask.qcloudimg.com/http-save/yehe-2749152/noie08zu8c.png?imageView2/2/w/1620)

### 结合`mobx`在跳转前预请求?

比如详情页,展示类的页面,我们一般都是通过`typeId`去拿到具体的详情,再来展示

常规做法都是进到页面后在`componentDidMount`去触发请求,然后把结果集渲染到页面,

但这样一进去就会展示默认数据再替换,有点突兀;我们肯定想改善用户体验,那就把数据预请求

我们可以根据实际场景在跳转之前的生命周期入手,比如`redirecTo`可以在`componentDidHide`内调用函数`dispatch`

`reLuanch`可以在`componentWillUnmount`内触发;

跳转过去的页面,可以直接从`props`拿到渲染,不会那么突兀

---

### 时间戳及常见日期格式转换

对于日期的处理,我们最常用的是两种姿势的传递的时候用时间戳,展示的时候用可读性较强的`YYYY-MM-DD`这种

所以就没必要引入`moment`这个大库了用的是`dayjs`,很小功能比较全面的库,`api`类`moment`,用过都说好.

- [dayjs](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fiamkun%2Fdayjs)

当然,你自己用函数封装一个转换也行,就不用引入多一个库了,见仁见智了.

---

### 获取结点信息注意点

若是要指定组件自身内的结点,`this`必须为`this.$scope`

微信小程序官方的`this`代表实例,在`taro`中`this.$scope`代表组件自身(实例)

```jsx
componentDidMount() {
  const query = Taro.createSelectorQuery().in(this.$scope);
  query.select('#list-card').boundingClientRect((res) => {
    console.log('res: ', res);
  }).exec()
}
```

---

### 变动项目基础信息(微信小程序)

直接在开发者工具的选项里面勾选不会保存到项目内,比如基础库的切换;

有效的是直接操作根目录下的`project.config.json`

```json
// 这份配置的参数可以具体看微信官方给出的解释,会更加全面
// https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html?search-key=%E9%A1%B9%E7%9B%AE%E9%85%8D%E7%BD%AE

{
	"miniprogramRoot": "打包输出路径",
	"projectname": "项目名称",
	"description": "声兮管理后台小程序",
	"appid": "xxxx",
	"setting": {
		"urlCheck": true, // 是否检查安全域名和 TLS 版本
		"es6": false,  // 是否启用es6转换
		"postcss": true,  // 启用postcss的支持
		"minified": false,  // 是否压缩代码
		"newFeature": true  // 是否启用新特性的支持
	},
	"compileType": "miniprogram",  // 编译类型
	"libVersion": "2.5.0", // 基础库版本的指定
	"condition": {}
}
```

其他小程序有对应的配置文件,看官方链接

- [项目配置](https://link.juejin.im/?target=https%3A%2F%2Fnervjs.github.io%2Ftaro%2Fdocs%2Fproject-config.html)

---

## 封装的一些小玩意

### 请求封装(TS)

- `request.tsx`
  - 支持路由`prefix`
  - `header`的合并
  - 响应的拦截

```ts
/*
 * @Author: CRPER
 * @LastEditors: CRPER
 * @Github: https://github.com/crper
 * @Motto: 折腾是一种乐趣，求知是一种追求。不懂就学,懂则分享。
 * @Description:请求接口封装
 */
import Taro from '@tarojs/taro';
import '@tarojs/async-await';

interface options {
  header: any,
  method?: string,
  dataType?: string,
  responseType?: string,
  success?: Function,
  fail?: Function,
  complete?:Function
}

/**
 * 
 * @param url : 接口路径
 * @param method : 请求方法(RESTFUL,但是没有PATCH,看微信文档支持)
 * @param data : 传递的数据
 * @param options : 可以覆盖header这些
 * @param prefix : 接口额外的前缀
 */
export default async function(url: string, method?:string,data?: string | [any] | Object, options?: options, prefix?: string){
  
  // 不支持patch!!!!!微信自家的请求本身就不支持patch!!!

  // 微信端自己缓存token
  const wxToken:string|void =await Taro.getStorage({ key: 'token' })
    .then(res => res.data).catch(err => {
      if(err)  return 
    } )
 
  // 默认值
  const defaultOtions: options = {
    method: 'GET',
    header:{}
  }

  // 若是存在token则赋予
  if (wxToken) {
    defaultOtions.header.Authorization = wxToken
  }

  const baseUrl: string = process.env.NODE_ENV === 'development' ? 'https://xxx.com/api/web' : 'https://xxx.com/api/web';
  const newUrl = prefix ? `${baseUrl}${prefix}${url}` : `${baseUrl}${url}`

  const requestObject: any = {
    url: newUrl,
    ...defaultOtions,
    ...options,
    method,
    data
  }

  const codeMessage: Object = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    412: '访问被拒绝,请重新登录',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
  };



  // 检测请求状态
  const checkStatusAndFilter = (response):Promise<any> | undefined => {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      if (response.statusCode === 200 || response.statusCode === 304) {
        return response.data
      }
      return response;
    }

    // 除此之外的错所有遍历上面的错误信息抛出异常
    const errortext = codeMessage[response.statusCode] || response.errMsg;
    Taro.showToast({
      title: errortext,
      mask: true,
      icon: 'none',
      duration: 2000
    })
    return Promise.reject(response)
  };



  try {
     return await Taro.request(requestObject)
      .then(checkStatusAndFilter)
      .then(res => {
        // 这一块是我和后端协商的,接口内部为1则出错的,为0才有数据回来
        if (res.code === 1) {
          const errMsg = res.msg ? res.msg : '接口错误了';
          Taro.showToast({
            title: errMsg,
            mask: true,
            icon: 'none',
            duration: 2000
          })
          Promise.reject(errMsg)
        }
        if (res.code === 0) {
          if (res.data) {
            return res.data
          }
          return null
        }
        return res
      }).catch(errRes => {
        if (errRes.statusCode === 412) {
          Taro.reLaunch({ url:'/pages/login/index'})
        }
      })
  } catch (err) {
    Taro.showToast({
      title: '代码执行异常',
      mask: true,
      icon: 'none',
      duration: 2000
    })
  }
 }
```

- 用法

```ts
//  我配置了alias
import wxfetch from '@utils/request';

  // 比如我代码中的其中一个请求,处理行为
  // 切割列表数据
  spliceList = (dataIdArr: Array<string | number> = []) => {
    const {list, paginate: {total}} = this.state;
    // 若是只有一条,干掉后尝试请求列表判断是否还有新的数据
    if (list.length <= 1) {
      this.getList()
    }
    let tempArr: Array<Object> = list.filter((item) => {
      for (let i = 0; i < dataIdArr.length; i++) {
        let innerItemId = Number(dataIdArr[i]);
        if (item.id !== innerItemId) {
          return item
        }
      }
    })
    this.setState({
      list: tempArr,
      paginate: {
        total: total - dataIdArr.length
      },
      dataIdArr: []
    })
  }

  // 处理行为
  handleActionSheetClick = async (e: number): Promise<any> => {
    try {
      const actionParam = {operationType: e};
      const {dataIdArr, operationNote} = this.state;
      const isActionNoValid: boolean = !e || e === 0 || (Array.isArray(dataIdArr) && dataIdArr.length === 0);

      if (isActionNoValid) {
        Taro.atMessage({
          'message': '请再次您的行为是否正常,比如勾选数据!',
          'type': 'error',
          'duration': 1000
        })
        return false;
      }

      await wxfetch('/suspiciousDatas', 'POST', {
        dataIdArr,
        operationNote,
        ...actionParam
      });

      // 切割数组且关闭遮罩层
      this.spliceList(dataIdArr);
      this.handleActionSheetClose();
    } catch (err) {
      console.log(err);
    }
  }
```

---

### 简化版的节流器(TS)

- `throttle.tsx`

```ts
/*
 * @Author: CRPER
 * @LastEditors: CRPER
 * @Github: https://github.com/crper
 * @Motto: 折腾是一种乐趣，求知是一种追求。不懂就学,懂则分享。
 * @Description: 简易版的节流函数
 */

 
/**
 * @param fn : 回调函数
 * @param threshold : 时间,单位毫秒
 */
export default function throttle(fn: Function, threshold: number = 1500) {
  if (threshold === null) {
    threshold = 1500
  }
  let _lastExecTime: null | number = null;
  let context = this
  return function (...args: any[]): void {
    let _nowTime: number = new Date().getTime();
    if (_nowTime - Number(_lastExecTime) > threshold || !_lastExecTime) {
      fn.apply(context, args);
      _lastExecTime = _nowTime
    }
  }
}

```

- 用法

在`this.xxx.bind`的基础上

```ts
import throttle from '@utils/throttle';

// 滚动到顶部触发
onScrolltoupper = throttle(() => {
    console.log('1111');
},3000)
```

---

### 下拉刷新显示内置的`loading`.

![img](https://ask.qcloudimg.com/http-save/yehe-2749152/txwzulli5s.gif)

就是微信自家的三个小点, 这个需要配置下页面的一些自有属性.

`Taro`只要引入`Config`,即可在组件内声明页面属性

```tsx
import Taro, { Component, Config } from '@tarojs/taro';
class ReportList extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '可疑数据汇总',
    enablePullDownRefresh: true,   // 这个是启用下拉刷新特性
    backgroundTextStyle: "dark",   // 把显示的文本颜色改成暗色调,亮色的话.你背景不改看不到,因为同色
    backgroundColor:'#f7f7f7' // 页面的背景色
  }

}

// 启用后,记得加对应的条件关闭,不然会一直显示
 // 下拉刷新
 onPullDownRefresh = () :void => {
    // 这个loading是 导航栏,页面标题那块显示一个loading  , 微信内置的
    Taro.showLoading({
      title: 'loading....'
    })
    
    // 因为我的接口请求都是 async await的姿势,所以可以队列执行
    this.getList(); 
    this.unselect();
    
    // 接口请求完毕后隐藏两个loading , 标题和下拉区域
    Taro.hideLoading();
    Taro.stopPullDownRefresh();
  }

```

---

### 实现组件样式过渡?

实现一个组件过渡可以一定程度上增强体验,本质就是`CSS3`来写过渡,

比如看我这边实现的一个效果,自己感觉还看得过去

![img](https://ask.qcloudimg.com/http-save/yehe-2749152/ofy1wzbm2z.gif)

- 样式

```scss
//若是要产生视觉效应,那元素有偏移才能看出来,所以一般被作用的元素都不会在默认位置
// 这个项目用了less ,主要过渡
.testdiv{
    opacity: 0;
    transform: translateY(100vh) rotate(270deg) scale(0.5);
    &.fadeIn{
      opacity: 1;
      transform: translateY(0) rotate(0deg);
      transition:all 0.3s ease-in-out; 
    }
    &.fadeOut{
      opacity: 0;
      transform:  rotate(-270deg) scale(0.2) translateX(-100vw);
      transition:all 0.3s ease-in-out; 
    }
}
```

- 作用区域

这边用了`classnames`来动态追加`class`

```tsx
<View className={classnames({ "search-panel": true, 'fadeIn': open, 'fadeOut': !open})} >
</View>
```

---

### 节点元素高度的过渡(CSS3)

就是让展开和收起有个过渡效果,

经过N多次的尝试(不能给元素设置`height`!!), 把元素初始化的高度设置`max-height:0`,

其他过渡设置合适的`max-height`即可解决

![img](https://ask.qcloudimg.com/http-save/yehe-2749152/qua0t18avv.gif)

---

### Taro里面对事件的支持

有些文档没说到,只能去翻源码...看`common.d.ts`一目了然,比如长按事件这些

[github.com/NervJS/taro…](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FNervJS%2Ftaro%2Fblob%2Fmaster%2Fpackages%2Ftaro-components%2Ftypes%2Fcommon.d.ts)

---

### css3 loading 引入

![img](https://ask.qcloudimg.com/http-save/yehe-2749152/iabjulvu06.gif)

其实跟在普通开发模式上写法差不,基本还是CSS3的功能,`DIV`换成能识别的节点而已..比如`Taro`

```scss
// 样式部分

 .no-data-text {
    background-color: rgba(233, 228, 228, 0.726);
    color: #333;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 50px;
    font-weight: 700;
    .loading-text{
      font-size:28px;
      color:#555;
    }
  }

.spinner {
  width: 200px;
  height: 70px;
  text-align: center;
  font-size: 10px;
}
 
.spinner .rect {
  background-color: rgb(123, 176, 225);
  height: 100%;
  width: 10px;
  margin:0 5px;
  display: inline-block;
   
  -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
  animation: stretchdelay 1.2s infinite ease-in-out;
}
 
.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
 
.spinner .rect3 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
 
.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
 
.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
 
@-webkit-keyframes stretchdelay {
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) } 
  20% { -webkit-transform: scaleY(1.0) }
}
 
@keyframes stretchdelay {
  0%, 40%, 100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% {
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
}
```

```tsx
<!--节点部分-->
<View className="no-data-text">
    <View className="spinner">
      <View className="rect rect1"></View>
      <View className="rect rect2"></View>
      <View className="rect rect3"></View>
      <View className="rect rect4"></View>
      <View className="rect rect5"></View>
    </View>
    <View className="loading-text">正在加载中......</View>
</View>
```

