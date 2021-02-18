const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    title: { type: String, required: true, trim: true, maxlength: 145, minlength: 5},
    description: {type: String, required: true},
    images: [String],
    category: {type: String, required: true},
    stars: {type: Number, required: true, default: 0},
    price: {type: Number, required: true},
    user: {type: String},
    date: {type: Date, required: true, default: Date.now},
    coments: [Object],
});

module.exports = model("Product",productSchema);