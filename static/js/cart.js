function addspin(){
    document.querySelector('.spinbutton').innerHTML+=`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`

}



function counter(val,elem,p){
    if(val==1){
        v= document.querySelector('.qn'+elem).innerText;
        document.querySelector('.qn'+elem).innerText=Number(v)+1;
        document.querySelector('.tp'+elem).innerText=(Number(v)+1)*p
        counttotal()

    }
    if(val== -1){
        v= document.querySelector('.qn'+elem).innerText;
        if(Number(v)==1){
            Removecart(elem)
            return
        }
        document.querySelector('.qn'+elem).innerText=Number(v)-1;
        document.querySelector('.tp'+elem).innerText=(Number(v)-1)*p
        counttotal()
    }
}
function counttotal(){
    var tp=0;
    for(item of  document.querySelectorAll('.tp')){
        console.log(item.innerText)
tp+=Number(item.innerText)
    }
    document.querySelector('.tamount').innerText='$ '+tp;
    
}
counttotal();
var xhr = new XMLHttpRequest();

function Removecart(sample){
    xhr.open('POST', '/removeCart',true);
    xhr.setRequestHeader('X-CSRFToken', csrftoken);     
   
    xhr.onload=function(){
      if(xhr.status!=200){
          
    }
    else{
      window.location.reload()
      }
      
    }
    xhr.upload.onloadstart=function(e){
  
    }
    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable) {
    document.querySelector('.spinbutton').innerHTML=`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`
    document.querySelector('.spinbutton').style.width='50px'
    document.querySelector('.spinbutton').style.height='50px'
      } else {
      
      }
    
    };
    xhr.send(JSON.stringify({'sno':sample}));
    xhr.onerror = function() {
    
    };
  }
  if(document.querySelectorAll('.imgsp').length<2){
    document.querySelector('.container').style.marginBottom='200px'
  }