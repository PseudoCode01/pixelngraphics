function changemainimg(val){
    console.log(val)
   if( document.querySelector('.mainimage').src!=val){
    document.querySelector('.mainimage').src=val;   
   }
}