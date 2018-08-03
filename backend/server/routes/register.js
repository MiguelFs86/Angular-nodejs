const express = require('express');

const bcrypt = require('bcrypt');

const User = require('../models/user');
const app = express();


app.post('/register', (req, res) => {

    let body = req.body;

    User.findOne({ email: body.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            })
        }

        if (userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'There already exists an user with this email'
                }
            });
        }
    });

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    });

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }

        res.json({
            ok: true,
            user: userDB
        });
    });
});

module.exports = app;