const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Target = require('../models/targetModel');

// @desc    Get targets
// @route   GET /api/targets
// @access  Private
const getTargets = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401);
        throw new Error("User not found")
    }

    const targets = await Target.find({});

    res.status(200).json(targets);
});

// @desc    Get target
// @route   GET /api/targets/:id
// @access  Private
const getTarget = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const target = await Target.findById(req.params.id);

    if(!target) {
        res.status(404);
        throw new Error("Target not found");
    }

    res.status(200).json(target);
});

// @desc    Register a new target
// @route   POST /api/targets
// @access  Private
const registerTarget = asyncHandler(async (req, res) => {
    const { 
        name, 
        description,
        variable,
        operation,
        reward,
        value 
    } = req.body;

    // Validation
    if(!name || !description || !variable || 
       !operation || !reward || !value) {
        res.status(400);
        throw new Error('Please, include all fields.');
    }

    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401);
        throw new Error("User not found")
    }

    // Create target
    const target = await Target.create({
        name, 
        description,
        variable,
        operation,
        reward,
        value
    });

    if(target) {
        res.status(201).json(target);
    } else {
        res.status(400);
        throw new Error('Invalid user data.');
    }
});

// @desc    Delete target
// @route   DELETE /api/targets/:id
// @access  Private
const deleteTarget = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const target = await Target.findById(req.params.id);

    if(!target) {
        res.status(404);
        throw new Error("Target not found");        
    }

    await target.remove();

    res.status(200).json({
        success: true,
        id: req.params.id
    });
});

// @desc    Update target
// @route   Put /api/targets/:id
// @access  Private
const updateTarget = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const target = await Target.findById(req.params.id);

    if(!target) {
        res.status(404);
        throw new Error("Target not found");        
    }

    const updatedTarget = await Target.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
        );

    res.status(200).json(updatedTarget);
});

module.exports = { 
    getTargets, 
    getTarget, 
    registerTarget, 
    deleteTarget, 
    updateTarget
};