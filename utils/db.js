
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

exports.insert=function (row,coll) {
    MongoClient.connect('mongodb://127.0.0.1:27017/local', function(err, db) {
    if(err) console.log('error');;
    var collection = db.collection(coll);
    collection.insert(row, function(err, docs) {

        collection.count(function(err, count) {
            console.log(format("count = %s", count));
        });
    // Locate all the entries using find
        collection.find().toArray(function(err, results) {
            console.dir(results);
        // Let's close the db
            db.close();
        });
    });
    }) 
}

