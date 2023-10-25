const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StdUser', // Reference to the User model
        required: true,
      },
  collegeName: {
    type: String,
    required: true,
  },
  workshopTitle: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  bookingNumber: {
    type: Number,
    default: 0, // Set the default value to 0
  },
  slotTime: {
    type: String,
    required: true,
  },
});

// Create a model based on the schema
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
