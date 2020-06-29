var fs=require("fs");
var table=require("./models/table");


function seedDB(){
fs.readFile("file.txt",function(err,data){
        var str=JSON.parse(data)
        for(let i=0;i<str.length;i++){
          table.create({
            tName:str[i].name,
            type:str[i].type,
            keys:{
              name:str[i].keys
            },
            fields:{
              name:str[i].fields
            },
          },function(err,data){
            console.log("data created")
          })
        }
      })
}

module.exports=seedDB;