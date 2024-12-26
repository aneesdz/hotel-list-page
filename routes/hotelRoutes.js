const express = require('express');
const multer = require('multer');
const hotelController = require('../controllers/hotelController');

const router = express.Router();

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
});
const upload = multer({ storage });

// Routes
router.post('/api/hotels', upload.single('image'), hotelController.createHotel);
router.put('/api/hotels/:id', upload.single('image'), hotelController.updateHotel);
router.delete('/api/hotels/:id', hotelController.deleteHotel);
router.get('/api/hotels', hotelController.getHotels);

module.exports = router;
