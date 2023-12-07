const net = require("net");
// ** 单工通信
// const socket = new net.Socket({});

// socket.connect({
//   host: '127.0.0.1',
//   port: 4000,
// });

// socket.write('good morning, hello world');

// ** 半双工通信
// const socket = new net.Socket({});

// socket.connect({
//   host: '127.0.0.1',
//   port: 4000,
// });

const lessonIds = [
  "136797",
  "136798",
  "136799",
  "136800",
  "136801",
  "136803",
  "136804",
  "136806",
  "136807",
  "136808",
  "136809",
  "141994",
  "143517",
  "143557",
  "143564",
  "143644",
  "146470",
  "146569",
  "146582",
];

// const buffer = Buffer.alloc(4);

// buffer.writeInt32BE(
//   lessonIds[Math.floor(Math.random() * lessonIds.length)]
// )

// socket.write(buffer);

// socket.on('data', function (buffer) {
//   console.log(buffer.toString())

//   const buffer2 = Buffer.alloc(4);
//   const index = Math.floor(Math.random() * lessonIds.length);

//   buffer2.writeInt32BE(
//     lessonIds[index]
//   );

//   socket.write(buffer2);
// })

// ** 全双工通信
// 创建socket
const socket = new net.Socket({});

// 连接服务器
socket.connect({
  host: "127.0.0.1",
  port: 4000,
});

let id = Math.floor(Math.random() * lessonIds.length);

socket.on("data", (buffer) => {
  const seqBuffer = buffer.slice(0, 2);
  const titleBuffer = buffer.slice(2);

  console.log(seqBuffer.readInt16BE(), titleBuffer.toString());
});

let seq = 0;
// 把编码请求包的逻辑封装为一个函数
function encode(index) {
  buffer = Buffer.alloc(6);
  buffer.writeInt16BE(seq);
  buffer.writeInt32BE(lessonIds[index], 2);
  console.log(seq, lessonIds[index]);
  seq++;
  return buffer;
}

// setInterval(function () {
//   // 接收到数据之后，按照半双工通信的逻辑，马上开始下一次请求
//   id = Math.floor(Math.random() * lessonIds.length);
//   socket.write(encode(id));
// }, 50);

for (let k = 0; k < 100; k++) {
  id = Math.floor(Math.random() * lessonIds.length);
  socket.write(encode(id));
}
