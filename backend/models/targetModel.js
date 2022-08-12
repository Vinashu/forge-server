const mongoose = require('mongoose');

const targetSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true        
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    variable: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variable',
        required: [true, 'Please choose a variable']        
    },
    operation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Operation',
        required: [true, 'Please choose an operation']
    },
    reward: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reward',
        required: [true, 'Please choose a reward']
    },
    value: {
        type: String,
        required: [true, 'Please add a value']
    }
}, {timestamps: true});

const Target = mongoose.model('Target', targetSchema);

module.exports = Target;