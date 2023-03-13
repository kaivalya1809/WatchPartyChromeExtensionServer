const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");

const wss  = new WebSocket.Server({server:server});
wss.on('connection', function connection(ws) {
    console.log('A new client Connected!');
    ws.on('message', function incoming(message) {
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
      
    });
  });
app.get('/',(req,res)=>res.send("Hello World"));

server.listen(3000,()=>console.log("Listening on port"));
