const express = require("express");
const Clg = require("./CollegeModel");
const FAQ = require("./models/faq_model");
const router = express.Router();
const nodemailer = require('nodemailer');

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




router.get('/faqs', async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new FAQ
router.post('/faqs', async (req, res) => {
  const faq = new FAQ({
    question: req.body.question,
    answer: req.body.answer
  });
  try {
    const newFAQ = await faq.save();
    res.status(201).json(newFAQ);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port:587,
  secure:false,
  auth: {
    user: 'bhavaniprasadps1@gmail.com', // Replace with your Gmail email address
    pass: 'puht dgln tkwv qqsl' // Replace with your Gmail password
  }
});

// Route to handle form submission
router.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;
  // Email content
  const mailOptions = {
    from:'<name> <email>', // Sender address
    to: 'bhavaniprasadps1@gmail.com', // Replace with the recipient's email address
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json('Error sending email');
    } else {
      res.status(200).json('Email sent successfully');
    }
  });
});
module.exports = router;