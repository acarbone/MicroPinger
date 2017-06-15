'use strict'

const mongoose = require('mongoose'),
      mongooseApiQuery = require('mongoose-api-query'),
      createdModified = require('mongoose-createdmodified').createdModifiedPlugin

const LogSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        trim: true,
    },
    status_code: {
        type: Number,
        required: true
    },
    response_time_ms: {
        type: Number,
        required: true
    }
}, { minimize: false });


LogSchema.plugin(mongooseApiQuery)
LogSchema.plugin(createdModified, { index: true })

const Log = mongoose.model('Log', LogSchema)
module.exports = Log
