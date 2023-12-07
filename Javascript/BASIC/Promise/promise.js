// new Promise((resolve) => {
//   console.log("外层宏事件2");
//   resolve();
// })
//   .then(() => {
//     console.log("微事件1");
//   })
//   .then(() => {
//     console.log("微事件2");
//   })
//   .then(() => {
//     console.log("微事件2");
//   })
//   .then(() => {
//     console.log("微事件2");
//   });
// console.log("外层宏事件1");
// setTimeout(() => {
//   //执行后 回调一个宏事件
//   console.log("内层宏事件3");
// }, 0);

// Promise.resolve().then(() => {
//   console.log(0);
//   // return Promise.resolve(4);
// }).then(() => {
//   console.log(111)
// }).then(() => {
//   console.log(1111)
// })

// Promise.resolve().then(() => {
//   console.log(1);
// }).then(() => {
//   console.log(2);
// }).then(() => {
//   console.log(3);
// }).then(() => {
//   console.log(5);
// }).then(() =>{
//   console.log(6);
// })

// new Promise((resolve) => resolve()).then(() => {
//   console.log(0);
// }).then(() => {
//   console.log(111)
// }).then(() => {
//   console.log(1111)
// })

// new Promise((resolve) => resolve()).then(() => {
//   console.log(1);
// }).then(() => {
//   console.log(2);
// }).then(() => {
//   console.log(3);
// }).then(() => {
//   console.log(5);
// }).then(() =>{
//   console.log(6);
// })

// console.log(1);

// Promise.resolve().then(() => {
//   console.log("promise one");
// });

// process.nextTick(() => {
//   console.log("nextTick one");
// });

// setTimeout(() => {
//   process.nextTick(() => {
//     console.log("nextTick two");
//   });
//   console.log(3);
//   Promise.resolve().then(() => {
//     console.log("promise two");
//   });
//   console.log(4);
// }, 3);

setTimeout(() => {
  console.log("timer1");
  Promise.resolve().then(function() {
    console.log('promise1')
    return Promise.resolve(4);
  }).then((res) => {
    console.log(res)
  })
}, 0);
setTimeout(() => {
  console.log("timer2");
  Promise.resolve().then(function () {
    console.log("promise2");
  });
}, 0);
