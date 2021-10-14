const express = require('express');
const app = express();
const port = 3306;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const url = require('url');
const cors = require('cors');
const path = require('path');
const request = require('request-promise');
const axios = require('axios');

const key = require('./auth/key');
const moment = require('moment');
const db = require('./db');

const User = require('./models/user');
const Reservation = require('./models/reservation');
const Barbers = require('./models/barbers');
const Review = require('./models/review');
const Unit = require('./models/unit');

const authRouter = require('./routes/auth');
const socialLoginRouter = require('./routes/socialLogin');

db();

//app.use('/',route);

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
  });
});

app.use('', authRouter);
app.use('', socialLoginRouter);

app.get('/barbers', (req, res) => {
  var unitName;
  Unit.findOne({ token: req.headers.authorization }, (err, unit) => {
    Barbers.find({ partnership: unit.unitName }, (err, barbers) => {
      return res.json({
        barbers: barbers.slice(0, req.query.limit),
      });
    });
  });
});

app.get('/barbers/:id', (req, res) => {
  Barbers.findOne({ _id: req.params.id }, (err, barbers) => {
    return res.json({
      id: barbers._id,
      title: barbers.title,
      location: barbers.location,
      location_detail: barbers.location_detail,
      rating: barbers.rating,
      bookmarked: barbers.bookmarked,
      phone: barbers.phone,
      thumb: barbers.thumb,
      description: barbers.description,
    });
  });
});

app.get('/barbers/:id/reservations/:year/:month', (req, res) => {
  Reservation.find(
    { barbers_id: req.params.id, year: req.params.year, month: req.params.month },
    (err, reservation) => {
      var list = new Array(31);
      for (i = 0; i < list.length; i++) {
        var date = new Date(year, month - 1, i + 1);
        var time = new Array();
        list[i] = {
          day: i + 1,
          time: { '18:00': false, '18:30': false, '19:00': false, '19:30': false, '20:00': false, '20:30': false },
        };
      }
      for (i = 0; i < reservation.length; i++) {
        var time =
          moment(new Date(reservation[i].time)).format('HH') + ':' + moment(new Date(reservation[i].time)).format('mm');
        list[reservation[i].day - 1].time[time] = true;
      }

      return res.json({
        reservations: list,
      });
    }
  );
});

app.post('/barbers/:id/reservations', (req, res) => {
  //var time =
  User.findOne({ token: req.headers.authorization.split(' ')[1] }, (err, user) => {
    Reservation.insertMany({
      year: req.body.year,
      month: req.body.month,
      day: req.body.day,
      time: req.body.time,
      barbers_id: req.params.id,
      user_id: user._id,
      userName: user.name,
      description: req.body.description,
    });
    return res.json({
      mss: '추가',
    });
  });
});

app.get('/barbers/:id/reviews', (req, res) => {
  Review.find({ barbers_id: req.params.id }, (err, review) => {
    return res.json({
      reviews: review,
    });
  });
});

app.post('/barbers/:id/reviews', (req, res) => {
  var today = new Date();
  User.findOne({ token: req.headers.authorization.split(' ')[1] }, (err, user) => {
    Review.insertMany({
      barbers_id: req.params.id,
      thumb: '',
      reviewer: user.name,
      body: req.body.body,
      rating: req.body.rating,
      createdAt: today,
    });
    return res.json({
      mss: '추가',
    });
  });
});

app.get('/reservations', (req, res) => {
  User.findOne({ token: req.headers.authorization.split(' ')[1] }, (err, user) => {
    Reservation.find({ user_id: user._id }, (err, reservation) => {
      return res.json({
        reservations: reservation.sort(reservation.time),
      });
    });
  });
});

app.get('/kakao/callback?code=KAKAO_CODE', (req, res) => {});

app.post('/kakao/register', (req, res) => {});

//DB 저장용
app.post('/createReserve', (req, res) => {
  var user_id;
  User.findOne({ token: req.headers.authorization.split(' ')[1] }, (err, user) => {
    user_id = user._id;
  });
  Reservation.insertMany({
    year: req.body.year,
    month: req.body.month,
    date: req.body.day,
    time: req.body.date,
    barbers_id: req.params.id,
    user_id: user_id,
    description: req.body.description,
  });
  return res.json({
    mss: '추가',
  });
});

app.post('/createBarbers', (req, res) => {
  Barbers.insertMany({
    title: req.body.title,
    location: req.body.location,
    location_detail: req.body.location_detail,
    rating: req.body.rating,
    phone: req.body.phone,
    thumb: req.body.thumb,
    bookmarked: req.body.bookmarked,
    weekdayHour: req.body.weekdayHour,
    holidayHour: req.body.holidayHour,
    description: req.body.description,
    partnership: req.body.partnership,
  });
  return res.json({
    mss: '추가',
  });
});

app.post('/createUnit', (req, res) => {
  Unit.insertMany({ unitName: req.body.unitName, soldier_id: req.body.soldier_id, barbers_id: req.body.barbers_id });
  return res.json({
    mss: '추가',
  });
});

app.get('/DB', (req, res) => {
  User.find({}, (err, user) => {
    Barbers.find({}, (err, barbers) => {
      Reservation.find({}, (err, reservation) => {
        Review.find({}, (err, review) => {
          Unit.find({}, (err, unit) => {
            return res.json({
              User: user,
              Barbers: barbers,
              Reservation: reservation,
              Review: review,
              Unit: unit,
            });
          });
        });
      });
    });
  });
});

app.get('/dataTest', (req, res) => {
  var date = moment(new Date()).format('HH:mm');
  return res.json({
    date: date,
  });
});

app.listen(port, () => {
  console.log(`server is listening at localhost:${process.env.PORT}`);
});
