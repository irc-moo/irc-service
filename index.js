const net = require('net');
const http = require('http');
const fs = require('fs');
const Multiplex = require('multiplex');
const websocket = require('websocket-stream');
const rpc = require('rpc-stream');

const httpServer = http.createServer();
const wss = websocket.createServer({server: httpServer}, handleWsClient);

httpServer.listen(process.env.PORT || 4005, function() {
  console.log('http server is live');
});

function handleWsClient(websocketStream) {
  const servers = {};
  const multiplexer = Multiplex();
  const streamMoo = multiplexer.createSharedStream('irc-moo');

  const rpcServer = rpc({
    connect(serverAddress, done) {
      if(servers[serverAddress]) {
        done({message: `Already connected to sever ${serverAddress}`});
        return;
      }
      const ircServerStream = net.connect({
        host: serverAddress,
        port: 6667
      });
      const s = multiplexer.createSharedStream(serverAddress);
      ircServerStream.pipe(s).pipe(ircServerStream);

      servers[serverAddress] = ircServerStream;
      done(null);
    },
    disconnect(serverAddress, done) {
      if(!servers[serverAddress]) {
        done({message: `Never connected to server ${serverAddress}`});
        return;
      }
      servers[serverAddress].end();
      delete servers[serverAddress];
      done(null);
    }
  });

  websocketStream.pipe(multiplexer).pipe(websocketStream);
  streamMoo.pipe(rpcServer).pipe(streamMoo);
  streamMoo.pipe(process.stdout);
}
