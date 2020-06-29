var mongoose=require("mongoose")
 var keySchema=new mongoose.Schema({
   value:[String]
 })
module.exports=mongoose.model("key",keySchema);
