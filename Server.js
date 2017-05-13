var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('persons', ['persons']);
var bodyparser = require('body-parser');
app.use(express.static(__dirname + "/public"));
app.use(bodyparser.json());
app.get('/persons', function (req, res) {
    console.log("received get request");
    db.persons.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
    });

    app.post('/persons', function (req, res) {
        console.log("jkko");
        console.log(req.body);
        db.persons.insert(req.body, function (err, doc) {
            res.json(doc);
        });
    })

    app.delete('/persons/:id', function (req, res) {
        var id = req.params.id;
        console.log(id);
        db.persons.remove({
            _id: mongojs.ObjectId(id)
        }, function (err, doc) {
            res.json(doc);
        })
    });

//This is MEAN Stack used mongodb, node, exxpres, etc..
    app.get('/persons/:id', function (req, res) {
        var id = req.params.id;
        console.log(id);
        db.persons.findOne({
            _id: mongojs.ObjectId(id)
        }, function (err, doc) {
            res.json(doc);

        });
    });

    app.put('/persons/:id', function (req, res) {
        var id = req.params.id;
        console.log(req.body.Name);
        db.persons.findAndModify({
            query: {
                _id: mongojs.ObjectId(id)
            },
            update: {
                $set: {
                    Name: req.body.Name,
                    email: req.body.email,
                    phone: req.body.phone

                }
            },
            new: true
        }, function (err, doc) {
            res.json(doc);

        });
    });
    // var personArray =[perso n1,person2,person3];
    // res.json(personArray);

});
app.listen(3000);
console.log("server runnng on port 3000");