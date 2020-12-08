

window.onload = play();
document.getElementById('tryAgain').addEventListener('click', () => { play()})

function play() {
  var blue = '#2980b9';
  var l = Snap('#logo');
  var p = l.select('path');
  l.clear();
  l.append(p);

  p.attr({
    fill: blue,
    stroke: '#0066CC',
  });

  setTimeout( function() {
    // modify this one line below, and see the result !
    var logoTitle = 'alticreation';
    var logoRandom = '';
    var logoTitleContainer = l.text(0, '98%', '');
    var possible = "-+*/|}{[]~\\\":;?/.><=+-_)(*&^%$#@!)}";
    logoTitleContainer.attr({
      fontSize: 280,
      fontFamily: 'Dosis',
      fontWeight: '600'
    });

    function generateRandomTitle(i, logoRandom) {
      setTimeout( function() {
        logoTitleContainer.attr({ text: logoRandom });
      }, i*70 );
    }

    for( var i=0; i < logoTitle.length+1; i++ ) {
      logoRandom = logoTitle.substr(0, i);
      for( var j=i; j < logoTitle.length; j++ ) { 
        logoRandom += possible.charAt(Math.floor(Math.random() * possible.length)); 
      }
      generateRandomTitle(i, logoRandom);
      logoRandom = '';
    }

  }, 500 );

}

function banner(){
  document.getElementById('staticBackdropLabel').innerText='Add Your Banner'
}
function stream(){
  document.getElementById('staticBackdropLabel').innerText='Add Your Stream'
}
var xhr = new XMLHttpRequest();
function sendForm(val,category){
var file1=document.getElementById('title'+val)
var file2=document.getElementById('disc'+val)
var file3=document.getElementById('searchTags'+val)
var file4=document.getElementById('fileformats'+val)
var file5=document.getElementById('samples'+val).files[0]
var file6=document.getElementById('price'+val)

if(file1.length<1 || file2.length<1 || (file3.length<1 && file3.length<1&&file4.length<1&&file5.size<1&&file6.length<1)){
//   document.getElementById('message'+val).innerHTML=`<div class="alert alert-error alert-dismissible" role="alert">
//   <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
//  Are you sure you have filled
//  </div> ` 
}
else{
  var formData = new FormData();
  formData.append("title", file1);
  formData.append("disc", file2);
  formData.append("searchTags", file3);
  formData.append("fileformats", file4);
  formData.append("samples", file6);
  formData.append("price", file6);
  formData.append("category", cat);
 
  
  xhr.open('POST', '/addproduct',true);
  xhr.setRequestHeader('X-CSRFToken', csrftoken);       

  var width = 0;
  
  xhr.onload = function() {
    
  if (xhr.status != 200) { 
    // alert(`Error ${xhr.status}: ${xhr.statusText}`); 
//     document.getElementById('thumbnail'+val).disabled=false
//     document.getElementById('video'+val).disabled=false
//     document.getElementById('resources'+val).disabled=false
//     document.getElementById('videoTitle'+val).disabled=false
//     document.getElementById('progress'+val).style.visibility='hidden';
//     element.style.display='block';
//     document.getElementById('message'+val).innerHTML=`<div class="alert alert-error alert-dismissible" role="alert">
//    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
//  Error! 
//  </div> `
  } else { 
    data=JSON.parse(xhr.responseText)
//    document.getElementById('message'+val).innerHTML=`<div class="alert alert-success alert-dismissible" role="alert">
//    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
//  Video has been uploaded
//  </div> `
//     document.getElementById('thumbnail'+val).disabled=false
//     document.getElementById('video'+val).disabled=false
//     document.getElementById('resources'+val).disabled=false
//     document.getElementById('videoTitle'+val).disabled=false
//     document.getElementById('thumbnail'+val).value=''
//     document.getElementById('video'+val).value=''
//     document.getElementById('resources'+val).value=''
//     document.getElementById('videoTitle'+val).value=''
//     document.getElementById('progress'+val).style.visibility='hidden';
//     element.style.display='block';
};
}
xhr.upload.onloadstart=function(e){
  // document.getElementById('thumbnail'+val).disabled=true
  // document.getElementById('video'+val).disabled=true
  // document.getElementById('resources'+val).disabled=true
  // document.getElementById('videoTitle'+val).disabled=true
  // document.getElementById('progress'+val).style.visibility='visible';
  // element.style.display='none';
}
xhr.upload.onprogress = function(e) {
  if (e.lengthComputable) {
    var done = e.position || e.loaded
    var total = e.totalSize || e.total;
    width=Math.round((done/total)*100);
    elem.style.width = width + "%";
  } else {
  
  }

};
xhr.send(formData);
xhr.onerror = function() {
  alert("Request failed");
};

}

}
function abort(val){
  xhr.abort();
  document.getElementById('thumbnail'+val).disabled=false
  document.getElementById('video'+val).disabled=false
  document.getElementById('resources'+val).disabled=false
  document.getElementById('videoTitle'+val).disabled=false
  document.getElementById('progress'+val).style.visibility='hidden';
  document.getElementById('add'+val).style.display='block';
  document.getElementById('message'+val).innerHTML=`<div class="alert alert-error alert-dismissible" role="alert">
   <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
 Uploading canceled by user
 </div> `
}
function addsearchtag(val){
document.querySelector('.search_tags').innerHTML+=`<span class="input-group-text">${val.value } &nbsp;  <p onclick="removetag(this)"  style="cursor: pointer;">&#x2716;</p></span>`
val.value='';
}
function removetag(value){
  value.parentElement.remove();
 
}