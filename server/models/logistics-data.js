const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logisticsSchema = new Schema({
  SUPPLY_NAME: String,
  SUPPLY_UNIT: String,
  SUPPLY_QUANTITY: String
});

module.exports = mongoose.model('logistics', logisticsSchema, 'logistics-data');
