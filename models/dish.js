const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dishSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    belongs: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }

});

module.exports = mongoose.model('Dish', dishSchema);
