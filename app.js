var express = require('express');
var todoController = require('./controllers/todoController');

// create server
var app = express();

// set up template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));

// fire controllers
todoController(app);

// listen
app.listen(3000);
console.log('listening on port 3000');