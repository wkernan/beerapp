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
	var queryURL = "http://api.brewerydb.com/v2/search?q=" + beer + "&type=beer&withBreweries=Y&format=json&key=" + key;
	console.log(queryURL);
	$.ajax({
		url: queryURL,
		type: 'GET',
		async: false,
		contentType: "application/json",
		dataType: 'jsonp'
	}).done(function(response) {
		console.log(response);
		var beerData = response.data;
		console.log(beerData);
	});
}