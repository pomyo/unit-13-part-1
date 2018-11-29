const express   = require('express');                  // the express library
const mongoose  = require('mongoose');                 // the mongoose library
const app       = express();                           // initializes app to be an express application
const server    = require('http').createServer(app);   // http server
const io        = require('socket.io')(server);        // this is the server side initialization of socket

app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/CodeChat', { useNewUrlParser : true } );

require('./sockets/events')(io);     
require('./routes/html-routes')(app);
require('./routes/api-routes')(app);

server.listen(PORT, () => {
    console.log('Server is listening');
});
