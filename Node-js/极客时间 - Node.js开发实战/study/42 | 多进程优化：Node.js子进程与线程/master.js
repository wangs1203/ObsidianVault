const cp = require("child_process");

// 创建子进程
const child_process = cp.fork(`${__dirname}/child.js`);

// 父进程可向子进程发送消息
child_process.send("HA HA");

child_process.on("message", (str) => {
  console.log("parent", str);

});
