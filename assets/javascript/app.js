var beer = "";

$('#beerSubmit').on('click', function() {
	beer = $('#beerInput').val().trim();
	console.log(beer);
	$('#title').hide();
	$('.form-inline').css('margin-top', '60px');
	$('#beerInput').val("");
	displayBeerStats();
	return false;
});

function displayBeerStats() {
	var key = "fe7efdc02eeb3b9ec8d79665a793e270";
	var queryURL = "http://api.brewerydb.com/v2/search";
	$.ajax({
		url: queryURL,
		type: 'GET',
		dataType: 'json',
		jsonp: 'jsonp_callback',
		data: {
			q: beer,
			type: 'beer',
			withBreweries: 'Y',
			format: 'jsonp',
			key: key
		}
	});
}

window.jsonp_callback = function (data) {
	console.log('much wow', data);
}