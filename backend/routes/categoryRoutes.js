const express = require('express');
const router = express.Router();
const { getCategories, getCategory, deleteCategory, registerCategory, updateCategory } = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, registerCategory);
router.get('/', protect, getCategories);

router.get('/:id', protect, getCategory);
router.delete('/:id', protect, deleteCategory);
router.put('/:id', protect, updateCategory);

module.exports = router;