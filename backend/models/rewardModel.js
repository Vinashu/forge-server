const mongoose = require('mongoose');

const rewardSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    description: {
        type: String,
    },
    imagePath: {
        type: String,
    },
    category: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }
    ]   
}, {timestamps: true});

const Reward = mongoose.model('Reward', rewardSchema);

module.exports = Reward;