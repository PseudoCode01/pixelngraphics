function changecal(val,elem){
    for(item of document.querySelectorAll('.cc')){
        item.style.color='white'
    }
    elem.style.color='#23ce00'
    if(val==0){
        document.querySelector('.logo').style.display='flex'
        document.querySelector('.banner').style.display='none'
        document.querySelector('.stream').style.display='none'

    }
    if(val==1){
        document.querySelector('.banner').style.display='flex'
        document.querySelector('.logo').style.display='none'
        document.querySelector('.stream').style.display='none'

    }
    if(val==2){
        document.querySelector('.banner').style.display='none'
        document.querySelector('.logo').style.display='none'
        document.querySelector('.stream').style.display='flex'
    }
}