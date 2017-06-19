'use strict'

const redis  = require('redis'),
      config = require('../config')

var pub = redis.createClient(config.redis.port, config.redis.host)

module.exports = function(data) {
    pub.publish(config.redis.channel, data)
}
