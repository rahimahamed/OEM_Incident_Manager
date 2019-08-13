if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); //not load
}

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Incident = require('../models/incident');
const Logistics = require('../models/logistics-data');
const auth = require('../helpers/auth');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, function(
  err
) {
  if (err) {
    console.error('Error! ' + err);
  } else {
    console.log('Connected with database');
  }
});
mongoose.set('useFindAndModify', false);

router.get('/active', function(req, res) {
  console.log('GET request for all ACTIVE incidents!');
  Incident.find({}).exec(function(err, incident) {
    if (err) {
      console.log('Error retrieving ACTIVE incidents!');
    } else {
      res.json(incident);
    }
  });
});

router.get('/active/:id', function(req, res) {
  console.log('Get request for a single incident!');
  Incident.findById(req.params.id).exec(function(err, incident) {
    if (err) {
      console.log('Error retrieving incident!');
    } else {
      res.json(incident);
    }
  });
});

router.post('/active', function(req, res) {
  console.log('POST a new incident!');
  var newIncident = new Incident();
  newIncident.INCIDENT_NAME = req.body.INCIDENT_NAME;
  newIncident.SUMMARY = req.body.SUMMARY;
  newIncident.INCIDENT_TYPE = req.body.INCIDENT_TYPE;
  newIncident.STATUS = req.body.STATUS;
  newIncident.CREATION_DATE = req.body.CREATION_DATE;
  newIncident.LOCATION_NAME = req.body.LOCATION_NAME;
  newIncident.ADDRESS = req.body.ADDRESS;
  newIncident.LATITUDE = req.body.LATITUDE;
  newIncident.LONGITUDE = req.body.LONGITUDE;
  newIncident.LEAD_AGENCY = req.body.LEAD_AGENCY;
  newIncident.SUPPORTING_AGENCY = req.body.SUPPORTING_AGENCY;
  newIncident.CREATED_BY = req.body.CREATED_BY;
  newIncident.MODIFICATION_DATE = req.body.MODIFICATION_DATE;
  newIncident.MODIFIED_BY = req.body.MODIFIED_BY;
  newIncident.COMMENTS = req.body.COMMENTS;
  newIncident.SUPPLIES = req.body.SUPPLIES;
  newIncident.save(function(err, insertedIncident){
      if (err){
          console.log('Error saving new incident!');
      }else{
          res.json(insertedIncident);
      }
  });
});

router.put('/active/:id', function(req, res) {
  console.log('Update an incident!');
  Incident.findByIdAndUpdate(req.params.id,
  {
      $set: {INCIDENT_NAME: req.body.INCIDENT_NAME, SUMMARY: req.body.SUMMARY, INCIDENT_TYPE: req.body.INCIDENT_TYPE,
        STATUS: req.body.STATUS, CREATION_DATE: req.body.CREATION_DATE,
        LOCATION_NAME: req.body.LOCATION_NAME, ADDRESS: req.body.ADDRESS, LATITUDE: req.body.LATITUDE,
        LONGITUDE: req.body.LONGITUDE, LEAD_AGENCY: req.body.LEAD_AGENCY,
        SUPPORTING_AGENCY: req.body.SUPPORTING_AGENCY, CREATED_BY: req.body.CREATED_BY, SUPPLIES: req.body.SUPPLIES,
        MODIFICATION_DATE: req.body.MODIFICATION_DATE, MODIFIED_BY: req.body.MODIFIED_BY, COMMENTS: req.body.COMMENTS}
  },
  {
      new: true
    },
    function(err, updatedVideo) {
      if (err) {
        res.send('Error updating incident!');
      } else {
        res.json(updatedVideo);
      }
    }
  );
});

router.delete('/active/:id', function(req, res) {
  console.log('DELETING an incident!');
  Incident.findByIdAndRemove(req.params.id, function(err, deletedIncident) {
    if (err) {
      res.send('Error deleting incident!');
    } else {
      res.json(deletedIncident);
    }
  });
});



router.get('/logisticsdata', function(req, res){
  console.log('GET request for all ACTIVE supplies!');
  Logistics.find({})
  .exec(function(err, supplies){
      if (err){
          console.log("Error retrieving ACTIVE supplies!");
      }else {
          res.json(supplies);
      }
  });
});

router.get('/logisticsdata/:id', function(req, res){
  console.log('Get request for a single supplies!');
  Logistics.findById(req.params.id)
  .exec(function(err, supplies){
      if (err){
          console.log("Error retrieving supplies!");
      }else {
          res.json(supplies);
      }
  });
});

router.post('/logisticsdata', function(req, res){
  console.log('POST a new supplies!');
  var newLogistics = new Logistics();
  newLogistics.SUPPLY_NAME = req.body.SUPPLY_NAME;
  newLogistics.SUPPLY_UNIT = req.body.SUPPLY_UNIT;
  newLogistics.SUPPLY_QUANTITY = req.body.SUPPLY_QUANTITY;
  newLogistics.save(function(err, insertedSupply){
      if (err){
          console.log('Error saving new supply!');
      }else{
          res.json(insertedSupply);
      }
  });
});

router.put('/logisticsdata/:id', function(req, res){
  console.log('Update a supply!');
  Logistics.findByIdAndUpdate(req.params.id,
  {
      $set: {SUPPLY_NAME: req.body.SUPPLY_NAME, SUPPLY_UNIT: req.body.SUPPLY_UNIT, SUPPLY_QUANTITY: req.body.SUPPLY_QUANTITY}
  },
  {
      new: true
  },
  function(err, updatedVideo){
      if(err){
          res.send("Error updating supplies!");
      }else{
          res.json(updatedVideo);
      }
  }

  );
});

router.delete('/logisticsdata/:id', function(req, res){
    console.log('DELETING a supplies!');
    Logistics.findByIdAndRemove(req.params.id, function(err, deletedSupply){
        if(err){
            res.send("Error deleting supplies!");
        }else{
            res.json(deletedSupply);
        }
    });
});

router.post('/user/authenticate', auth.authenticate);
router.post('/user/register', auth.register);
router.get('/user/', auth.getAll);
router.get('/user/current', auth.getCurrent);
router.get('/user/:id', auth.getById);
router.put('/user/:id', auth.update);
router.delete('/user/:id', auth.delete);

module.exports = router;
