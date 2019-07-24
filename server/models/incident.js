const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const incidentSchema = new Schema({
    INCIDENT_NAME: String,
    SUMMARY: String,
    INCIDENT_TYPE: String,
    STATUS: String,
    CREATION_DATE: String,
    LOCATION_NAME: String,
    ADDRESS: String,
    LATITUDE: String,
    LONGITUDE: String,
    LEAD_AGENCY: String,
    SUPPORTING_AGENCY: String,
    CREATED_BY: String,
    MODIFICATION_DATE: String,
    MODIFIED_BY: String,
    COMMENTS: String
});

module.exports = mongoose.model('incident', incidentSchema, 'incidents');
