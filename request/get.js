'use strict'

const request = require('request'),
      Log = require('../models/log')

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
    });
}
