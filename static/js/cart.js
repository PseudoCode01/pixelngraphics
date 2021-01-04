
function addspin(){
    document.querySelector('.spinbutton').innerHTML+=`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`

}

function counter(val,elem,p){
    if(val==1){
      console.log(document.querySelector('.qn'+elem))
      if(screen.width>1000)
     {   v= document.querySelector('.qn'+elem).innerText;
        document.querySelector('.qn'+elem).innerText=Number(v)+1;
        document.querySelector('.tp'+elem).innerText=(Number(v)+1)*p

      }
        else{
          console.log(document.querySelector('.qn2'+elem).innerText)
          v= document.querySelector('.qn2'+elem).innerText;
          document.querySelector('.qn2'+elem).innerText=Number(v)+1;
        document.querySelector('.tp2'+elem).innerText=(Number(v)+1)*p

        }
        counttotal()

    }
    if(val== -1){
      if(screen.width>1000)


     {   v= document.querySelector('.qn'+elem).innerText;
        if(Number(v)==1){
console.log(elem)
            Removecart(elem,1,0)
            return
        }
        document.querySelector('.qn'+elem).innerText=Number(v)-1;
        document.querySelector('.tp'+elem).innerText=(Number(v)-1)*p

      }
        else{
          v= document.querySelector('.qn2'+elem).innerText;
        if(Number(v)==1){
            Removecart(elem,1,1)
            return
        }
        document.querySelector('.qn2'+elem).innerText=Number(v)-1;
        document.querySelector('.tp2'+elem).innerText=(Number(v)-1)*p
        }
        counttotal()
    }
}
function counttotal(){
    var tp=0;
    if(screen.width>1000)
  {  for(item of  document.querySelectorAll('.tp')){
        console.log(item.innerText)
tp+=Number(item.innerText)
    }
    document.querySelector('.tamount').innerText='$ '+tp;  }
    else{
      for(item of  document.querySelectorAll('.tp2')){
        console.log(item.innerText)
tp+=Number(item.innerText)
    }
      document.querySelector('.tamount2').innerText='$ '+tp;  
    }
}
counttotal();
var xhr = new XMLHttpRequest();

function Removecart(sample,val,p){
    xhr.open('POST', '/removeCart',true);
    xhr.setRequestHeader('X-CSRFToken', csrftoken);     
var tr=JSON.stringify({'sno':Number(sample)})
   xhr.send(tr);
console.log(JSON.stringify({'sno':Number(sample)}))
    xhr.onload=function(){
      if(xhr.status!=200){
                alert(`Error ${xhr.status}: ${xhr.statusText}`); 

    }
    else{
      window.location.reload()
      }
      
    }
    xhr.upload.onloadstart=function(e){
  
    }
    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable) {
      } else {
      
      }
    
    };
    
    xhr.onerror = function() {
    
    };
  }
  if(document.querySelectorAll('.imgsp').length<2){
    document.querySelector('.container').style.marginBottom='200px'
  }

  var price=0;

  function getprice(th,v){
    var snos='';
    var qns='';
  var xhr2 = new XMLHttpRequest();
  if(v==0)
    {for(item of document.querySelectorAll('.sno')){
      if(document.querySelector('.qn'+item.value)!=null){
      snos+=item.value+'+'
      qns+=document.querySelector('.qn'+item.value).innerHTML+'+'}
    }
  }
    else{
      for(item of document.querySelectorAll('.sno2')){
        if(document.querySelector('.qn2'+item.value)!=null){
        snos+=item.value+'+'
        qns+=document.querySelector('.qn2'+item.value).innerHTML+'+'}
      }
    }
    console.log(snos,qns)
 xhr2.open('POST', '/getprice',true);
 xhr2.setRequestHeader('X-CSRFToken', csrftoken);     

xhr2.onload=function(){
  if(xhr2.status != 200){
 
}
else{
  th.innerHTML='Checkout'
  price=Number(JSON.parse(xhr2.responseText)['price'])
  console.log(JSON.parse(xhr2.responseText)['price'])
  $('#exampleModalCenter').modal('show')
  }
  // document.querySelector('mb').innerHTML=``
  return JSON.parse(xhr2.responseText)['price']
}
xhr2.upload.onloadstart=function(e){

}
xhr2.upload.onprogress = function(e) {
  if (e.lengthComputable) {
th.innerHTML+=`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`
  } else {
  
  }

};
xhr2.send(JSON.stringify({'sno':snos,'qns':qns}));
xhr2.onerror = function() {

};
  }

 function gettprice(){
    return Number(price)
  }
 function additems(){
    var qns='';
    var snos='';
  var xhr2 = new XMLHttpRequest();
  if(screen.width>1000)
{  for(item of document.querySelectorAll('.sno')){
    if(document.querySelector('.qn'+item.value)!=null){
    snos+=item.value+'+'
    qns+=document.querySelector('.qn'+item.value).innerHTML+'+'}
  }}
  else{
    for(item of document.querySelectorAll('.sno2')){
      if(document.querySelector('.qn2'+item.value)!=null){
      snos+=item.value+'+'
      qns+=document.querySelector('.qn2'+item.value).innerHTML+'+'}
    }
  }

 xhr2.open('POST', '/additems',true);
 xhr2.setRequestHeader('X-CSRFToken', csrftoken);     
xhr2.onload=function(){
  if(xhr2.status != 200){
    window.location.reload()
}
else{
  window.location.href='/myProfile'
  }

}
xhr2.upload.onloadstart=function(e){

}
xhr2.upload.onprogress = function(e) {
  if (e.lengthComputable) {
    document.querySelector('.modal-body').innerHTML=`<span class="spinner-border spinner-border-sm m-auto" role="status" aria-hidden="true"></span>`
    document.querySelector('.modal-title').innerHTML='Saving Details ! Please do not refresh'
// th.innerHTML+=`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`/
  } else {
  
  }

};
xhr2.send(JSON.stringify({'sno':snos,'qns':qns}));

xhr2.onerror = function() {

};
  }
