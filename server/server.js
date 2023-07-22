const express = require('express');
const app = express();
const pool = require('./db');



app.listen(5000, () => console.log('Server is listening on port 5000'));