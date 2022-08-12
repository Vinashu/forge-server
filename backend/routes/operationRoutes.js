const express = require('express');
const router = express.Router();
const { getOperations, getOperation, deleteOperation, registerOperation, updateOperation } = require('../controllers/operationController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, registerOperation);
router.get('/', protect, getOperations);

router.get('/:id', protect, getOperation);
router.delete('/:id', protect, deleteOperation);
router.put('/:id', protect, updateOperation);

module.exports = router;