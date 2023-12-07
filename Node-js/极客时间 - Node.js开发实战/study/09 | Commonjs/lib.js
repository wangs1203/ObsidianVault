console.log('hello')

exports.hello = 'world';

exports.add = function (a, b) {
  return a + b;
}

exports.commonjsDemo = {demo: 'nodejs - commonjs'}

// setTimeout(() => {
//   console.log(exports)
// }, 2000)

module.exports = function minus (a, b) {
  return a - b;
}

setTimeout(() => {
  console.log(exports)
}, 2000)