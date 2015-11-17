var livedb = require('livedb');
//var db = require('livedb-mongo')('localhost:27017/card-move-thing?auto_reconnect', {safe: true});
//var backend = livedb.client(db);
var backend = livedb.client(livedb.memory());

var Duplex = require('stream').Duplex;
var browserChannel = require('browserchannel').server

var share = require('share').server.createClient({ backend: backend });
var json = require('ot-json0')
var express = require('express');
var app = express();

app.use(express.static("../dist/"));

app.use(browserChannel(function (client) {
	var stream = new Duplex({ objectMode: true });

	stream._read = function () { };
	stream._write = function (chunk, encoding, callback) {
		if (client.state !== 'closed') {
			client.send(chunk);
		}
		callback();
	};

	client.on('message', function (data) {
		stream.push(data);
	});

	client.on('close', function (reason) {
		stream.push(null);
		stream.emit('close');
	});

	stream.on('end', function () {
		client.close();
	});

	// Give the stream to sharejs
	return share.listen(stream);
}));

app.get('/b/new', function(req, res) {
	// generate a random 10-digit board id and redirect to it
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
	var id = '';
	for (var i = 0; i < 10; i++) {
		id += chars[Math.random() * chars.length | 0];
	}
	res.redirect('/b/' + id);
});

app.get('/b/:id', function(req, res) {
	res.sendFile('index.html', {root: '../dist'});
});

app.listen(process.argv[2] || 8080);
