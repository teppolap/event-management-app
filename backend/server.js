require('dotenv').config({ path: '../.env' });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
});

app.use('/api/events', eventRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
