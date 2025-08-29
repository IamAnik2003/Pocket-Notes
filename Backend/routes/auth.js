
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../DB/User.model.js');
const {setUser,getUser, allUsers}=require('../controllers/auth.controller.js');


router.get('/', allUsers);

router.post('/auth/register',setUser);
router.post('/auth/login',getUser);



module.exports = router;
