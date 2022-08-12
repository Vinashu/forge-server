const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Reward = require('../models/rewardModel');

// @desc    Get rewards
// @route   GET /api/rewards
// @access  Private
const getRewards = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401);
        throw new Error("User not found")
    }

    const rewards = await Reward.find({});

    res.status(200).json(rewards);
});

// @desc    Get reward
// @route   GET /api/rewards/:id
// @access  Private
const getReward = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const reward = await Reward.findById(req.params.id);

    if(!reward) {
        res.status(404);
        throw new Error("Reward not found");
    }

    res.status(200).json(reward);
});

// @desc    Register a new reward
// @route   POST /api/rewards
// @access  Private
const registerReward = asyncHandler(async (req, res) => {
    const { name, description, imagePath, category } = req.body;

    // Validation
    if(!name) {
        res.status(400);
        throw new Error('Please, include all fields.');
    }

    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401);
        throw new Error("User not found")
    }

    // Create operation
    const reward = await Reward.create({
        name, 
        description,
        imagePath,
        category
    });

    if(reward) {
        res.status(201).json(reward);
    } else {
        res.status(400);
        throw new Error('Invalid user data.');
    }
});

// @desc    Delete reward
// @route   DELETE /api/rewards/:id
// @access  Private
const deleteReward = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const reward = await Reward.findById(req.params.id);

    if(!reward) {
        res.status(404);
        throw new Error("Reward not found");        
    }

    await reward.remove();

    res.status(200).json({
        success: true,
        id: req.params.id
    });
});

// @desc    Update reward
// @route   Put /api/rewards/:id
// @access  Private
const updateReward = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const reward = await Reward.findById(req.params.id);

    if(!reward) {
        res.status(404);
        throw new Error("Reward not found");        
    }

    const updatedReward = await Reward.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
        );

    res.status(200).json(updatedReward);
});

module.exports = { 
    getRewards, 
    getReward, 
    registerReward, 
    deleteReward, 
    updateReward
};
