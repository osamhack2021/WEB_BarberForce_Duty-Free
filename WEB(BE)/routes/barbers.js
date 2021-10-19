const router = require('express').Router();

const Unit = require('../models/unit');
const Barber = require('../models/barber');

const fetchUser = require('../middleware/fetchUser');

// 우리 부대 제휴미용실 목록
// (async/await)
router.get('/barbers', fetchUser, async (req, res) => {
  try {
    const user = req.user;

    const unit = await Unit.findOne({ soldier_id: user.soldier_id });
    // 추후 partnership 을 ObjectId로 변경?
    //-> 바꾸는게 맞는듯 res에만 populate로 바꿔주
    const barbers = await Barber.find({ partnership: unit.unitName });

    return res.json({
      barbers: barbers.slice(0, req.query.limit),
    });
  } catch (e) {
    console.error(`[${req.method}] ${req.path} - 에러!`, e);
    return res.status(500).json({
      error: e,
      errorString: e.toString(),
    });
  }
});

// 미용실 세부페이지
// (async/await)
router.get('/barbers/:id', async (req, res) => {
  try {
    const barber = await Barber.findOne({ _id: req.params.id });

    return res.json(barber);
  } catch (e) {
    console.error(`[${req.method}] ${req.path} - 에러!`, e);
    return res.status(500).json({
      error: e,
      errorString: e.toString(),
    });
  }
});

// 미용실 세부페이지
// (async/await)
router.get('/barbers/:id/update', async (req, res) => {
  try {
    const barber = await Barber.findOne({ _id: req.params.id });

    await barber.update({
      $set:{
        thumb: req.body.thumb
      }
    })

    return res.json(barber);
  } catch (e) {
    console.error(`[${req.method}] ${req.path} - 에러!`, e);
    return res.status(500).json({
      error: e,
      errorString: e.toString(),
    });
  }
});


module.exports = router;
