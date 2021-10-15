const mongoose = require('mongoose');

module.exports = () => {
  function connect() {
    //mongoose.connect('mongodb://34.64.179.55:27017',function(err){
    mongoose.connect('mongodb://localhost:27017', function (err) {
      if (err) {
        console.error('mongodb connection err', err);
      }
      console.log('mongodb connected');
    });
  }

  connect();
  mongoose.connection.on('disconnected', connect);

  require('./models/user');
  require('./models/reservation');
  require('./models/barber');
  require('./models/review');
  require('./models/unit');
};
