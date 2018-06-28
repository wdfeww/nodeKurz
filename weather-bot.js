const net = require('net');
const http = require('http');

const client = new net.Socket();
client.setEncoding('utf8');



//pripojim a napisem svoje meno weather bot
client.on('connect', () => {
 client.write('Wheather Bot');
 setInterval(fetcAndPosthWeather, 10000);
});


client.connect(60000);

fetcAndPosthWeather = () =>{
       const request = http.request('api.openweathermap.org/data/2.5/weather?q=Bratislava&units=metric&lang=sk&APPID=a39b199e2fae108670e6fda3ef3c16a2');

       request.on('response', response => {
        response.setEncoding('utf8');
        response.on('data', chunk => content += chunk);
        response.on('end', () => {
            const parsed = JSON.parse(content);
            console.log(parsed);
            });
           
       });

       request.end();//odpalim reqest
}

