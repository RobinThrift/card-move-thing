var livedb = require('livedb');
var redis = require('redis');

module.exports = function() {
    var memorydb = livedb.memory();
    var redisClient1 = redis.createClient(6379, 'localhost');
    var redisClient2 = redis.createClient(6379, 'localhost');
    var driver = livedb.redisDriver(memorydb, redisClient1, redisClient2);
    
    var backend = livedb.client({db: memorydb, driver: driver});
    backend.redis = redisClient1;
    backend.db = memorydb;
    return backend;
};
