var beer = "";
var distance = 100000; //set very high for if statement in line 210
var map; //for initMap()
var pos; //users location
var spot; //used to hold bar locations
var barArr = []; //array to store bars that sell user selected beer
var barName = ""; //name of closest bar
var barUrl = ""; //url of closest bar
var barLat; //lattitude of closest bar
var barLng; //longitude of closest bar
var input = document.getElementById('beerInput');
var bars = [
	{
		name: 'The Goodnight',
		lon: -97.734407,
		lat: 30.358183,
		beers: ["thirsty planet thirsty goat amber", "lonestar", "real ale firemans 4", "shiner blonde", "austin beerworks pearl snap", "shiner bock", "hops and grain alt-eration", "austin beerworks peacemaker extra pale", "hops and grain pale dog ale", "real ale lost gold", "austin beerworks fire eagle", "adelbert's dancin' monks", "adelbert's philosophizer", "real ale devils backbone"],
		url: 'http://thegoodnightaustin.com/'
	},
	{
		name: 'Black Sheep Lodge',
		lon: -97.7711583,
		lat: 30.2484081,
		beers: ["512 ipa", "512 pecan porter", "austin east ciders dry original cider", "austin beerworks gringo de mayo", "blue owl spirit animal sour pale ale", "hops and grain mosaic pale ale", "live oak big bark amber", "live oak hefeweizen", "real ale firemans 4", "revolver blood and honey", "thirsty planet thirsty goat amber", "thirsty planet buckethead ipa"],
		url: 'http://www.blacksheeplodge.com/'
	},
	{
		name: 'Haymaker',
		lon: -97.7175856,
		lat: 30.2848235,
		beers: ["512 ipa", "512 pecan porter", "austin beerworks fire eagle", "austin beerworks heisenberg", "real ale firemans 4", "austin beerworks pearl snap", "austin east ciders dry original cider", "blue owl spirit animal sour pale ale", "deep ellum ipa", "friends and allies noisy cricket", "hops and grain mosaic pale ale", "hops and grain greenhouse ipa", "independence stash ipa", "live oak hefeweizen", "live oak pilz", "oasis slow ride pale ale", "real ale devils backbone", "revolver blood and honey", "thirsty planet thirsty goat amber", "thirsty planet buckethead ipa", "zilker brewing marco ipa"],
		url: 'http://www.haymakeraustin.com/'
	},
	{
		name: 'Austin Beer Garden Brewery',
		lon: -97.768825,
		lat: 30.245369,
		beers: [""],
		url: 'http://theabgb.com/' 
	}, 
	{
		name: 'Craft Pride',
		lon: -97.7410793,
		lat: 30.2579386,
		beers: [""],
		url: 'http://craftprideaustin.com/'
	},
	{
		name: 'Draught House Pub & Brewery',
		lon: -97.7450796,
		lat: 30.3110813,
		beers: [""],
		url: 'http://www.draughthouse.com/'
	},
	{
		name: 'Easy Tiger',
		lon: -97.737847,
		lat: 30.265923,
		beers: [""],
		url: 'http://workhorsebar.com/'
	},
	{
		name: 'Flying Saucer Draught Emporium',
		lon: -97.7362631,
		lat: 30.3154336,
		beers: [""],
		url: 'http://www.beerknurd.com/locations/austin-flying-saucer'
	},
	{
		name: 'Brew Exchange',
		lon: -97.7521114,
		lat: 30.2702684,
		beers: ["thirsty goat"],
		url: 'http://brewexchangeaustin.com/'
	},
	{
		name: 'The Ginger Man',
		lon: -97.7481522,
		lat: 30.266304,
		beers: [""],
		url: 'http://thegingerman.com/austin/'
	},
	{
		name: 'The Brass Tap',
		lon: -97.6796838,
		lat: 30.5090713,
		beers: [""],
		url: 'http://brasstapbeerbar.com/'
	}
]

$('.well').addClass("hide");

//Where the array of beers is stored for the autocomplete
new Awesomplete(input, {
	autoFirst: true,
	list: ["thirsty planet thirsty goat amber", "zilker brewing marco ipa", "oasis slow ride pale ale", "thirsty planet buckethead ipa", "real ale firemans 4", "512 funky kingston (BLT)", "shiner blonde", "shiner bock", "austin beerworks pearl snap", "austin beerworks heisenberg", "austin beerworks fire eagle", "hops and grain alt-eration", "hell yes", "industry", "day trip", "superliner", "big mama red", "legacy", "austin beerworks black thunder", "austin beerworks peacemaker extra pale", "brewhouse brown ale", "rio blanco pale ale", "full moon pale rye ale", "sisyphus barleywine", "hans pils", "real ale devils backbone", "lost golad API", "austin amber ale", "bootlegger brown ale", "convict hill oatmeal stout", "independence pale ale", "independence stash ipa", "comemrcial suicide", "wytchmaker rye IPA", "black metal imperial stout", "boxers revenge", "whiskey suicide", "drink'in the sunbelt", "pecan porter", "live oak pilz", "live oak big bark amber", "liberation american IPA", "live oak hefeweizen", "revolver blood and honey",  "hops and grain pale dog ale", "the one they call zoe", "belgian golden ale", "belgian saison", "adelbert's naked nun", "adelbert's philosophizer", "deep ellum ipa", "ramber ale", "adelbert's scratchin hippo", "adelbert's black rhino", "adelbert's tripel b", "adelbert's dancin' monks", "rocket 100", "convict hill", "the green room", "sputnik", "heavy machinery double IPA", "recalcitrant dockhand", "cascabel cream stout", "wild bear", "vintage monks", "sweep the leg", "black metal imperial stout", "brahmale", "metamodern session IPA", "hops and grain mosaic pale ale", "hops and grain greenhouse ipa", "the jaguar shark", "hop overboard", "lobo negro", "real heavy", "holiday", "senor viejo", "lonestar", "real ale lost gold", "512 ipa", "512 pecan porter", "austin east ciders dry original cider", "austin beerworks gringo de mayo", "friends and allies noisy cricket", "blue owl spirit animal sour pale ale"]
});

//Might not need this function anymore
/*function checkBeer() {
	//need to build a function that checks what bars carry the beer, 
	//once we know what bars carry the beer, 
	//we can place them into the destinations array inside the distancematrix under the initMap() function.
	//Then we can find distance from users position and find out which one is closest.
}*/

$('#beerSubmit').on('click', function() {
	//reset all the variables for each on.click
	distance = 10000;
	barArr = [];
	barName = "";
	barUrl = "";
	barLat;
	barLng;
	beer = $('#beerInput').val().trim();
	//check all the bars that have user entered beer
	bars.forEach(function(bar) {
		bar.beers.forEach(function(b) {
			if(b === beer) {
				//push each bar that sells user entered beer into array
				barArr.push(bar);
			}
		})
	})
	//get user location
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			initMap();
			displayBeerStats();
		});
	}
	$('.well').removeClass('hide');
	$("#loading-gif").removeClass('hide').css('display', 'block !important');
	$('#info').addClass('hide');
	$('.form-inline').css('margin-top', '35px');
	$('#beerInput').val("");
	$('#beerList > tbody').empty();
	//create table heading
	//$('#beerList > tbody').append("<tr><th>Name</th><th>Label</th><th>ABV</th><th>Description</th><th>Style</th><th>Brewery</th><th>Location</th></tr>");
	return false;
});


function displayBeerStats() {
	var key = "88FE890DEF0863F2929FFBC8575FF7F224A431E3";
	var secretKey = "931C49726BD3C379BCA98A13BE0E0118E44BB308";
	var queryURL = "https://api.untappd.com/v4/search/beer?q=" + beer + "&limit=1&client_id=" + key + "&client_secret=" + secretKey;
	$.ajax({
		url: queryURL,
		type: 'GET',
	}).done(function(data) {
		$( "#loading-gif" ).addClass('hide');
		var beerData = data.response.beers.items;
		beerData.forEach(function(b) {
			$('#beerList > tbody').append("<tr><td>" + b.beer.beer_name + "</td><td><img src='" + b.beer.beer_label +"'></td><td>" + b.beer.beer_abv + "%</td><td>" + b.beer.beer_description + "</td><td>" + b.beer.beer_style + "</td><td><a href='" + b.brewery.contact.url + "' target='_blank'>" + b.brewery.brewery_name + "</a></td><td><a href='" + barUrl + "' target='_blank'>" + barName + "</a> distance: " + distance + " mi</td></tr>");
			$('#beerList').removeClass('hide');
		});
	});
}

function initMap() {
	var directionsDisplay;
	var directionsService = new google.maps.DirectionsService();
	directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
	//center map on user location
    map = new google.maps.Map(document.getElementById('map'), {
    center: pos,
    zoom: 15
  });
  //place a pin on the map for each bar that sells user entered beer only
  barArr.forEach(function(b) {
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
  //place pin to show user position
    var marker = new google.maps.Marker({
      position: pos,
      map: map,
      title: 'You Are Here'
    });

  var service = new google.maps.DistanceMatrixService;
  //get distance of each bar that sells beer user entered
  barArr.forEach(function(bar, index) {
  	service.getDistanceMatrix({
  		origins: [pos],
  		destinations: [{lat:bar.lat, lng:bar.lon}],
  		travelMode: google.maps.TravelMode.DRIVING,
  		unitSystem: google.maps.UnitSystem.IMPERIAL,
  		avoidHighways: false,
  		avoidTolls: false
  	}, function(response, status) {
  		if(status !== google.maps.DistanceMatrixStatus.OK) {
  			alert('Error was: ' + status);
  		} else {
  			var num = parseInt(response.rows[0].elements[0].distance.text)
  			//if statement to grab the closest bar from the user and then use those stats to get the directions
  			if(num < distance) {
  				barName = bar.name;
  				distance = num;
  				barUrl = bar.url;
  				barLat = bar.lat;
  				barLng = bar.lon;
  				//show directions on map to closest bar
				  var request = {
				    origin: pos,
				    destination: {lat: barLat, lng: barLng},
				    travelMode: google.maps.TravelMode.DRIVING
				  };
				  directionsService.route(request, function(result, status) {
				    if (status == google.maps.DirectionsStatus.OK) {
				      directionsDisplay.setDirections(result);
				    }
				  });
				  directionsDisplay.setMap(map);
				  var geocoder = new google.maps.Geocoder;
  				var originList = response.originAddresses;
  				var destinationList = response.destinationAddresses;
  				$('#output').html(originList[0] + " to <a href='" + bar.url + "' target='_blank'>" + bar.name + "</a>: " + response.rows[0].elements[0].distance.text + " in " + response.rows[0].elements[0].duration.text);

  			}
  		}
  	})
  })
  /*service.getDistanceMatrix({
    origins: [{lat:30.1482166, lng:-97.8326257}],
    destinations: [spot],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    avoidHighways: false,
    avoidTolls: false
  }, function(response, status) {
    if (status !== google.maps.DistanceMatrixStatus.OK) {
      alert('Error was: ' + status);
    } else {
    	console.log(response);
      var originList = response.originAddresses;
      var destinationList = response.destinationAddresses;
      $('#output').html(originList[0] + " to <a href='" + bars[0].url + "' target='_blank'>" + bars[0].name + "</a>: " + response.rows[0].elements[0].distance.text + " in " + response.rows[0].elements[0].duration.text);
    }
  });*/
}
