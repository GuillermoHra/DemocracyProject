const urls = {};
urls.base = "https://democracy-project.herokuapp.com";

urls.login = urls.base + "/users/login";
urls.getProposals = urls.base + '/proposals';
urls.vote = urls.base + '/vote/';
urls.updateVote = urls.base + '/updateVote/';
urls.getVoteHistory = urls.base + '/proposalsByCitizen';
urls.getProposalById = urls.base + '/proposals/';
urls.getCreatedProposals = urls.base + '/proposalsByLegislator';
urls.logout = urls.base + '/users/logout';
urls.postProposal = urls.base + '/proposals';
urls.updateProposal = urls.base + '/proposals/';
urls.signup = urls.base + '/users'; //POST
urls.getProposalResults = urls.base + '/proposalResults/';