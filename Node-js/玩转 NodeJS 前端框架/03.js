// web模块
// const http = require('http');
// const URL = require('url').URL;
// const querystring = require('querystring');

// cb = function (req, res) {
//   const reqUrl = new URL(req.url, `http://${req.headers.host}`)
//   const pathname = reqUrl.pathname;
//   if(pathname !== '/favicon.ico') {
//     const queryStr = reqUrl.searchParams.toString()
//     console.log(queryStr)

//     const query = querystring.parse(queryStr);
//     console.log(query);
//     res.write('this is web server')
//   }
//   res.end();
// }

// http.createServer(cb).listen(8888);

// console.log('server start!!!')

// 工具模块
const os = require('os')
// 返回操作系统的默认临时文件夹
// console.log(os.tmpdir())

// 返回操作系统的主机名。
// console.log(os.hostname())

// 返回操作系统名
// console.log(os.type())

// 返回编译时的操作系统名
// console.log(os.platform())

// 返回操作系统 CPU 架构，可能的值有 "x64"、"arm" 和 "ia32"。
// console.log(os.arch())

// 返回操作系统的发行版本。
// console.log(os.release())

// 返回操作系统运行的时间，以秒为单位。
// console.log(os.uptime())

// 返回系统内存总量，单位为字节。
// console.log(os.totalmem())

// 返回操作系统空闲内存量，单位是字节。
// console.log(os.freemem())

// 返回一个对象数组，包含所安装的每个 CPU/内核的信息：型号、速度（单位 MHz）、时间（一个包含 user、nice、sys、idle 和 irq 所使用 CPU/内核毫秒数的对象）。
// console.log('os.cpus() :>> ', os.cpus());

// 获得网络接口列表。
// console.log(os.networkInterfaces())


// path模块
const path = require('path');

// 返回路径中代表文件夹的部分，同 Unix 的dirname 命令类似。
// console.log(path.dirname());

// 返回路径中的最后一部分。同 Unix 命令 bashname 类似。
// console.log(path.basename());

// 将 to 参数解析为绝对路径，给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径。 例如，给定的路径片段的序列为：/foo、/bar、baz，则调用 path.resolve('/foo', '/bar', 'baz') 会返回 /bar/baz。
// path.resolve([from ...], to)
// path.resolve('/foo/bar', './baz');
// 返回: '/foo/bar/baz'

// path.resolve('/foo/bar', '/tmp/file/');
// 返回: '/tmp/file'

// path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// 如果当前工作目录为 /home/myself/node，
// 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'


// 返回路径中文件的后缀名，即路径中最后一个'.'之后的部分。如果一个路径中并不包含'.'或该路径只包含一个'.' 且这个'.'为路径的第一个字符，则此命令返回空字符串。
// path.extname(p)

// 返回路径字符串的对象。
// path.parse(pathString)
// 从对象中返回路径字符串，和 path.parse 相反。
// 10	path.format(pathObject)


// dns 模块
const dns = require('dns');
const targetDomain = 'www.github.com';
// lookup
// dns.lookup(targetDomain, (err, address, family) => {
//   console.log('ip', address);
//   dns.reverse(address, (err, hostnames) => {
//     if (err) {
//       console.log(err,stack);
//     }
//     console.log(`反向解析${address}: ${JSON.stringify(hostnames)}`)
//   });
//   console.log('lookup!!!');
// });

// reverse
// const targetIp = '140.82.112.3';
// const targetIp = '104.20.22.46';
// dns.reverse(targetIp, (err, hostnames) => {
//   console.log(hostnames)
// })


// net 模块
const net = require('net')
// const chat = net.createServer();
// chat.on('connection', (client) => {
//   client.write('hello world');
// });
// chat.listen(9000)
// console.log('server start!')
// net 通讯
const chat = net.createServer();
chat.on('connection', (client) => {
  client.write('hello world');
  client.on('data', (data) => {
    console.log(data.toString());
  });
});
chat.listen(9000);

console.log('telnet server ok');