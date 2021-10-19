const router = require('express').Router();

const Review = require('../models/review');
const Barber = require('../models/barber');
const fetchUser = require('../middleware/fetchUser');

// 해당 미용실의 리뷰 목록 가져오기
// (async/await)
router.get('/barbers/:id/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ barber: req.params.id },{password: 0})
    .populate('barber')
    .populate({
      path: 'reviewer',
      select: '-password'
    });

    return res.json({
      reviews: reviews
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

    await Review.create({
      barber: req.params.id,
      reviewer: user._id,
      body: req.body.body,
      rating: req.body.rating,
    });

    //미용실 별점 겡신
    const review = await Review.find({barber: req.params.id});
    const barber = await Barber.findOne({_id: req.params.id});
    await barber.update({$set: {rating: (barber.rating * (review.length-1) + req.body.rating) / review.length}})

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

router.post('/reviews/:id/delete',fetchUser, async(req,res)=>{
  try {
    await Review.deleteOne({_id: req.params.id})

    return res.json({
      mss: '삭제',
    });

  } catch (e) {
    console.error(`[${req.method}] ${req.path} - 에러!`, e);
    return res.status(500).json({
      error: e,
      errorString: e.toString(),
    });
  }
})

module.exports = router;
