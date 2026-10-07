// const mongoose = require('mongoose');
// const { readConnection, writeConnection } = require('../config/database');

// const bookSchema = new mongoose.Schema({
//     productCode: { type: String, required: true, unique: true },
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     finalPrice: { type: Number, required: true }
// }, { timestamps: true });

// const ReadBook = readConnection.model('Book', bookSchema, 'books');
// const WriteBook = writeConnection.model('Book', bookSchema, 'books');

// module.exports = { ReadBook, WriteBook };
const mongoose = require('mongoose');
const { readConnection, writeConnection } = require('../config/database');

const bookSchema = new mongoose.Schema({
    productCode: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    finalPrice: { type: Number, required: true }
}, { timestamps: true });

const ReadBook = readConnection.model('Book', bookSchema, 'books');
const WriteBook = writeConnection.model('Book', bookSchema, 'books');

module.exports = { ReadBook, WriteBook };