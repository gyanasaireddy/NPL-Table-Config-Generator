var table=require("./models/table"),
    key=require("./models/keys")
    field=require("./models/fields")

function rem(){

  table.deleteMany({},function(err,event){
    console.log("tables removed")
    key.deleteMany({},function(err,event){
      console.log("keys removed")
      field.deleteMany({},function(err,event){
        console.log("fields removed")
      })
    })
  })
}

module.exports=rem

