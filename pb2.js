'use strict';
/* global $ */
let appId =prompt("channel:","");
console.log('channel set to: '+appId);
document.getElementById("channel").innerHTML = 'Channel: '+appId;

let pb2 = new PB2('https://pb2-2018.jelastic.metropolia.fi/', appId);
const msg = {};
let message = document.getElementById("message");
let nick = document.getElementById("nick");

function getMessage(){
  msg.nick = nick.value;
  msg.msg = message.value;
  pb2.sendJson(msg);
}

pb2.setReceiver(function(data) {
  console.log('socket.on message received: '+JSON.stringify(data));
  let div = document.createElement("div");
  if(data.me) {
    div.setAttribute("id", "me");
  } else {
    div.setAttribute("id", "other");
  }
  document.getElementById("messages").appendChild(div);
  div.innerHTML = data.json.nick + ': ' + data.json.msg;
});

$('#send').click(function() {
  getMessage();
});