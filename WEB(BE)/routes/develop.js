const router = require('express').Router();

const User = require('../models/user');
const Reservation = require('../models/reservation');
const Barber = require('../models/barber');
const Review = require('../models/review');
const Unit = require('../models/unit');

router.get('/setDummyData', async (req, res) => {
  // 기존 barbers, unit 데이터 비우기
  await Barber.deleteMany({});
  await Unit.deleteMany({});
  await Reservation.deleteMany({});
  await Review.deleteMany({});

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
    const created = await Barber.create(dummy);
    // 미용실의 partnership에 대해 모두 등록
    for (const partner of dummy.partnership) {
      const unit = await Unit.findOne({ unitName: partner });
      unit.barbers_id.push(created._id);
      unit.save();
    }
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

    return res.json({
      User: users,
      Barber: barbers,
      Reservation: reservations,
      Review: reviews,
      Unit: units,
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
