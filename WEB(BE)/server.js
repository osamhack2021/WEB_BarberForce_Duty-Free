const express = require('express');
const app = express();
const port = 3306;
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');

const authRouter = require('./routes/auth');
const socialLoginRouter = require('./routes/socialLogin');
const barbersRouter = require('./routes/barbers');
const reservationsRouter = require('./routes/reservations');
const reviewsRouter = require('./routes/reviews');
const developRouter = require('./routes/develop');
const profileRouter = require('./routes/profile');
const boardsRouter = require('./routes/boards');

db();

//app.use('/',route);

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
  });
});

app.use('', authRouter);
app.use('', socialLoginRouter);
app.use('', barbersRouter);
app.use('', reservationsRouter);
app.use('', reviewsRouter);
app.use('', developRouter);
app.use('', profileRouter);
app.use('', boardsRoueter)

app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});
