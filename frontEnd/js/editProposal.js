const base = 'http://127.0.0.1:5500/frontEnd/html/';
const userData = JSON.parse($.session.get("userData"));
const token = $.session.get("token");

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function fillFields() {
    const proposalId = getUrlParameter('id');
    const nombrePropuesta = $("#nombrePropuesta");
    const categoriaPropuesta = $("#categoriaPropuesta");
    const descripcionPropuesta = $("#descripcionPropuesta");

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": urls.getProposalById + proposalId,
        "method": "GET",
        "headers": {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
          "cache-control": "no-cache"
        },
        "processData": false,
        "data": ""
    }
    
    $.ajax(settings).done(function (response) {
        if(response.success == 1) {
            nombrePropuesta.val(response.proposal.name);
            categoriaPropuesta.val(response.proposal.category);
            descripcionPropuesta.val(response.proposal.description);
            console.log(response.proposal.description);
        }
        else {
            alert("Algo salió mal con la request");
        }
    });
}

function updateProposal() {
    const nombre = $("#nombrePropuesta").val();
    const categoria = $("#categoriaPropuesta").val();
    const descripcion = $("#descripcionPropuesta").val();

    if(nombre == "" || categoria == "" || descripcion == "") {
        alert("Faltan uno o más campos");
    }
    else {
        const data = {
            name: nombre,
            category: categoria,
            description: descripcion
        }
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": urls.updateProposal + getUrlParameter('id'),
            "method": "PATCH",
            "headers": {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,
              "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(data)
        }
        
        $.ajax(settings).done(function (response) {
            console.log(response)
            if(response.success == 1) {
                alert("Propuesta actualizada");
                location.href = base + 'profile.html';
            }
            else {
                alert("Algo salió mal");
            }
        });
    }
}

$( document ).ready(function() {
    fillFields();
    $("#updateButton").click(function() {
        updateProposal();
    })
})