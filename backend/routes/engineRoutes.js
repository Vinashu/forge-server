const express = require('express');
const router = express.Router();
const { checkReward, getRewards, getTargets, checkRewardObject, getRewardsObject, getTargetsObject, getReward } = require('../controllers/engineController');

router.post('/', checkReward);
router.get('/', getRewards);

router.post('/object', checkRewardObject);
router.get('/object', getRewardsObject);

router.get('/targets', getTargets);
router.get('/targets/object', getTargetsObject);

router.get('/:id', getReward);

module.exports = router;