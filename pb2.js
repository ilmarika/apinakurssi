const pb2 = new PB2('https://pb2-2018.jelastic.metropolia.fi/', 'first_app_4578');

const msg = {};
msg.hello = 'world';
pb2.sendJson(msg);

pb2.setReceiver(function(data) {
  var x = data.hello;
  console.log('socket.on message received: '+JSON.stringify(data));
});
