const fs = require("fs");
console.log("start");

fs.writeFile("text.txt", "我写的数据", (err) => {
  if (err) throw err;
  console.log("text1");
});

setTimeout(() => {
  console.log("setTimeout 1");
  Promise.resolve().then(() => {
    console.log("promise 3");
  });
});

setTimeout(() => {
  console.log("setTimeout 2");
  Promise.resolve()
    .then(() => {
      console.log("promise 4");
      Promise.resolve().then(() => {
        console.log("promise 5");
      });
    })
    .then(() => {
      console.log("promise 6");
    })
    .then(() => {
      fs.writeFile(
        "text1.txt",
        `
      const fs = require("fs");
      console.log("start");

      fs.writeFile("text.txt", "我写的数据", (err) => {
        if (err) throw err;
        console.log("text1");
      });

      setTimeout(() => {
        console.log("setTimeout 1");
        Promise.resolve().then(() => {
          console.log("promise 3");
        });
      });`,
        (err) => {
          if (err) throw err;
          console.log("text2");
        }
      );
      setTimeout(() => {
        console.log("setTimeout 3");
        Promise.resolve()
          .then(() => {
            console.log("promise 7");
          })
          .then(() => {
            console.log("promise 8");
          });
        // }, 1000);
      }, 50);
    });
}, 0);

Promise.resolve()
  .then(() => {
    console.log("promise 1");
  })
  .then(() => {
    console.log("promise 2");
  });
console.log("end");
