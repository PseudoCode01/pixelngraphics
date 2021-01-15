function Tomorrow(date=false) {
    var givendate = (date!=false) ? new Date(date) : new Date();
    givendate.setDate(givendate.getDate() + 1);
    var day = givendate.getUTCDate()
    var month = givendate.getUTCMonth()+1
    var year = givendate.getUTCFullYear()
    result ="<b>" + day + "/" + month + "/" + year + "</b>";
    return result;
} 
for(item of document.querySelectorAll('.i5in')){
  console.log(item.getAttribute("data-m"))
  p=Date.parse(item.getAttribute("data-m"))
  d=new Date(item.getAttribute("data-m"))
  item.innerHTML=`${Tomorrow(item.getAttribute("data-m"))}`
}
function changep(val,r){
  for (const item of document.querySelectorAll('.cate')) {
    item.classList.remove('green');
    item.classList.add('white');
    // console.log(item)
  }
  val.classList.remove('white')
  val.classList.add('green')
  console.log(val);
  for (const item of document.querySelectorAll('.right')) {
    item.style.display='none'
  }
  document.querySelector('.r'+r).style.display='block'
  if(r==1){
    document.querySelector('.fname').value=document.querySelector('.fn').value.split(' ')[0]
    if(document.querySelector('.fn').value.split(' ')[1]!=null)
    document.querySelector('.lname').value=document.querySelector('.fn').value.split(' ')[1]
  }
}
function changepmm(val,r){
 document.querySelector('.slct2').value='2'
  for (const item of document.querySelectorAll('.right')) {
    item.style.display='none'
  }
  document.querySelector('.r'+r).style.display='block'
  if(r==1){
    document.querySelector('.fname').value=document.querySelector('.fn').value.split(' ')[0]
    if(document.querySelector('.fn').value.split(' ')[1]!=null)
    document.querySelector('.lname').value=document.querySelector('.fn').value.split(' ')[1]
  }
}
function changepm(val){
  r=val.value
  for (const item of document.querySelectorAll('.right')) {
    item.style.display='none'
  }
  document.querySelector('.r'+r).style.display='block'
  if(r==1){
    document.querySelector('.fname').value=document.querySelector('.fn').value.split(' ')[0]
    if(document.querySelector('.fn').value.split(' ')[1]!=null)
    document.querySelector('.lname').value=document.querySelector('.fn').value.split(' ')[1]
  }
}
function openFullNav() {
    document.getElementById("myOverlay").style.width = "100%";
  }
  
  /* Close */
  function closeFullNav() {
    document.getElementById("myOverlay").style.width = "0%";
  } 
     var xhr = new XMLHttpRequest();
  
    function editprofile(sample){
    
    xhr.open('POST', '/edituserProfile',true);
    xhr.setRequestHeader('X-CSRFToken', csrftoken);     
    var formData = new FormData();
    formData.append("sno", sample);
    formData.append("img", document.querySelector('.primg').files[0]);
    formData.append("fullname",document.querySelector('.fullname').value);
    formData.append("country", document.querySelector('.country').value);
    formData.append("state", document.querySelector('.state').value);
    formData.append("city", document.querySelector('.city').value);
    formData.append("postalcode", document.querySelector('.zip').value);
    formData.append("address", document.querySelector('.address').value);
    xhr.onload=function(){
      if(xhr.status!=200){
  
      }
      else{
        document.querySelector('.f2').innerHTML=`  <button type="button" class="btn btn-primary" onclick="editprofile(${sample})">Save changes</button>
        `
          document.querySelector('.message').innerHTML=` <div class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Success ! </strong> Profile saved.
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        `
        window.location.reload()
      }
    }
    xhr.upload.onloadstart=function(e){
      document.querySelector('.f2').innerHTML=`<div class="progress" style="width: 100%;" >
      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"  aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>
      </div>
      `
    }
    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable) {
        var done = e.position || e.loaded
        var total = e.totalSize || e.total;
        width=Math.round((done/total)*100);
        
        document.querySelector('.progress-bar').style.width=width+"%"
      } else {
      
      }
    
    };
    xhr.send(formData);
    xhr.onerror = function() {
      alert("Request failed");
    };
  }
  
    function changepass(){
    
    xhr.open('POST', '/changepass',true);
    xhr.setRequestHeader('X-CSRFToken', csrftoken);     
    var formData = new FormData();
    formData.append("cp", document.querySelector('.cp').value);
    formData.append("np", document.querySelector('.np').value);
    formData.append("cnp", document.querySelector('.cnp').value);
    xhr.onload=function(){
      if(xhr.status!=200){
  
      }
      else{
        if(JSON.parse(xhr.responseText)['error']===undefined){
          document.querySelector('.messagep').innerHTML=` <div class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Success ! </strong> Password changed .
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        `
        }
        else{
          document.querySelector('.messagep').innerHTML=` <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error ! </strong> ${JSON.parse(xhr.responseText)['error']} .
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>` 
        document.querySelector('.cp').value=''
        document.querySelector('.np').value=''
        document.querySelector('.cnp').value=''
        }
        document.querySelector('.cpass').innerHTML=`SAVE
        `
         
        // window.location.reload()
      }
    }
  
    xhr.upload.onloadstart=function(e){
      document.querySelector('.cpass').innerHTML=` <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      `
    }
    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable) {
        var done = e.position || e.loaded
        var total = e.totalSize || e.total;
        width=Math.round((done/total)*100);
        
      } else {
      
      }
    
    };
    xhr.send(formData);
    xhr.onerror = function() {
      alert("Request failed");
    };
  }
  var opt='';
    function changeemail(){
    
    xhr.open('POST', '/changeemail',true);
    xhr.setRequestHeader('X-CSRFToken', csrftoken);     
    var formData = new FormData();
    formData.append("email", document.querySelector('.cemail').value);
    formData.append("confirm",0);
    xhr.onload=function(){
      if(xhr.status!=200){
  
      }
      else{
        if(JSON.parse(xhr.responseText)['error']===undefined){
otp=JSON.parse(xhr.responseText)['success']
            $('#myModal').modal('show')
        }
        else{
          document.querySelector('.messagep0').innerHTML=` <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error ! </strong> ${JSON.parse(xhr.responseText)['error']} .
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>` 
    
        }
        document.querySelector('.cpass').innerHTML=`SAVE
        `
         
        // window.location.reload()
      }
    }
  
    xhr.upload.onloadstart=function(e){
      document.querySelector('.cpass').innerHTML=` <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      `
    }
    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable) {
        var done = e.position || e.loaded
        var total = e.totalSize || e.total;
        width=Math.round((done/total)*100);
        
      } else {
      
      }
    
    };
    xhr.send(formData);
    xhr.onerror = function() {
      alert("Request failed");
    };
  }
    function verifyemail(){
    xhr.open('POST', '/changeemail',true);
    xhr.setRequestHeader('X-CSRFToken', csrftoken);     
    var formData = new FormData();
    formData.append("email", document.querySelector('.cemail').value);
    formData.append("confirm",1);
   
    var a=otp;
    if(String(a) === String(document.querySelector('#otp').value)){
      
    
    xhr.onload=function(){
      if(xhr.status!=200){
  
      }
      else{
        if(JSON.parse(xhr.responseText)['error']===undefined){

            document.querySelector('.msg').innerHTML=` <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success ! </strong>Email changed .
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>` 
        }
        else{
          document.querySelector('.msg').innerHTML=` <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error ! </strong> ${JSON.parse(xhr.responseText)['error']} .
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>` 
    
        }
        document.querySelector('.otpvar').innerHTML=`SAVE
        `
         
        // window.location.reload()
      }
    }
  
    xhr.upload.onloadstart=function(e){
      document.querySelector('.otpvar').innerHTML=` <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      `
    }
    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable) {
        var done = e.position || e.loaded
        var total = e.totalSize || e.total;
        width=Math.round((done/total)*100);
        
      } else {
      
      }
    
    };
    xhr.send(formData);
    xhr.onerror = function() {
      alert("Request failed");
    };
}
else{
    console.log(String(otp), String(document.querySelector('#otp').value))
    document.querySelector('.msg').innerHTML=` <div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Error ! </strong>Invalid OTP .
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>` 
  return
}
  }
  function editprofile(sample){
    xhr.open('POST', '/editProfile',true);
    xhr.setRequestHeader('X-CSRFToken', csrftoken);     
    var formData = new FormData();
    formData.append("sno", sample);
    formData.append("fullname",document.querySelector('.fname').value+' '+document.querySelector('.lname').value);
    xhr.onload=function(){
      if(xhr.status!=200){
  
      }
      else{
    
      }
    }
    xhr.upload.onloadstart=function(e){
     
    }
    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable) {
        var done = e.position || e.loaded
        var total = e.totalSize || e.total;
       
      } else {
      
      }
    
    };
    xhr.send(formData);
    xhr.onerror = function() {
      alert("Request failed");
    };
  }
  
  function billing(sample){
    xhr.open('POST', '/editProfile',true);
    xhr.setRequestHeader('X-CSRFToken', csrftoken);     
    var formData = new FormData();
    formData.append("sno", sample);
    formData.append("add1",document.querySelector('.add1').value);
    formData.append("add2",document.querySelector('.add2').value);
    formData.append("country",document.querySelector('.country').value);
    formData.append("state",document.querySelector('.state').value);
    formData.append("city",document.querySelector('.city').value);
    formData.append("postal",document.querySelector('.postal').value);
    xhr.onload=function(){
      if(xhr.status!=200){
  
      }
      else{
        document.querySelector('.bill').innerHTML=` SAVE
        `
      }
    }
    xhr.upload.onloadstart=function(e){
        document.querySelector('.bill').innerHTML=` <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        `
    }
    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable) {
        var done = e.position || e.loaded
        var total = e.totalSize || e.total;
       
      } else {
      
      }
    
    };
    xhr.send(formData);
    xhr.onerror = function() {
      alert("Request failed");
    };
  }
  
  
  
  function ad(sample){
    xhr.open('POST', '/editProfile',true);
    xhr.setRequestHeader('X-CSRFToken', csrftoken);     
    var formData = new FormData();
    formData.append("sno", sample);
    formData.append("add1",document.querySelector('#slct').value);
    formData.append("add2",document.querySelector('#pd').value);
    xhr.onload=function(){
      if(xhr.status!=200){
  
      }
      else{
        document.querySelector('.add').innerHTML=` SAVE
        `
      }
    }
    xhr.upload.onloadstart=function(e){
        document.querySelector('.add').innerHTML=` <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        `
    }
    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable) {
        var done = e.position || e.loaded
        var total = e.totalSize || e.total;
       
      } else {
      
      }
    
    };
    xhr.send(formData);
    xhr.onerror = function() {
      alert("Request failed");
    };
  }
  
  