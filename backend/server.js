const express = require('express');
const app = express();
const port = 3306;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const url = require('url')
const cors = require('cors');
const path = require('path');

const key = require('./auth/key');
const db = require('./db');

const User = require('./user');
const Reservation = require('./reservation');
const Barbers = require('./barbers');
const Review = require('./review');
const Unit = require('./unit');
//const route = require('./route.js');

db();

//app.use('/',route);

app.use(cors());
app.use(bodyParser.json());

app.get('/',(req,res)=>{
  res.json({
    success:true
  })
})

app.post('/login',(req,res)=>{
  User.findOne({email: req.body.email}, (err,user)=>{
    if(!user){
      return res.status(401)
      .json({
        loginSuccess: false,
        message: "Unvalid email"
      });
    }
    user.comparePassword(req.body.password, (err, isMatch)=>{
      if(!isMatch)
        return res.status(401)
        .json({
          loginSuccess:false,
          message: "Wrong password"
        });
        user.generateToken((err, user)=>{
          if(err) return res.status(401).send(err);
          // 토큰을 쿠키에 저장
          res.cookie("x_auth", user.token)
          .status(200)
          .json({
              token: user.token
          });
        });
    });
  });
});

app.post('/register',(req,res)=>{
  User.findOne({email: req.body.email}, (err,user)=>{
    //이미 사용중인 email인 경우
    if(user){
      return res.status(401)
      .json({
        registerSuccess: false,
        message: "Existing email"
      });
    }

    User.findOne({soldier_id: req.body.soldier_id}, (err,user)=>{
      //이미 사용중인 군번인 경우
      if(user){
        return res.status(401)
        .json({
          registerSuccess: false,
          message: "Existing soldier_id"
        });
      }

      User.insertMany([{ "email": req.body.email, "password": req.body.password,
      "name": req.body.name, "soldier_id": req.body.soldier_id, "token": ""}],
        function(err, result) {
          if(err){
            callback(err,null);
            res.status(401);
            return;
          }

          User.findOne({email: req.body.email}, (err,user)=>{
            if(user){
              console.log('사용자 추가 완료');
              return res.status(200)
              .json({
                registerSuccess: true
              });
            }
            else{
              console.log('사용자 추가 실패');
              return res.status(401)
              .json({
                registerSuccess: false
              });
            }
          })
        }
      )
    })
  })
});

app.get('/me', (req, res) => {
  // authorization 헤더가 없을 경우
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Not Login"
    });
  }

  User.findOne({token: req.headers.authorization.split(' ')[1]}, (err,user)=>{
    if(user){
      return res.json({
        name: user.name,
        email: user.email
      })
    }
    else {
      return res.status(401)
      .json({
        message: "Not Login"
      })
    }
  })
});

app.get('/barbers',(req,res) =>{
  var unitName;
  Unit.findOne({token: req.headers.authorization},(err,unit)=>{
    Barbers.find({partnership: unit.unitName},(err,barbers)=>{
      return res.json({
        barbers: barbers
      })
    })
  })

});

app.get('/barbers/:id',(req,res)=>{
  Barbers.findOne({_id: req.params.id},(err,barbers)=>{
    return res.json({
      id: barbers._id,
      title: barbers.title,
      location: barbers.location,
      location_detail:{
        longitude: barbers.longitude,
        latitude: barbers.latitude
      },
      rating: barbers.rating,
      bookmarked: barbers.bookmarked,
      phone: barbers.phone,
      thumb: barbers.thumb,
      description: barbers.description
    })
  })
});

app.get('/barbers/:id/reservations/:year/:month',(req,res)=>{

  Reservation.find({barbers_id: req.params.id, year: req.params.year, month:req.params.month}, (err, reservation)=>{
    var list =
    [
      {
        day: 1,
        status: false
      },
      {
        day: 2,
        status: false
      },
      {
        day: 3,
        status: false
      },
      {
        day: 4,
        status: false
      },
      {
        day: 5,
        status: false
      },
      {
        day: 6,
        status: false
      },
      {
        day: 7,
        status: false
      },
      {
        day: 8,
        status: false
      },
      {
        day: 9,
        status: false
      },
      {
        day: 10,
        status: false
      },
      {
        day: 11,
        status: false
      },
      {
        day: 11,
        status: false
      },
      {
        day: 12,
        status: false
      },
      {
        day: 13,
        status: false
      },
      {
        day: 14,
        status: false
      },
      {
        day: 15,
        status: false
      },
      {
        day: 16,
        status: false
      },
      {
        day: 17,
        status: false
      },
      {
        day: 18,
        status: false
      },
      {
        day: 19,
        status: false
      },
      {
        day: 20,
        status: false
      },
      {
        day: 21,
        status: false
      },
      {
        day: 22,
        status: false
      },
      {
        day: 23,
        status: false
      },
      {
        day: 24,
        status: false
      },
      {
        day: 25,
        status: false
      },
      {
        day: 26,
        status: false
      },
      {
        day: 27,
        status: false
      },
      {
        day: 28,
        status: false
      },
      {
        day: 29,
        status: false
      },
      {
        day: 30,
        status: false
      },
      {
        day: 31,
        status: false
      }
    ]

    for(i=0;i<reservation.length;i++){
      list[reservation[i].day-1].status = true;
    }

    return res.json({
      reservations: list
    })

  })
  /*
  return res.json({
    date: date
  })
  */
});

app.post('/barbers/:id/reservations',(req,res)=>{
  User.findOne({token: req.headers.authorization.split(' ')[1]},(err,user)=>{
    Reservation.insertMany({"year":req.body.year,"month":req.body.month,"day":req.body.day,"time":req.body.date,"barbers_id":req.params.id,"user_id":user._id,"userName":user.name,"description":req.body.description});
    return res.json({
      mss: "추가"
    })
  })
  /*
  Reservation.findOne({"year": req.body.year, "month": req.body.month, "date": req.body.day},(err,user)=>{
    if(req.body.time=="_1800"){
      user._1800[0]="true",
      user._1800[1]=req.params.id;
      user.description=req.body.description;
      User.findOne({token: req.headers.authorization.split(' ')[1]}, (err,soldier)=>{
        if(soldier){
          user._1800[2]=soldier._id;
        }
        user.save(function(err,user){})
        return res.json({
          res: user,
          token: req.headers.authorization.split(' ')[1],
          soldier: soldier
        })
      })

    }
    else if(req.body.time=="_1830"){
      user._1830[0]="true",
      user._1830[1]=req.params.id;
      user.description=req.body.description;
      User.findOne({token: req.headers.authorization.split(' ')[1]}, (err,soldier)=>{
        if(soldier){
          user._1830[2]=soldier._id;
          user.save(function(err,user){})
          return res.json({
            reservation: user
          })
        }
      })

    }
    else if(req.body.time=="_1900"){
      user._1900[0]="true",
      user._1900[1]=req.params.id;
      user.description=req.body.description;
      User.findOne({token: req.headers.authorization.split(' ')[1]}, (err,soldier)=>{
        if(soldier){
          user._1900[2]=soldier._id;
          user.save(function(err,user){})
          return res.json({
            reservation: user
          })
        }
        else {
          return res.status(401)
          .json({
            message: "Not Login"
          })
        }
      })

    }
    else if(req.body.time=="_1930"){
      user._1930[0]="true",
      user._1330[1]=req.params.id;
      user.description=req.body.description;

      User.findOne({token: req.headers.authorization.split(' ')[1]}, (err,soldier)=>{
        if(soldier){
          user._1930[2]=soldier._id;
          user.save(function(err,user){})

          return res.json({
            reservation: user
          })
        }
        else {
          return res.status(401)
          .json({
            message: "Not Login"
          })
        }
      })

    }
    else if(req.body.time=="_2000"){
      user._2000[0]="true",
      user._2000[1]=req.params.id;
      user.description=req.body.description;

      User.findOne({token: req.headers.authorization.split(' ')[1]}, (err,soldier)=>{
        if(soldier){
          user._2000[2]=soldier._id;
          user.save(function(err,user){})
          return res.json({
            reservation: user
          })
        }
        else {
          return res.status(401)
          .json({
            message: "Not Login"
          })
        }
      })


    }
    else if(req.body.time=="_2030"){
      user._2030[0]="true",
      user._2030[1]=req.params.id;
      user.description=req.body.description;
      User.findOne({token: req.headers.authorization.split(' ')[1]}, (err,soldier)=>{
        if(soldier){
          user._2030[2]=soldier._id;
          user.save(function(err,user){})

          return res.json({
            reservation: user
          })
        }
        else {
          return res.status(401)
          .json({
            message: "Not Login"
          })
        }
      })

    }
  })
  */
});

app.get('/barbers/:id/reviews',(req,res)=>{

  /*
  var dummy_review_1 = [
    {
      id: 1,
      thumb: "/img/article1.png",
      reviewer: "박상욱",
      body: "너무 좋아요!!",
      rating: 5,
      createdAt: "2021-03-25T0912:00:00Z",
    },
    {
      id: 2,
      thumb: "/img/article2.png",
      reviewer: "이세",
      body: "맘에 쏙들어요!!",
      rating: 5,
      createdAt: "2021-05-22T0918:06:20Z",
    },
    {
      id: 3,
      thumb: "/img/article3.png",
      reviewer: "변찬혁",
      bdoy: "두발 규정에 맞게 잘 잘라줍니다",
      rating: 4,
      createdAt: "2021-06-16T0909:15:23Z",
    },
  ];

  var dummy_review_2 = [
    {
      id: 4,
      thumb: "/img/article1.png",
      reviewer: "강민구",
      body: "머리에 스크래치가 났어요",
      rating: 1,
      createdAt: "2021-09-18T0920:00:03Z",
    },
    {
      id: 5,
      thumb: "/img/article2.png",
      reviewer: "류서현",
      body: "나쁘지않아요",
      rating: 3,
      createdAt: "2021-10-01T0917:10:00Z",
    },
    {
      id: 6,
      thumb: "/img/article3.png",
      reviewer: "박찬현",
      bdoy: "간부님이 좋아하십니다",
      rating: 3,
      createdAt: "2021-10-01T0919:20:00Z",
    },
  ];

  var dummy_review_3 = [
    {
      id: 7,
      thumb: "/img/article1.png",
      reviewer: "김현민",
      body: "곱슬기가 사라졌습니다",
      rating: 5,
      createdAt: "2021-03-28T0920:00:00Z",
    },
    {
      id: 8,
      thumb: "/img/article2.png",
      reviewer: "김영인",
      body: "보통입니다",
      rating: 3,
      createdAt: "2021-03-29T0920:00:00Z",
    },
    {
      id: 9,
      thumb: "/img/article3.png",
      reviewer: "이동환",
      bdoy: "너무 잘 잘라요~~",
      rating: 5,
      createdAt: "2021-03-30T0921:00:00Z",
    },
  ];
  */

  Review.find({barbers_id: req.params.id},(err,review)=>{
    return res.json({
      reviews: review
    })
  })


});

app.post('/barbers/:id/reviews',(req,res)=>{
  var today = new Date();
  User.findOne({token: req.headers.authorization.split(' ')[1]},(err,user)=>{
    Review.insertMany({"barbers_id":req.params.id,"thumb":"","reviewer":user._id,"body":req.body.body,"rating":req.body.rating,"createdAt":today});
    return res.json({
      mss: "추가"
    })
  });


})

app.get('/reservations',(req,res)=>{
  User.findOne({token: req.headers.authorization.split(' ')[1]},(err,user)=>{
    Reservation.find({user_id:user._id},(err,reservation)=>{
      return res.json({
        reservations: reservation
      })
    })
  })
});

//DB 저장용
app.post('/createReserve',(req,res)=>{
  var user_id;
  User.findOne({token: req.headers.authorization.split(' ')[1]},(err,user)=>{
    user_id = user._id;
  });
  Reservation.insertMany({"year":req.body.year, "month":req.body.month,"date":req.body.day,"time":req.body.date,"barbers_id":req.params.id,"user_id":user_id,"description":req.body.description});
  return res.json({
    mss: "추가"
  })
})

app.post('/createBarbers',(req,res)=>{
  Barbers.insertMany({"title":req.body.title,"location":req.body.location,"longitude":req.body.longitude,"latitude":req.body.latitude,"rating":req.body.rating,"phone":req.body.phone,"thumb":req.body.thumb,"bookmarked":req.body.bookmarked,"weekdayHour":req.body.weekdayHour,"holidayHour":req.body.holidayHour,"description":req.body.description,"partnership":req.body.partnership});
  return res.json({
    mss: "추가"
  })
})

app.get('/DB',(req,res)=>{
  User.find({},(err,user)=>{
    Barbers.find({},(err,barbers)=>{
      Reservation.find({},(err,reservation)=>{
        Review.find({},(err,review)=>{
          Unit.find({},(err,unit)=>{
            return res.json({
              user: user,
              barbers: barbers,
              reservation: reservation,
              review: review,
              unit: unit
            })
          })
        })
      })
    })
  })
})

app.listen(port, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
});
