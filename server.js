const express   = require('express');                  
const mongoose  = require('mongoose');                 
const app       = express();                           
const server    = require('http').createServer(app);   
const io        = require('socket.io')(server);        
const PORT      = process.env.PORT || 5000;            

app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/socketToDoList', { useNewUrlParser : true } );

require('./sockets/events')(io);     
require('./routes/html-routes')(app);
require('./routes/api-routes')(app);

server.listen(PORT, () => {
    console.log('Server is listening');
});
