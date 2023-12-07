module.exports = function (playerAction) {
  const random = Math.random() * 3;
  let computerAction;
  if (random < 1) {
    computerAction = "石头";
  } else if (random > 2) {
    computerAction = "剪刀";
  } else {
    computerAction = "布";
  }
  console.log(computerAction);

  if (computerAction === playerAction) {
    console.log("平局");
    return 0;
  } else if (
    (computerAction === "石头" && playerAction === "布") ||
    (computerAction === "剪刀" && playerAction === "石头") ||
    (computerAction === "布" && playerAction === "剪刀")
  ) {
    console.log("you win!!!");
    return -1;
  } else {
    console.log("you lose!!!");
    return 1;
  }
};
