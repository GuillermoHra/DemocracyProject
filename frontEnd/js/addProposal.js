const base = 'https://antonaldinho.github.io/finalproject/html/';
const userData = JSON.parse($.session.get("userData"));
const token = $.session.get("token");

function addProposal () {
    const nombre = $("#nombrePropuesta").val();
    const categoria = $("#categoriaPropuesta").val();
    const descripcion = $("#descripcionPropuesta").val();
    const today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    } 
    var now = mm + '-' + dd + '-' + yyyy;
    if(nombre == "" || categoria == "" || descripcion == "") {
        alert("Uno o más campos están vacios.")
    }
    else {
        const data = {
            name: nombre,
            category: categoria,
            description: descripcion,
            date: now
        }

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": urls.postProposal,
            "method": "POST",
            "headers": {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,
              "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(data)
        }
        
        $.ajax(settings).done(function (response) {
            if(response.success == 1) {
                alert("Propuesta agregada");
                location.href = base + 'home.html';
            }
            else {
                alert("Algo salió mal");
            }
        });
    }
}

$( document ).ready(function() {
    $("#addProposalButton").click(function() {
        addProposal();
    })
});