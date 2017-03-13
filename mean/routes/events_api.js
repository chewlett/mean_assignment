var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var myMongo = require('../db');
var moment = require('moment');
var db = null;
myMongo.getDb((err, myDb) => {
    if (err) {
        console.log("Database Connection Failed: " + err);
    }
    else {
        db = myDb;
    }
});
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// list all activities
router.get('/events', function(req, res, next) {
    db.zEvents.find().sort({activity_start: 1},
        (err, data) => {
        if (err) {
            res.send(err);
        }
        res.setHeader('Content-Type', 'application/json');  
        res.send(data);
    })
});
router.get('/weekevents', function(req, res, next) {
    db.zEvents.find({activity_start:    
    {
        $gte: moment().startOf('week').toDate(),
        $lte: moment().endOf('week').toDate()
    }}).sort({activity_start: 1},
        (err, data) => {
        if (err) {
            res.send(err);
        }
        res.setHeader('Content-Type', 'application/json');  
        res.send(data);
    })
});

module.exports = router;
