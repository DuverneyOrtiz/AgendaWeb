
$(document).ready(function(event){

  $(".form").submit(function(event){
    event.preventDefault();
    var form_data = new FormData();
    form_data.append('username', $('#user').val());
    form_data.append('password', $('#password').val());

    $.ajax({
          url:'../server/check_login.php',
          data:form_data,
          type:"POST",
          cache: false,
          processData: false,
          contentType: false,
          dataType:"json",
          success: function(msg){
              if (msg.msg) {
                  window.location.href = 'main.html';
                }else {
                  alert(msg.mensaje);
                }
            }
        
        });

  })
})