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
    db.zEvents.find().sort({activity_start: 1},
        (err, data) => {
        if (err) {
            res.send(err);
        }
        res.render('index',  {             
            title: "All Events",
            data: data
        })
    })
});

router.get('/create', function(req, res, next) {
    db.zActivities.find().sort({description: 1},
    (err, data) => {
        if (err) {
            res.send(err);
        }
        res.render('create',  { 
            title: "Add an Event",
            data: data
        })
    })     
})

router.post('/event', function(req, res, next) {
    var event = req.body;
    var error = "";
    if (!event.activity) {        
        error += "Need to put event name; ";
    }
    if (!event.day || !event.month || !event.year) {
        error += "Need to put an event date; ";        
    }
    if (!event.startHour || !event.startMinutes) {
        error += "Need to put event start time; ";
    }
    if (!event.endHour || !event.endMinutes) {
        error += "Need to put event end time; ";
    }  
    if (error != "") {
        res.status(400);
        res.render('error', {
            title: "ERROR!!!",
            error: "Data error, could not add event: " + error
        });
    }
    else {
        var newEvent = {};
        if (event.active) {
            newEvent.is_active = true;
        }
        else  {newEvent.is_active = false; }
        newEvent.activity = event.activity;    
        newEvent.creation_date = new Date();
        newEvent.activity_start = new Date(
            parseInt(event.year), 
            parseInt(event.month)-1, 
            parseInt(event.day), 
            parseInt(event.startHour),
            parseInt(event.startMinutes));
        newEvent.activity_end = new Date(
            parseInt(event.year), 
            parseInt(event.month)-1, 
            parseInt(event.day), 
            parseInt(event.endHour),
            parseInt(event.endMinutes));        
        db.zEvents.save(newEvent, (err, data) => {
            if (err) {
                res.status(400);
                res.send("Data error, could not add event");
            }
            res.redirect('/');
        })
    }
})

router.get('/edit/:id', function(req, res, next) {
    var activities = [];
    db.zActivities.find().sort({description: 1},
        (err, data) => {
            if (err) {
                res.send(err);
            }
            activities = data;
            db.zEvents.findOne( {_id: mongojs.ObjectId(req.params.id)},
            (err2, data2) => {
            if (err2) {
                res.send(err2);
            }
            res.render('edit', {
                title: "Edit Event",
                activities: activities,
                data: data2
            })
        })
        })  
})
router.post('/edit', function(req, res, next) {
    var event = req.body;
    var error = "";
    if (!event.activity) {        
        error += "Need to put event name; ";
    }
    if (!event.day || !event.month || !event.year) {
        error += "Need to put an event date; ";        
    }
    if (!event.startHour || !event.startMinutes) {
        error += "Need to put event start time; ";
    }
    if (!event.endHour || !event.endMinutes) {
        error += "Need to put event end time; ";
    }  
    if (error != "") {
        res.status(400);
        res.render('error', {
            title: "ERROR!!!",
            error: "Data error, could not update event: " + error
        });
    }
    else {
        var changedEvent = {};
        if (!event.creation_date) {
            changedEvent.creation_date = new Date();
        }
        else {
            changedEvent.creation_date = event.creation_date;
        }        
        if (event.active) {
            changedEvent.is_active = true;
        }
        else  {changedEvent.is_active = false; }
        changedEvent.activity = event.activity;    
        changedEvent.activity_start = new Date(
            parseInt(event.year), 
            parseInt(event.month)-1, 
            parseInt(event.day), 
            parseInt(event.startHour),
            parseInt(event.startMinutes));
        changedEvent.activity_end = new Date(
            parseInt(event.year), 
            parseInt(event.month)-1, 
            parseInt(event.day), 
            parseInt(event.endHour),
            parseInt(event.endMinutes));        
        db.zEvents.update({_id: mongojs.ObjectId(event._id)},
            changedEvent, {}, (err, data) => {
                if (err) {
                    res.send(err);
                }
                res.redirect('/');
            });    
    }
})
router.get('/delete/:id', function(req, res, next) {
      db.zEvents.findOne( {_id: mongojs.ObjectId(req.params.id)},
        function(err, data) {
            if (err) {
                res.send(err)
            }
            res.render('delete', {
                title: "Delete Event",
                data: data
            })
        })
})
router.post('/delete', function(req, res, next) {
    var event = req.body;
    db.zEvents.remove( { _id: mongojs.ObjectId(event._id)}, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.redirect("/");
    });
})

module.exports = router;