'use strict'

module.exports = {
    name: 'Pinger',
    version: '0.0.1',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    base_url: process.env.BASE_URL || 'http://localhost:3000',
    db: {
        uri: 'mongodb://mongo:27017/db',
    },
    redis: {
        port: 6379,
        host: 'redis',
        channel: 'micro_pinger'
    }
}
