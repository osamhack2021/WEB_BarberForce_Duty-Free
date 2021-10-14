const express = require('express');
const app = express();
const port = 3306;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const url = require('url')
const cors = require('cors');
const path = require('path');
const request = require('request-promise');
const axios = require('axios');

const key = require('./auth/key');
const moment = require('./moment');
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
  try{
    var check = jwt.verify(req.headers.authorization.split(' ')[1],"secretToken");
    if(check){
      console.log("검증",check.test);
    }
  } catch(e){
    console.log(e);
  }


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
        barbers: barbers.slice(0,req.query.limit)
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
      location_detail:barbers.location_detail,
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
    /*
    //Date 늘렷거가면서 탐색하고 없으면 집어넣는 식으로
    */
    var list = new Array(31);
    for(i=0;i<list.length;i++){
      var time = new Array();
      list[i] = {day: i+1, time: {'18:00': false, '18:30': false, '19:00': false,'19:30':false,'20:00':false,'20:30':false}}
    }
    for(i=0;i<reservation.length;i++){
      var time = moment(new Date(reservation[i].time)).format('HH') + ':' + moment(new Date(reservation[i].time)).format('mm');
      list[reservation[i].day-1].time[time] = true;
    }

    return res.json({
      reservations: list
    })

  })

});

app.post('/barbers/:id/reservations',(req,res)=>{
  //var time =
  User.findOne({token: req.headers.authorization.split(' ')[1]},(err,user)=>{
    Reservation.insertMany({"year":req.body.year,"month":req.body.month,"day":req.body.day,"time":req.body.time,"barbers_id":req.params.id,"user_id":user._id,"userName":user.name,"description":req.body.description});
    return res.json({
      mss: "추가"
    })
  })
});

app.get('/barbers/:id/reviews',(req,res)=>{
  Review.find({barbers_id: req.params.id},(err,review)=>{
    return res.json({
      reviews: review
    })
  })


});

app.post('/barbers/:id/reviews',(req,res)=>{
  var today = new Date();
  User.findOne({token: req.headers.authorization.split(' ')[1]},(err,user)=>{
    Review.insertMany({"barbers_id":req.params.id,"thumb":"","reviewer":user.name,"body":req.body.body,"rating":req.body.rating,"createdAt":today});
    return res.json({
      mss: "추가"
    })
  });


})

app.get('/reservations',(req,res)=>{
  User.findOne({token: req.headers.authorization.split(' ')[1]},(err,user)=>{
    Reservation.find({user_id:user._id},(err,reservation)=>{
      return res.json({
        reservations: reservation.sort(reservation.time)
      })
    })
  })
});

app.get('/kakao/callback?code=KAKAO_CODE',(req,res)=>{

})

app.get('/kakao/access',(req,res)=>{

  var code = req.query.code;

  const options = {
    uri: "https://kauth.kakao.com/oauth/token",
    method: "POST",
    form:{
        grant_type : "authorization_code",
        client_id : "41fec2d017836a2bbb48d0b32f7983b0",
        redirect_uri: "https://api.barberforce.shop/kakao/access",
        code: code
    },
    headers: {
        "content-type" : "application/x-www-form-urlencoded"
    },
    json: true
  }

  var accessToken;
  var email;
  var name;

  var out1 = request(options , function(error, response, body){
    accessToken = body.access_token;
    const verify = {
      uri: "https://kapi.kakao.com/v1/user/access_token_info",
      method: "GET",
      headers: {
        "Authorization" : "Bearer " + accessToken,
      },
      json: true
    }

    var out2 = request(verify, function(err,response,body){
      if(err){
        return res.json({
          verify: err
        })
      }
      const instance = {
        uri: "https://kapi.kakao.com/v2/user/me",
        method: "POST",
        headers: {
          "Authorization" : "Bearer " + accessToken
        },
        json: true
      }



      var out2 = request(instance, function(err,response,body){
        if(err){
          return res.json({
            err: err
          })
        }
        //값 체크
        else{
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
          User.findOne({email:email},(err,user)=>{
            //DB에 존재하는 사용자인 경우
            if(user){
              user.generateToken((err, user)=>{
                var url = "https://barberforce.shop/kakao/callback?token=" + user.token;
                if(err) {return res.status(401).send(err);}
                else {return res.redirect(url)}
              });
            }
          })

          //DB에 존재하지 않는 사용자인 경우
          var user = new User();
          user.email = email;
          user.name = name;
          user.token = "";
          user.soldier_id = null;
          user.password = null;

          user.save(function(err){
            if(err){
              return res.json({
                error: err
              })
            }
          })


          user.generateToken((err, user)=>{

            var url = "https://barberforce.shop/kakao/callback?token=" + user.token + "&fisrt=1";
            if(err) {return res.status(401).send(err);}
            else {return res.redirect(url)}

          });

          //User.insertMany({"email":email,"name":name,"token":"","password":null,"soldier_id":null});
          /*
          User.find({},(err,user2)=>{
            return res.json({
              user: user2,
              error: err
            })
            /*
            user.generateToken((err, user)=>{
                var url = "https://barberforce.shop/kakao/additional?token=" + user.token;
              if(err) {return res.status(401).send(err);}
              else {return res.redirect(url)}
            });

          })

          /*
          return res.json({
            code: code,
            accessToken: accessToken,
            name: name,
            email: email
          })
          */
        }
      })
    })
  })






})

app.post('/kakao/register',(req,res)=>{

})



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
  Barbers.insertMany({"title":req.body.title,"location":req.body.location,"location_detail":req.body.location_detail,"rating":req.body.rating,"phone":req.body.phone,"thumb":req.body.thumb,"bookmarked":req.body.bookmarked,"weekdayHour":req.body.weekdayHour,"holidayHour":req.body.holidayHour,"description":req.body.description,"partnership":req.body.partnership});
  return res.json({
    mss: "추가"
  })
})

app.post('/createUnit',(req,res)=>{
  Unit.insertMany({"unitName":req.body.unitName, "soldier_id":req.body.soldier_id,"barbers_id":req.body.barbers_id});
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
              User: user,
              Barbers: barbers,
              Reservation: reservation,
              Review: review,
              Unit: unit
            })
          })
        })
      })
    })
  })
})

app.get('/dataTest',(req,res)=>{
  var date = moment(new Date()).format('HH:mm');
  return res.json({
    date: date
  })
})

app.listen(port, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
});
