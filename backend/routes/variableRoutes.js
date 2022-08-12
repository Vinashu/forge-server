const express = require('express');
const router = express.Router();
const { getVariables, getVariable, deleteVariable, registerVariable, updateVariable } = require('../controllers/variableController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, registerVariable);
router.get('/', protect, getVariables);

router.get('/:id', protect, getVariable);
router.delete('/:id', protect, deleteVariable);
router.put('/:id', protect, updateVariable);

module.exports = router;