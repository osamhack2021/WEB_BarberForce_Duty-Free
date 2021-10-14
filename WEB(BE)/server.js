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
const barbersRouter = require('./routes/barbers');
const reservationsRouter = require('./routes/reservations');
const reviewsRouter = require('./routes/reviews');

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
app.use('', barbersRouter);
app.use('', reservationsRouter);
app.use('', reviewsRouter);

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
