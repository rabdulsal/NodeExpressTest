var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended:false });

var logger = require('./logger');
app.use(logger);

app.use(express.static('public'));

/* ---------- DATA ---------- */

var blocks = {
	'Fixed' : 'Fastened securely in position',
	'Movable' : 'Capable of being moved',
	'Rotating' : 'Moving in a circle around its center'
};

var locations = {
	'Fixed' : 'First floor',
	'Movable' : 'Second floor',
	'Rotating' : 'Penthouse'
}

/* -------- PARAM HANDLERS ----------- */

app.param('name', function(req, res, next) {
	var name = req.params.name;
	var block = name[0].toUpperCase() + name.slice(1).toLowerCase();

	req.blockName = block;

	next();
});

/* ------------BLOCK ROUTES-----------*/

app.route('/blocks')
	.get(function(req, res) {
		var blks = Object.keys(blocks);
		if (req.query.limit >=0) {
			res.json(blks.slice(0,req.query.limit));
		} else {
			res.json(blks);
		}
	})
	.post(parseUrlencoded, function(req, res){
		var newBlock = req.body;
		blocks[newBlock.name] = newBlock.description;
		res.status(201).json(newBlock.name);
	});

app.route('/blocks/:name')
	.get(function(req,res){
		var description = blocks[req.blockName];
		if (!description) {
			res.status(404).json('No description found for ' + req.params.name);
		} else {
			res.json(description);
		}
	})
	.delete(function(req, res){
		var block = blocks[req.blockName];
		if (block) {
			delete blocks[req.blockName];
			res.sendStatus(200);
		} else {
			res.sendStatus(404);
		}
	});

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