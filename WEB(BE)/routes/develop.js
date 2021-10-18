const router = require('express').Router();
const crypto = require('crypto');

const User = require('../models/user');
const Reservation = require('../models/reservation');
const Barber = require('../models/barber');
const Review = require('../models/review');
const Unit = require('../models/unit');
const Board = require('../models/board');
const Comment = require('../models/comment');

router.get('/setDummyData', async (req, res) => {
  // 기존 barbers, unit 데이터 비우기
  await Barber.deleteMany({});
  await Unit.deleteMany({});
  await Reservation.deleteMany({});
  await Review.deleteMany({});
  await Board.deleteMany({});
  await Comment.deleteMany({});

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
    {
      unitName: 'ABCD',
      soldier_id: [],
      barbers_id: [],
    },
  ];
  /**
   * 군번 목록
   * 20-70000000 ~ 20-70005000 : OICW
   * 20-70005001 ~ 20-70010000 : AFOC
   * 20-70010001 ~ 20-70015000 : AAOC
   * 20-70015001 ~ 20-70020000 : ABCD
   */
  for (let i = 0; i <= 20000; i++) {
    const dummySoliderId = `20-${70000000 + i}`;
    if (i <= 5000) {
      units[0].soldier_id.push(dummySoliderId);
    } else if (i <= 10000) {
      units[1].soldier_id.push(dummySoliderId);
    } else if (i <= 15000) {
      units[2].soldier_id.push(dummySoliderId);
    } else {
      units[3].soldier_id.push(dummySoliderId);
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
      description: '매주 월요일 휴무입니다. \n 커트 : 7000',
      phone: '010-0000-0011',
      thumb: '/img/shop2.jpg',
      disinfection: true,
      partnership: ['OICW'],
    },
    {
      title: `송탄이발소`,
      location: '송탄역',
      location_detail: '경기도 평택시 고덕북로 77 불난버섯집 1층 중앙현관',
      description: '매주 화요일 휴무입니다. \n 커트 : 7000원',
      phone: '010-0000-0011',
      thumb: '/img/shop1.jpg',
      disinfection: true,
      partnership: ['OICW'],
    },
    {
      title: `기본군사훈련단`,
      location: '진주',
      location_detail: '경기도 평택시 고덕북로 77 불난버섯집 1층 중앙현관',
      description: '연중무휴입니다. \n 커트 : 8000원',
      phone: '010-0000-0011',
      thumb: '/img/shop2.jpg',
      disinfection: true,
      partnership: ['AFOC'],
    },
    {
      title: `제 20 전투비행단`,
      location: '서산',
      location_detail: '경기도 평택시 고덕북로 77 불난버섯집 1층 중앙현관',
      description: '매주 화요일 휴무입니다. \n 커트 : 9000원',
      phone: '010-0000-0011',
      thumb: '/img/shop1.jpg',
      disinfection: true,
      partnership: ['AFOC'],
    },
    {
      title: `머리 잘하는 집`,
      location: '송탄출장소',
      location_detail: '경기도 평택시 고덕북로 77 불난버섯집 1층 중앙현관',
      description: '매주 수요일 휴무입니다. \n 커트 : 8500원',
      phone: '010-0010-0052',
      thumb: '/img/shop1.jpg',
      disinfection: true,
      partnership: ['AAOC'],
    },
    {
      title: `송탄미용실`,
      location: 'K-55 정문',
      location_detail: '경기도 평택시 고덕북로 77 불난버섯집 1층 중앙현관',
      description: '매주 수요일 휴무입니다. \n 커트 : 9000원',
      phone: '010-0110-1000',
      thumb: '/img/shop1.jpg',
      disinfection: true,
      partnership: ['AAOC'],
    },
    {
      title: `자라나라 머리머리`,
      location: '참모장실',
      location_detail: '경기도 평택시 고덕북로 77 불난버섯집 1층 중앙현관',
      description: '매주 수요일 휴무입니다. \n 커트 : 7000원',
      phone: '010-0010-0052',
      thumb: '/img/shop1.jpg',
      disinfection: true,
      partnership: ['ABCD'],
    },
    {
      title: `볶아드립니다`,
      location: '작전사령관실',
      location_detail: '경기도 평택시 고덕북로 77 불난버섯집 1층 중앙현관',
      description: '매주 수요일 휴무입니다. \n 커트 : 7000원',
      phone: '010-0110-1000',
      thumb: '/img/shop1.jpg',
      disinfection: true,
      partnership: ['ABCD'],
    },
  ];
  for (const dummy of barbers) {
    const created = await Barber.create(dummy);
    // 미용실의 partnership에 대해 모두 등록
    for (const partner of dummy.partnership) {
      const unit = await Unit.findOne({ unitName: partner });
      unit.barbers_id.push(created._id);
      unit.save();
    }
  }

  // 더미유저
  let dummyUser = await User.findOne({ email: 'dummy@dummy.com' });
  if (!dummyUser) {
    dummyUser = await User.create({
      name: '김더미',
      nickname: '더미김',
      email: 'dummy@dummy.com',
      password: crypto.createHash('sha512').update('dummy123').digest('base64'),
      phone: '011-1234-5678',
      soldier_id: '20-70004352',
      rank: '중장',
    });
  }

  // 더미 게시글
  const articles = [
    {
      user: dummyUser._id,
      title: '급식이 너무 맛있어요!',
      body: '오산기지 급식 최고~\n잔반데이는 안하는게 낫지 않을까?\n라는 생각이 드네요.',
      recommendation: 1,
      recommend_user: [dummyUser._id],
      comment: [],
      board: true,
    },
    {
      user: dummyUser._id,
      title: '미복귀휴가에 관하여..',
      body: '위드 코로나도 시행하는데 814기부터는 찍턴 해야하는거 아닌가?\n라고 할뻔~',
      recommendation: 0,
      recommend_user: [],
      comment: [],
      board: true,
    },
    {
      user: dummyUser._id,
      title: '[맛집추천] 보라매 병사식당',
      body: '오늘은 오산기지에 있다는 맛집! 보라매 병사식당에 가볼건데요~\n인테리어부터 오래된 전통이 느껴지는 이 곳! 과연 맛은 어떨지 정말 궁금합니다!',
      recommendation: 0,
      recommend_user: [],
      comment: [],
      board: false,
    },
  ];
  for (const article in articles) {
    await Board.create(article);
  }

  res.json('done');
});

router.get('/db', async (req, res) => {
  try {
    const users = await User.find({});
    const barbers = await Barber.find({});
    const reservations = await Reservation.find({});
    const reviews = await Review.find({});
    const units = await Unit.find({});
    const boards = await Board.find({});
    const comments = await Comment.find({});

    return res.json({
      User: users,
      Barber: barbers,
      Reservation: reservations,
      Review: reviews,
      Unit: units,
      Board: boards,
      Comment: comments,
    });
  } catch (e) {
    console.error(`[${req.method}] ${req.path} - 에러!`, e);
    return res.status(500).json({
      error: e,
      errorString: e.toString(),
    });
  }
});

module.exports = router;
