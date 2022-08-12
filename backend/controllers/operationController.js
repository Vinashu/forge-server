const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Operation = require('../models/operationModel');

// @desc    Get operations
// @route   GET /api/operations
// @access  Private
const getOperations = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401);
        throw new Error("User not found")
    }

    const operations = await Operation.find({});

    res.status(200).json(operations);
});

// @desc    Get operation
// @route   GET /api/operations/:id
// @access  Private
const getOperation = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const operations = await Operation.findById(req.params.id);

    if(!operations) {
        res.status(404);
        throw new Error("Operation not found");
    }

    res.status(200).json(operations);
});

// @desc    Register a new operation
// @route   POST /api/operations
// @access  Private
const registerOperation = asyncHandler(async (req, res) => {
    const { name, description, symbol } = req.body;

    // Validation
    if(!name || !description || !symbol) {
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
    const operation = await Operation.create({
        name, 
        description,
        symbol
    });

    if(operation) {
        res.status(201).json(operation);
    } else {
        res.status(400);
        throw new Error('Invalid user data.');
    }
});

// @desc    Delete operation
// @route   DELETE /api/operations/:id
// @access  Private
const deleteOperation = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const operation = await Operation.findById(req.params.id);

    if(!operation) {
        res.status(404);
        throw new Error("Operation not found");        
    }

    await operation.remove();

    res.status(200).json({
        success: true,
        id: req.params.id
    });
});

// @desc    Update operation
// @route   Put /api/operations/:id
// @access  Private
const updateOperation = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const operation = await Operation.findById(req.params.id);

    if(!operation) {
        res.status(404);
        throw new Error("Operation not found");        
    }

    const updatedOperation = await Operation.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
        );

    res.status(200).json(updatedOperation);
});

module.exports = { 
    getOperations, 
    getOperation, 
    registerOperation, 
    deleteOperation, 
    updateOperation
};
