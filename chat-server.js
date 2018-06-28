const net = require('net');
const clients = [];

const server = net.createServer(socket => {
    //socket informacie o uzivatelovi
    console.log('client connected');
    let name = '';
    clients.push(socket);
    socket.setEncoding('utf8');
    socket.write('hello, echo server here\n');
    socket.on('data', chunk => {
        // socket.write(chunk);
        if(name){
            clients
            .filter(client =>client !== chunk)//neposlem odosielatelovi jeho spravu
            .forEach(client => client.write(`${name}: ${chunk}`));
        }else{
            name = chunk;
        }
    });
    socket.on('end', () => {
        const index = clients.findIndex(client => cliet ===socket);
        clients.splice(index, 1 ); //vymazem na indexe jedneho uzivatela

        console.log('client disconnected');
    });
});
server.listen(60000);