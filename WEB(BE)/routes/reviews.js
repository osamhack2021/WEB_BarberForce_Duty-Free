const router = require('express').Router();

const Review = require('../models/review');

const fetchUser = require('../middleware/fetchUser');

// 해당 미용실의 리뷰 목록 가져오기
// (async/await)
router.get('/barbers/:id/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ barber: req.params.id }).populate('barber').populate('reviewer');

    return res.json({
      reviews: reviews,
    });
  } catch (e) {
    console.error(`[${req.method}] ${req.path} - 에러!`, e);
    return res.status(500).json({
      error: e,
      errorString: e.toString(),
    });
  }
});

// 해당 미용실에 리뷰 작성하기
// (async/await)
router.post('/barbers/:id/reviews', fetchUser, async (req, res) => {
  try {
    const user = req.user;

    const created = await Review.create({
      barber: req.params.id,
      reviewer: user._id,
      body: req.body.body,
      rating: req.body.rating,
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

module.exports = router;
