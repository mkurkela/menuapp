const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    dishes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dish'
    }]
});

module.exports = mongoose.model('Category', categorySchema);
