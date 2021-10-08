const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  year: Number,
  month: Number,
  date: Number,
  //time: {[mongoose.Schema.Types.ObjectedId], },     //ObjectedId 만 넣을 수 있,
  //{ 예약여부, 예약 미용실 id, 예약자 성함 }
  _1800: [{ type: String, default: ["false","",""]}],
  _1830: [{ type: String, default: ["false","",""]}],
  _1900: [{ type: String, default: ["false","",""]}],
  _1930: [{ type: String, default: ["false","",""]}],
  _2000: [{ type: String, default: ["false","",""]}],
  _2030: [{ type: String, default: ["false","",""]}],
  description: { type: String, default: ""}

});

reservationSchema.methods.timespan=function(barbers_id){
  if(user._1800[1]==barbers_id)return "_1800";
  else if(user._1830[1]==barbers_id)return "_1830";
  else if(user._1900[1]==barbers_id)return "_1900";
  else if(user._1930[1]==barbers_id)return "_1930";
  else if(user._2000[1]==barbers_id)return "_2000";
  else if(user._2030[1]==barbers_id)return "_2030";
}

reservationSchema.methods.update=function(status){
    const reserve = this;
    reserve.description = status;
}

module.exports = mongoose.model('Reservation', reservationSchema);
