const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');

const User = require('../models/User');

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get('/',  (req, res) => {
  User.find({name:"ayyappa"}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
 
});


  



// @route     POST api/auth
// @desc      Auth user & get token
// @access    Public
router.post(
  '/',
  [ check("name","please enter a name").not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty()
  ],
   async (req, res) => {
    const errors = validationResult(req);
    console.log("hi");
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
  
    const {name,email, password} = req.body;
    console.log(email);
  try {
    console.log(email)
      let user =await User.findOne({email});
       console.log(user)
      
      if(user){
          return res.status(400).json({msg:"User already exists"})
      }
      user = new User({
          name,email,password
      })
      console.log(user)
      const salt =await bcrypt.genSalt(10);
      console.log(salt);
      user.password =await bcrypt.hash(password,salt);
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({token});
        },
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

module.exports = router;