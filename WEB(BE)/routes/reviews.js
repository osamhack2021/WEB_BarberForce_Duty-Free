const router = require('express').Router();

const User = require('../models/user');
const Review = require('../models/review');

router.get('/barbers/:id/reviews', (req, res) => {
  Review.find({ barbers_id: req.params.id }, (err, review) => {
    return res.json({
      reviews: review,
    });
  });
});

router.post('/barbers/:id/reviews', (req, res) => {
  var today = new Date();
  User.findOne({ token: req.headers.authorization.split(' ')[1] }, (err, user) => {
    Review.insertMany({
      barbers_id: req.params.id,
      thumb: '',
      reviewer: user.name,
      body: req.body.body,
      rating: req.body.rating,
      createdAt: today,
    });
    return res.json({
      mss: '추가',
    });
  });
});

module.exports = router;
