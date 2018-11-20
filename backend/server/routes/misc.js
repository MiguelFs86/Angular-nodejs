const express = require('express');

let { checkToken } = require('../middlewares/authentication');
let app = express();

// Mostrar todas las categorías
app.get('/test', checkToken, (req, res) => {
    res.json({
        ok: true,
        data: 'Test'
    });
});


module.exports = app;