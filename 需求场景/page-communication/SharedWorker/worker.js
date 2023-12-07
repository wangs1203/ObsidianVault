const portList = [];

onconnect = function(e) {
  var port = e.ports[0];
  ensurePorts(port);
  port.onmessage = function(e) {
    var data = e.data;
    dispatch(port, data);
  };
  port.start();
};

function ensurePorts(port) {
  if (portList.indexOf(port) < 0) {
    portList.push(port);
  }
}

function dispatch(selfPort, data) {
  portList
    .filter(port => selfPort !== port)
    .forEach(port => port.postMessage(data));
}