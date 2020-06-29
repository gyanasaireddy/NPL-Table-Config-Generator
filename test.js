var fs=require("fs")
var string;
fs.readFile("file.txt",function(err,data){
  string=JSON.parse(data)
  console.log(string[0])


})