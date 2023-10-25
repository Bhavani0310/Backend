const express = require('express');
const router = express.Router();
const Clg = require('./models/College');
const ClgInfo = require('./models/ClgInfo');
const  Workshop  = require('./models/workshop');
const Booking = require('./models/Booking');
const StdUser = require('./models/StdUser');
const workshop = require('./models/workshop');
// const Workshops = require('./models/Workshops');
router.get('/colleges', async(req,res)=>{
    try {
        let posts = await Clg.find();
        res.status(200).json({
          status: 200,
          data: posts,
        });
      } catch (err) {
        res.status(400).json({
          status: 400,
          message: err.message,
        });
      }

})

router.get('/colleges/view',async(req,res)=>{
  try{
    let post =await worshop.find();
    res.status(200).json({
      data:post,
    })
  }
  catch(err){
    res.status(400).json({
      message:err.message,
    })
  }
})

// Define a route to fetch college names and related workshop details


// Define a route to fetch college names and related workshop details
router.get('/workshops', async (req, res) => {
  const aggregatePipeline = [
    {
      $lookup: {
        from: 'workshops', // Name of the Workshop collection
        localField: 'workshops', // Field in ClgInfo referencing Workshop ObjectIDs
        foreignField: '_id', // Field in Workshop
        as: 'workshopDetails',
      },
    },
    {
      $unwind: '$workshopDetails',
    },
    { 
      $project: {
        collegeName: 1, // Include collegeName from ClgInfo
        workshopTitle: '$workshopDetails.workshopTitle', // Include workshopTitle from Workshop
        workshopSeats: '$workshopDetails.workshopSeats',
        workshopDate: '$workshopDetails.workshopDate',
        booking:'$workshopDetails.bookingNumber',
      },
    },
  ];
  
  // Execute the aggregation pipeline
  ClgInfo.aggregate(aggregatePipeline, (err, result) => {
    if (err) {
      console.error(err);
      // Handle error
    } else {
      res.json(result);
      console.log(result);
      // result will contain documents with collegeName and workshopTitle
    }
  });
}
);

router.post('/addworkshops', async (req, res) => {
  try {
    const workshops = req.body.workshops;
   console.log("Sample", workshops);

    // Create Workshop documents for each workshop
    const workshopData = workshops.map((workshop) => ({
      college: workshop.college,
      workshopTitle: workshop.workshopTitle,
      workshopDate: workshop.workshopDate,
      workshopSeats: workshop.workshopSeats,
      workshopTiming: workshop.workshopTiming,
      // Other workshop-related fields
    })); 

    // Save the Workshop documents
    const savedWorkshops = await Workshop.insertMany(workshopData);
console.log(savedWorkshops);
    // Assuming the college is the same for all workshops, you can use the first workshop's college ID
    const collegeId = workshopData[0].college;
    console.log(collegeId);
    // Find the ClgInfo document by userId
    const college = await ClgInfo.findOne({ _id: collegeId });
    console.log(college);
    if (!college) {
      return res.status(404).json({ error: 'College not found for the given userId' });
    }

    const workshopIds = savedWorkshops.map((workshop) => workshop._id);
    console.log(workshopIds);
    // Add the workshop's _id to the ClgInfo's workshops array
    college.workshops = college.workshops.concat(workshopIds);

    // Save the updated ClgInfo document
    const updatedCollege = await college.save();

    // Log the workshop IDs and the updated college
     console.log('Workshop IDs:', workshopIds);
    console.log('Updated College:', updatedCollege);

    res.status(201).json(savedWorkshops);
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: 'Could not create the workshop' });
  }
});

// Delete a workshop by ID (DELETE request)
router.delete('/removeworkshops/:id', async (req, res) => {
  try {
    const deletedWorkshop = await Workshop.findByIdAndDelete(req.params.id);
    if (deletedWorkshop) {
      res.status(200).json(deletedWorkshop);
    } else {
      res.status(404).json({ error: 'Workshop not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Could not delete the workshop' });
  }
});


// Route to filter, group, and fetch student details for workshops
router.get('/workshopsdetails/:userid', async (req, res) => {
  try {
    const id = req.params.userid;
    const Name = await ClgInfo.findOne({ _id: id });
    const collegeName=Name.collegeName;
    // Use Mongoose and the aggregation framework to filter, group, and fetch student details
    const workshops = await Booking.aggregate([
      {
        $match: { collegeName: collegeName }
      },
      {
        $group: {
          _id: '$workshopTitle',
          workshops: { $push: '$$ROOT' }
        }
      },
      {
        $lookup: {
          from: 'stdinfos', // Assuming the user collection name is 'StdUser'
          localField: 'workshops.user',
          foreignField: '_id',
          as: 'students'
        }
      }
    ]);
    console.log(workshops);
    if (workshops.length === 0) {
      return res.status(404).json({ message: 'No workshops found for the specified collegeName.' });
    }

    res.status(200).json(workshops);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/workshopsforclg/:userid', async (req, res) => {
  const id = req.params.userid;
  const Name = await ClgInfo.findOne({ _id: id });
  const collegeName = Name.collegeName;

  const aggregatePipeline = [
    {
      $lookup: {
        from: 'workshops', // Name of the Workshop collection
        localField: 'workshops', // Field in ClgInfo referencing Workshop ObjectIDs
        foreignField: '_id', // Field in Workshop
        as: 'workshopDetails',
      },
    },
    {
      $unwind: '$workshopDetails',
    },
    {
      $match: {
        collegeName: collegeName, // Match the college name from the request
      },
    },
    { 
      $project: {
        collegeName: 1, // Include collegeName from ClgInfo
        workshopTitle: '$workshopDetails.workshopTitle', // Include workshopTitle from Workshop
        workshopSeats: '$workshopDetails.workshopSeats',
        workshopDate: '$workshopDetails.workshopDate',
        Bookingcount:'$workshopDetails.bookingNumber',
      },
    },
  ];

  // Execute the aggregation pipeline
  ClgInfo.aggregate(aggregatePipeline, (err, result) => {
    if (err) {
      console.error(err);
      // Handle error
    } else {
      res.json(result);
      console.log(result);
      // result will contain documents with collegeName and workshopTitle
    }
  });
});





module.exports = router;