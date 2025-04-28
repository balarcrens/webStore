const connectMongo = require('./db.js');
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 7000;
const app = express();

connectMongo();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.use('/api/product', require('./routes/product'));

app.listen(port)