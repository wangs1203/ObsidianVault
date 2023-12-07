process.on("message", (str) => {
  console.log("child", str);

  process.send("ha ha");
});
