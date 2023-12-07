#!!/usr/bin/env node
// node 全局对象
// 1. __filename
// 2. __dirname
// 3. setTimeout
// 4. setInterval
// 5. console
// 6. process

// console.log(__filename)
// console.log(__dirname)

// console.log(process.version)
// console.log(process.argv)
// console.log(process.pid)
// console.log(process.title) // 进程名称
// console.log(process.platform)
// console.log(process.cwd())
// console.log(process.memoryUsage());

// process.stdout.write('abc\n');
// process.stdout.on('readable', function() {
//   str = process.stdin.read();
//   if(str !== null) {
//     process.stdout.write('data:'+ str);
//   }
// });


// node 常用工具
// 1. util.inspect()
// 2. util.isArray() - deprecated
// 3. util.isBoolean() - deprecated
// 4. util.isDate() - deprecated
// 5. util.isFunction() - deprecated
// 6. util.isObject() - deprecated
// 7. util.isRegExp() - deprecated

// const util = require('util');
// console.log(util.inspect({name: 'user1',age: '20'}));


// node 文件系统
// 1. 读文件内容
// 2. 写文件内容
// 3. 删除文件
// 4. 创建目录
// 5. 删除目录

const fs = require('fs');

// file = 'test02.txt';
// 同步读取
// let data = fs.readFileSync(file);
// console.log(data.toString());
// 异步读取
// fs.readFile(file,(err, data) => {
//   console.log(data.toString());
// });

// 同步写入
// file = 'writeFile01.txt';
// fs.writeFileSync(file,'1111\n2222\n3333');

// 异步写入
// file = 'writeFile02.txt';
// fs.writeFile(file,'1111\n2222\n3333',(...param) => {
//   console.log('param :>> ', param);
// });


// 删除文件
// file = 'writeFile01.txt'
// fs.unlink(file,()=>{});


// 创建文件夹
// dir = 'test'
// fs.mkdir(dir,()=>{})
// 删除文件夹
dir = 'test'
fs.rmdir(dir,()=>{})
