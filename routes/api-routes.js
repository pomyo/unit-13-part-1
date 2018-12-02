const db = require("../models");

module.exports = function (app) {

    app.get('/get-todos', function(req, res) {
        db.Todo.find({})
        .then(function(data) {
            res.json(data);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    app.post('/add-todo', function(req, res) {
        db.Todo.create(req.body)
        .then(function(data) {
            res.json(data);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    app.post('/set-done', function(req, res) {
        db.Todo.findOneAndUpdate(
        { _id: req.body.id}, 
        { $set: { done: true }})
        .then (function(data){
            let wrapper = data.toObject();
            wrapper.success = true;
            res.json(wrapper);
        })
        .catch (function(err) {
            res.json({success: false, error: err});
        });
    });

    app.delete('/delete-todo', function(req, res) {
        db.Todo.deleteOne({_id: req.body.id})
        .then(function(data) {
            res.json(data.n > 0);
        })
        .catch(function(err) {
            res.json({success: false, error: err});
        });
    });
}