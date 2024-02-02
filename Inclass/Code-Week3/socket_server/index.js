import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({port: 3000});
wss.on('connection', onConnection);

function onConnection(ws){
    ws.on('message', onMessage);
}

function onMessage(data){
    let jsonData = JSON.parse(data);
    for (let i = 0; i < wss.clients.length; i++){
        const c = wss.clients[i];
        c.send(data);
    }
}