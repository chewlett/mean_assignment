var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var myMongo = require('../db');
var db = null;
myMongo.getDb((err, myDb) => {
    if (err) {
        console.log("Database Connection Failed: " + err);
    }
    else {
        db = myDb;
    }
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


module.exports = router;
