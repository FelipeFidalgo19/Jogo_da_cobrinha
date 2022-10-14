const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const rotas = require('./routes/routes.js');

app.use(express.json());
app.use(rotas);
app.use(cors());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.use(express.static(path.join(__dirname, 'public'))); //pasta public é onde vai ficar o front end
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('views engine', 'html');

const server = require('http').Server(app);
const io = require('socket.io')(server);



io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`);
    socket.on('comand', function(data){
        console.log('recebe: ' + data);
        socket.broadcast.emit('fs-share', data);
    });
    socket.on('fs-share', function(data){
        console.log('envia: '+ data);
        socket.broadcast.emit('fs-share', data);
    });
});

const port = process.env.PORT || 5000 ;
// const host = '192.168.0.31';

server.listen(port, () => {
    console.log("Servidor Online")
}); 