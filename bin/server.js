require('dotenv').config()

const http = require("http") //criar servidor http
const debug = require("debug")("nodestr:server")
const app = require('../src/app')

const port = normalizePort(process.env.PORT || 3000)
app.set('port', port) //Porta do app

const server = http.createServer(app) //criando server colocando app como param


server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
console.log("Rodando na porta" + port)

function normalizePort(val) {
    const port = parseInt(val, 10)
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port
    }

    return false
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}