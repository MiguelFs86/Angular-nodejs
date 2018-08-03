const express = require('express');

let { checkToken, checkAdminRole } = require('../middlewares/authentication');
let app = express();
let Category = require('../models/category');

// Mostrar todas las categorías
app.get('/category', checkToken, (req, res) => {
    Category.find({})
        .sort('description')
        .populate('user', 'name email')
        .exec((err, categories) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: err
                });
            }

            res.json({
                ok: true,
                categories: categories
            });
        });
});


// Mostrar una categoría por ID
app.get('/category/:id', checkToken, (req, res) => {
    let id = req.params.id;
    Category.findById(id, (err, categoryDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!categoryDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'ID is not correct'
                }
            });
        }

        res.json({
            ok: true,
            category: categoryDB
        });
    });
});


// Crear nueva categoría
app.post('/category', checkToken, (req, res) => {
    let body = req.body;

    let category = new Category({
        description: body.description,
        user: req.user._id
    })

    category.save((err, categoryDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.json({
            ok: true,
            category: categoryDB
        });
    });
});


// Modificar categoría
app.put('/category/:id', checkToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descCategory = {
        description: body.description
    }

    Category.findByIdAndUpdate(id, descCategory, { new: true, runValidators: true }, (err, categoryDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.json({
            ok: true,
            category: categoryDB
        });
    });
});


// Eliminar categoría
app.delete('/category/:id', [checkToken, checkAdminRole], (req, res) => {
    let id = req.params.id;

    Category.findByIdAndRemove(id, (err, categoryDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID does not exists'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Category deleted'
        });
    });
});


module.exports = app;