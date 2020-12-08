/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.left = "0";
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
  