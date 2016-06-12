var beer = "";
var distance = 0;
var map;
var pos;
var dest;
var bars = [
	{
		name: 'The Goodnight',
		lon: -97.734407,
		lat: 30.358183,
		beers: ["pearl snap", "fireman's 4", "Dos XX", "Pabst Blue Ribbon"]
	}
]

console.log(bars[0].beers[0]);

$('#beerSubmit').on('click', function() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			initMap();
			console.log(pos);
		});
	}
	beer = $('#beerInput').val().trim();
	console.log(beer);
	$('#info').hide();
	$('.form-inline').css('margin-top', '35px');
	$('#beerInput').val("");
	$('#newRow').empty();
	$('#newRow').append("<tr><th>Name</th><th>Label</th><th>ABV</th><th>Description</th><th>Style</th><th>Brewery</th><th>Location</th></tr>");
	displayBeerStats();
	return false;
});

function displayBeerStats() {
	var key = "88FE890DEF0863F2929FFBC8575FF7F224A431E3";
	var secretKey = "931C49726BD3C379BCA98A13BE0E0118E44BB308";
	var queryURL = "https://api.untappd.com/v4/search/beer?q=" + beer + "&limit=5&client_id=" + key + "&client_secret=" + secretKey;
	console.log(queryURL);
	$.ajax({
		url: queryURL,
		type: 'GET',
	}).done(function(data) {
		console.log(data);
		var beerData = data.response.beers.items;
		console.log(beerData);
		beerData.forEach(function(b) {
			$('#newRow').append("<tr><td>" + b.beer.beer_name + "</td><td><img src='" + b.beer.beer_label +"'></td><td>" + b.beer.beer_abv + "%</td><td>" + b.beer.beer_description + "</td><td>" + b.beer.beer_style + "</td><td><a href='" + b.brewery.contact.url + "' target='_blank'>" + b.brewery.brewery_name + "</a></td><td>" + b.brewery.location.brewery_city + ", " + b.brewery.location.brewery_state + " distance: " + distance + " mi</td></tr>");
			$('#newRow').removeClass('hide');
		});
	});
}

function initMap() {
	var directionsDisplay;
	var directionsService = new google.maps.DirectionsService();
	directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
  map = new google.maps.Map(document.getElementById('map'), {
    center: pos,
    zoom: 15
  });
	dest = new google.maps.LatLng(37.7683909618184, -122.51089453697205)
	console.log("new dest var", dest)
  bars.forEach(function(b) {
  	// spot = {
  	// 	lat: b.lat,
  	// 	lng: b.lon
  	// }
  	var dest = new google.maps.LatLng(b.lat, b.lon);

  	var marker = new google.maps.Marker({
  		position: pos,
  		map: map,
  		title: b.name,
  		icon: '../assets/images/beer_icon.png'
  	});
  });

  var marker = new google.maps.Marker({
    position: pos,
    map: map,
    title: 'You Are Here'
  });
  var request = {
    origin: pos,
    destination: dest,
    travelMode: google.maps.TravelMode.DRIVING
  };
  console.log(request.origin);
  // console.log(request.destination);
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
  directionsDisplay.setMap(map);
  getDistance();
}

function getDistance() {
	var distKey = "AIzaSyDdCWO-KjO5Gp_jN19FuqyPyjr84sbgtO0";
	var distUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + pos.lat + "," + pos.lng + "&destinations=" + dest.lat() + "," + dest.lng() + "&key=" + distKey;
	//https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=AIzaSyDdCWO-KjO5Gp_jN19FuqyPyjr84sbgtO0
	$.ajax({
		url: distUrl,
		type: 'GET',
		dataType: "jsonp",
	}).done(function(data) {
		console.log("This is the distance matrix!!!",data);
	});
}


