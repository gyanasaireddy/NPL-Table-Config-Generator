var express=require("express"),
    bop=require("body-parser"),
    mongoose=require("mongoose"),
    clone=require("clone"),
    fs=require("fs"),
    methodOverride=require("method-override")
var app=express();
var table=require("./models/table"),
    key=require("./models/keys"),
    field=require("./models/fields");
const keys = require("./models/keys");
const fields = require("./models/fields");
var seed=require("./seed.js")

// ----------------------------------
mongoose.connect("mongodb://127.0.0.1:50430/cf4648b3-b0a5-4784-adfb-6436e11f6923?",{ useUnifiedTopology: true,
useNewUrlParser: true});

app.set("view engine","ejs")
app.use(bop.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"))//to use public directory
app.use(methodOverride("_method"))

seed()
// home page
app.get("/",function(req,res){
  res.redirect("/table")
})

// index route
app.get("/table",function(req,res){
    table.find({},function(err,event){
      if(err){
        console.log(err)
      }
      else {
          res.render("select",{table:event})
      }
  })
})

// new table route
app.get("/table/new",function(req,res){
  res.render("Ctable");
})

// Create table route
app.post("/table",function(req,res){
  var tabl={
    tName:req.body.table,
    type:req.params.type,
    keys:{
      name:req.body.key},
    fields:{
      name:req.body.field}
  }
    table.create(tabl,function(err,Table){
      if(err){
        console.log(err)
      }
      console.log("#################")
      console.log(Table)
      console.log("#################")

      res.redirect("/table")
      
    })
})

//show table value
app.get("/table/:id",function(req,res){
  table.findById(req.params.id).populate(['keys.value','fields.value']).exec(function(err,foundTable){
      console.log("~~~~~~~~~~~~~~~KEYS~~~~~~~~~~~~~~~~~~~~~~~~")
      console.log(foundTable);
      res.render("show",{table:foundTable})
  })
})

// Value Insert table
app.get("/table/:id/value/new",function(req,res){
  table.findById(req.params.id,function(err,event){
    if(err){
      console.log(err)
    }
    else{
      console.log(event)
      res.render("insert",{table:event})
    }
  })
})

// value save route
app.post("/table/:id/value",function(req,res){
      var Key={
        name:req.body.key,
        value:req.body.keyValue
      }
      var Field={
        name:req.body.field,
        value:req.body.fieldValue
      }
          key.create(Key,function(err,createKey){
            console.log(createKey)
            table.findById(req.params.id,function(err,foundTable){
              foundTable.keys.value.push(createKey)
              foundTable.save(function(err,data){
                if(err){
                  console.log(err)
                }else{
                  console.log(data)
                }
              })
            })
          })
          field.create(Field,function(err,createField){
            console.log(createField)
            table.findById(req.params.id,function(err,foundTable){
               foundTable.fields.value.push(createField)
               foundTable.save(function(err,data){
                 console.log(data)
               })
            })
          })
          res.redirect("/table/"+req.params.id)
})

app.delete("/table/:id",function(req,res){
    table.findByIdAndRemove(req.params.id,function(err,event){
      if(err){
        console.log(err)
      }
        res.redirect("/");
        console.log("TABLE DELETED")
    })
})

//create the line route
app.get("/file",function(req,res){
    var line='';
    table.find({}).populate(['keys.value','fields.value']).exec(function(err,allTables){
      // function to generate lines for each table
        allTables.forEach(function(Table){
          //temporary variables for storing values
          var tableName=Table.tName;
          var typet=Table.type;
          var keyName=Table.keys.name;
          var keyArray=new Array()
          var fieldArray=new Array()
          console.log("Table Name")
          console.log(keyName)
          var fieldName=Table.fields.name;
          console.log(fieldName)
            line='# '+tableName+':'+'INDEX'+';'+'keys: ';
            var temp=keyName.join("|")
            line+=temp;
            console.log("###########################")
            // console.log(Table.keys.value[0].value[0])
            console.log("###########################")

            // for making the key and value pair for all lines
              var Key=new Array();
              var temp1='';
              for(let i=0;i<Table.keys.value.length;i++){
                for(let j=0;j<keyName.length;j++){
                    temp1+=keyName[j]+'='+Table.keys.value[i].value[j]
                }
                Key.push(temp1)
                var temp1='';
                console.log(temp1)
              }
              console.log("~~~~~~~~~~~~~~~~~~~~~~~")
              console.log(Key);
              // for making field value pair
              var Field=new Array();
              var temp2='';
              for(let i=0;i<Table.fields.value.length;i++){
                for(let j=0;j<fieldName.length;j++){
                  temp2+=fieldName[j]+'='+Table.fields.value[i].value[j]
                }
                Field.push(temp2)
                var temp2=''
                console.log(temp2)
              }
              console.log("~~~~~~~~~~~~~~~~~~~~~~~")
              console.log(Field);
               
              for(let i=0;i<Key.length;i++){
                line+="\nlt "+tableName+" insert "+Key[i]+' '+Field[i]
                console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
                console.log(line)
              }

              Table.line=line
              Table.save(function(err,data){
                console.log(data);
              })
        })
        res.render("view",{table:allTables})
     })
})
var genLine='';

app.get("/file/download",function(req,res){


  // fs.writeFile("tbl_cfg.txt",'',function(err){})//to clear the text file
  
  table.find({},function(err,Table){
    Table.forEach(function(event){
      genLine+=event.line
      genLine+='\n\n'
      fs.writeFile('tbl_cfg.txt',genLine, (err) => {
        if (err) throw err;
        console.log('Appended');
    });
    })
  })
const rem = require("./remove");
  var string="# indicate ingress packets don't have crc\npkt_has_crc 0\n# disable crc regeneration\ncrc_gen_en 0";
  fs.appendFile("tbl_cfg.txt",string,function(err){
    console.log("data added")
  })
    res.download('tbl_cfg.txt')
  })


app.listen(3000,function(){
  console.log("server has started")
})