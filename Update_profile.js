const express = require('express');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const Student = require('./models/StdInfo');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { uploadFile, getObjectSignedUrl } = require('./s3.js');

router.post('/submitdata/:studentId', upload.single('image'), async (req, res) => {
  const studentId = req.params.studentId;
  const file = req.file;

  if (!file) {
    return res.status(400).send('No image file provided');
  }

  const imageName = file.originalname; // Using original file name

  try {
    const fileBuffer = await sharp(file.buffer)
      .resize({ height: 1920, width: 1080, fit: 'contain' })
      .toBuffer();
    
    await uploadFile(fileBuffer, imageName, file.mimetype);

    // Find the student by ID
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).send('Student not found');
    }

    // Update the student's image name
    student.imageName = imageName;
    await student.save();

    res.status(200).send(student);
  } catch (error) {
    console.error('Error updating the image', error);
    res.status(500).send('Error updating the image');
  }
});

router.get('/getstudents/:studentId', async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).send('Student not found');
    }

    // Generate a signed URL for the student's image
    student.imageName = await getObjectSignedUrl(student.imageName);
    
    res.send(student);
  } catch (error) {
    console.error('Error fetching student', error);
    res.status(500).send('Error fetching student');
  }
});


module.exports = router
