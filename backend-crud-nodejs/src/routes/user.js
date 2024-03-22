const express = require('express');
const router = express.Router();
const { userSignUp, userDetails, updateUser, deleteUser, getUserById } = require('../controllers/user');


router.post('/signup', userSignUp);
router.get('/userDetails', userDetails);
router.put('/update/:userId', updateUser);
router.delete('/delete/:userId', deleteUser);
router.get('/getUserById/:userId', getUserById);

module.exports = router