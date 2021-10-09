const mongoose = require('mongoose');

module.exports = () => {
  function connect(){
    mongoose.connect('mongodb://34.64.179.55:27017',function(err){
      if(err){
        console.error('mongodb connection err',err);
      }
      console.log('mongodb connected');
    });
  }

  connect();
  mongoose.connection.on('disconnected',connect);

  require('./user');
  require('./reservation');
  require('./barbers');
};
