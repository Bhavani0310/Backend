const express = require("express");
const Clg = require("./CollegeModel");

const router = express.Router();


router.post("/clg", async (req, res) => {
  try {
    let post = new Clg(req.body);
    post = await post.save();
    res.status(200).json({
      status: 200,
      data: post,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});


router.get("/clg/list", async (req, res) => {
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
});


router.put("/clg/:postId", async (req, res) => {
  try {
    let post = await Clg.findByIdAndUpdate(req.params.postId, req.body, {
      new: true,
    });
    if (post) {
      res.status(200).json({
        status: 200,
        data: post,
      });
    }
    res.status(400).json({
      status: 400,
      message: "No post found",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.delete("/clg/:postId", async (req, res) => {
  try {
    let post = await Clg.findByIdAndRemove(req.params.postId);
    if (post) {
      res.status(200).json({
        status: 200,
        message: "Post deleted successfully",
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "No post found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});
router.get('/clg/colleges', (req, res) => {
  Clg.find({ Collegename: { $exists: true } }, 'Collegename', (err, colleges) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: 'Error finding colleges' });
    }
    res.send(colleges);
  });
});
module.exports = router;