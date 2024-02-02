import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({port: 3000});
wss.on('connection', onConnection);

function onConnection(ws){
    ws.on('message', onMessage);
}

function onMessage(data){
    let jd = JSON.parse(data);
    wss.clirnt.forEach( clinet => {
        client.send(JSON.stringify(data));
    })
}