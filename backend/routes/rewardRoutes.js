const express = require('express');
const router = express.Router();
const { getRewards, getReward, deleteReward, registerReward, updateReward } = require('../controllers/rewardController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, registerReward);
router.get('/', protect, getRewards);

router.get('/:id', protect, getReward);
router.delete('/:id', protect, deleteReward);
router.put('/:id', protect, updateReward);

module.exports = router;