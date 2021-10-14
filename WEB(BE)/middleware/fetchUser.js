const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

// 나중에 진짜 시크릿키로 바꾸기
// 토큰 만들때 매직스트링으로 했길래 여기도 맞춤.
const JWT_KEY = 'secretToken';

const fetchUserMiddleware = (req, res, next) => {
  // authorization 헤더가 없는 요청이면 기각
  if (!req.headers.authorization) {
    return res.status(403).json({
      message: 'fetchUserMiddleware: no authorization header',
    });
  }

  // 헤더에서 token 추출
  const token = req.headers.authorization.split(' ')[1];
  // 토큰 검증
  jwt.verify(token, JWT_KEY, (e, decoded) => {
    if (e) {
      res.status(403).json({
        message: 'fetchUserMiddleware: invaild token',
      });
    }

    // 토큰에서 빼온 _id로 해당 유저 찾기 (만들때 넣어줌)
    // + 이렇게 하면 DB에 토큰을 저장할 필요가 없음!
    const user = userModel.findOne({ _id: decoded._id });
    if (!user) {
      res.status(403).json({
        message: 'fetchUserMiddleware: invaild token',
      });
    }
    req.user = user;

    // 다음 라우트로 이동 (미들웨어로 쓸거기 때문에)
    next();
  });
};

module.exports = fetchUserMiddleware;
