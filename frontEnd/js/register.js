const base = 'https://antonaldinho.github.io/finalproject/html/';

$( document ).ready(function() {
    $("#registerButton").click(function() {
        const name = $("#registerName").val();
        const email = $("#registerEmail").val();
        const password = $("#registerPassword").val();
        const passwordConfirmation = $("#registerPasswordConfirmation").val();
        const ine = $("#registerIne").val();
        const userType = $("#user_type").val();
        if(name == "" || email == "" || password == "" || passwordConfirmation == "" || ine == "") {
            alert("Faltan uno o más campos");
        }
        else {
            if(password != passwordConfirmation) {
                alert("Passwords diferentes");
            }
            else {
                const data = {
                    userType: userType,
                    name: name,
                    ine_id: ine,
                    email: email,
                    password: password
                }

                $.ajax({
                    url: urls.signup,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify(data)
                }).done(function (response) {
                    if(response.success === 1) {
                        alert("Usuario creado con éxito!")
                    }
                    else {
                        alert("Usuario existente");
                    }
                }).fail(function(error) {
                    alert("Error");
                })
            }
        }
    })
});