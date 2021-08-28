const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authorization');
const controller = require('../controllers/c_getData');

router.get('/listData', auth.verify, controller.listData);
router.get('/detailData/:id', auth.verify, controller.detailData);

module.exports = router;