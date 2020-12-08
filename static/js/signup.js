const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

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
     closeload()
     window.location.href='/'
  }
  
  };
  
  xhr.onprogress = function(event) {
    if (event.lengthComputable) {
     
      load()
    } else {
   
    }
  
  };
  
  xhr.onerror = function() {
    alert("Request failed");
  };
  
  
  }
function Signin(){
  let un=document.getElementById('lusername').value
  let pass=document.getElementById('lpassword').value
console.log(un,pass)
  // fetching item on cart via ajax
  var xhr = new XMLHttpRequest();
    xhr.open('POST', '/ajaxlogin');
    xhr.setRequestHeader('X-CSRFToken', csrftoken);       
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.setRequestHeader("Accept", "application/json");
  
  xhr.send(JSON.stringify({'username':un,'password':pass}));
  xhr.onload = function() {
    
    if (xhr.status != 200) { 
      alert(`Error ${xhr.status}: ${xhr.statusText}`); 
    } else { 
     closeload()
     window.location.href='/'
  }
  };
  
  xhr.onprogress = function(event) {
    if (event.lengthComputable) {
      load()
    } else { 
    }
  };
  
  xhr.onerror = function() {
    alert("Request failed");
  };
  
  }


  +
/* Open */
$(".modal-transparent").on('show.bs.modal', function () {
  setTimeout( function() {
    $(".modal-backdrop").addClass("modal-backdrop-transparent");
  }, 0);
});
$(".modal-transparent").on('hidden.bs.modal', function () {
  $(".modal-backdrop").addClass("modal-backdrop-transparent");
});

$(".modal-fullscreen").on('show.bs.modal', function () {
  setTimeout( function() {
    $(".modal-backdrop").addClass("modal-backdrop-fullscreen");
  }, 0);
});
$(".modal-fullscreen").on('hidden.bs.modal', function () {
  $(".modal-backdrop").addClass("modal-backdrop-fullscreen");
});
