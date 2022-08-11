const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true        
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    }
}, {timestamps: true});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;