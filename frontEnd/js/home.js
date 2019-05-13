const base = 'http://127.0.0.1:5500/frontEnd/html/';
const userData = JSON.parse($.session.get("userData"));
const token = $.session.get("token");

function populateProposals() {
    const proposals = $(".proposal-container");
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": urls.getProposals,
        "method": "GET",
        "headers": {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
          "cache-control": "no-cache"
        },
        "processData": false,
        "data": ""
    }
    
    let cont = 0;
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        response.proposals.forEach(function(proposal) {
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": urls.getProposalResults + proposal._id,
                "method": "GET",
                "headers": {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + token,
                  "cache-control": "no-cache"
                },
                "processData": false,
                "data": ""
            }
            
            $.ajax(settings).done(function (conteo) {
                const newAppend = '<div class="proposal-who boxed-inner"><h3 class="proposal-title">' + proposal.name + '</h3><h4 id="proposal-category" class="proposal-description">Categoría: ' + proposal.category + '</h4><p class="proposal-description">' + proposal.description + '<p class="proposal-favor">Favor:' + ' ' + conteo.favor + '</p>' + '<p class="proposal-contra">Contra:' + ' ' + conteo.against + '</p></p><div class="vote_icons"><img class="vote-button" src="../images/icons/aceptar.png" data-proposal_id="' + proposal._id + '" data-desicion="1" alt="accept" height="43"><img class="vote-button" src="../images/icons/reject.png" data-proposal_id="' + proposal._id + '" data-desicion="0" alt="reject" height="43"></div></div>';
                proposals.append(newAppend);
                cont++;
                if(cont == response.proposals.length) {
                    clickVote();
                }
            });
        });
    });

}

function clickVote() {
    const buttons = $(".vote-button");
    console.log(buttons.length)
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
                alert("Voto envíado");
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

$( document ).ready(function() {
    populateProposals();
    console.log(userData.userType);
    if(userData.userType == "legislator") {
        $("#addProposalButton").show();
    }
});