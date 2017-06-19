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
        if ([4, 5].indexOf(response.statusCode[0]) == 0) {
            publish({
              url: url,
              message: 'WARNING: Given URL has responded with a ' + response.statusCode + ' status code.'
            })
        }
    })
}
