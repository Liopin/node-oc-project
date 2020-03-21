const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const Thing = require('./models/things');

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

app.post('/api/stuff', (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});  

app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id },{ ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message : 'objet modifié'}))
    .catch(error => res.status(400).json({ error }));
});
 
app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({ message : 'objet delete' }))
  .catch(error => res.status(400).json({ error }));
});

app.use('/api/stuff', (req, res, next) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
  });
module.exports = app;