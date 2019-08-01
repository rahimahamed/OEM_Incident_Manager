if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); //not load
}

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Incident = require('../models/incident');
const User = require('../models/user');
const UserDAO = require('../DAO/userDAO');
const MD5 = require('md5');
const authService = require('../services/auth');

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
  newIncident.save(function(err, insertedIncident) {
    if (err) {
      console.log('Error saving new incident!');
    } else {
      res.json(insertedIncident);
    }
  });
});

router.put('/active/:id', function(req, res) {
  console.log('Update an incident!');
  Incident.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        INCIDENT_NAME: req.body.INCIDENT_NAME,
        SUMMARY: req.body.SUMMARY,
        INCIDENT_TYPE: req.body.INCIDENT_TYPE,
        STATUS: req.body.STATUS,
        CREATION_DATE: req.body.CREATION_DATE,
        LOCATION_NAME: req.body.LOCATION_NAME,
        ADDRESS: req.body.ADDRESS,
        LATITUDE: req.body.LATITUDE,
        LONGITUDE: req.body.LONGITUDE,
        LEAD_AGENCY: req.body.LEAD_AGENCY,
        SUPPORTING_AGENCY: req.body.SUPPORTING_AGENCY,
        CREATED_BY: req.body.CREATED_BY,
        MODIFICATION_DATE: req.body.MODIFICATION_DATE,
        MODIFIED_BY: req.body.MODIFIED_BY,
        COMMENTS: req.body.COMMENTS
      }
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

router.get('/register', function(req, res) {
  console.log('GET request for all ACTIVE users!');
  User.find({}).exec(function(err, users) {
    if (err) {
      console.log('Error retrieving ACTIVE users!');
    } else {
      res.json(users);
    }
  });
});

router.delete('/register/:id', function(req, res) {
  console.log('DELETING a user!');
  User.findByIdAndRemove(req.params.id, function(err, deletedUser) {
    if (err) {
      res.send('Error deleting user!');
    } else {
      res.json(deletedUser);
    }
  });
});

// http://localhost:3000/api/register
router.post('/register', authService.register);

router.post('/login', authService.login);

router.post('/comment', (req, res) => {
  if (!req.body.comment) {
    console.log('No comment provided');
    res.json({ success: false, message: 'No comment provided' });
  } else {
    if (!req.body.id) {
      console.log('No id provided');
      res.json({ success: false, message: 'No id was provided' });
    } else {
      Incident.findOne({ _id: req.body.id }, (err, blog) => {
        if (err) {
          console.log('Invalid incident ID');
          res.json({ success: false, message: 'Invalid incident id' });
        } else {
          if (!incident) {
            console.log('Incident not found');
            res.json({ success: false, message: 'Incident not found' });
          } else {
            User.findOne({ _id: req.decoded.userId }, (err, user) => {
              if (err) {
                console.log('Something went wrong');
                res.json({ success: false, message: 'Something went wrong' });
              } else {
                if (!user) {
                  console.log('User not found');
                  res.json({ success: false, message: 'User not found.' });
                } else {
                  incident.comments.push({
                    comment: req.body.comment,
                    commentator: user.username
                  });
                  blog.save(err => {
                    if (err) {
                      console.log('Something went wrong');
                      res.json({
                        success: false,
                        message: 'Something went wrong.'
                      });
                    } else {
                      console.log('Comment saved!');
                      res.json({ success: true, message: 'Comment saved' });
                    }
                  });
                }
              }
            });
          }
        }
      });
    }
  }
});

module.exports = router;
