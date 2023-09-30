const express = require('express');
const router = express.Router();
const Booking = require('./models/Booking'); // Import your Mongoose model

// Define a route to handle form submissions
router.post('/booking', async (req, res) => {
  try {
    // Extract data from the request body
    const { user,collegeName, workshopTitle, Date, slotTime } = req.body;

    // Create a new instance of the Booking model
    const newBooking = new Booking({
      
      user,
      collegeName,
      workshopTitle,
      Date,
      slotTime,
    });

    // Save the data to the database
    await newBooking.save();

    res.status(201).json({ message: 'Form data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving form data' });
  }
});

module.exports = router;
