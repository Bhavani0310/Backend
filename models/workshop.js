const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seat_number: Number,
});
const workshopSchema = new mongoose.Schema({
  workshop_name: String,
  seats: [seatSchema],
});
const collegeSchema = new mongoose.Schema({
  college_name: String,
  workshops: [workshopSchema], 
});
const College = mongoose.model('College', collegeSchema);
module.exports = College;
