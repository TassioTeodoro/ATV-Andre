const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');

router.get('/users', userController.listUsers);
router.get('/register', userController.showRegister);
router.post('/register', userController.registerUser);

module.exports = router;
