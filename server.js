const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const api = require('./server/routes/api');
const jwt = require('./server/helpers/jwt');
const errorHandler = require('./server/helpers/error-handler');

const port = 3000;
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'dist/IncidentManager')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', api);

// use JWT auth to secure the api
app.use(jwt());

// global error handler
app.use(errorHandler);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/IncidentManager/index.html'));
});
app.listen(process.env.PORT || port, function() {
  console.log('Server is live! Port: ' + port);
});
