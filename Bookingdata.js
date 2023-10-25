const express = require('express');
const router = express.Router();
const Booking = require('./models/Booking'); 
const Workshop = require('./models/workshop');

router.post('/booking', async (req, res) => {
  try {
    const { user, collegeName, workshopTitle, Date, slotTime } = req.body;

    const existingBooking = await Booking.findOne({ user, workshopTitle, Date });
    if (existingBooking) {
      return res.status(400).json({ message: 'User already has a booking for this workshop on the same date' });
    }
    const workshop = await Workshop.findOne({ 
      collegeName,
      workshopTitle: workshopTitle 
    });

    if (!workshop) {
      return res.status(400).json({message: 'Workshop not found'});
    }
  
    if (workshop.bookingNumber >= workshop.workshopSeats) {
      return res.status(400).json({message: 'No seats are available for this workshop'});
    }

    // Increment bookingNumber
    workshop.bookingNumber += 1;
    
    // Save the updated workshop document
    await workshop.save();
    console.log(workshop);
    const newBooking = new Booking({
      user, 
      collegeName,
      workshopTitle,
      Date,
      slotTime,
      bookingNumber: workshop.bookingNumber // Assign the current booking number
    });
    
    await newBooking.save();
    console.log(newBooking);
    res.status(201).json({message: 'Booking successful'});

  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Error booking workshop'});
  }
});


module.exports = router;