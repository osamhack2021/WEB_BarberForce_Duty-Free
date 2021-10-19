const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
require('dotenv').config();

// 나중에 진짜 시크릿키로 바꾸기
// 토큰 만들때 매직스트링으로 했길래 여기도 맞춤.
const JWT_KEY = process.env.SECRETTOKEN;

// 요청의 authorization 헤더로부터 토큰을 검증한 뒤,
// 토큰을 복호화해 _id 를 찾고 해당하는 사용자를 가져와
// 라우트에서 바로 쓸 수 있도록 req.user에 할당해주는 미들웨어
// (이 미들웨어는 로그인을 해야 접근할 수 있게 할 라우트에 적용)
const fetchUserMiddleware = async (req, res, next) => {
  console.log(process.env.SECRETTOKEN)
  // authorization 헤더가 없는 요청이면 기각
  if (!req.headers.authorization) {
    return res.status(403).json({
      message: 'fetchUserMiddleware: no authorization header',
    });
  }

  // 헤더에서 token 추출
  const token = req.headers.authorization.split(' ')[1];

  // 토큰 검증 & decode
  let decoded;
  try {
    decoded = jwt.verify(token, JWT_KEY);
  } catch (e) {
    // 검증 실패
    return res.status(403).json({
      message: 'fetchUserMiddleware: invaild token',
    });
  }

  // decode 한 토큰 안의 _id 로 user를 찾음
  try {
    const user = await UserModel.findOne({ _id: decoded._id },{ password: 0});

    // 해당 _id의 유저가 없으면
    if (!user) {
      return res.status(403).json({
        message: 'fetchUserMiddleware: User not found',
      });
    }

    // req.user 에 user 변수 등록
    req.user = user;

    // 다음 핸들러로 이동 (미들웨어로 쓸거기 때문에)
    next();
  } catch (e) {
    console.error(`[${req.method}] ${req.path} in :fetchUser middleware - 에러!`, e);
    return res.status(500).json({
      error: e,
      errorString: e.toString(),
    });
  }
};

module.exports = fetchUserMiddleware;
