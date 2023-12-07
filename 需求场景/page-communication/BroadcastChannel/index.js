const MESSAGE_KEY = "MESSAGE";

let messageContainer = document.getElementById("message-container");
let input = document.getElementById("input");
let sendBtn = document.getElementById("sendBtn");

let channel = new BroadcastChannel(MESSAGE_KEY);

function postMessage(data) {
  channel.postMessage({
    ...data,
    date: new Date().toLocaleString(),
  });
}

channel.addEventListener("message", function (e) {
  const msgEl = document.createElement("p");
  console.log("event", e);
  console.log("data", e.data);
  const data = e.data;
  msgEl.innerText = `Date: ${data.date} From: ${data.from} Mode: ${data.mode} Message: ${data.message}`;
  messageContainer.appendChild(msgEl);
});
