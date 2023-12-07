function interview(cb) {
  setTimeout(() => {
    if (Math.random() < 0.8) {
      cb(null, "success");
    } else {
      cb(new Error("fail"));
    }
  }, 500);
}

// interview(function (err, res) {
//   if (err) {
//     return console.log("said at 1st round");
//   }

//   interview((err, res) => {
//     if (err) {
//       return console.log("said at 2st round");
//     }

//     interview((err, res) => {
//       if (err) {
//         return console.log("said at 3st round");
//       }
//       console.log("smile", res);
//     });

//   });
// });


let count = 0;
interview(function(err, res) {
  if (err) {
    return console.log("said at 1st round");
  }

  count ++;
})

interview(function(err, res) {
  if (err) {
    return console.log("said at 2st round");
  }
  count++;

  if (count >= 2) {
    console.log("smile", res);
  }
})
