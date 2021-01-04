function banner(){
  document.getElementById('staticBackdropLabel').innerText='Add Your Banner'
  document.querySelector('.cat').value='banner'
}
if(localStorage.getItem('sendm')=='true'){
document.querySelector('.message').innerHTML=` <div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong>Well done ! </strong>Aww yeah, you successfully added the ${localStorage.getItem('type')} .
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
`
localStorage.setItem('sendm' ,false)
}
function stream(){
  document.getElementById('staticBackdropLabel').innerText='Add Your Stream Overlay'
  document.querySelector('.cat').value='stream'
  document.querySelector('.ks-cboxtags').innerHTML=`  <li><input type="checkbox" id="checkboxOne" value="AEP"><label for="checkboxOne">AEP</label></li>
  <li><input type="checkbox" id="checkboxTwo" value="MOV" checked><label for="checkboxTwo">MOV</label></li>
  <li><input type="checkbox" id="checkboxThree" value="QuickTime" checked><label for="checkboxThree">QuickTime</label></li>
  <li><input type="checkbox" id="checkboxFour" value="FLV / F4V"><label for="checkboxFour">FLV / F4V</label></li>
  <li><input type="checkbox" id="checkboxFive" value="MP4"><label for="checkboxFive">MP4</label></li>
  <li><input type="checkbox" id="checkboxSix" value="AVI" checked><label for="checkboxSix">AVI
                  </label></li>
 `
}
var xhr = new XMLHttpRequest();
function sendForm(no){
var file1=document.querySelector('.title').value
var file2=document.getElementById('disc').value
var file3=document.getElementById('searchTags').value
// var file4=document.getElementById('fileformats')
var file5=document.querySelector('.samples')
var file6=document.querySelector('.price').value
console.log(document.querySelector('.ks-cboxtags').children)
var filefor='';
var tags='';
for(item of document.querySelector('.ks-cboxtags').children){
  if(item.children[0].checked==true){
  filefor+=item.children[0].value+',';
  }
}
console.log(document.querySelectorAll('.tags'))
for(item of document.querySelectorAll('.tags')){

tags+=String(item.innerHTML).split('&nbsp;')[0]+',';
}

if(file1.length<1 || file2.length<1 || (file3.length<1 &&tags&& file3.length<1&&file6.length<1 || file5.files.length<1)){
//   document.getElementById('message').innerHTML=`<div class="alert alert-error alert-dismissible" role="alert">
//   <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
//  Are you sure you have filled
//  </div> ` 

}
else{
  var formData = new FormData();
  formData.append("title", file1);
  formData.append("disc", file2);
  formData.append("searchTags", tags);
  formData.append("fileformats", filefor);
  formData.append("samples", file5.files[no]);
  formData.append("price", file6);
  formData.append("category",  document.querySelector('.cat').value);
  if(no>0){
  formData.append("times", 'last');
  }
  else{

    formData.append("times", 'first');
  }
  xhr.open('POST', '/addProduct',true);
  xhr.setRequestHeader('X-CSRFToken', csrftoken); 
  var width = 0;
  xhr.onload = function() {
  if (xhr.status != 200) { 

  } else { 
    data=JSON.parse(xhr.responseText)
    
    if(no<file5.files.length-1)
{ sendForm(++no);}
else{
  window.location.reload()
sendm=true;
localStorage.setItem("sendm", 'true');
localStorage.setItem("type",document.querySelector('.cat').value );
 

}
}
};
}
xhr.upload.onloadstart=function(e){
document.querySelector('.modal-footer').innerHTML=`<div class="progress" style="width: 100%;" >
<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"  aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>
</div>
`
}
xhr.upload.onprogress = function(e) {
  if (e.lengthComputable) {
    var done = e.position || e.loaded
    var total = e.totalSize || e.total;
    width=Math.round((done/total)*100);
    // elem.style.width = width + "%";
    document.querySelector('.progress-bar').style.width=width+"%"
  } else {

  }
};
xhr.send(formData);
xhr.onerror = function() {
  alert("Request failed");
};
}

function abort(val){
  xhr.abort();
  document.getElementById('thumbnail').disabled=false
  document.getElementById('video').disabled=false
  document.getElementById('resources').disabled=false
  document.getElementById('videoTitle').disabled=false
  document.getElementById('progress').style.visibility='hidden';
  document.getElementById('add').style.display='block';
  document.getElementById('message').innerHTML=`<div class="alert alert-error alert-dismissible" role="alert">
   <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
 Operation canceled by user
 </div> `
}
function addsearchtag(val){
document.querySelector('.search_tags').innerHTML+=`<span class="input-group-text tags">${val.value } &nbsp;  <p onclick="removetag(this)"  style="cursor: pointer;">&#x2716;</p></span>`
val.value='';
}
function removetag(value){
  value.parentElement.remove();
}
function addsamples(sample){
  xhr.open('POST', '/addSamples',true);
  xhr.setRequestHeader('X-CSRFToken', csrftoken);     
  var formData = new FormData();
  formData.append("sample", sample);
  formData.append("product", sample);
  xhr.onload=function(){
    if(xhr.status!=200){

    }
    else{
       console.log(xhr.responseText)
    }
  }
  xhr.upload.onloadstart=function(e){

  }
  xhr.upload.onprogress = function(e) {
    if (e.lengthComputable) {
      var done = e.position || e.loaded
      var total = e.totalSize || e.total;
      // width=Math.round((done/total)*100);
      // elem.style.width = width + "%";
    } else {
    
    }
  
  };
  xhr.send(formData);
  xhr.onerror = function() {
    alert("Request failed");
  };
}
var alertList = document.querySelectorAll('.alert')
alertList.forEach(function (alert) {
  new bootstrap.Alert(alert)
})

v=document.querySelector('.srating').value;
var i=0;
for(item of document.querySelectorAll('.s1')){
    if(Math.floor(v)>i)
{    
    item.style.color='#2ff905'
    i++;
}
else{
    break;
}
}
// if(document.querySelector('.nop').value>8){
   
//     document.querySelector('.pagenav').style.visibility='visible'
// }
function editprofile(sample){
  s=document.querySelector('.tag').value;
  xhr.open('POST', '/editProfile',true);
  xhr.setRequestHeader('X-CSRFToken', csrftoken);     
  var formData = new FormData();
  formData.append("title", s);
  formData.append("sno", sample);
  formData.append("img", document.querySelector('.primg').files[0]);
  formData.append("fullname",document.querySelector('.fullname').value);
  formData.append("country", document.querySelector('.country').value);
  formData.append("state", document.querySelector('.state').value);
  formData.append("city", document.querySelector('.city').value);
  formData.append("postalcode", document.querySelector('.zip').value);
  formData.append("address", document.querySelector('.address').value);
  formData.append("invoice", document.querySelector('.invoice').checked);
  console.log( document.querySelector('.invoice').checked)
  formData.append("ad", document.querySelector('.ad').value);
  xhr.onload=function(){
    if(xhr.status!=200){

    }
    else{
      document.querySelector('.f2').innerHTML=`  <button type="button" class="btn btn-primary" onclick="editprofile(${sample})">Save changes</button>
      `
        document.querySelector('.message').innerHTML=` <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Well done ! </strong>Aww yeah, you successfully added the logo .
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
      // elem.style.width = width + "%";
      document.querySelector('.progress-bar').style.width=width+"%"
    } else {
    
    }
  
  };
  xhr.send(formData);
  xhr.onerror = function() {
    alert("Request failed");
  };
}
/* Open */
function openFullNav() {
  document.getElementById("myOverlay").style.width = "100%";
}

/* Close */
function closeFullNav() {
  document.getElementById("myOverlay").style.width = "0%";
} 
