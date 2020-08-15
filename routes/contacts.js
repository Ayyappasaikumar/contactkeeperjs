const express = require('express');
const router = express.Router();

const {check, validationResult} = require('express-validator');


// @route     GET api/contacts
// @desc      Get all users contacts
// @access    Private
router.get('/',  async (req, res) => {
      res.send("get a contact")
});

// @route     POST api/contacts
// @desc      Add new contact
// @access    Private
router.post( '/', async (req, res) => {res.send("post a contact")}
   
);



module.exports = router;