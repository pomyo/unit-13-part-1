const socket = io(); 

const _gui = {
    listContainer:  $("#list-container"),
    list:           $("#list"),
    inputContainer: $("#input-container"),
    input:          $("#input")
}

const _functions = {
    render: (...objects) => {
        objects.forEach(e => {  
            _gui.list.append(_functions.createToDo(e));
            if(e.done) _functions.changeIcons(e);
         });
    },
    createToDo: (data) => {

        let listItem = $("<div class='list-item'></div>");
        let todo = $("<p class='todo'></p>");
        todo.html(data.todo);
        
        let toggle = $("<div class='toggle-button'></div>");
        toggle.attr('id', data._id);

        let button = $("<i class='fa fa-circle-thin fa-sm' aria-hidden='true'></i>");
        _listeners.toggleToDelete(button);
        toggle.append(button);

        listItem.append(todo).append(toggle);

        return listItem;
    },
    addToDo: () => {
        let newToDo = _gui.input.val().toUpperCase();
        let payload = { todo: newToDo, done: false }
        _functions.postToDatabase(payload);
    },
    postToDatabase: (payload) => {
        $.post('/add-todo', payload)
        .then(function(data){
            _gui.input.val("");
            socket.emit('add-todo', data);
        });
    },
    getAllToDo: () => {
        $.get('/get-todos')
        .then(function(data) {
            data.forEach( task => {
                _functions.render(task);
            });
        });
    },
    setToDone: (id) => {
        $.post('/set-done', {id: id})
        .then(function(data) {
            if(data.success) {
                socket.emit('set-done', data);
            }
        });
    },
    changeIcons: (data) => {
        let button = $(`#${data._id}`);
        button.empty();
        let deleteButton = $("<i class='fa fa-times-circle-o fa-lg`' aria-hidden='true'></i>");
        _listeners.destroyOnClick(deleteButton);
        button.append(deleteButton);
        let todo = button.siblings()[0];
        $(todo).css('color', 'lightgrey');
    },
    deleteFromDatabase: (id) => {       
        $.ajax({
            url: '/delete-todo',
            method: 'DELETE',
            data: {id: id}
        })
        .then(function(success) {
            if(success) {
                socket.emit('delete-todo', id);
            }
        });   
    },
    destroy: (id) => {
        let button = $(`#${id}`);
        let listItem = $(button).parent();
        listItem.remove();
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
            _functions.setToDone($(this).parent().attr('id'));
            
        })
    },
    destroyOnClick:  (button) => {
        button.click(function() {
            let id = $(this).parent().attr('id');
            _functions.deleteFromDatabase(id);
        })
    },
    startSocket: () => {
        socket.on('emit-todo', function(data) {
            _functions.render(data);
        });
        socket.on('emit-done', function(data) {
            _functions.changeIcons(data);
        });
        socket.on('emit-delete', function(data) {
            _functions.destroy(data);
        });
    }
}