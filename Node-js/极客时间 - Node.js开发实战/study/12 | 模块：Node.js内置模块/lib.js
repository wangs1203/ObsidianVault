const EventEmitter = require("events").EventEmitter;

class LeonTime extends EventEmitter {
  constructor() {
    super();
    setInterval(() => {
      this.emit("newLevel", { property: Math.random() * 100 });
    }, 3000);
  }
}

const leonTime = new LeonTime();

module.exports = leonTime;