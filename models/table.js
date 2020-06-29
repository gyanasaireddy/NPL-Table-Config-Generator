var mongoose=require("mongoose");


var tableSchema=new mongoose.Schema({
  tName:String,
  line:String,
  type:String,
  keys:{
    value:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"key"
    }],
    name:[String]
  },
  fields:{
    value:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"field"
    }],
    name:[String]
  }
  
})
module.exports=mongoose.model("table",tableSchema);