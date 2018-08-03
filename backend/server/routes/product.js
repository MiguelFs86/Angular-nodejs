const express = require('express');

let { checkToken } = require('../middlewares/authentication');
let app = express();
let Product = require('../models/product');


app.get('/products', checkToken, (req, res) => {

    let from = req.query.from || 0;
    from = Number(from);

    Product.find({ available: true })
        .skip(from)
        .limit(5)
        .populate('user', 'name email')
        .populate('category', 'description')
        .exec((err, product) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: err
                })
            }

            res.json({
                ok: true,
                product: product
            });
        });
});

app.get('/products/:id', checkToken, (req, res) => {

    let id = req.params.id;

    Product.findById(id)
        .populate('user', 'name email')
        .populate('category', 'description')
        .exec((err, productDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: err
                });
            }
            if (!productDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID does not exists'
                    }
                });
            }

            res.json({
                ok: true,
                product: productDB
            });
        });

});


app.get('/products/search/:term', checkToken, (req, res) => {
    let term = req.params.term;

    let regex = new RegExp(term, 'i');

    Product.find({ name: regex })
        .populate('category', 'description')
        .exec((err, products) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: err
                });
            }

            res.json({
                ok: true,
                products: products
            });
        });
});



app.post('/products', checkToken, (req, res) => {
    let body = req.body;

    let product = new Product({
        user: req.user._id,
        name: body.name,
        price: body.price,
        description: body.description,
        available: body.available,
        category: body.category
    });

    product.save((err, productDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!productDB) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.status(201).json({
            ok: true,
            product: productDB
        });
    });
});

app.put('/products/:id', checkToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Product.findById(id, (err, productDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            })
        }

        if (!productDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID does not exists'
                }
            });
        }

        productDB.name = body.name;
        productDB.price = body.price;
        productDB.category = body.category;
        productDB.available = body.available;
        productDB.description = body.description;

        productDB.save((err, savedProduct) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: err
                })
            }

            res.json({
                ok: true,
                product: savedProduct
            });
        });
    });
});

app.delete('/products/:id', checkToken, (req, res) => {

    let id = req.params.id;

    Product.findById(id, (err, productDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }
        if (!productDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID does not exists'
                }
            });
        }

        productDB.available = false;

        productDB.save((err, deletedProduct) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: err
                });
            }

            res.json({
                ok: true,
                product: deletedProduct,
                message: 'Product deleted'
            });
        });
    });
});


module.exports = app;