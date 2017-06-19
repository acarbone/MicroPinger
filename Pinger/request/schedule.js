'use strict'

const crontab  = require('node-crontab'),
      get      = require('./get'),
      removeSchedule  = require('./removeSchedule')

module.exports = function(interval, url, id) {
    if (typeof jobs[id] != "undefined") {
        removeSchedule(id)
    }

    jobs[id] = crontab.scheduleJob("*/" + interval + " * * * *", function() {
        get(url)
    })
}
