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
      weekday: { start: { hour: 10, minute: 0 }, end: { hour: 22, minute: 0 } },
      weekend: { start: { hour: 12, minute: 0 }, end: { hour: 20, minute: 0 } },
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
      weekday: { start: { hour: 10, minute: 0 }, end: { hour: 22, minute: 0 } },
      weekend: { start: { hour: 12, minute: 0 }, end: { hour: 20, minute: 0 } },
      description: '매주 화요일 휴무입니다. \n 커트 : 7000원',
      phone: '010-0000-0011',
      thumb: '/img/shop1.jpg',
      disinfection: true,
      partnership: ['OICW'],
    },
    {
      title: `엇던`,
      location: '평택',
      location_detail: '경기도 평택시 밀월로 9 1층 102호 송탄역 4번 출구',
      weekday: { start: { hour: 10, minute: 0 }, end: { hour: 19, minute: 0 } },
      weekend: { start: { hour: 10, minute: 0 }, end: { hour: 19, minute: 0 } },
      description: '연중무휴입니다. \n 커트 : 5000원',
      phone: '010-0000-1234',
      thumb: '/img/shop2.jpg',
      disinfection: true,
      partnership: ['AFOC'],
    },
    {
      title: `맨Hair`,
      location: '평택',
      location_detail: '경기도 평택시 밀월로 35번길 33 101호 ',
      weekday: { start: { hour: 11, minute: 0 }, end: { hour: 20, minute: 0 } },
      weekend: { start: { hour: 11, minute: 0 }, end: { hour: 20, minute: 0 } },
      description: '매주 화요일 휴무입니다. \n 커트 : 8000원',
      phone: '010-0000-4321',
      thumb: '/img/shop3.png',
      disinfection: true,
      partnership: ['AFOC'],
    },
    {
      title: `1st헤어 오산공군기지점`,
      location: '평택',
      location_detail: '경기 평택시 신장로 55 2층',
      weekday: { start: { hour: 10, minute: 0 }, end: { hour: 20, minute: 0 } },
      weekend: { start: { hour: 10, minute: 0 }, end: { hour: 20, minute: 0 } },
      description: '매주 수요일 휴무입니다. \n 커트 : 8500원',
      phone: '010-0010-0052',
      thumb: '/img/shop4.png',
      disinfection: true,
      partnership: ['AFOC'],
    },
    {
      title: `로빈이발관`,
      location: '평택',
      location_detail: '경기 평택시 점촌로 19번길 3',
      weekday: { start: { hour: 9, minute: 0 }, end: { hour: 20, minute: 0 } },
      weekend: { start: { hour: 9, minute: 0 }, end: { hour: 20, minute: 0 } },
      description: '매주 수요일 휴무입니다. \n 커트 : 6000원',
      phone: '010-0110-1000',
      thumb: '/img/shop1.jpg',
      disinfection: true,
      partnership: ['AFOC'],
    },
    {
      title: `자라나라 머리머리`,
      location: '참모장실',
      location_detail: '경기도 평택시 고덕북로 77 불난버섯집 1층 중앙현관',
      weekday: { start: { hour: 10, minute: 0 }, end: { hour: 22, minute: 0 } },
      weekend: { start: { hour: 12, minute: 0 }, end: { hour: 20, minute: 0 } },
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
      weekday: { start: { hour: 10, minute: 0 }, end: { hour: 22, minute: 0 } },
      weekend: { start: { hour: 12, minute: 0 }, end: { hour: 20, minute: 0 } },
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

  /*
  // 더미유저
  let dummyUser = await User.findOne({ email: 'kang@naver.com' });
  if (!dummyUser) {
    dummyUser = await User.create({
      name: '강민구',
      nickname: '구99',
      email: 'dummy@dummy.com',
      password: crypto.createHash('sha512').update('dummy123').digest('base64'),
      phone: '011-1234-5678',
      soldier_id: '20-70004352',
      rank: '중장',
    });
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
      createdAt: new Date('2021-10-15 16:32'),
    },
    {
      user: dummyUser._id,
      title: '미복귀휴가에 관하여..',
      body: '위드 코로나도 시행하는데 814기부터는 찍턴 해야하는거 아닌가?\n라고 할뻔~',
      recommendation: 0,
      recommend_user: [],
      comment: [],
      board: true,
      createdAt: new Date('2021-10-15 16:36'),
    },
    {
      user: dummyUser._id,
      title: '[맛집추천] 보라매 병사식당',
      body: '오늘은 오산기지에 있다는 맛집! 보라매 병사식당에 가볼건데요~\n인테리어부터 오래된 전통이 느껴지는 이 곳! 과연 맛은 어떨지 정말 궁금합니다!',
      recommendation: 0,
      recommend_user: [],
      comment: [],
      board: false,
      createdAt: new Date('2021-10-15 17:32'),
    },
    {
      user: dummyUser._id,
      title: '하하하하하하하',
      body: '호호호호호호호\n허허허허허허허허허허\n헤헤헤헤헤헤헤헤헤헤헤헤\n히히히히히히히히히히히\n후후후후후후후후후후후',
      recommendation: 1,
      recommend_user: [dummyUser._id],
      comment: [],
      board: true,
      createdAt: new Date('2021-10-15 18:32'),
    },
    {
      user: dummyUser._id,
      title: '호호호호호호호',
      body: '허허허허허허허허허허\n히히히히히히히히히히히\n헤헤헤헤헤헤헤헤헤헤헤헤\n후후후후후후후후후후후\n호호호호호호호',
      recommendation: 0,
      recommend_user: [dummyUser._id],
      comment: [],
      board: true,
      createdAt: new Date('2021-10-17 16:32'),
    },
    {
      user: dummyUser._id,
      title: 'ㄹㅇ 맛있는 황금밥알',
      body: '황금 밥알 황 금 밥 알 황금바발',
      recommendation: 0,
      recommend_user: [],
      comment: [],
      board: false,
      createdAt: new Date('2021-10-18 16:32'),
    },
    {
      user: dummyUser._id,
      title: '보라매 병사식당 브런치데이 증발사건',
      body: '오산기지 내부에 있는 보라매 병사식당에서 10월달에 예정되어있던 3번의 브런치데이가 모두 증발했다는 소식인데요, 자세한 내용은 인트라넷을 확인해주세요.',
      recommendation: 1,
      recommend_user: [dummyUser._id],
      comment: [],
      board: false,
      createdAt: new Date('2021-10-19 11:32'),
    },
  ];
  for (const article of articles) {
    await Board.create(article);
  }
  */

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
