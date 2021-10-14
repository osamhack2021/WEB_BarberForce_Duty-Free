const router = require('express').Router();
const moment = require('moment');

const User = require('../models/user');
const Reservation = require('../models/reservation');

router.get('/barbers/:id/reservations/:year/:month', (req, res) => {
  Reservation.find(
    { barbers_id: req.params.id, year: req.params.year, month: req.params.month },
    (err, reservation) => {
      var list = new Array(31);
      for (i = 0; i < list.length; i++) {
        var date = new Date(year, month - 1, i + 1);
        var time = new Array();
        list[i] = {
          day: i + 1,
          time: { '18:00': false, '18:30': false, '19:00': false, '19:30': false, '20:00': false, '20:30': false },
        };
      }
      for (i = 0; i < reservation.length; i++) {
        var time =
          moment(new Date(reservation[i].time)).format('HH') + ':' + moment(new Date(reservation[i].time)).format('mm');
        list[reservation[i].day - 1].time[time] = true;
      }

      return res.json({
        reservations: list,
      });
    }
  );
});

router.post('/barbers/:id/reservations', (req, res) => {
  //var time =
  User.findOne({ token: req.headers.authorization.split(' ')[1] }, (err, user) => {
    Reservation.insertMany({
      year: req.body.year,
      month: req.body.month,
      day: req.body.day,
      time: req.body.time,
      barbers_id: req.params.id,
      user_id: user._id,
      userName: user.name,
      description: req.body.description,
    });
    return res.json({
      mss: '추가',
    });
  });
});

router.get('/reservations', (req, res) => {
  User.findOne({ token: req.headers.authorization.split(' ')[1] }, (err, user) => {
    Reservation.find({ user_id: user._id }, (err, reservation) => {
      return res.json({
        reservations: reservation.sort(reservation.time),
      });
    });
  });
});

module.exports = router;
