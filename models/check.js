'use strict'

const mongoose = require('mongoose'),
      mongooseApiQuery = require('mongoose-api-query'),
      createdModified = require('mongoose-createdmodified').createdModifiedPlugin

const CheckSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        trim: true,
    },
    minutes_interval: {
        type: Number,
        required: true
    }
}, { minimize: false });


CheckSchema.plugin(mongooseApiQuery)
CheckSchema.plugin(createdModified, { index: true })

const Check = mongoose.model('Check', CheckSchema)
module.exports = Check
