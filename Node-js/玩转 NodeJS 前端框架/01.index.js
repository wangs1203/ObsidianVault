// ***web web服务器 小实例
// const http = require('http');
// cs = function(req, res){
//   res.write('hello world!');
//   res.end();
// }
// http.createServer(cs).listen(666);

// console.log('http is ok');


// const http = require('http');
// cs = function(req, res){
//   // res.write('<h1>hello world!</h1>');
//   res.writeHead('200',{'content-type': 'text/html;charset=utf-8'});
//   // res.write('<h1>我是leon，你是傻子!</h1>');
//   // res.end();
//   res.end('<h1>我是leon，你是傻子!</h1>');
// }
// http.createServer(cs).listen(666);

// console.log('http is ok');


// ***回调函数

// node回调函数 ：
// 1.同步操作文件(阻塞I/O)
// 2.异步操作文件(非阻塞I/O)


// ***同步操作文件(阻塞I/O)
// **加载fs file模块
// const fs = require('fs')
// const file = './test.txt';
// // **开始读取文件
// console.log('file start!');

// // **正在读取文件
// const data = fs.readFileSync(file);
// // console.log('data :>> ', data);
// console.log(data.toString());
// // 读取文件结束

// console.log('file end!');



// ***异步操作文件(阻塞I/O)
// 加载fs file模块
// const fs = require('fs');
// const file = './test.json';
// 开始读取文件
// console.log('file start!');

// ***正在读取json文件
// fs.readFile(file,function (err, data) {
//   console.log(data);
//   console.log(data.toString());
//   const datas = data.toString();
//   console.log('typeof :>> ', typeof datas);
//   console.log(JSON.parse(datas))
// });

// 读取文件结束
// console.log('file end!');


// ***events 事件驱动
// const events = require('events');
// const evt = new events.EventEmitter();
// function eventHandler() {
//   console.log(111)
//   console.log(222)
// }
// evt.on('eventName', eventHandler);
// evt.emit('eventName');

// const fs = require('fs');
// file = 'test.txt';
// fs.readFile(file, function(err, data) {
//   str = data.toString();
//   console.log(str);
// });
// console.log('file read end');


// ***模块系统
// const Show = require('./show');

// obj = new Show();
// obj.say()

// ***nodejs 路由
const http = require('http');
const url = require('url');
const fs = require('fs');

const URL = url.URL;

cb = function (req, res) {
  const reqUrl = new URL(req.url, `http://${req.headers.host}`)
  console.log(reqUrl.pathname)
  const pathname = reqUrl.pathname;
  if(pathname !== '/favicon.ico') {
    console.log(pathname)
    // 路由
    switch (pathname) {
      case '/user/add':
        res.write('<h1>User Add</h1>')
        break;
      case '/user/delete':
        res.write('<h1>User Delete</h1>')
        break;
      case '/user/update':
        res.write('<h1>User Update</h1>')
        break;
      case '/user/select':
        res.write('<h1>User Update</h1>')
        break;
      default:
        let idxFile = fs.readFileSync('index.html').toString();
        res.write(idxFile);
        // res.writeHead('404',{'content-type': 'text/html;charset=utf-8'});
        // res.write('<h1>404 Not Found</h1>')
    }
  }
  res.end();
}

http.createServer(cb).listen(8888);

console.log('server start!')