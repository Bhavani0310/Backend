const express = require('express');
const router = express.Router();
const Clg = require('./models/College');
const ClgInfo = require('./models/ClgInfo');
const  Workshop  = require('./models/workshop');
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
module.exports = router;