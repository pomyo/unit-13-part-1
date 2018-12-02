const express   = require('express');                  
const mongoose  = require('mongoose');                 
const app       = express();                           
const server    = require('http').createServer(app);   
const io        = require('socket.io')(server);        
const PORT      = process.env.PORT || 5000;            

app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(express.static('public'));

// mongoose.connect(`mongodb://localhost/socketToDoList`, { useNewUrlParser : true });
mongoose.connect('mongodb://pomyoSocket:socket123@ds251197.mlab.com:51197/heroku_369mh3lg', { useNewUrlParser : true } );
// console.log(`mongodb://heroku_369mh3lg:Rocketscience101!@ds251197.mlab.com:51197/heroku_369mh3lg`);

require('./sockets/events')(io);     
require('./routes/html-routes')(app);
require('./routes/api-routes')(app);

server.listen(PORT, () => {
    console.log(`Application running on ${PORT}` );
    console.log('Server is listening');
});
