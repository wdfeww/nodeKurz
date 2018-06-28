const net = require('net');
const http = require('http');

const client = new net.Socket();
client.setEncoding('utf8');



//nedokoncene
client.on('connect', () => {
 client.write('Spy');
 setInterval(fetcAndPosthWeather, 10000);
 const logFile = path.join(__dirname, 'log.txt');
 const stream = fs.createWriteStream(logFile);
});


client.connect(60000);


       request.end();//odpalim reqest


