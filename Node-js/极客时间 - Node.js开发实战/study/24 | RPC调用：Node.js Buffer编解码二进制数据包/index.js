const buffer1 = Buffer.from("leon");
const buffer2 = Buffer.from([1, 2, 3, 4]);

const buffer3 = Buffer.alloc(20);

// console.log(buffer1);
// console.log(buffer2);
// console.log(buffer3);

// buffer2.writeInt8(12, 1);
// console.log(buffer2);

// buffer2.writeInt16LE(512, 2);
// console.log(buffer2);


const fs = require('fs');
const protoBuf = require('protocol-buffers');

const schema = protoBuf(fs.readFileSync(`${__dirname}/test.proto`, 'utf-8'));

console.log(schema);

const bufferEncode = schema.Column.encode({
  id: 1,
  name: 'Node.js',
  price: 80.4
});
console.log(bufferEncode);

const data = schema.Column.decode(bufferEncode);
console.log(data);
