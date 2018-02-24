'use strict';
/* global $ */
const pb2 = new PB2('https://pb2-2018.jelastic.metropolia.fi/', 'first_app_4578');
const msg = {};
let message = document.getElementById("message");

function getMessage(){
  msg.nick = 'ile';
  msg.msg = message.value;
  pb2.sendJson(msg);

  pb2.setReceiver(function(data) {
    console.log('socket.on message received: '+JSON.stringify(data));
  });
}

$('#send').click(function() {
  getMessage();
});