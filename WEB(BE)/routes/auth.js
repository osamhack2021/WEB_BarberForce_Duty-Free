const router = require('express').Router();

const User = require('../models/user');

const fetchUser = require('../middleware/fetchUser');

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
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
  });
});

router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    //이미 사용중인 email인 경우
    if (user) {
      return res.status(401).json({
        registerSuccess: false,
        message: 'Existing email',
      });
    }

    User.findOne({ soldier_id: req.body.soldier_id }, (err, user) => {
      //이미 사용중인 군번인 경우
      if (user) {
        return res.status(401).json({
          registerSuccess: false,
          message: 'Existing soldier_id',
        });
      }

      User.insertMany(
        [
          {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            soldier_id: req.body.soldier_id,
            token: '',
          },
        ],
        (err, result) => {
          if (err) {
            callback(err, null);
            res.status(401);
            return;
          }

          User.findOne({ email: req.body.email }, (err, user) => {
            if (user) {
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
          });
        }
      );
    });
  });
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
