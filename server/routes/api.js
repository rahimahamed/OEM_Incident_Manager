if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config(); //not load
}
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Incident = require('../models/incident');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, function(err){
    if(err){
      console.error("Error! " + err);
    }else{
      console.log('Connected with database');
    }
});
mongoose.set('useFindAndModify', false);

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://siqbal:oem123@cluster0-9ppa8.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

router.get('/active', function(req, res){
    console.log('GET request for all ACTIVE incidents!');
    Incident.find({})
    .exec(function(err, incident){
        if (err){
            console.log("Error retrieving ACTIVE incidents!");
        }else {
            res.json(incident);
        }
    });
});

router.get('/active/:id', function(req, res){
    console.log('Get request for a single incident!');
    Incident.findById(req.params.id)
    .exec(function(err, incident){
        if (err){
            console.log("Error retrieving incident!");
        }else {
            res.json(incident);
        }
    });
});

router.post('/active', function(req, res){
    console.log('POST a new incident!');
    var newIncident = new Incident();
    newIncident.title = req.body.title;
    // newIncident.description = req.body.description;
    newIncident.location = req.body.location;
    newIncident.status = req.body.status;
    newIncident.save(function(err, insertedIncident){
        if (err){
            console.log('Error saving new incident!');
        }else{
            res.json(insertedIncident);
        }
    });
});


router.put('/active/:id', function(req, res){
    console.log('Update an incident!');
    Incident.findByIdAndUpdate(req.params.id,
    {
        $set: {title: req.body.title, location: req.body.location, status: req.body.status}
    },
    {
        new: true
    },
    function(err, updatedVideo){
        if(err){
            res.send("Error updating incident!");
        }else{
            res.json(updatedVideo);
        }
    }

    );
});


router.delete('/active/:id', function(req, res){
    console.log('DELETING an incident!');
    Incident.findByIdAndRemove(req.params.id, function(err, deletedIncident){
        if(err){
            res.send("Error deleting incident!");
        }else{
            res.json(deletedIncident);
        }
    });
});

module.exports = router;
