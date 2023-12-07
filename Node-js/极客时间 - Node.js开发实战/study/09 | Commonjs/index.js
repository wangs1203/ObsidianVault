console.log('start require');
let lib = require('./lib.js');
console.log('end require')

console.log(lib)
console.log(lib.add)
console.log(lib.commonjsDemo)
// 模块外/内 都可改变导出的模块，是同一个引用
lib.additional = 'test';