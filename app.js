const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff')

const app = express();

mongoose.connect('mongodb://localhost:27017/go-fullstack',
    {userNewUrlParser: true,
    useUnifiedTopology:true })
    .then(() => console.log('Connexion réussie'))
    .catch(() => console.log('Connexion échouée'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/api/stuff', stuffRoutes);

module.exports = app;