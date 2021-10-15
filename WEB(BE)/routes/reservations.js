const router = require('express').Router();
const moment = require('moment');
const mongoose = require('mongoose');

const User = require('../models/user');
const Reservation = require('../models/reservation');

const fetchUser = require('../middleware/fetchUser');
const reservation = require('../models/reservation');

router.get('/barbers/:id/reservations/:year/:month', async (req, res) => {
  try {
    const year = req.params.year;
    const month = req.params.month;

    const startDate = moment({
      y: year,
      m: month - 1,
      d: 1,
    });
    const endDate = moment(startDate).endTo('month');

    const reservations = await Reservation.find({
      barber: mongoose.Types.ObjectId(req.params.id),
      time: {
        $gte: startDate.toDate(),
        $lt: endDate.toDate(),
      },
    }).sort({ time: 'desc' });

    return res.json({
      reservations: reservations,
    });
    /*
    const list = [];
    const time = moment(reservations);
    for (i = 0; i < list.length; i++) {
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
    */
  } catch (e) {
    console.error(`[${req.method}] ${req.path} - 에러!`, e);
  }
});

router.post('/barbers/:id/reservations', fetchUser, async (req, res) => {
  const user = req.user;

  try {
    const created = await Reservation.create({
      barber: mongoose.Types.ObjectId(req.params.id),
      user: mongoose.Types.ObjectId(user._id),
      time: new Date(req.body.time),
      description: req.body.description,
    });

    return res.json({
      mss: '추가',
    });
  } catch (e) {
    console.error(`[${req.method}] ${req.path} - 에러!`, e);
  }
});

router.get('/reservations', fetchUser, async (req, res) => {
  const user = req.user;

  try {
    const reservations = await Reservation.find({ user_id: user._id })
      .populate('barber')
      .populate('user')
      .sort({ time: 'desc' });

    return res.json({
      reservations: reservations,
    });
  } catch (e) {
    console.error(`[${req.method}] ${req.path} - 에러!`, e);
  }
});

module.exports = router;
