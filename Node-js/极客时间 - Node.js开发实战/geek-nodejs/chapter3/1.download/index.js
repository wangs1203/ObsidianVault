const koa = require('koa');
const fs = require('fs');
const mount = require('koa-mount');
const static = require('koa-static');

const app = new koa();

app.use(
    static(__dirname + '/source/')
);

// app.use(
//     mount('/', async (ctx) => {
//         ctx.body = fs.readFileSync(__dirname + '/source/index.htm', 'utf-8')
//     })
// );

// 性能优化 - 39 | 代码优化：JavaScript代码性能优化
const buffer = fs.readFileSync(__dirname + '/source/index.htm');

app.use(
    mount('/', async (ctx) => {
        ctx.static = 200;
        ctx.type = 'html';
        ctx.body = buffer
    })
);


// app.listen(4000);
module.exports = app;