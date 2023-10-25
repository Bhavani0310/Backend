const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClgInfo', // Reference to the College (User)
    required: true,
  },
  workshopTitle: {
    type: String,
    required: true,
  },
  workshopDescription: {
    type: String,
  },
  workshopSeats: {
    type:Number,
    required:true,
  },
  bookingNumber: {
    type: Number,
    default: 0, // Set the default value to 0
  },
  workshopDate: {
    type:Date,
    required:true,
  },
  workshopTiming: {
    type: String,
  },
  // Add other workshop-related fields
});

const workshop = mongoose.model('Workshop', workshopSchema);
module.exports= workshop;