console.log('v')
var xhr = new XMLHttpRequest(); 

function custom(){
var name=document.getElementById('name').value
var email=document.getElementById('email').value
var brief=document.getElementById('brief').value
var slct=document.getElementById('slct').value
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