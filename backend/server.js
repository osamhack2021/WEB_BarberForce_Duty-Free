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
db();
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

app.listen(port, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
});

//dfdf
