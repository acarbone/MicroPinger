/**
 * Models
 */
const Log = require('../models/log')

/**
 * LIST
 */
server.get('/logs', function(req, res, next) {

    Log.apiQuery(req.params, function(err, docs) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(docs)
        next()

    })

})


/**
 * GET
 */
server.get('/logs/:log_id', function(req, res, next) {

    Log.findOne({ _id: req.params.log_id }, function(err, doc) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(doc)
        next()

    })

})
