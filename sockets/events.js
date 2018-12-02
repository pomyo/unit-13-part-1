module.exports = function (skynet) {

    skynet.on('connection', function(socket) {
        console.log('connected');

        socket.on('add-todo', function(data) {
            skynet.emit('emit-todo', data);
        });
        
        socket.on('set-done', function(data) {
            skynet.emit('emit-done', data);
        });

        socket.on('delete-todo', function(data) {
            skynet.emit('emit-delete', data);
        });
    })
}