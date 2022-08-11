const mongoose = require('mongoose');

const variableSchema = mongoose.Schema({
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

const Variable = mongoose.model('Variable', variableSchema);

module.exports = Variable;