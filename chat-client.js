const net = require('net');
const client = new net.Socket();
client.setEncoding('utf8');
client.on('connect', () => {
 client.write('Spy');
});
client.on('data', chunk => {
 console.log(chunk);
});
client.connect(60000);