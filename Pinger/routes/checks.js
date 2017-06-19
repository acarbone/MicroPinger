const Check = require('../models/check'),
      schedule = require('../request/schedule'),
      removeSchedule = require('../request/removeSchedule'),
      _ = require('lodash')

server.post('/checks', function(req, res, next) {
    let data = req.body || {}
    let check = new Check(data)

    check.save(function(err) {
        if (err) {
            log.error(err)
            return next(new errors.InternalError(err.message))
            next()
        }

        schedule(check.minutes_interval, check.url, check.id)
        res.send(201)
        next()
    })
})

server.get('/checks', function(req, res, next) {
    Check.apiQuery(req.params, function(err, docs) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(docs)
        next()
    })
})

server.get('/checks/:check_id', function(req, res, next) {
    Check.findOne({ _id: req.params.check_id }, function(err, doc) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(doc)
        next()
    })
})

server.put('/checks/:check_id', function(req, res, next) {
    let data = req.body || {}

    if (!data._id) {
        _.extend(data, {
            _id: req.params.check_id
        })
    }

    Check.findOne({ _id: req.params.check_id }, function(err, doc) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        } else if (!doc) {
            return next(new errors.ResourceNotFoundError('The resource you requested could not be found.'))
        }

        Check.update({ _id: data._id }, data, function(err) {
            if (err) {
                log.error(err)
                return next(new errors.InvalidContentError(err.errors.name.message))
            }

            schedule(data.minutes_interval, data.url, data._id)
            res.send(200, data)
            next()
        })
    })
})

server.del('/checks/:check_id', function(req, res, next) {
    Check.remove({ _id: req.params.check_id }, function(err) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        removeSchedule(req.params.check_id)

        res.send(204)
        next()
    })
})
