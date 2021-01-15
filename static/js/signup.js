const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
var otprec=''
sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
function load() {
  setTimeout( function() {
    $(".modal-backdrop").addClass("modal-backdrop-fullscreen");
  }, 0);
}
function closeload() {
  $(".modal-backdrop").addClass("modal-backdrop-fullscreen");
}
function Signup(){
  let un=document.getElementById('username').value
  let email=document.getElementById('email').value
  let pass=document.getElementById('password').value
  let conpass=document.getElementById('confirmpassword').value
  let otp=document.getElementById('otp').value
  if(String(otp)!=String(otprec)){
    document.querySelector('.m3').innerHTML=` <div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Invalid Verification code.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  `
  return
  }
  document.querySelector('.otpvar').innerHTML=`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`

  // fetching item on cart via ajax
  var xhr = new XMLHttpRequest();
    xhr.open('POST', '/ajaxsignup');
    xhr.setRequestHeader('X-CSRFToken', csrftoken);       
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.setRequestHeader("Accept", "application/json");
  
  xhr.send(JSON.stringify({'username':un,'email':email,'pass':pass,'conpass':conpass}));
  xhr.onload = function() {

    if (xhr.status != 200) { 
      alert(`Error ${xhr.status}: ${xhr.statusText}`); 
    } else { 
    
    if(JSON.parse(xhr.responseText)['error']===undefined){
      window.location.href='/'
    }
    else{
      document.querySelector('.m3').innerHTML=` <div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Failed ! ${JSON.parse(xhr.responseText)['error']}.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    `
    document.querySelector('.otpvar').innerHTML+=`SIGN UP`

    }
  }
  
  };
  
  xhr.upload.onprogress = function(event) {
    if (event.lengthComputable) {
    } else {
   
    }
  
  };
  
  xhr.onerror = function() {
    alert("Request failed");
  };
  
  
  }
function sendOtp(elem){
  let un=document.getElementById('username').value
  let email=document.getElementById('email').value
  let pass=document.getElementById('password').value
  let conpass=document.getElementById('confirmpassword').value
  
  // fetching item on cart via ajax
  var xhr1 = new XMLHttpRequest();
    xhr1.open('POST', '/sendotp');
    xhr1.setRequestHeader('X-CSRFToken', csrftoken);       
    xhr1.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr1.setRequestHeader("Accept", "application/json");
    
    document.querySelector('.getotp').innerHTML=`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`
  xhr1.send(JSON.stringify({'username':un,'email':email,'pass':pass,'conpass':conpass}));

  xhr1.onload = function() {

    if (xhr1.status != 200) { 
      alert(`Error ${xhr1.status}: ${xhr1.statusText}`); 
    } else { 
  
    if(JSON.parse(xhr1.responseText)['error']===undefined){
      document.querySelector('.getotp').innerHTML='SIGN UP'
      $('#myModal').modal('show')
      otprec=JSON.parse(xhr1.responseText)['success']
    
    }
    else{
    
      document.querySelector('.message').innerHTML=`<div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Failed ! ${JSON.parse(xhr1.responseText)['error']}.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    `
    document.querySelector('.getotp').innerHTML='SIGN UP'

    }
  }
  
  };
  xhr1.upload.onloadstart=function(){

  }
  xhr1.upload.onprogress = function(event) {
    if (event.lengthComputable) {
      
    } else {
   
    }
  
  };
  
  xhr1.onerror = function() {
    alert("Request failed");
  };
  
  
  }
function Signin(elem){
  
  let un=document.getElementById('lusername').value
  let pass=document.getElementById('lpassword').value
  // fetching item on cart via ajax
  var xhr = new XMLHttpRequest();

  
    xhr.open('POST', '/ajaxsignin');
    xhr.setRequestHeader('X-CSRFToken', csrftoken);       
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.setRequestHeader("Accept", "application/json");
  xhr.send(JSON.stringify({'user':un,'pass':pass}));
  document.querySelector('.dsin').innerHTML=`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`

  xhr.onload = function() {
    
    if (xhr.status != 200) {
      alert(`Error ${xhr.status}: ${xhr.statusText}`); 
      elem.innerHTML=`SIGN IN`
    } else { 
      console.log(JSON.parse(xhr.responseText)['error'])
      console.log(JSON.parse(xhr.responseText)['success'])
      if(JSON.parse(xhr.responseText)['error']===undefined){
        window.location.href='/'
      }
      else{
        document.querySelector('.message2').innerHTML=`<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Failed ! ${JSON.parse(xhr.responseText)['error']}.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      ` 
      elem.innerHTML=`SIGN IN`

    }
    
  }
  };
  
  xhr.upload.onprogress = function(event) {
    if (event.lengthComputable) {
  
    } else { 
    }
  };
  
  xhr.onerror = function() {
    alert("Request failed");
  };
  }


  
  



  
  

