const express = require('express');
const app = express();
const port = 3306;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const url = require('url')
const key = require('./auth/key');
//const ejs = require('ejs');
const path = require('path');
const db = require('./db');
const User = require('./user');

//const route = require('./route.js');

//app.set('view engine','pug');
//app.set('views',path.join(__dirname,'Form.html'));
//db();
//app.use(express.static(path.join(__dirname,'Form.html')));
//app.use('/',route);

app.use(bodyParser.json());
/*
app.get('/',function(req,res){
  console.log(req.body);
    res.send(req.body);
});

app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});
*/

app.get('/',(req,res)=>{
  User.find({})
  .then( users=>{
    res.send(users);
  });
})


app.post('/login',(req,res)=>{
  User.findOne({email: req.body.email}, (err,user)=>{
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "Unvalid email"
      });
    }
    user.comparePassword(req.body.password, (err, isMatch)=>{
      if(!isMatch)
        return res.json({
          loginSuccess:false,
          message: "Wrong password"
        });
        user.generateToken((err, user)=>{
                if(err) return res.status(400).send(err);
                // 토큰을 쿠키에 저장
                res.cookie("x_auth", user.token)
                .status(200)
                .json({
                    //loginSuccess: true,
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
      return res.json({
        registerSuccess: false,
        message: "Existing email"
      });
    }

    User.findOne({soldier_id: req.body.soldier_id}, (err,user)=>{
      //이미 사용중인 군번인 경우
      if(user){
        return res.json({
          registerSuccess: false,
          message: "Existing soldier_id"
        })
      }
      User.insertMany([{ "email": req.body.email, "password": req.body.password, "passowrd_confirm": req.body.passowrd_confirm, "name": req.body.name, "soldier_id": req.body.soldier_id}],
        function(err, result) {
          if(err){
            callback(err,null);
            return;
          }

          User.findOne({email: req.body.email}, (err,user)=>{
            if(user){
              console.log('사용자 추가 완료');
              return res.json({
                registerSuccess: true
              })
            }
            else{
              console.log('사용자 추가 실패');
              return res.json({
                registerSuccess: false
              })
            }
          })
        }
      )
    })
  })
})

app.get('/me',(req,res) =>{
  User.findOne({token: req.headers.authorization}, (err,user)=>{
    if(user){
      return res.json({
        name: user.name,
        email: user.email
      })
    }
    else {
      return res.json({
        message: "Not Login"
      })
    }
  })
})

app.get('/barbers',(req,res) =>{
  /*
  User.find({token: req.headers.authorization}, (err,user)=>{

    var barbers = user;
    return res.json({
      barbers: barbers
    })

  })
  */
  var dummmy_barber =
  [
    {
      id: 0,
      title: "Yang's Barber Shop",
      location: "보라매 사동",
      rating: 5,
      bookmarked: true
    },
    {
      id: 1,
      title: "송탄이발소",
      location: "송탄역",
      rating: 3,
      bookmarked: false
    },
    {
      id: 2,
      title: "머리 잘하는 집",
      location: "송탄출장소",
      rating: 4,
      bookmarked: false
    },
    {
      id: 3,
      title: "송탄 미용실",
      location: "K-55 정문",
      rating: 2,
      bookmarked: false
    },
    {
      id: 4,
      title: "머리 잘깎아주는 예쁜 누나",
      location: "경기도 평택시 고덕북로 77",
      rating: 5,
      bookmarked: true
    }
  ]

  var barbers = dummmy_barber.slice(0,req.query.limit);


  return res.json({
    Barbers: barbers
  })
})

app.get('/barbers/:id',(req,res)=>{
  var dummmy_barber =
  [
    {
      id: 0,
      title: "Yang's Barber Shop",
      location: "보라매 사동",
      location_detail: {
        longitude: 0,
        latitude: 0
      },
      rating: 5,
      bookmarked: true
    },
    {
      id: 1,
      title: "송탄이발소",
      location: "송탄역",
      location_detail: {
        longitude: 37.07575,
        latitude: 127.05439
      },
      rating: 3,
      bookmarked: false
    },
    {
      id: 2,
      title: "머리 잘하는 집",
      location: "송탄출장소",
      location_detail: {
        longitude: 37.06668,
        latitude: 127.06495
      },
      rating: 4,
      bookmarked: false
    },
    {
      id: 3,
      title: "송탄 미용실",
      location: "K-55 정문",
      location_detail: {
        longitude: 37.07944,
        latitude: 127.05071
      },
      rating: 2,
      bookmarked: false
    },
    {
      id: 4,
      title: "머리 잘깎아주는 예쁜 누나",
      location: "경기도 평택시 고덕북로 77",
      location_detail: {
        longitude: 37.07341,
        latitude: 127.03178
      },
      rating: 5,
      bookmarked: true
    }
  ]
  return res.json({
    id: dummmy_barber[req.params.id].id,
    title: dummmy_barber[req.params.id].title,
    location: dummmy_barber[req.params.id].location,
    location_detail: dummmy_barber[req.params.id].location_detail,
    rating: dummmy_barber[req.params.id].rating,
    bookmarked: dummmy_barber[req.params.id].bookmarked
  })
})

app.get('/barbers/:id/reviews',(req,res)=>{

  var dummy_review_1 =
  [
      {
        reviewer: "박상욱",
        body: "너무 좋아요!!",
        rating: 5,
        createdAt: "2021-03-25T0912:00:00Z"
      },
      {
        reviewer: "이세",
        body: "맘에 쏙들어요!!",
        rating: 5,
        createdAt: "2021-05-22T0918:06:20Z"
      },
      {
        reviewer: "변찬혁",
        bdoy: "두발 규정에 맞게 잘 잘라줍니다",
        rating: 4,
        createdAt: "2021-06-16T0909:15:23Z"
      }
  ]

  var dummy_review_2 =
  [
        {
          reviewer: "강민구",
          body: "머리에 스크래치가 났어요",
          rating: 1,
          createdAt: "2021-09-18T0920:00:03Z"
        },
        {
          reviewer: "류서현",
          body: "나쁘지않아요",
          rating: 3,
          createdAt: "2021-10-01T0917:10:00Z"
        },
        {
          reviewer: "박찬현",
          bdoy: "간부님이 좋아하십니다",
          rating: 3,
          createdAt: "2021-10-01T0919:20:00Z"
        }
  ]

  var dummy_review_3 =
  [
        {
          reviewer: "김현민",
          body: "곱슬기가 사라졌습니다",
          rating: 5,
          createdAt: "2021-03-28T0920:00:00Z"
        },
        {
          reviewer: "김영인",
          body: "보통입니다",
          rating: 3,
          createdAt: "2021-03-29T0920:00:00Z"
        },
        {
          reviewer: "이동환",
          bdoy: "너무 잘 잘라요~~",
          rating: 5,
          createdAt: "2021-03-30T0921:00:00Z"
        }
  ]

  if(req.params.id==0){
    return res.json({
      id: req.params.id,
      reviewer: dummy_review_1
    })
  }
  else if(req.params.id==1){
    return res.json({
      id: req.params.id,
      reviewer: dummy_review_2
    })
  }
  else{
    return res.json({
      id: req.params.id,
      reviewer: dummy_review_3
    })
  }

})

app.listen(port, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
});
