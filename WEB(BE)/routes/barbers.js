const router = require('express').Router();

const Unit = require('../models/unit');
const Barbers = require('../models/barbers');

const fetchUser = require('../middleware/fetchUser');

router.get('/barbers', fetchUser, async (req, res) => {
  try {
    const user = req.user;

    const unit = await Unit.findOne({ soldier_id: user.soldier_id });
    // 추후 partnership 을 ObjectId로 변경?
    const barbers = await Barbers.find({ partnership: unit.unitName });

    return res.json({
      barbers: barbers.slice(0, req.query.limit),
    });
  } catch (e) {
    console.error('/babers - 에러!');
  }
});

router.get('/barbers/:id', async (req, res) => {
  try {
    const barber = await Barbers.findOne({ _id: req.params.id });

    return res.json(barber);
  } catch (e) {
    console.error('/babers/:id - 에러!');
  }
});

module.exports = router;
