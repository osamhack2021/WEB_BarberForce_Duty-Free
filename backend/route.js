const express = require('express');
const router = express.Router();
const User = require('./user.js');
router.get('/', (req, res) => {
  res.render('main');
});
router.get('/about', (req, res) => {
  res.render('about');
});
router.get('/:name', (req, res) => {
  User.find({ name: req.params.name }, (err, user) => {
    res.render('main', { user: user } );
  });
});
module.exports = router;
