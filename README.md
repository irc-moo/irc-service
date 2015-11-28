# irc-moo irc service

In a nutshell it allows a client to open bidirectional TCP socket(s) with arbitrary remote addresse(s) on demand.

Communication between client->service and client->tcpServer(s) happens over a single multiplexed
web socket stream.

Communication between client->service happens over a hardcoded channel on the multiplexed stream 'irc-moo', the exchange protocol [RPC using this lib](https://github.com/dominictarr/rpc-stream)

Communication between the client->tcpServer happens over another channel named after the tcp server address. Each tcp socket has its own channel on the multiplexed stream.

![flowchart](http://puu.sh/lB7wT/aa319f9658.png)

## api

##### connect(tcpAddress, cb(error))

##### disconnect(tcpAddress, cb(error))



## notes
This service is locally statefull, meaning we will need sticky sessions at some point.
