const express = require('express');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const User = require('../models/user');
const app = express();

app.post('/login', (req, res) => {

    let email;
    let password;

    if (req.body.credentials) {
        email = req.body.credentials.email;
        password = req.body.credentials.password;
    } else {
        return res.status(500).json({
            ok: false,
            err: 'No user/password were provided'
        });
    }

    User.findOne({ email: email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            })
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User/password wrong'
                }
            });
        }

        if (!bcrypt.compareSync(password, userDB.password) && (userDB.password !== password)) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User/password wrong 2'
                }
            });
        }

        let token = jwt.sign({
            user: userDB
        }, process.env.SEED, { expiresIn: process.env.TOKEN_EXPIRATION })

        res.json({
            ok: true,
            user: userDB,
            token: token
        });
    });
});

module.exports = app;