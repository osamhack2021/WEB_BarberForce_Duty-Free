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
const mongoose = require('mongoose');

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

app.get('/setDummyData', async (req, res) => {
  // 기존 barbers, unit 데이터 비우기
  await Barbers.deleteMany({});
  await Unit.deleteMany({});

  // 부대 데이터
  const units = [
    {
      unitName: 'OICW',
      soldier_id: [],
      barbers_id: [],
    },
    {
      unitName: 'AFOC',
      soldier_id: [],
      barbers_id: [],
    },
    {
      unitName: 'AAOC',
      soldier_id: [],
      barbers_id: [],
    },
  ];
  /**
   * 군번 목록
   * 20-70007000 ~ 20-70007299 : OICW
   * 20-70007300 ~ 20-70007699 : AFOC
   * 20-70007700 ~ 20-70007999 : AAOC
   */
  for (let i = 0; i < 999; i++) {
    const dummySoliderId = `20-${70007000 + i}`;
    if (i < 300) {
      units[0].soldier_id.push(dummySoliderId);
    } else if (i < 700) {
      units[1].soldier_id.push(dummySoliderId);
    } else {
      units[2].soldier_id.push(dummySoliderId);
    }
  }
  for (const dummy of units) {
    await Unit.create(dummy);
  }

  // 미용실
  const barbers = [
    {
      title: `Yang's BarberShop`,
      location: '보라매 사동',
      location_detail: '경기도 평택시 고덕북로 77 불난버섯집 1층 중앙현관',
      description: '매주 월요일 휴무입니다.',
      phone: '010-0000-0011',
      thumb: '/img/shop2.jpg',
      bookmarked: false,
      partnership: ['OICW', 'AFOC'],
    },
    {
      title: `송탄이발소`,
      location: '송탄역',
      location_detail: '경기도 평택시 고덕북로 77 불난버섯집 1층 중앙현관',
      description: '매주 화요일 휴무입니다.',
      phone: '010-0000-0011',
      thumb: '/img/shop1.jpg',
      bookmarked: false,
      partnership: ['OICW', 'AFOC'],
    },
    {
      title: `기본군사훈련단`,
      location: '진주',
      location_detail: '경기도 평택시 고덕북로 77 불난버섯집 1층 중앙현관',
      description: '연중무휴입니다.',
      phone: '010-0000-0011',
      thumb: '/img/shop2.jpg',
      bookmarked: false,
      partnership: ['OICW', 'AFOC'],
    },
    {
      title: `제 20 전투비행단`,
      location: '서산',
      location_detail: '경기도 평택시 고덕북로 77 불난버섯집 1층 중앙현관',
      description: '매주 화요일 휴무입니다.',
      phone: '010-0000-0011',
      thumb: '/img/shop1.jpg',
      bookmarked: false,
      partnership: ['OICW', 'AFOC'],
    },
    {
      title: `머리 잘하는 집`,
      location: '송탄출장소',
      location_detail: '경기도 평택시 고덕북로 77 불난버섯집 1층 중앙현관',
      description: '매주 수요일 휴무입니다.',
      phone: '010-0010-0052',
      thumb: '/img/shop1.jpg',
      bookmarked: false,
      partnership: ['AAOC'],
    },
    {
      title: `송탄미용실`,
      location: 'K-55 정문',
      location_detail: '경기도 평택시 고덕북로 77 불난버섯집 1층 중앙현관',
      description: '매주 수요일 휴무입니다.',
      phone: '010-0110-1000',
      thumb: '/img/shop1.jpg',
      bookmarked: false,
      partnership: ['AAOC'],
    },
  ];
  for (const dummy of barbers) {
    const created = await Barbers.create(dummy);
    // 미용실의 partnership에 대해 모두 등록
    for (const partner of dummy.partnership) {
      const unit = await Unit.findOne({ unitName: partner });
      unit.barbers_id.push(created._id);
      unit.save();
    }
  }
  res.json('done');
});

app.get('/deleteDummys', async (req, res) => {
  res.json('done');
});

app.post('/createUnit', async (req, res) => {
  const response = await Unit.create({
    unitName: req.body.unitName,
    solider_id: req.body.soldier_id,
    barbers_id: req.body.barbers_id,
  });
  console.log('res', response);
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
