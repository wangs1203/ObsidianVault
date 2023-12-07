// !function () {
//   let promise = new Promise(function (resolve, reject) {
//     console.log('promise cb')
//     setTimeout(() => {
//       // resolve(true)
//       reject(new Error());
//     }, 500)
//   });

//   console.log(promise)

//   setTimeout(() => {
//     console.log(promise)
//   }, 500)
// }();

// !function () {
//   let promise = new Promise(function (resolve, reject) {
//     setTimeout(() => {
//       resolve(true)
//     }, 300);

//     setTimeout(() => {
//       reject(new Error());
//     }, 500)
//   });

//   console.log(promise)

//   setTimeout(() => {
//     console.log(promise)
//   }, 800)
// }();

// +function () {
//   let promise = new Promise(function (resolve, reject) {
//     setTimeout(() => {
//       // resolve(true)
//       reject(new Error('fail'));
//     }, 300);
//   }).then(function (res) {
//     console.log(res)
//   }).catch(function (err) {
//     console.log(err)
//   })

//   console.log(promise)

//   setTimeout(() => {
//     console.log(promise)
//   }, 800)
// }();

// function interview() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       // if (Math.random() > 0.5) {
//       // if (Math.random() > 0) {
//       if (Math.random() > 1) {
//         resolve("success");
//       } else {
//         reject(new Error("fail"));
//       }
//     }, 500);
//   });
// }

// (function () {
//   let promise = interview();
//   // promise.then(res => {
//   //   console.log('smile')
//   // }).catch(err => {
//   //   console.log('cry')
//   // })

//   let promise2 = promise.then((res) => {
//     // throw new Error("refuse");
//     return "accept";
//   });

//   setTimeout(() => {
//     console.log(promise);
//     console.log(promise2);
//   }, 800);
// })();

// (function () {
//   let promise = interview();

//   let promise2 = promise.catch((err) => {
//     // return "accept";
//     throw new Error("refuse");
//   });

//   setTimeout(() => {
//     console.log(promise);
//     console.log(promise2);
//   }, 800);
// })();

// 但如果回调函数最终return了一个Promise，该Promise会和回调函数return的Promise状态保持一致
// function interview() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (Math.random() > 0) {
//         resolve("success");
//       } else {
//         reject(new Error("fail"));
//       }
//     }, 500);
//   });
// }
// (function () {
//   let promise = interview();
//   let promise2 = promise.then((res) => {
//     return new Promise(function (resolve, reject) {
//       setTimeout(() => {
//         resolve('accept')
//       }, 400)
//     });
//   });

//   setTimeout(() => {
//     console.log(promise)
//     console.log(promise2)
//   }, 800)

//   setTimeout(() => {
//     console.log(promise)
//     console.log(promise2)
//   }, 1000)
// })();

// promise 异步流程控制
// function interview(round) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (Math.random() > 0.5) {
//         resolve("success");
//       } else {
//         let error = new Error("fail");
//         error.round = round;
//         reject(error);
//       }
//     }, 500);
//   });
// }
// (function () {
//   let promise = interview(1)
//     .then(() => {
//       return interview(2);
//     })
//     .then(() => {
//       return interview(3);
//     })
//     .then(() => {
//       console.log("smile");
//     })
//     .catch((err) => {
//       console.log("cry", err.round);
//       console.log(`cry at ${err.round} round`);
//     });
// })();

// promise 异步流程控制 并发异步
function interview(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve("success");
      } else {
        let error = new Error("fail");
        error.name = name;
        reject(error);
      }
    }, 500);
  });
}
(function () {
  Promise.all([interview("hypers"), interview("github")])
    .then(() => {
      console.log("smile");
    })
    .catch((err) => {
      console.log(`cry for ${err.name}`);
    });
})();
