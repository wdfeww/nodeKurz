const cluster = require('cluster');
const os = require('os');

if(cluster.isMaster){
    os.cpus().forEach(() => cluster.fork());
} else {
 const index = require('./index');
 index();
}
cluster.on('exit', () => cluster.fork());