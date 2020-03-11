const expres = require('express');

const app = expres();

app.use((req, res, next) => {
    console.log('Requete reçue !');
    next();
});

app.use((requ, res, next) =>{
    res.status(201);
    next();
})

app.use((req, res, next) => {
    res.json({ message: 'Ok' });
    next()
});

app.use((req, res, next) =>{
    console.log('réponse envoyée');
});

module.exports = app;