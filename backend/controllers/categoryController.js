const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Category = require('../models/categoryModel');

// @desc    Get categories
// @route   GET /api/categories
// @access  Private
const getCategories = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401);
        throw new Error("User not found")
    }

    const categories = await Category.find({});

    res.status(200).json(categories);
});

// @desc    Get category
// @route   GET /api/categories/:id
// @access  Private
const getCategory = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const category = await Category.findById(req.params.id);

    if(!category) {
        res.status(404);
        throw new Error("Category not found");
    }

    res.status(200).json(category);
});

// @desc    Register a new category
// @route   POST /api/categories
// @access  Private
const registerCategory = asyncHandler(async (req, res) => {
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

    // Create category
    const category = await Category.create({
        name, 
        description
    });

    if(category) {
        res.status(201).json(category);
    } else {
        res.status(400);
        throw new Error('Invalid user data.');
    }
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private
const deleteCategory = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const catgory = await Category.findById(req.params.id);

    if(!catgory) {
        res.status(404);
        throw new Error("catgory not found");        
    }

    await catgory.remove();

    res.status(200).json({
        success: true,
        id: req.params.id
    });
});

// @desc    Update category
// @route   Put /api/categories/:id
// @access  Private
const updateCategory = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const category = await Category.findById(req.params.id);

    if(!category) {
        res.status(404);
        throw new Error("Category not found");        
    }

    const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
        );

    res.status(200).json(updatedCategory);
});

module.exports = { 
    getCategories,
    getCategory,
    registerCategory,
    deleteCategory, 
    updateCategory
};