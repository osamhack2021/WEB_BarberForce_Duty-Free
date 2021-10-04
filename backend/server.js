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
        mess: req.body.email,
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
                    loginSuccess: true,
                    userId: user._id
            });
        });
    });
  });
});

app.get('/login',(req,res)=>{
  res.send(req.body);
})

app.post('/check_login',(req,res)=>{
  const token = req.body['jwt'];

  jwt.verify(token,key,(err,decoded)=>{
    if(!err && decoded.username == 'root')
    {
      res.send('로그인이 되어있으시네요!');
    }
    else{
      res.send('저런, 로그인이 되어있지 않네요.');
    }
  });
//
});
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
