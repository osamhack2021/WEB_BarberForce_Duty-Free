const express = require('express');
const app = express();
const port = 3306;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
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
                    userId: user._id
            });
        });
    });
  });
});

app.post('/register',(req,res)=>{
  User.findOne({email: req.body.email}, (err,user)=>{
    console.log('email ck');
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
      console.log('pass ck');
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

/*
app.get('/login',(req,res) =>{

})

app.get('/register',(req,res) =>{

})

app.get('/me',(req,res) =>{

})

*/

app.listen(port, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
});

//dfdf
