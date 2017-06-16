'use strict'

const crontab  = require('node-crontab')

module.exports = function(id) {
    crontab.cancelJob(jobs[id])
    delete jobs[id]
}
