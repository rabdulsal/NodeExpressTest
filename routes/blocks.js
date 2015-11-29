var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended:false });

var blocks = {
	'Fixed' : 'Fastened securely in position',
	'Movable' : 'Capable of being moved',
	'Rotating' : 'Moving in a circle around its center'
};

router.route('/')
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

router.route('/:name')
	.all(function(req, res, next) {
		var name = req.params.name;
		var block = name[0].toUpperCase() + name.slice(1).toLowerCase();

		req.blockName = block;

		next();
	})
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

module.exports = router;