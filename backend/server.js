const express = require('express');
const app = express();
const port = 3000;
//const bodyParser = require('body-parser');
//const ejs = require('ejs');
//const path = require('path');


app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});

app.get('/login',(req,res) =>{

})

app.get('/register',(req,res) =>{

})

app.get('/me',(req,res) =>{

})

app.listen(port, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
});
