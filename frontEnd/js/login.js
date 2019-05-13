const base = 'http://127.0.0.1:5500/frontEnd/html/';

$( document ).ready(function() {
    $("#button_login").click(function(){
        const username = $('#loginUser').val();
        const password = $('#loginPassword').val();
        const credentials = {
            email: username,
            password: password
        };
          
        $.ajax({
            url: urls.login,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(credentials)
        }).done(function (response) {
            if(response.success === 1) {
                const userData = response.user;
                const token = response.token;
                $.session.set("userData", JSON.stringify(userData));
                $.session.set("token", token);
                location.href = base + 'home.html';
            }
            else {
                alert("Usuario y/o contraseña no válidos");
            }
        }).fail(function(data) {
            console.log(data.responseJSON);
            alert(data.responseJSON.error);
        })
    })
});