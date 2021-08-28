const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authorization');
const controller = require('../controllers/c_login');

router.post('/login', auth.checkAuth, controller.login);

module.exports = router;