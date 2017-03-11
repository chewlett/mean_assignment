(function(database) {
    const DATABASE_URL = "mongodb://Curtis:LetMe1n@ds145299.mlab.com:45299/sdd_test";
    var mongojs = require('mongojs');

    var theDb = null;

    database.getDb = function(next) {
        if (!theDb) {
            // let us connect to the database
            var theDb = mongojs(DATABASE_URL, ['zEvents', 'zActivities']);
            next(null, theDb);            
        }
        else {
            next(null, theDb)
        }
    }
})(module.exports)