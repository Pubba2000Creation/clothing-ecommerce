const express = require('express');
const router = express.Router();
const {
    getUserAnalytics,
    getOverallStats
} = require('../controller/analytics.controller');

// Optional: Add admin protection middleware here if needed
// const { protect, admin } = require('../middleware/auth.middleware');

router.get('/users', getUserAnalytics);
router.get('/overall', getOverallStats);

module.exports = router;
