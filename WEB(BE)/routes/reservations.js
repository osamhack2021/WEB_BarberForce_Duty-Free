const router = require('express').Router();
const moment = require('moment');

const Reservation = require('../models/reservation');

const fetchUser = require('../middleware/fetchUser');

router.get('/barbers/:id/reservations/:year/:month', async (req, res) => {
  try {
    const year = req.params.year;
    const month = req.params.month;

    const startDate = moment({
      year: year,
      month: month - 1,
      date: 1,
    });
    const endDate = moment({
      year: year,
      month: month,
      date: 1,
    });

    const reservations = await Reservation.find({
      barber: req.params.id,
      time: {
        $gte: startDate.toDate(),
        $lt: endDate.toDate(),
      },
    }).sort({ time: 'desc' });

    return res.json({
      reservations: reservations,
    });
  } catch (e) {
    console.error(`[${req.method}] ${req.path} - 에러!`, e);
    return res.status(500).json({
      error: e,
      errorString: e.toString(),
    });
  }
});

router.post('/barbers/:id/reservations', fetchUser, async (req, res) => {
  const user = req.user;

  try {
    await Reservation.create({
      barber: req.params.id,
      user: user._id,
      time: new Date(req.body.time),
      description: req.body.description,
    });

    return res.json({
      mss: '추가',
    });
  } catch (e) {
    console.error(`[${req.method}] ${req.path} - 에러!`, e);
    return res.status(500).json({
      error: e,
      errorString: e.toString(),
    });
  }
});

router.get('/reservations', fetchUser, async (req, res) => {
  const user = req.user;

  try {
    const reservations = await Reservation.find({ user: user._id })
      .populate('barber')
      .populate('user')
      .sort({ time: 'asc' });

    return res.json({
      reservations: reservations,
    });
  } catch (e) {
    console.error(`[${req.method}] ${req.path} - 에러!`, e);
    return res.status(500).json({
      error: e,
      errorString: e.toString(),
    });
  }
});

router.post('/reservations/:id/done', fetchUser, async (req, res) => {
  const user = req.user;

  try {
    const reservation = await Reservation.find({ user: user._id });

    await reservation.update({ $set: { done: true } });

    return res.json({});
  } catch (e) {
    console.error(`[${req.method}] ${req.path} - 에러!`, e);
    return res.status(500).json({
      error: e,
      errorString: e.toString(),
    });
  }
});

module.exports = router;
