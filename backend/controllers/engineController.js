const asyncHandler = require('express-async-handler');
const Reward = require('../models/rewardModel');
const Target = require('../models/targetModel');
const Variable = require('../models/variableModel');
const Engine = require('../classes/engine');

// @desc    Get rewards
// @route   GET /api/engine
// @access  Public
const getRewards = asyncHandler(async (req, res) => {
    const rewards = await Reward.find({}, "-description -createdAt -updatedAt -__v");
    res.status(200).json(rewards);
});

// @desc    Get rewards
// @route   GET /api/engine/object
// @access  Public
const getRewardsObject = asyncHandler(async (req, res) => {
    const rewards = await Reward.find({}, "-description -createdAt -updatedAt -__v");
    res.status(200).json({'rewards': rewards});
});

// @desc    Get reward
// @route   GET /api/engine/:id
// @access  Public
const getReward = asyncHandler(async (req, res) => {
    const reward = await Reward.findById(req.params.id);

    if(!reward) {
        res.status(404);
        throw new Error("Reward not found");
    }

    res.status(200).json(reward);
});

// @desc    Check for rewards
// @route   Post /api/engine
// @access  Public
const checkReward = asyncHandler(async (req, res) => {
    const messages = req.body;
    if(messages) {
        // Get the rewards list
        const rewards = await Reward.find({}).populate('category');
        // Get the targets list
        const targets = await Target.find({}).populate('variable operation reward');
        // Get the variables list
        const variables = await Variable.find({});
        // Create an engine instance
        const engine = new Engine({targets, rewards, variables});
        // Run the engine and check for rewards
        const results =  engine.checkRewards(messages);
        // Clean the results and keep only the rewards id
        const result = results.map((result) => {
            return result._id;
        })
        res.json(result);
        // res.json({'rewards': engine.checkRewards(messages)});
    } else {
        res.status(500).send('Missing messages body!')
    }
});

// @desc    Check for rewards
// @route   Post /api/engine/object
// @access  Public
const checkRewardObject = asyncHandler(async (req, res) => {
    const messages = req.body;
    if(messages) {
        // Get the rewards list
        const rewards = await Reward.find({}).populate('category');
        // Get the targets list
        const targets = await Target.find({}).populate('variable operation reward');
        // Get the variables list
        const variables = await Variable.find({});
        // Create an engine instance
        const engine = new Engine({targets, rewards, variables});
        // Run the engine and check for rewards
        const results =  engine.checkRewards(messages.messages);
        // Clean the results and keep only the rewards id
        res.json({'rewards': results});
        // res.json({'rewards': engine.checkRewards(messages)});
    } else {
        res.status(500).send('Missing messages body!')
    }
});

// @desc    Get targets
// @route   GET /api/engine/targets
// @access  Public
const getTargets = asyncHandler(async (req, res) => {
    const targets = await Target.find({}, {_id: 1, name: 1, description: 1});
    res.status(200).json(targets);
});

// @desc    Get targets
// @route   GET /api/engine/targets/object
// @access  Public
const getTargetsObject = asyncHandler(async (req, res) => {
    const targets = await Target.find({}, {_id: 1, name: 1, description: 1});
    res.status(200).json({targets: targets});
});

module.exports = {
    checkReward,  
    getRewards,
    getTargets,
    checkRewardObject,
    getRewardsObject,
    getTargetsObject,
    getReward
}