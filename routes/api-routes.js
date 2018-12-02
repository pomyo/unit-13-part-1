const db = require('../models/');

module.exports = function (app) {

    app.get('/get-todos', function(req, res) {
        db.Todo.find({})
        .then(function(data) {
            console.log(data);
            res.json(data);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    app.post('/add-todo', function(req, res) {
        console.log(req.body);
        db.Todo.create(req.body)
        .then(function(data) {
            res.json(data);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    app.post('/set-done', function(req, res) {
        // console.log(req.body);
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
        // db.Review.findOneAndUpdate({
        //     _id: req.params.id
        // }, {
        //     $set: {
        //         time_created: req.body.time_created,
        //         text: req.body.text,
        //         rating: req.body.rating
        //     }
        // })
        // .then(function (dbReview) {
        //     res.json(dbReview);
        // })
        // .catch(function (err) {
        //     res.json(err);
        // });
        // db.Todo.findOneAndUpdate()
        // db.Todo.findOneAndUpdate(req.body)
        // .then(function(data) {
        //     res.json(data);
        // })
        // .catch(function(err) {
        //     res.json(err);
        // });
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

    // app.post('/authenticate', function(req, res) { 
    //     let user = req.body.user;
    //     let password = req.body.password;
    //     db.User.find({user: user, password: password})
    //     .then(function(data) {
    //         res.json({handshake: data.length === 0 ? false : true})
    //     });
        
    // });
}