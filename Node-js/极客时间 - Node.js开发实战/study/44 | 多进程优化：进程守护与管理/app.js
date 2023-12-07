const fs = require("fs");
const http = require("http");

// http
//   .createServer(function (req, res) {
//     res.writeHead(200, { "content-type": "text/html" });

//     setTimeout(() => {
//       console.log(window.location.href);
//       res.end(fs.readFileSync(`${__dirname}/index.htm`, "utf-8"));
//     });
//   })
//   .listen(3000, () => {
//     console.log("listened 3000");
//   });

// 检测内存泄漏 调试demo
// const leak = [];
// http
//   .createServer(function (req, res) {
//     res.writeHead(200, { "content-type": "text/html" });
//     setTimeout(() => {
//       const result = fs.readFileSync(`${__dirname}/index.htm`, "utf-8");
//       leak.push(result);
//       res.end(result);
//     }, 50);
//   })
//   .listen(3000, () => {
//     console.log("listened 3000");
//   });

// const leak = [];
http
  .createServer(function (req, res) {
    res.writeHead(200, { "content-type": "text/html" });
    setTimeout(() => {
      const result = fs.readFileSync(`${__dirname}/index.htm`, "utf-8");
      // leak.push(result);
      res.end(result);
    }, 50);
  })
  .listen(3000, () => {
    console.log("listened 3000");
    while (true) {}
  });
