const express = require('express');
const router = express.Router();

const {updateNotes,getNotes} = require('../controllers/chat.controller.js');

router.put("/notes", updateNotes);
router.get("/notes", getNotes);



module.exports = router;


