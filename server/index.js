var livedb = require('livedb');
//var db = require('livedb-mongo')('localhost:27017/card-move-thing?auto_reconnect', {safe: true});
//var backend = livedb.client(db);
var backend = livedb.client(livedb.memory());

var Duplex = require('stream').Duplex;
var browserChannel = require('browserchannel').server

var share = require('share').server.createClient({ backend: backend });
var json = require('ot-json0')
var express = require('express');

var path = require('path');

var app = express();

app.use(express.static(path.resolve(__dirname, "../dist/")));

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

app.get('/b/:id', function(req, res) {
	res.sendFile('index.html', {root: '../dist'});
});

var process = require('process');
app.listen(process.env.PORT || 8080);
