'use strict'

const request = require('request'),
      Log = require('../models/log'),
      publish = require('./publish')

module.exports = function(url) {
    request.get({
        url : url,
        time : true
    }, function(err, response) {
        var respLog = new Log({
            url: url,
            status_code: response.statusCode,
            response_time_ms: response.elapsedTime
        })
        respLog.save()
        if (response.statusCode >= 400) {
            console.log('NOTIFY', 'WARNING: Given URL ' + url + ' has responded with a ' + response.statusCode + ' status code.')
            publish('WARNING: Given URL ' + url + ' has responded with a ' + response.statusCode + ' status code.')
        }
    })
}
