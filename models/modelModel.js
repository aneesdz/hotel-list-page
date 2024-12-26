const pool = require('../db');

// Model for creating a new hotel
const createHotel = async (hotelData) => {
  const query = `
    INSERT INTO hotels (image, title, description, latitude, longitude, price)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  const values = [
    hotelData.image,
    hotelData.title,
    hotelData.description,
    hotelData.latitude,
    hotelData.longitude,
    hotelData.price,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Model for fetching hotel by ID
const getHotelById = async (id) => {
  const result = await pool.query('SELECT * FROM hotels WHERE id = $1', [id]);
  return result.rows[0];
};

// Model for updating a hotel
const updateHotel = async (id, hotelData) => {
  const query = `
    UPDATE hotels
    SET image = COALESCE($1, image),
        title = COALESCE($2, title),
        description = COALESCE($3, description),
        latitude = COALESCE($4, latitude),
        longitude = COALESCE($5, longitude),
        price = COALESCE($6, price)
    WHERE id = $7 RETURNING *`;
  const values = [
    hotelData.image,
    hotelData.title,
    hotelData.description,
    hotelData.latitude,
    hotelData.longitude,
    hotelData.price,
    id,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Model for deleting a hotel
const deleteHotel = async (id) => {
  await pool.query('DELETE FROM hotels WHERE id = $1', [id]);
};

// Model for fetching hotels with filters
const getHotels = async (filters) => {
  let query = 'SELECT * FROM hotels WHERE 1=1';
  const values = [];

  if (filters.title) {
    query += ' AND title ILIKE $' + (values.length + 1);
    values.push(`%${filters.title}%`);
  }
  if (filters.minPrice) {
    query += ' AND price >= $' + (values.length + 1);
    values.push(filters.minPrice);
  }
  if (filters.maxPrice) {
    query += ' AND price <= $' + (values.length + 1);
    values.push(filters.maxPrice);
  }
  query += ' LIMIT $' + (values.length + 1) + ' OFFSET $' + (values.length + 2);
  values.push(filters.limit || 10, filters.offset || 0);

  const result = await pool.query(query, values);
  return result.rows;
};

module.exports = {
  createHotel,
  getHotelById,
  updateHotel,
  deleteHotel,
  getHotels,
};
