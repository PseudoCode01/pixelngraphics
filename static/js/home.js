var el=0;
function changecal(val,elem){
    for(item of document.querySelectorAll('.cc')){
        item.style.color='white'
    }
    elem.style.color='#23ce00'
    if(val==0){
        document.querySelector('.logo').style.display='flex'
        document.querySelector('.banner').style.display='none'
        document.querySelector('.stream').style.display='none'
        page=0;
    document.querySelector('.pagenav').style.display='none'
    document.querySelector('.pageno').innerHTML=1
pagenav(0)
el=0;
    }
    if(val==1){
        document.querySelector('.banner').style.display='flex'
        document.querySelector('.logo').style.display='none'
        document.querySelector('.stream').style.display='none'
        page=0;
        document.querySelector('.pagenav').style.display='none'
        document.querySelector('.pageno').innerHTML=1
        pagenav(1)
        el=1;

    }
    if(val==2){
        document.querySelector('.banner').style.display='none'
        document.querySelector('.logo').style.display='none'
        document.querySelector('.stream').style.display='flex'
        page=0;
        document.querySelector('.pageno').innerHTML=1
        document.querySelector('.pagenav').style.display='none'

pagenav(2)
el=2;

    }
}
function sort(fil,elem){
    for(var item of document.querySelectorAll('.fti4')){
    console.log(item.style.color='white')
    }
elem.style.color='#92d945';
    var xhr = new XMLHttpRequest();
      xhr.open('POST', '/filters');
      xhr.setRequestHeader('X-CSRFToken', csrftoken);       
      xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      xhr.setRequestHeader("Accept", "application/json");
    
    xhr.send(JSON.stringify({'filter':fil}));
    xhr.onload = function() {
      
      if (xhr.status != 200) {
        alert(`Error ${xhr.status}: ${xhr.statusText}`); 
      } else { 
    //    document.querySelector('logo').innerHTML=``
    var v=``;
    var b=``;
    var so=``;
    var text='';
       console.log(JSON.parse(xhr.responseText)['product'])
      for(var item of JSON.parse(xhr.responseText)['product']){
          if(item[0]['title'].length>20){
            text=String(item[0]['title']).substring(0,20)+'...'

          }
          else{
              text=item[0]['title']
          }
          console.log(item[0]['sno'])
v+=`<div class="col" onclick="window.location.href='/productDetail/${item[0]['sno']}'">
<div class="card bg-dark text-white">
  <img src="/media/${item[1]['samplesfile']}"  class="card-img" alt="...">

  <div class="card-img-overlay">
    <p class="card-text">${text} | $ ${item[0]['Price']}</p>

  </div>
</div>
</div>`
      }
      for(var item of JSON.parse(xhr.responseText)['banner']){
          if(item[0]['title'].length>20){
            text=String(item[0]['title']).substring(0,20)+'...'
          }
          else{
              text=item[0]['title']
          }
          console.log(item[0]['sno'])
b+=`<div class="col" onclick="window.location.href='/productDetail/${item[0]['sno']}'">
<div class="card bg-dark text-white">
  <img src="/media/${item[1]['samplesfile']}"  class="card-img" alt="...">

  <div class="card-img-overlay">
    <p class="card-text">${text} | $ ${item[0]['Price']}</p>

  </div>
</div>
</div>`
      }
      for(var item of JSON.parse(xhr.responseText)['stream']){
          if(item[0]['title'].length>30){
text=String(item[0]['title']).substring(0,20)+'...'
          }
          else{
              text=item[0]['title']
          }
          console.log(item[0]['sno'])
so+=`<div class="col" onclick="window.location.href='/productDetail/${item[0]['sno']}'">
<div class="card bg-dark text-white">
  <video id="vp" width="100%" height="550px" autoplay='true' width="100%" loop >
  <source id="source" src="/media/${item[1]['samplesfile']}" type="video/mp4">
  Your browser does not support the video tag.
  </video>
  <div class="card-img-overlay">
    <p class="card-text">${text} | $ ${item[0]['Price']}</p>
  </div>
</div>
</div>`
      }
      document.querySelector('.logo').innerHTML=v;
      document.querySelector('.banner').innerHTML=b;
      document.querySelector('.stream').innerHTML=so;
    }
    };
    
    xhr.onprogress = function(event) {
      if (event.lengthComputable) {
        document.querySelector('.logo').innerHTML=`<div class="d-flex justify-content-center">
        <div class="spinner-border text-success" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      </div>`
        document.querySelector('.banner').innerHTML=`<div class="d-flex justify-content-center">
        <div class="spinner-border text-success" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      </div>`
        document.querySelector('.stream').innerHTML=`<div class="d-flex justify-content-center">
        <div class="spinner-border text-success" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      </div>`
      } else { 
      }
    };
    
    xhr.onerror = function() {
      alert("Request failed");
    };
    
    }
    window.smoothScroll = function(target,pn) {
      console.log(pn)
      if(pn==0){
        document.querySelector('.c1').click()
        console.log(document.querySelector('.banner'))
      }
    else if(pn==1){
        document.querySelector('.c2').click()
        console.log(document.querySelector('.banner'))
      }
     else if(pn==2){
        document.querySelector('.c3').click()
      }
      var scrollContainer = target;
      do { //find scroll container
          scrollContainer = scrollContainer.parentNode;
          if (!scrollContainer) return;
          scrollContainer.scrollTop += 1;
      } while (scrollContainer.scrollTop == 0);
  
      var targetY = 0;
      do { //find the top of target relatively to the container
          if (target == scrollContainer) break;
          targetY += target.offsetTop;
      } while (target = target.offsetParent);
  
      scroll = function(c, a, b, i) {
          i++; if (i > 30) return;
          c.scrollTop = a + (b - a) / 30 * i;
          setTimeout(function(){ scroll(c, a, b, i); }, 20);
      }
      // start scrolling
      scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
  }
  var page=0;
function pagenav(val){
  if(val==0)
{  
  l= document.querySelectorAll('.lg');

  if(l.length>page*8+8){
    document.querySelector('.pagenav').style.display='flex'
  }
  // else{
  //   document.querySelector('.pagenav').style.display='none'
  // }
  for(let i=0;i<l.length;i++){
if(i>=page*8 && i<page*8+8){
  l[i].style.display='block'
}
else{
  l[i].style.display='none'

}
  }
}
  if(val==1)
{  
 
  b= document.querySelectorAll('.bn');
  if(b.length>page*8+8){
    document.querySelector('.pagenav').style.display='flex'
  }
  // else{
  //   document.querySelector('.pagenav').style.display='none'
  // }
  for(let i=0;i<l.length;i++){
if(i>=page*8 && i<page*8+8){
  b[i].style.display='block'
}
else{
  b[i].style.display='none'

}
  }
}
  if(val==2)
{  
  s= document.querySelectorAll('.st');
  if(s.length>page*8+8){
    document.querySelector('.pagenav').style.display='flex'
  }

  for(let i=0;i<l.length;i++){
if(i>=page*8 && i<page*8+8){
  s[i].style.display='block'
}
else{
  s[i].style.display='none'

}
  }
}
}
pagenav(0)

function pagefor(){
  if(el==0 && (page+1)*8<document.querySelectorAll('.lg').length)
 { page=page+1;
  document.querySelector('.pageno').innerHTML=page+1
  pagenav(0)}
  if(el==1 && (page+1)*8<document.querySelectorAll('.bn').length)
 { page=page+1;
  document.querySelector('.pageno').innerHTML=page+1
  pagenav(0)}
  if(el==2 && (page+1)*8<document.querySelectorAll('.st').length)
 { page=page+1;
  document.querySelector('.pageno').innerHTML=page+1
  pagenav(0)}
}
function pageback(){
  if(page>0)
  {
    page=page-1;
  document.querySelector('.pageno').innerHTML=page+1
  pagenav(0)
}
}