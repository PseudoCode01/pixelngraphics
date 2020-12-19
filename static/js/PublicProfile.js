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
if(document.querySelector('.nop').value>8){
   
    document.querySelector('.pagenav').style.visibility='visible'
}