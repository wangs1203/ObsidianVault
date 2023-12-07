const glob = require('glob');

// let result = null;
// console.time();
// result = glob.sync(`${__dirname}/**/*`);
// console.timeEnd();

// console.log(__dirname);
// console.log(result);

let result = null;
console.time('glob');
glob(__dirname + '/**/*', function (err,res) {
  result = res;
  // console.log(result)
  console.log('get result')
})
console.timeEnd('glob');

console.log(1+1)