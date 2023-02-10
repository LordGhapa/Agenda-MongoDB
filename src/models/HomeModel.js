const mongoose=require('mongoose');
const HomeSchema=new mongoose.Schema({
  titulo:{type:String,required:true},
  QTD:{type:Number,required:true}
})

const HomeModel=mongoose.model("Home",HomeSchema);

//module.exports = HomeModel;

class Home{

}
module.exports = Home