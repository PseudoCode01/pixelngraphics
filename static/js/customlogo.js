console.log('v')
var xhr = new XMLHttpRequest(); 

function custom(){
var name=document.getElementById('name').value
var email=document.getElementById('email').value
var brief=document.getElementById('brief').value
var slct=document.getElementById('slct').value+' : '+document.getElementById('slct2').value
console.log(name,email,brief,slct)
xhr.open('POST', '/addcustom',true);
xhr.setRequestHeader('X-CSRFToken', csrftoken);     

xhr.onload=function(){
if(xhr.status!=200){

}  
else{
//   document.querySelector('.spinbutton').innerHTML=`GO TO CART`
document.querySelector('.spinbutton').innerHTML=`SUBMIT`
document.querySelector('.message').innerHTML=`<div class="alert alert-success alert-dismissible fade show" role="alert">
<strong>Success ! Your order for custom logo is successfully placed.
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
</div>`
}

}
xhr.upload.onloadstart=function(e){

}
xhr.upload.onprogress = function(e) {
if (e.lengthComputable) {
document.querySelector('.spinbutton').innerHTML+=`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`
} else {

}

};
xhr.send(JSON.stringify({'name':name,'email':email,'brief':brief,'budget':slct}));
xhr.onerror = function() {
alert("Request failed");
};
}
function budget(val){
  console.log(val)
  document.querySelector('.select2').style.display='block'
  document.querySelector('.bug').style.display='block'
if(val=='Logo'){
  document.querySelector('.select2').innerHTML=`  <select name="slct2" id="slct2" >
  <option selected disabled>Please Select</option>
  <option value="Less than 25$">Less than 25$</option>
  <option value="25$ to 50$">25$ to 50$</option>
  <option value="more than 50$">more than 50$</option>
</select>`
}
if(val=='Custom Emojis'){
  document.querySelector('.select2').innerHTML=`  <select name="slct2" id="slct2" >
  <option selected disabled>Please Select</option>
  <option value="less than 25$">less than 25$</option>
  <option value="more than 50$">more than 50$</option>
</select>`
}
if(val=='Banner'){
  document.querySelector('.select2').innerHTML=`  <select name="slct2" id="slct2" >
  <option selected disabled>Please Select</option>
  <option value="less than 20$">less than 20$</option>
  <option value="20$ to 30$">20$ to 30$</option>
  <option value="more than $30">more than $30</option>
</select>`}
if(val=='Stream Overlay'){
  document.querySelector('.select2').innerHTML=`  <select name="slct2" id="slct2" >
  <option selected disabled>Please Select</option>
  <option value="50$ to 70$">50$ to 70$</option>
  <option value="more than $70">more than $70</option>
</select>`
}

}
