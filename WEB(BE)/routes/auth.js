const router = require('express').Router();
const crypto = require('crypto');

const User = require('../models/user');
const Unit = require('../models/unit');

const fetchUser = require('../middleware/fetchUser');

// 이메일 로그인 처리 라우트
// (async/await 으로 비동기 콜 처리 (callback hell 해결))
router.post('/login', async (req, res) => {
  try {
    // 이메일 유효 검사
    const user = await User.findOne({ email: req.body.email, social: false });
    if (!user) {
      return res.status(403).json({
        error: 'INVALID_EMAIL',
      });
    }

    // 비밀번호 검사 (todo: 암호화 해시비교)
    const checkPassword = user.comparePassword(req.body.password);
    if (!checkPassword) {
      return res.status(403).json({
        error: 'INVALID_PASSWORD',
      });
    }

    // JWT 토큰 생성 (DB 저장 X)
    const token = user.generateToken();

    // 토큰 반환
    return res.json({
      token: token,
    });
  } catch (e) {
    console.error(`[${req.method}] ${req.path} - 에러!`, e);
  }
});

// 이메일 회원가입 처리 라우트
// (async/await 으로 비동기 콜 처리 (callback hell 해결))
router.post('/register', async (req, res) => {
  try {
    // 이메일 중복체크
    const existEmail = await User.exists({ email: req.body.email });
    if (existEmail) {
      return res.status(403).json({
        error: 'EXISTING_EMAIL',
      });
    }

    // 군번 중복체크
    const existSoldierId = await User.exists({ soldier_id: req.body.soldier_id });
    if (existSoldierId) {
      return res.status(403).json({
        error: 'EXISTING_SOLDIER_ID',
      });
    }

    // 우리 DB에 등록된 군번인지 확인
    const validSoliderId = await Unit.exists({ soldier_id: req.body.soldier_id });
    if (!validSoliderId) {
      return res.status(403).json({
        error: 'INVALID_SOLDIER_ID',
      });
    }

    // 새로운 User 생성 (insertMany 대신 create 사용)
    await User.create({
      email: req.body.email,
      password: crypto.createHash('sha512').update(req.body.password).digest('base64'),
      name: req.body.name,
      soldier_id: req.body.soldier_id,
    });

    // 만들어진 User 확인
    const createdUser = await User.findOne({ email: req.body.email });
    if (createdUser) {
      console.log('사용자 추가 완료');

      return res.status(200).json({
        registerSuccess: true,
      });
    }
  } catch (e) {
    console.error(`[${req.method}] ${req.path} - 에러!`, e);
  }
});

// 로그인한 사람의 정보
// (fetchUser 미들웨어를 사용함)
router.get('/me', fetchUser, (req, res) => {
  // fetchUser 에서 user를 변수화해주므로 바로 리턴하면 됨
  const user = req.user;
  res.json({
    email: user.email,
    name: user.name,
    soldier_id: user.soldier_id,
  });
});

module.exports = router;
