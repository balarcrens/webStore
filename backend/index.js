const connectMongo = require('./db.js');
const express = require('express');
const cors = require('cors');

const app = express();

const host = process.env.REACT_APP_HOST;

connectMongo();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.use('/api/product', require('./routes/product'));

app.listen(7000, host)