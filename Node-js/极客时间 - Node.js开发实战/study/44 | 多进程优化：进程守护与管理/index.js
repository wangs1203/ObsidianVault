const cluster = require("cluster");
const os = require("os");

// if (cluster.isMaster) {
//   // for (let i = 0; i < os.cpus().length / 2; i++) {
//   for (let i = 0; i < 1; i++) {
//     cluster.fork();
//   }
//   cluster.on('exit', () => {
//     setTimeout(() => {
//       cluster.fork();
//     }, 5000)
//   })
//   // cluster.fork()
//   // cluster.fork()
//   // cluster.fork()
// } else {
//   require("./app");
//   process.on('uncaughtException', (err) => {
//     console.error(err);

//     process.exit(1);
//   });

//   setInterval(() => {
//     console.log(process.memoryUsage().rss);
//     if(process.memoryUsage().rss > 734003200) {
//       console.log('oom');
//       process.exit(1);
//     }
//   }, 5000)
// }

if (cluster.isMaster) {
  for (let i = 0; i < 1; i++) {
    const worker = cluster.fork();
    let missedPing = 0;
    let inter = setInterval(() => {
      console.log("ping");
      worker.send("ping");
      missedPing++;

      if (missedPing >= 3) {
        clearInterval(inter);
        process.kill(worker.process.pid);
      }
    }, 300);

    worker.on("message", (msg) => {
      console.log("pong");
      if (msg == "pong") {
        missedPing--;
      }
    });
  }

  cluster.on("exit", () => {
    setTimeout(() => {
      cluster.fork();
    }, 5000);
  });
} else {
  require("./app");

  process.on("message", (str) => {
    if (str == "ping") {
      process.send("pong");
    }
  });
  process.on("uncaughtException", (err) => {
    console.error(err);

    process.exit(1);
  });

  setInterval(() => {
    console.log(process.memoryUsage().rss);
    if (process.memoryUsage().rss > 734003200) {
      console.log("oom");
      process.exit(1);
    }
  }, 5000);
}
