const express = require('express');
const router = express.Router();
const Clg = require('./models/College');
const worshop = require('./models/ClgInfo');
router.get('/colleges/list', async(req,res)=>{
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
module.exports = router;