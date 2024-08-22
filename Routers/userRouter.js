// routes/analyticsRouter.js
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

router.post('/delete', userController.deleteUser);
router.put('/update', userController.updateUserById);

router.post('/create', userController.postCreateUser);

router.post('/login' , userController.postUserLogin);

module.exports = router;
