const router = require('express').Router();

const Unit = require('../models/unit');
const Barbers = require('../models/barbers');

router.get('/barbers', (req, res) => {
  var unitName;
  Unit.findOne({ token: req.headers.authorization }, (err, unit) => {
    Barbers.find({ partnership: unit.unitName }, (err, barbers) => {
      return res.json({
        barbers: barbers.slice(0, req.query.limit),
      });
    });
  });
});

router.get('/barbers/:id', (req, res) => {
  Barbers.findOne({ _id: req.params.id }, (err, barbers) => {
    return res.json({
      id: barbers._id,
      title: barbers.title,
      location: barbers.location,
      location_detail: barbers.location_detail,
      rating: barbers.rating,
      bookmarked: barbers.bookmarked,
      phone: barbers.phone,
      thumb: barbers.thumb,
      description: barbers.description,
    });
  });
});

module.exports = router;
