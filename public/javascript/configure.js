var addMore=document.querySelector("#addMore");
var add=document.querySelector("#add");
var addMoreFields=document.querySelector("#addMoreF");
var addF=document.querySelector("#addF");
var keyValue=document.querySelector("#keyValue");
var fieldValue=document.querySelector("#fieldValue");

var key=1,field=1;
console.log("###############")
console.log(keyValue)
console.log(fieldValue)
console.log(key,field)
console.log("###############")

addMore.addEventListener("click",function(){
  var new_input="<input type="+'"text" '+ "class="+"'form-control' "+ "name="+'"key[]" '+ "required" +'>'
  add.innerHTML+=(new_input)
  // var new_input_value="<input type="+'"text" '+ "class="+"'form-control' "+ "name="+'"keyValue[]" '+ "required" +'>'
  console.log(new_input)
  key++
  // console.log(new_input_value)
  // keyValue.innerHTML+=new_input_value
  // function addk()
  
})

addMoreFields.addEventListener("click",function(){
  var new_input="<input type="+'"text" '+ "class="+"'form-control' "+ "name="+'"field[]" '+ "required" +'>'
 
  console.log(new_input)
  addF.innerHTML+=new_input
  // var new_input_value="<input type="+'"text" '+ "class="+"'form-control' "+ "name="+'"fieldValue[]" '+ "required" +'>'
  // fieldValue.innerHTML+=new_input_value
  console.log(new_input)
  field++
  // console.log(new_input_value)
  // function addf()
})