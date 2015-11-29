var express = require('express');
var app = express();


var logger = require('./logger');
app.use(logger);

app.use(express.static('public'));

var blocks = require('./routes/blocks');
app.use('/blocks', blocks);

/* ---------- TEST ROUTES ---------- 
var buildings = require('./routes/buildings');
var users = require('./routes/user');

app.use('/buildings', buildings);
app.use('/users', users);
------------------------------------ */
var locations = {
	'Fixed' : 'First floor',
	'Movable' : 'Second floor',
	'Rotating' : 'Penthouse'
}

/* -------- PARAM HANDLERS ----------- */



/* ------------BLOCK ROUTES-----------*/
	

/* ----- LOCATION ROUTES ----------*/

app.get('/locations/:name', function(req,res) {
	var location = locations[req.blockName];
	res.json(location);
});

/* ---------- LISTENER ----------- */

app.listen(3000, function(){
	console.log('Listening on port 3000');
});

// var http = require('http');

// http.createServer(function(req, res){
// 	res.writeHead(200);
// 	res.write('Hello, this is dog.');
// 	res.end();
// }).listen(8080);
// console.log('Listening on port 8080...');