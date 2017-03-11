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

/* GET home page. */
router.get('/', function(req, res, next) {
    db.activities.find((err, data) => {
        if (err) {
            res.send(err);
        }
        res.render('index',  { 
            title: "All Activities",
            data: data
        })
    })  
});

router.get('/create', function(req, res, next) {
    res.render('create', { title: "Add an Activity"});
})

router.post('/activity', function(req, res, next) {
    var activity = req.body;
    if (!activity.activity_name) {
        res.status(400);
        res.send("Data error, could not add activity");
    }
    else {
        activity.date_created = new Date();
        db.activities.save(activity, (err, data) => {
            if (err) {
                res.status(400);
                res.send("Data error, could not add activity");
            }
            res.redirect('/');
        })
    }
})
router.get('/edit/:id', function(req, res, next) {
    db.activities.findOne( {_id: mongojs.ObjectId(req.params.id)},
        function(err, data) {
            if (err) {
                res.send(err);
            }
            res.render('edit', {
                title: "Edit Acticity",
                data: data
            })
        })
})
router.post('/edit', function(req, res, next) {
    var activity = req.body;
    var changedActivity = {};
    changedActivity.date_created = activity.date_created;
    if (activity.activity_name) {
        changedActivity.activity_name = activity.activity_name;
    }
    else {
        res.status(400);
        res.send("Need to put activity name");
    }
    db.activities.update({_id: mongojs.ObjectId(activity._id)},
        changedActivity, {}, (err, data) => {
            if (err) {
                res.send(err);
            }
            res.redirect('/');
        })    
})
router.get('/delete/:id', function(req, res, next) {
      db.activities.findOne( {_id: mongojs.ObjectId(req.params.id)},
        function(err, data) {
            if (err) {
                res.send(err)
            }
            res.render('delete', {
                title: "Delete Activity",
                data: data
            })
        })
})
router.post('/delete', function(req, res, next) {
    var activity = req.body;
    db.activities.remove( { _id: mongojs.ObjectId(activity._id)}, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.redirect("/");
    });
})

module.exports = router;