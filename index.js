var net = require('net');
var http = require('http');
var fs = require('fs');
var MuxDemux = require('mux-demux');
var websocket = require('websocket-stream');

var httpServer = http.createServer();
httpServer.listen(process.env.PORT || 4000, function() {
  console.log('http server is live');
});

var websocketClients = {};

var wss = websocket.createServer({server: httpServer}, handleWsClient);

function handleWsClient(clientStream) {
  console.log('websocket client connected');

  var meta = 'main';
  var a = MuxDemux();
  a.createWriteStream(meta);
  a.createStream(meta);

  clientStream.pipe(a);
  b.pipe();
  // var ircStream = net.connect({
  //   port: 6667,
  //   host: 'irc.freenode.org'
  // });
  // ircStream.pipe(clientStream).pipe(ircStream);
  var needle = 'foobar';

  var demuxStream = clientStream
    .pipe(demuxClientStream);

  demuxClientStream.createWriteStream
  //.pipe(StreamSearch(new StreamSearch(needle)));
}
