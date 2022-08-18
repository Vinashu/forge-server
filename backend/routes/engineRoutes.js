const express = require('express');
const router = express.Router();
const { checkReward, getRewards, checkRewardObject, getRewardsObject, getReward } = require('../controllers/engineController');

router.post('/', checkReward);
router.get('/', getRewards);

router.post('/object', checkRewardObject);
router.get('/object', getRewardsObject);

router.get('/:id', getReward);

module.exports = router;