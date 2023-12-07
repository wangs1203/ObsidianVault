const eventLoop = {
  queue: [],

  loop() {
    while (this.queue.length) {
      var cb = this.queue.shift();
      cb();
    }

    setTimeout(this.loop.bind(this), 50);
  },

  add(cb) {
    this.queue.push(cb);
  },
};

eventLoop.loop();

setTimeout(() => {
  eventLoop.add(function () {
    console.log(1);
  });
}, 500);

setTimeout(() => {
  eventLoop.add(function () {
    console.log(2);
  });
}, 800);
