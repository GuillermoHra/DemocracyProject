const base = 'http://127.0.0.1:5500/frontEnd/html/';
const userData = JSON.parse($.session.get("userData"));
const token = $.session.get("token");

function populateUserData() {
    $("#user-name").text(userData.name);
    $("#user-ine").text(userData.ine_id);
    $("#user-email").text(userData.email);
    if(userData.userType == "legislator") {
        $("#user-type").text("Legislador");
    }
    else {
        $("#user-type").text("Ciudadano");
    }
}

function getHistorialVotos() {
    const container = $("#history-votes");
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": urls.getVoteHistory,
        "method": "GET",
        "headers": {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
          "cache-control": "no-cache",
        },
        "processData": false,
        "data": ""
    }
    
    $.ajax(settings).done(function (response) {
        //console.log(response)
        const proposalsLength = response.length;
        let cont = 0
        response.forEach(function(proposal) {
            var settings2 = {
                "async": true,
                "crossDomain": true,
                "url": urls.getProposalById + proposal.proposalId,
                "method": "GET",
                "headers": {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + token,
                  "cache-control": "no-cache"
                },
                "processData": false,
                "data": ""
            }
            
            $.ajax(settings2).done(function (response) {
                //console.log(response)
                const newAppend = '<div class="proposal-who boxed-inner"><h3 class="proposal-title">' + response.proposal.name + '</h3><h4 id="proposal-category" class="proposal-description">Categoría: ' + response.proposal.category + '</h4><p class="proposal-description">' + response.proposal.description + '</p><div class="vote_icons"><img class="vote-button" src="../images/icons/aceptar.png" data-proposal_id="' + response.proposal._id + '" data-desicion="1" alt="accept" height="43"><img class="vote-button" src="../images/icons/reject.png" data-proposal_id="' + response.proposal._id + '" data-desicion="0" alt="reject" height="43"></div></div>';
                container.append(newAppend);
                cont++;
                if(cont == proposalsLength) {
                    clickVote();
                }
            });
        })
    });
}

function clickVote() {
    const buttons = $(".vote-button");
    //console.log($(".vote-button").length);
    buttons.click(function() {
        const desicion = {
            decision: $(this).data('desicion')
        }
        const proposalId = $(this).data('proposal_id');
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": urls.vote + proposalId,
            "method": "POST",
            "headers": {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,
              "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(desicion)
        }
        
        $.ajax(settings).done(function (response) {
            if(response.success == 1) {
                alert("Voto registrado");
            }
            else {
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": urls.updateVote + proposalId,
                    "method": "PATCH",
                    "headers": {
                      "Content-Type": "application/json",
                      "Authorization": "Bearer " + token,
                      "cache-control": "no-cache",
                    },
                    "processData": false,
                    "data": JSON.stringify(desicion)
                }
                
                $.ajax(settings).done(function (response) {
                    if(response.success == 1) {
                        alert("Voto actualizado");
                    }
                    else {
                        alert("No fue posible actualizar el voto");
                    }
                });
            }
        });
    })
}

function getHistorialCreados() {
    const container = $("#history-created");
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": urls.getCreatedProposals,
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
        console.log(response.length);
        let contador = 0;
        if(response.length != 0) {
            response.forEach(function(proposal) {
                const newAppend = ` <div  class="proposal-who boxed-inner">
                                        <h3 class="proposal-title">${proposal.name}</h3>
                                        <h4 id="proposal-category" class="proposal-description">Categoría:${" " + proposal.category}</h4>
                                        <p class="proposal-description">${proposal.description}</p>
                                        <i class="fas fa-edit fa-2x editProposalButton" data-proposal_id="${proposal._id}"></i>
                                        <i class="far fa-trash-alt fa-2x deleteProposalButton" data-proposal_id="${proposal._id}"></i>
                                    </div>`;
                container.append(newAppend);
                contador++;
                if(contador == response.length) {
                    console.log(contador);
                    clickEdit();
                    clickDelete();
                }
            });
        }
    });
}

function clickEdit() {
    const buttons = $(".editProposalButton");
    console.log(buttons.length);
    buttons.click(function() {
        location.href = base + 'editProposal.html?id=' + $(this).data('proposal_id');
    })
}

function logout() {
    const logout_btn = $("#button_logout");
    logout_btn.click(function() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": urls.logout,
            "method": "POST",
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
                $.session.set("token", "");
                $.session.set("userData", "");
                location.href = base + 'login.html';
            }
            else {
                alert("Algo salió mal. Intenta de nuevo.");
            }
        })
    })
}

function clickDelete() {
    const button = $(".deleteProposalButton");
    button.click(function() {
        const id = $(this).data('proposal_id');

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": urls.updateProposal + id,
            "method": "DELETE",
            "headers": {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,
              "cache-control": "no-cache"
            },
            "processData": false
        }
        
        $.ajax(settings).done(function (response) {
            console.log(response)
            if(response.success == 1) {
                alert("Propuesta borrada");
                location.href = base + 'profile.html';
            }
            else {
                alert("Algo salió mal");
            }
        });
    })
}

$( document ).ready(function() {
    populateUserData();
    getHistorialCreados();
    getHistorialVotos();
    logout();
    if(userData.userType == "citizen") {
        $("#history-created").hide();
    }
    if(userData.userType == "legislator") {
        $("#history-votes").hide();
    }
    if(userData.userType == "legislator") {
        $("#addProposalButton").show();
    }
})