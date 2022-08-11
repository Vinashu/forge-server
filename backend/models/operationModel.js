const mongoose = require('mongoose');

const operationSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true        
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    symbol: {
        type: String,
        required: [true, 'Please add a symbol']
    }    
}, {timestamps: true});

const Operation = mongoose.model('Operation', operationSchema);

module.exports = Operation;