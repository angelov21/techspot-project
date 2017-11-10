var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
    var db = req.db;
    var computers = db.get('laptops');
    computers.find({}, {}, function(err, docs) {
        res.json(docs);
    });
});

router.get("/:computers_id", function(req, res, next) {
    var db = req.db;
    var collection = db.get('laptops');
    var id = req.params.computers_id;
    collection.find({ _id: id }, {}, function(e, docs) {
        res.json(docs);
    });
})

module.exports = router;