const router = require('express').Router();

const User = require('../models/user');

const fetchUser = require('../middleware/fetchUser');

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        loginSuccess: false,
        message: 'Unvalid email',
      });
    }

    const checkPassword = user.comparePassword(req.body.password);
    if (!checkPassword) {
      return res.status(401).json({
        loginSuccess: false,
        message: 'Wrong password',
      });
    }

    const token = user.generateToken();
    res.json({
      token: token,
    });
  } catch (e) {
    console.error('/login: 에러!', e);
  }
});

router.post('/register', async (req, res) => {
  try {
    const existEmail = await User.exists({ email: req.body.email });
    //이미 사용중인 email인 경우
    if (existEmail) {
      return res.status(401).json({
        registerSuccess: false,
        message: 'Existing email',
      });
    }

    const existSoldierId = await User.exists({ soldier_id: req.body.soldier_id });
    //이미 사용중인 군번인 경우
    if (existSoldierId) {
      return res.status(401).json({
        registerSuccess: false,
        message: 'Existing soldier_id',
      });
    }

    await User.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      soldier_id: req.body.soldier_id,
    });

    const createdUser = await User.findOne({ email: req.body.email });

    if (createdUser) {
      console.log('사용자 추가 완료');

      return res.status(200).json({
        registerSuccess: true,
      });
    } else {
      console.log('사용자 추가 실패');

      return res.status(401).json({
        registerSuccess: false,
      });
    }
  } catch (e) {
    console.error('/register: 에러!', e);
  }
});

router.get('/me', fetchUser, (req, res) => {
  const user = req.user;
  res.json({
    email: user.email,
    name: user.name,
    soldier_id: user.soldier_id,
  });
});

module.exports = router;
