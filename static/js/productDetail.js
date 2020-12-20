function changemainimg(val){
    console.log(val)
   if( document.querySelector('.mainimage').src!=val){
    document.querySelector('.mainimage').src=val;   
   }
}
var xhr = new XMLHttpRequest();

function Addtocart(sample,elem){
    
    
    if(String(elem.innerText)!='ADD TO CART'){
        window.location.href='/cart'
        return
    }
    xhr.open('POST', '/addtoCart',true);
    xhr.setRequestHeader('X-CSRFToken', csrftoken);     
   
    xhr.onload=function(){
      if(xhr.status!=200){
          
    }
    else{
        document.querySelector('.spinbutton').innerHTML=`GO TO CART`
         console.log(xhr.responseText)
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
    xhr.send(JSON.stringify({'sno':sample,'changes':document.querySelector('#changes').value}));
    xhr.onerror = function() {
      alert("Request failed");
    };
  }