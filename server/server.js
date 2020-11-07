const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.Port || 8080;

app.use(cors());
app.use(express.json());

const uri = process.env.ORGANELLE_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('db connected');
})

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);

app.listen(port, () => {
    console.log('Server listening on port:', port);
});