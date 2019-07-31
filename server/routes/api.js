if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); //not load
}

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Incident = require('../models/incident');
const User = require('../models/user');
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

router.get('auth/register', function(req, res) {
  console.log('GET request for all ACTIVE users!');
  User.find({}).exec(function(err, users) {
    if (err) {
      console.log('Error retrieving ACTIVE users!');
    } else {
      res.json(users);
    }
  });
});

// http://localhost:3000/api/register
router.post('auth/register', function(req, res) {
  console.log('POST a new user!');
  var user = new User();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.department = req.body.department;
  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;
  if (
    req.body.firstName == null ||
    req.body.firstName == '' ||
    req.body.lastName == null ||
    req.body.lastName == '' ||
    req.body.department == null ||
    req.body.department == '' ||
    req.body.username == null ||
    req.body.username == '' ||
    req.body.password == null ||
    req.body.password == '' ||
    req.body.email == null ||
    req.body.email == ''
  ) {
    res.json({
      success: false,
      message: 'Ensure user, email, pw were provided'
    });
  } else {
    user.save(function(err) {
      if (err) {
        res.json({ success: false, message: 'User/Email already exists!' });
      } else {
        res.json(user);
      }
    });
  }
});

/* User Registration. */
router.post('/register', authService.register);

/* User Login. */
router.post('/login', authService.login);

// router.post('/comment', (req, res) => {
//   if (!req.body.comment) {
//     res.json({ success: false, message: 'No comment provided' });
//   } else {
//     if (!req.body.id) {
//       res.json({ success: false, message: 'No id was provided' });
//     } else {
//       Incident.findOne({ _id: req.body.id }, (err, blog) => {
//         if (err) {
//           res.json({ success: false, message: 'Invalid incident id' });
//         } else {
//           if (!incident) {
//             res.json({ success: false, message: 'Incident not found' });
//           } else {
//             User.findOne({ _id: req.decoded.userId }, (err, user) => {
//               if (err) {
//                 res.json({ success: false, message: 'Something went wrong' });
//               } else {
//                 if (!user) {
//                   res.json({ success: false, message: 'User not found.' });
//                 } else {
//                   incident.comments.push({
//                     comment: req.body.comment,
//                     commentator: user.username
//                   });
//                   blog.save(err => {
//                     if (err) {
//                       res.json({
//                         success: false,
//                         message: 'Something went wrong.'
//                       });
//                     } else {
//                       res.json({ success: true, message: 'Comment saved' });
//                     }
//                   });
//                 }
//               }
//             });
//           }
//         }
//       });
//     }
//   }
// });

module.exports = router;
