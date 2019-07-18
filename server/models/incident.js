const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const incidentSchema = new Schema({
    title: String,
    // description: String,
    location: String,
    status: String
});

module.exports = mongoose.model('incident', incidentSchema, 'incidents');
