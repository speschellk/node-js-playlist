var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise; // use native mongoose promises﻿

// Connect to the mongodb database
mongoose.connect('mongodb://test:test@ds111489.mlab.com:11489/todo-list');

// Create a schema
var todoSchema = new mongoose.Schema({ item: String });

// Model type
var Todo = mongoose.model('Todo', todoSchema);

// Parsing middleware
var urlencodedParser = bodyParser.urlencoded({extended: false});

// Express routing
module.exports = (app) => {

  app.get('/todo', (req, res) => {
    // get data from mongodb and pass it to the view
    Todo.find({}, (err, data) => {
      if (err) throw err;
      res.render('todo', {todos: data});
    });
  });

  app.post('/todo', urlencodedParser, (req, res) => {
    // get data from view and add it to mongodb
    var newTodo = Todo(req.body).save((err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', (req, res) => {
    // delete the requested item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove((err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });
};