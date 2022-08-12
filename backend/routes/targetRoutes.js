const express = require('express');
const router = express.Router();
const { getTargets, getTarget, deleteTarget, registerTarget, updateTarget } = require('../controllers/targetController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, registerTarget);
router.get('/', protect, getTargets);

router.get('/:id', protect, getTarget);
router.delete('/:id', protect, deleteTarget);
router.put('/:id', protect, updateTarget);

module.exports = router;