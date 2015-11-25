var livedb = require('livedb');
var redis = require('redis');

module.exports = function() {
    var memorydb = livedb.memory();
    var redisClient1 = redis.createClient(process.env.REDIS_PORT || 6379, process.env.REDIS_ADDR || 'localhost');
    var redisClient2 = redis.createClient(process.env.REDIS_PORT || 6379, process.env.REDIS_ADDR || 'localhost');
    var driver = livedb.redisDriver(memorydb, redisClient1, redisClient2);

    var backend = livedb.client({db: memorydb, driver: driver});
    backend.redis = redisClient1;
    backend.db = memorydb;
    return backend;
};
