var beer = "";
var distance = 0;
var map;
var pos;
var spot;
var input = document.getElementById('beerInput');
var bars = [
	{
		name: 'The Goodnight',
		lon: -97.734407,
		lat: 30.358183,
		beers: [""],
		url: 'http://thegoodnightaustin.com/'
	},
	{
		name: 'Black Sheep Lodge',
		lon: -97.7711583,
		lat: 30.2484081,
		beers: [""],
		url: 'http://www.blacksheeplodge.com/'
	},
	{
		name: 'Haymaker',
		lon: -97.7175856,
		lat: 30.2848235,
		beers: [""],
		url: 'http://www.haymakeraustin.com/'
	},
	{
		name: 'Austin Beer Garden Brewery',
		lon: -97.768825,
		lat: 30.245369,
		beers: [""],
		url: 'http://theabgb.com/' 
	} 
]

new Awesomplete(input, {
	autoFirst: true,
	list: ["dos xx", "thirsty goat", "real ale fireman's four", "modelo especial", "shiner blonde", "austin beerworks pearl snap", "hops and grain alt-eration", "sierra nevada", "austin beerworks peacemaker", "hell yes", "industry", "day trip", "superliner", "big mama red", "legacy", "black thunder german schwarz", "peacemaker extra pale", "brewhouse brown ale", "rio blanco pale ale", "full moon pale rye ale", "sisyphus barleywine", "hans pils", "devils backbone", "lost golad API", "austin amber ale", "bootlegger brown ale", "convict hill oatmeal stout", "independence pale ale", "comemrcial suicide", "wytchmaker rye IPA", "black metal imperial stout", "boxers revenge", "whiskey suicide", "drink'in the sunbelt", "pecan porter", "pilz", "big bark", "amber lager", "liberation american IPA", "hefeweizen", "pale dog", "the one they call zoe", "belgian golden ale", "belgian saison", "naked nun", "philosophizer", "ramber ale", "scratchin hippo", "black rhino", "tripel b", "dancin' monks", "rocket 100", "convict hill", "the green room", "sputnik", "heavy machinery double IPA", "recalcitrant dockhand", "cascabel cream stout", "wild bear", "vintage monks", "sweep the leg", "black metal imperial stout", "brahmale", "metamodern session IPA", "a pale mosaic", "the jaguar shark", "hop overboard", "lobo negro", "real heavy", "holiday", "senor viejo", ]
});

function checkBeer() {
	//need to build a function that checks what bars carry the beer, 
	//once we know what bars carry the beer, 
	//we can place them into the destinations array inside the distancematrix under the initMap() function.
	//Then we can find distance from users position and find out which one is closest.
}

$('#beerSubmit').on('click', function() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			initMap();
		});
	}
	beer = $('#beerInput').val().trim();
	$('#info').addClass('hide');
	$('.form-inline').css('margin-top', '35px');
	$('#beerInput').val("");
	$('#newRow').empty();
	$('#newRow').append("<tr><th>Name</th><th>Label</th><th>ABV</th><th>Description</th><th>Style</th><th>Brewery</th><th>Location</th></tr>");
	displayBeerStats();
	$("#loading-gif").removeClass('hide').css('display', 'block !important');
	return false;
});


function displayBeerStats() {
	var key = "88FE890DEF0863F2929FFBC8575FF7F224A431E3";
	var secretKey = "931C49726BD3C379BCA98A13BE0E0118E44BB308";
	var queryURL = "https://api.untappd.com/v4/search/beer?q=" + beer + "&limit=5&client_id=" + key + "&client_secret=" + secretKey;
	$.ajax({
		url: queryURL,
		type: 'GET',
	}).done(function(data) {
		$( "#loading-gif" ).hide();
		var beerData = data.response.beers.items;
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

  //Only using this for now to check how to place markers, will need to update
  //To show all the markers, but also provide route to closest bar
  bars.forEach(function(b) {
  	spot = {
  		lat: b.lat,
  		lng: b.lon
  	}
  	var marker = new google.maps.Marker({
  		position: spot,
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
    destination: spot,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
  directionsDisplay.setMap(map);
  var geocoder = new google.maps.Geocoder;

  var service = new google.maps.DistanceMatrixService;
  service.getDistanceMatrix({
    origins: [pos],
    destinations: [spot],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    avoidHighways: false,
    avoidTolls: false
  }, function(response, status) {
    if (status !== google.maps.DistanceMatrixStatus.OK) {
      alert('Error was: ' + status);
    } else {
      var originList = response.originAddresses;
      var destinationList = response.destinationAddresses;
      $('#output').html(originList[0] + " to <a href='" + bars[0].url + "' target='_blank'>" + bars[0].name + "</a>: " + response.rows[0].elements[0].distance.text + " in " + response.rows[0].elements[0].duration.text);
    }
  });
}

 /*//Was Getting CORS Error Again
function getDistance() {
	var distKey = "AIzaSyDdCWO-KjO5Gp_jN19FuqyPyjr84sbgtO0";
	var distUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + pos.lat + "," + pos.lng + "&destinations=" + spot.lat + "," + spot.lng + "&key=" + distKey;
	//https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=AIzaSyDdCWO-KjO5Gp_jN19FuqyPyjr84sbgtO0
	$.ajax({
		url: distUrl,
		type: 'GET',
	}).done(function(data) {
		console.log(data);
	});
}*/


