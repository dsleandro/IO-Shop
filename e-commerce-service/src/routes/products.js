const express = require("express");
const Router = express.Router();
const Product = require("../models/Product");
const verifyToken = require("../config/verifyToken");

function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

Router.get("/", async (req, res) => {
        const products = await Product.find();
        res.json(products);
});
Router.get("/search", async (req, res) => {
        if (req.query.search) {
                const regex = new RegExp(escapeRegex(req.query.search), 'gi');
                Product.find({ "title": regex }, function (err, foundProducts) {
                        if (err) {
                                console.log(err);
                        } else {
                                res.json({ products: foundProducts });
                        }
                });
        }
});


Router.get("/products/:id", async (req, res) => {
        const products = await Product.findById(req.params.id);
        res.json(products);
})

Router.put("/products/:id", async (req, res) => {

        products = await Product.findById(req.params.id);
        /* const coment = Object.keys(req.body); */
        products.coments.push(req.body);
        await Product.findByIdAndUpdate(req.params.id, { coments: products.coments });
        res.json({ message: "Coment saved succesfuly" });
})

Router.post("/sell", async (req, res) => {

        const images = req.files.map(file => "imgs/uploads/" + file.filename);
        const { title, description, category, price, user } = req.body;

        const newProduct = new Product({
                title,
                description,
                images,
                category,
                price,
                user,
        });
        newProduct.save();
        res.redirect("http://localhost:3000/products/" + newProduct._id);
});

module.exports = Router;
