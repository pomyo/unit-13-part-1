const _gui = {
    listContainer:  $("#list-container"),
    list:           $("#list"),
    inputContainer: $("#input-container"),
    input:          $("#input")
}

const _functions = {
    render: (...objects) => {
        objects.forEach(e => {  
            _gui.list.append(e);
         });
    },
    createToDo: (data) => {
        let listItem = $("<div class='list-item'></div>");
        let todo = $("<p class='todo'></p>");
        todo.html(data);
        
        let toggle = $("<div class='toggle-button'></div>");
        let button = $("<i class='fa fa-circle-thin fa-sm' aria-hidden='true'></i>");
        _listeners.toggleToDelete(button);
        toggle.append(button);

        listItem.append(todo).append(toggle);

        return listItem;
    },
    addToDo: () => {
        var newToDo = _gui.input.val().toUpperCase();
        _functions.render(_functions.createToDo(newToDo));
        _gui.input.val("");
    }
}

const _listeners = {
    enterInput: () => {
        _gui.input.keyup( (event) =>{
            if(event.which == 13) {
                if(_gui.input.val().length > 0) {
                    _functions.addToDo();
                }
            }
        });    
    },
    toggleToDelete: (button) => {
        button.click(function() {
            let parent = $(this).parent();
            parent.empty();
            let deleteButton = $("<i class='fa fa-times-circle-o fa-lg`' aria-hidden='true'></i>");
            _listeners.delete(deleteButton);
            parent.append(deleteButton);
            let todo = parent.siblings()[0];
            $(todo).css('color', 'lightgrey');
        })
    },
    delete:  (button) => {
        button.click(function() {
            $(this).parent().parent().remove();
        })
    }
}

const socket = io();    // this is the client side initialization of socket, with no specified namespace

// socket.on('toggle', function(data) {
//     io.emit('emit-toggle', data);
// });

// socket.on('update', function(data) {
//     io.emit('emit-update', data);
// });