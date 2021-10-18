const router = require('express').Router();
const request = require('request');

const User = require('../models/user');
const Unit = require('../models/unit');

const fetchUser = require('../middleware/fetchUser');

// code 로 토큰을 가져오는 함수 (내부적으로 request 사용)
function getToken(code, callback) {
  const options = {
    uri: 'https://kauth.kakao.com/oauth/token',
    method: 'POST',
    form: {
      grant_type: 'authorization_code',
      client_id: '41fec2d017836a2bbb48d0b32f7983b0',
      redirect_uri: 'https://api.barberforce.shop/kakao/access',
      code: code,
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    json: true,
  };

  request(options, (error, response, body) => {
    callback(body.access_token);
  });
}

// accessToken 으로 사용자 정보를 가져오는 함수 (내부적으로 request 사용)
function getUser(token, callback) {
  const options = {
    uri: 'https://kapi.kakao.com/v2/user/me',
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    json: true,
  };

  request(options, (error, respoonse, body) => {
    callback(body.kakao_account);
  });
}

// 카카오 로그인 콜백 라우트
router.get('/kakao/access', (req, res) => {
  // 코드
  const code = req.query.code;

  // 코드로 토큰 가져오기
  getToken(code, token => {
    const accessToken = token;

    // 토큰으로 사용자 정보 가져오기
    // (callback 이 async 함수임. 그 함수 내부에서 await을 사용하기 때문)
    getUser(accessToken, async user => {
      try {
        const email = user.email;
        const name = user.profile.nickname;

        // 이메일로 사용자 검색
        const existingUser = await User.findOne({ email: email, social: true });
        //const existSoldierId = existingUser.soldier_id;
        if (existingUser) {
          if(existingUser.soldier_id == null){
            // 해당 이메일의 사용자가 이미 있다면
            // 그 사용자에 대한 토큰 생성 후 리다이렉트
            const token = existingUser.generateToken();
            const url = 'https://barberforce.shop/kakao/callback?token=' + token + '&first=1';
            return res.redirect(url);
          }
          else{
            //해당 이메일의 사용자가 군번이 없다면 추가 입력페이지로 리다이렉트
            const token = existingUser.generateToken();
            const url = 'https://barberforce.shop/kakao/callback?token=' + token;
            return res.redirect(url);
          }
        } else {
          // 없다면 (최초 로그인이라면)
          // 사용자를 하나 만들고 (insertMany 대신 create 사용)
          const user = await User.create({
            email: email,
            name: name,
            nickname: "",
            soldier_id: "",
            phone: "",
            password: "",
            rank: "",
            social: true,
          });
          // 만든 사용자에 대한 토큰을 생성 후 리다이렉트 (first=1 플래그)
          const token = user.generateToken();
          const url = 'https://barberforce.shop/kakao/callback?token=' + token + '&first=1';
          return res.redirect(url);
        }
      } catch (e) {
        console.error(`[${req.method}] ${req.path} - 에러!`, e);
        return res.status(500).json({
          error: e,
          errorString: e.toString(),
        });
      }
    });
  });
});

router.post('/kakao/register', fetchUser, async (req, res) => {
  try {
    const user = req.user;

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

    // 군번 데이터 추가 입력
    await user.update({ $set: { soldier_id: req.body.soldier_id, rank: req.body.rank, nickname: req.body.nickname } });

    res.json({});
  } catch (e) {
    console.error(`[${req.method}] ${req.path} - 에러!`, e);
    return res.status(500).json({
      error: e,
      errorString: e.toString(),
    });
  }
});

module.exports = router;
