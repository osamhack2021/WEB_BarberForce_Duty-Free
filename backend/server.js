const express = require('express');
const app = express();
const port = 3306;
//const bodyParser = require('body-parser');
//const ejs = require('ejs');
const path = require('path');
const db = require('./db.js');
const route = require('./route.js');

app.set('view engine','pug');
app.set('views',path.join(__dirname,'Form.html'));
db();
app.use(express.static(path.join(__dirname,'Form.html')));
app.use('/',route);

/*
app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});
*/

app.get('/login',(req,res) =>{

})

app.get('/register',(req,res) =>{

})

app.get('/me',(req,res) =>{

})

app.listen(port, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
});

//dfdf
