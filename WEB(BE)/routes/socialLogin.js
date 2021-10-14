const router = require('express').Router();
const request = require('request');

const User = require('../models/user');

router.get('/kakao/access', (req, res) => {
  var code = req.query.code;

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

  var accessToken;
  var email;
  var name;

  var out1 = request(options, function (error, response, body) {
    accessToken = body.access_token;
    const verify = {
      uri: 'https://kapi.kakao.com/v1/user/access_token_info',
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
      json: true,
    };

    var out2 = request(verify, function (err, response, body) {
      if (err) {
        return res.json({
          verify: err,
        });
      }
      const instance = {
        uri: 'https://kapi.kakao.com/v2/user/me',
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
        json: true,
      };

      var out2 = request(instance, function (err, response, body) {
        if (err) {
          return res.json({
            err: err,
          });
        }
        //값 체크
        else {
          name = body.kakao_account.profile.nickname;
          email = body.kakao_account.email;
          /*
          return res.json({
            code: code,
            accessToken: accessToken,
            name: name,
            email: email,
            body: body
          })*/
          User.findOne({ email: email }, (err, user) => {
            //DB에 존재하는 사용자인 경우
            if (user) {
              user.generateToken((err, user) => {
                var url = 'https://barberforce.shop/kakao/callback?token=' + user.token;
                if (err) {
                  return res.status(401).send(err);
                } else {
                  return res.redirect(url);
                }
              });
            }
          });
          //DB에 존재하지 않는 사용자인 경우
          user = new User();
          user.email = email;
          user.name = name;
          user.token = '';
          user.soldier_id = null;
          user.password = null;

          user.save(function (err) {
            if (err) {
              return res.json({
                error: err,
              });
            }
          });

          //User.insertMany({"email":email,"name":name,"token":"","password":null,"soldier_id":null});

          User.find({}, (err, user2) => {
            return res.json({
              user: user2,
              error: err,
            });
            /*
            user.generateToken((err, user)=>{
                var url = "https://barberforce.shop/kakao/additional?token=" + user.token;
              if(err) {return res.status(401).send(err);}
              else {return res.redirect(url)}
            });
            */
          });

          /*
          return res.json({
            code: code,
            accessToken: accessToken,
            name: name,
            email: email
          })
          */
        }
      });
    });
  });
});

module.exports = router;
