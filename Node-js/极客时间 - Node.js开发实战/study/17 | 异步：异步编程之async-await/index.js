// console.log(async function() {})
// console.log(function () {})

// console.log(async function() {
//   return 4
// }())
// console.log(function () {
//   return new Promise(resolve => resolve(4))
// }())

// console.log(async function() {
//   throw new Error('4')
// }())
// console.log(function () {
//   return new Promise((resolve, reject) => reject(new Error('4')))
// }())

// (function () {
//   const result = async function () {
//     let content = await new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(6);
//       }, 500);
//     });

//     console.log(content);
//     return 4;
//   }();

//   setTimeout(() => {
//     console.log(result);
//   }, 800);
// }());

// (function () {
//   const result = async function () {
//     let content;
//     try {
//       content = await new Promise((resolve, reject) => {
//         setTimeout(() => {
//           reject(new Error('8'));
//         }, 500);
//       });
//     } catch (e) {
//       console.log(`Error: ${e.message}`)
//     }

//     console.log(content);
//     return 4;
//   }();

//   setTimeout(() => {
//     console.log(result);
//   }, 800);
// }());


function interview(round) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve("success");
      } else {
        let error = new Error("fail");
        error.round = round;
        reject(error);
      }
    }, 500);
  });
}

(async function () {
  try {
    // await interview(1)
    // await interview(2)
    // await interview(3)

    await Promise.all([interview(1),interview(2)])
  } catch (error) {
    return console.log(`cry at ${error.round}`)
  }
  console.log('smile')
}());
