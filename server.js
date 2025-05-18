const express = require('express');
const cors = require('cors');
require('dotenv').config();

const convertRoute = require('./routes/convert');

const app = express();
app.use(cors());
app.use('/api/convert', convertRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
