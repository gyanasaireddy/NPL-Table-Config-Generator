var mongoose=require("mongoose")
 var fieldSchema=new mongoose.Schema({
   value:[String]
 })
module.exports=mongoose.model("field",fieldSchema);
