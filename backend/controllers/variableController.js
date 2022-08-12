const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Variable = require('../models/variableModel');

// @desc    Get variables
// @route   GET /api/variables
// @access  Private
const getVariables = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401);
        throw new Error("User not found")
    }

    const variables = await Variable.find({});

    res.status(200).json(variables);
});

// @desc    Get variable
// @route   GET /api/variables/:id
// @access  Private
const getVariable = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const variable = await Variable.findById(req.params.id);

    if(!variable) {
        res.status(404);
        throw new Error("Variable not found");
    }

    res.status(200).json(variable);
});

// @desc    Register a new variable
// @route   POST /api/variables
// @access  Private
const registerVariable = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    // Validation
    if(!name || !description) {
        res.status(400);
        throw new Error('Please, include all fields.');
    }

    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401);
        throw new Error("User not found")
    }

    // Create variable
    const variable = await Variable.create({
        name, 
        description
    });

    if(variable) {
        res.status(201).json(variable);
    } else {
        res.status(400);
        throw new Error('Invalid user data.');
    }
});

// @desc    Delete variable
// @route   DELETE /api/variables/:id
// @access  Private
const deleteVariable = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const variable = await Variable.findById(req.params.id);

    if(!variable) {
        res.status(404);
        throw new Error("Variable not found");        
    }

    await variable.remove();

    res.status(200).json({
        success: true,
        id: req.params.id
    });
});

// @desc    Update variable
// @route   Put /api/variables/:id
// @access  Private
const updateVariable = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const variable = await Variable.findById(req.params.id);

    if(!variable) {
        res.status(404);
        throw new Error("Variable not found");        
    }

    const updatedVariable = await Variable.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
        );

    res.status(200).json(updatedVariable);
});

module.exports = { 
    getVariables, 
    getVariable, 
    registerVariable, 
    deleteVariable, 
    updateVariable
};
