'use strict'

const crontab  = require('node-crontab')

module.exports = function(id) {
    console.log("Removing schedule", id)
    crontab.cancelJob(id)
    delete jobs[id]
}
