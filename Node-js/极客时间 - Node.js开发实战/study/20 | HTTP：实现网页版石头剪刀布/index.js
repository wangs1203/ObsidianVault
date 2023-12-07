const http = require("http");
const url = require("url");
const fs = require("fs");
const querystring = require("querystring");

const game = require("./game");

let playerWon = 0;

let playerLastAction = null;
let sameCount = 0;

http
  .createServer(function (req, res) {
    const parseUrl = url.parse(req.url);

    if (parseUrl.pathname == "/favicon.ico") {
      res.writeHead(200);
      res.end();
      return;
    }

    if (parseUrl.pathname == "/game") {

      if (playerWon >= 3 || sameCount == 9) {
        res.writeHead(500);
        res.end('不和傻子玩了');
        return;
      }

      const query = querystring.parse(parseUrl.query);
      const playerAction = query.action;

      if (playerLastAction && playerLastAction == playerAction) {
        sameCount ++;
      } else {
        sameCount = 0;
      }

      if(sameCount >= 3 ) {
        res.writeHead(400);
        res.end('你作弊，不玩了');
        sameCount = 9;
        return;
      }

      playerLastAction = playerAction;
      res.writeHead("200", { "content-type": "text/html;charset=utf-8" });

      const result = game(playerAction);

      if (result == 0) {
        res.end("平局");
      } else if (result == 1) {
        res.end("你赢了");
        playerWon++;
      } else {
        res.end("你输了");
      }
      return;
    }

    if (parseUrl.pathname == "/") {
      fs.createReadStream(`${__dirname}/index.html`).pipe(res);
    }
  })
  .listen(3000);
