const fs = require('fs');
const path = require('path');
const hotelModel = require('../models/modelModel');

// Controller for creating a new hotel
const createHotel = async (req, res) => {
  const { title, description, latitude, longitude, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !price) {
    return res.status(400).json({ error: 'Title and price are required' });
  }

  try {
    const hotel = await hotelModel.createHotel({
      title,
      description,
      latitude,
      longitude,
      price,
      image,
    });
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for updating a hotel
const updateHotel = async (req, res) => {
  const { id } = req.params;
  const { title, description, latitude, longitude, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const currentHotel = await hotelModel.getHotelById(id);
    if (!currentHotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    if (image && currentHotel.image) {
      fs.unlinkSync(`.${currentHotel.image}`);
    }

    const updatedHotel = await hotelModel.updateHotel(id, {
      title,
      description,
      latitude,
      longitude,
      price,
      image,
    });

    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for deleting a hotel
const deleteHotel = async (req, res) => {
  const { id } = req.params;

  try {
    const currentHotel = await hotelModel.getHotelById(id);
    if (!currentHotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    if (currentHotel.image) {
      fs.unlinkSync(`.${currentHotel.image}`);
    }

    await hotelModel.deleteHotel(id);
    res.status(200).json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for fetching hotels
const getHotels = async (req, res) => {
  const { title, minPrice, maxPrice, offset, limit } = req.query;

  try {
    const hotels = await hotelModel.getHotels({ title, minPrice, maxPrice, offset, limit });
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotels,
};
