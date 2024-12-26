const express = require('express');
const bodyParser = require('body-parser');
const hotelRoutes = require('./routes/hotelRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Use hotel routes
app.use(hotelRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
