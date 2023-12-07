const fs = require("fs");

const game = require("./game");

const express = require("express");

let playerWinCount = 0;
let playerLastAction = null;
let sameCount = 0;

const app = express();

app.get("/favicon.ico", function (req, res) {
  res.status(200).end();
  return;
});

app.get(
  "/game",
  function (req, res, next) {
    if (playerWinCount >= 3 || sameCount == 9) {
      res.status(500);
      res.send("不和傻子玩了");
    }
    next();

    if (res.playerWon) {
      playerWinCount++;
    }
  },
  function (req, res, next) {
    const query = req.query;
    const playerAction = query.action;

    if (!playerAction) {
      response.status(400);
      response.send();
      return;
    }

    if (playerLastAction && playerLastAction == playerAction) {
      sameCount++;
    } else {
      sameCount = 0;
    }

    if (sameCount >= 3) {
      res.status(400);
      res.send("你作弊，不玩了");
      sameCount = 9;
      return;
    }

    playerLastAction = playerAction;
    res.playerAction = playerAction;

    next();
  },
  function (req, res) {
    const playerAction = res.playerAction;
    const result = game(playerAction);
    res.status(200);
    if (result == 0) {
      res.send("平局");
    } else if (result == 1) {
      res.send("你赢了");
      res.playerWon = true;
    } else {
      res.send("你输了");
    }
    return;
  }
);

app.get("/", function (req, res) {
  res.type("html").send(fs.readFileSync(`${__dirname}/index.html`, "utf-8"));
});

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:${3000}`);
});
