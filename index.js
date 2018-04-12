const http = require('http');
const port = 8010;
const server = http.createServer();
  server.on('request', (request, response) => {
        //ak pride nejaky request tak sa otvori tato fukcia
//urcim aky bude response a nastavim mu content napr obrazok html dokument cookies atd...
//adress() nabindova andresa
console.log(request);//vypisem request
response.writeHead(200);//vratim 200 code
    response.write('Hello world ');
    response.end();
    
   
});
server.on('error', err=>console.log(err));

server.listen(port);// lsitener na porte 8010
console.log(`Running at http://localhost:${server.address().port}`)