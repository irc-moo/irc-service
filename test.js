const websocket = require('websocket-stream');
const rpc = require('rpc-stream');
const Multiplex = require('multiplex');

setTimeout(() => {
  const ws = websocket('ws://localhost:4005');
  const multiplexer = Multiplex();
  const streamMoo = multiplexer.createSharedStream('irc-moo');
  const rpcClient = rpc();
  const remote = rpcClient.wrap(['connect', 'disconnect']);

  rpcClient.pipe(streamMoo).pipe(rpcClient);
  ws.pipe(multiplexer).pipe(ws);

  const serverAddress = 'irc.freenode.net';

  remote.connect(serverAddress, (err) =>{
    if(err) {
      throw err;
    }
    multiplexer.createSharedStream(serverAddress)
      .on('data', buf => console.log(serverAddress, buf.toString()));
  });
}, 1000);
