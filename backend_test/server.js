const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const port = process.env.PORT || 3000;

//템플릿 엔진에 js 이용하려면 필요한 설정 views 폴더에 index.ejs 파일
app.set('view engine','ejs');

//body-parser를 미들웨어로 설정
app.use(bodyParser.urlencoded({ extended: true }));

const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',      //hostName
    user: 'nwcc',           //userID
    password: 'dco-3626!',  //password
    database: 'express_db'  //databaseName
});

//SQL 연결 상태 확인
con.connect(function(err){
    if(err) throw err;
    console.log('Connected');
});

//브라우저에 DB 데이터 표시
app.get('/',(req,res) => {
    const sql = "select * from users";
    con.query(sql,function(err,result,fields){
        if(err) throw err;
        res.render('index',{users : result});
    });
});

//브라우저에 DB 데이터 표시
app.post('/',(req,res) => {
    const sql = "INSERT INTO users SET ?";
    con.query(sql,req.body,function(err,result,fields){
        if(err) throw err;
        console.log(result);
        res.redirect('/');
    });
});

app.get('/create', (req,res) =>
    res.sendFile(path.join(__dirname,'html/form.html')))

app.get('/edit/:id',(req,res)=>{
    const sql = "SELECT * FROM users WHERE id = ?";
    con.query(sql,[req.params.id],function(err,result,fields){
        if(err) throw err;
        res.render('edit',{user : result});
    });
});

app.post('/update/:id',(req,res)=>{
    const sql = "UPDATE users SET ? WHERE id = " + req.params.id;
    con.query(sql,req.body,function(err,result,fields){
        if(err) throw err;
        console.log(result);
        res.redirect('/');
    });
});

//웹에서 delete 를 클릭했을 때 동작
app.get('/delete/:id',(req,res)=>{
    const sql = "DELETE FROM users WHERE id = ?";
    //req.params.id 로 삭제할 행 선택
    con.query(sql,[req.params.id],function(err,result,fields){
        if(err) throw err;
        console.log(result);
        //작업 이후에 루트로 복귀
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
});
