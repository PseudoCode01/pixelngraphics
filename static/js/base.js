
/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.left = "0";
  }
  var opacity = 0; 
  var intervalID = 0; 

function show() { 
    // console.log(opacity)
    var body = document.querySelector(".body"); 
    opacity = Number(window.getComputedStyle(body) 
                     .getPropertyValue("opacity")); 
    if (opacity < 1) { 
        opacity = opacity + 0.25; 
        body.style.opacity = opacity 
    } else { 
        clearInterval(intervalID); 
    } 
}  function fadeIn() { 
    document.querySelector('.body').style.display='block'

    setInterval(show, 4); 
}
function show2() { 

    var body2 = document.querySelector("#animation"); 
    opacity = Number(window.getComputedStyle(body2) 
                     .getPropertyValue("opacity")); 
    if (opacity > 0) { 
        opacity = opacity - 0.1; 
        body2.style.opacity = opacity 
    } else { 
        clearInterval(intervalID); 
        document.querySelector('#animation').style.display='none'

    } 
} 
 function fadeOut() { 
    setInterval(show2, 20); 
}
if(sessionStorage.getItem('animate')!='no') {
        document.querySelector('#animation').style.display='block'
        document.getElementById('animation').play();
    window.setTimeout(animate, 2100)
    sessionStorage.setItem('animate','no')
    document.querySelector('.animate').value='no'
    function animate(){
    
        fadeIn()
        // document.querySelector('#animation').style.display='none'
        fadeOut()
    }
}
 else {
    document.querySelector('.body').style.display='block'
    document.querySelector('#animation').style.display='none'
    document.querySelector('.body').style.opacity='1'
 }

  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.left = "-350px";
  } 
  function getToken(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }
  var csrftoken = getToken('csrftoken')
  
  console.log(document.getElementById('signorlog').value)
  document.getElementById('signorlog').value='sign'
  function notifysign(){
      window.location.href='/signup'
  }
  $(document).ready(function(){
    var submitIcon = $('.searchbox-icon');
    var inputBox = $('.searchbox-input');
    var searchBox = $('.searchbox');
    var isOpen = false;
    submitIcon.click(function(){
        if(isOpen == false){
            if(screen.width<1000){

                
                document.querySelector('.sercontainer').style.width='90%'
                if( document.querySelector('.usernavright')!=null)
               { document.querySelector('.usernavright').style.width='300px'}
                else{
                document.querySelector('.navright').style.width='300px'

                }
            }
      
            searchBox.addClass('searchbox-open');
            inputBox.focus();
            isOpen = true;
        } else {
            searchBox.removeClass('searchbox-open');
            if(screen.width<1000){

                 document.querySelector('.sercontainer').style.width='100px'
                if( document.querySelector('.usernavright')!=null)
{
                document.querySelector('.usernavright').style.width='150px'}
                else{
                    document.querySelector('.navright').style.width='150px'
                }
}
            inputBox.focusout();
            isOpen = false;
        }
    });  
     submitIcon.mouseup(function(){
            return false;
        });
    searchBox.mouseup(function(){
            return false;
        });
    $(document).mouseup(function(){
            if(isOpen == true){
                $('.searchbox-icon').css('display','block');
                submitIcon.click();
            }
        });
});
    function buttonUp(){
        var inputVal = $('.searchbox-input').val();
        inputVal = $.trim(inputVal).length;
        if( inputVal !== 0){
            $('.searchbox-icon').css('display','none');
        } else {
            $('.searchbox-input').val('');
            $('.searchbox-icon').css('display','block');
        }
    }
    // document.querySelectorAll('img').setAttribute('draggable',false)
    // for(item of document.querySelectorAll('img')){
    //     item.setAttribute('draggable',false)
    //     item.addEventListener('dragstart',function(){
    //         return false
    //     })
    // }
    $('img').on('dragstart',function(event){
event.preventDefault();
    })
// document.addEventListener('contextmenu',event=>event.preventDefault());
if(document.querySelector('.proimg')!=null){

    document.querySelector('.proimg').addEventListener('mouseover',function(){
        document.querySelector('.po').style.display='flex'
    })
}
if( screen.width<700){

    document.querySelector('.proimg').addEventListener('mouseleave',function(){
        console.log(screen.width)
        document.querySelector('.po').style.display='none'
    })
}
document.querySelector('.po').addEventListener('mouseleave',function(){
    document.querySelector('.po').style.display='none'
})
