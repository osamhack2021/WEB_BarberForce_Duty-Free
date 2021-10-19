const router = require('express').Router();

const User = require('../models/user');

const fetchUser = require('../middleware/fetchUser');

// 사용자 정보 수정
// (async/await)
router.post('/profiles/update', fetchUser, async (req, res) => {
  const user = req.user;

  try {
    await user.update({
      $set: {
        name: req.body.name,
        nickname: req.body.nickname,
        email: req.body.email,
        soldier_id: req.body.soldier_id,
        phone: req.body.phone,
        rank: req.body.rank,
      },
    });
    return res.json({});
  } catch (e) {
    console.error(`[${req.method}] ${req.path} - 에러!`, e);
    return res.status(500).json({
      error: e,
      errorString: e.toString(),
    });
  }
});

// 사용자 탈퇴
// (async/await)
router.post('/profiles/withdrawal', fetchUser, async (req, res) => {
  const user = req.user;

  try {
    await User.deleteOne({ _id: user._id });
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
