const express = require('express');
const fs = require('fs');

const path = require('path');

let { checkTokenImg } = require('../middlewares/authentication');

const User = require('../models/user');
const Product = require('../models/product');

let app = express();


app.get('/image/:type/:img', checkTokenImg, (req, res) => {
    let type = req.params.type;
    let img = req.params.img;

    let pathImagen = path.resolve(__dirname, `../../uploads/${ type }/${ img }`);
    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        let noImagePath = path.resolve(__dirname, '../assets/no-image.jpg')
        res.sendFile(noImagePath);
    }
})


module.exports = app;