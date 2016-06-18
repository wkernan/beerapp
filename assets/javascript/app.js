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
		beers: ["512 ipa", "512 pecan porter", "austin eastciders dry original cider", "austin beerworks gringo de mayo", "blue owl spirit animal sour pale ale", "hops and grain mosaic pale ale", "live oak big bark amber", "live oak hefeweizen", "real ale firemans 4", "revolver blood and honey", "thirsty planet thirsty goat amber", "thirsty planet buckethead ipa"],
		url: 'http://www.blacksheeplodge.com/'
	},
	{
		name: 'Haymaker',
		lon: -97.7175856,
		lat: 30.2848235,
		beers: ["512 ipa", "512 pecan porter", "austin beerworks fire eagle", "austin beerworks heisenberg", "real ale firemans 4", "austin beerworks pearl snap", "austin eastciders dry original cider", "blue owl spirit animal sour pale ale", "deep ellum ipa", "friends and allies noisy cricket", "hops and grain mosaic pale ale", "hops and grain greenhouse ipa", "independence stash ipa", "live oak hefeweizen", "live oak pilz", "oasis slow ride pale ale", "real ale devils backbone", "revolver blood and honey", "thirsty planet thirsty goat amber", "thirsty planet buckethead ipa", "zilker brewing marco ipa"],
		url: 'http://www.haymakeraustin.com/'
	},
	{
		name: 'Austin Beer Garden Brewery',
		lon: -97.768825,
		lat: 30.245369,
		beers: ["hell yes", "industry", "day trip", "superliner", "big mama red", "rocket 100", "chico's bail bonds", "el camino", "german sparkle party", "ysb #6 siouxsie's strawberry girl"],
		url: 'http://theabgb.com/' 
	}, 
	{
		name: 'Craft Pride',
		lon: -97.7410793,
		lat: 30.2579386,
		beers: ["4th tap mega citrus one", "4th tap renewal tamarind wheat", "big bend hefeweizen", "blue owl little boss", "blue owl saison puede", "circle blur", "community barrel-aged legion", "mosaic ipa", "freetail witicus", "guadalupe scotch ale", "texas honey ale", "independence austin amber", "independence stash", "last stand citra smash ipa", "lone pine yellow rose", "no label ridgeback amber", "pinthouse pizza electric jellyfish", "pinthouse pizza warning shot", "real ale 20th anniversary: imperial rye ipa", "real ale devil's backbone", "real ale highlander", "st. arnold amber", "shannon irish red", "thirsty planet thirsty goat amber", "zilker coffee milk stout nitro", "512 pecan porter nitro", "austin beerworks gringo de mayo", "austin beerworks peacemaker", "austin beerworks pearl snap", "buffalo bayou more cowbell", "collective brewing project suspicious delicious", "deep ellum dallas blonde", "deep ellum rye pils", "friends & allies noisy cricket", "hops & grain a pale mosaic", "hops & grain the one they call zoe", "lakewood dfw collaboration: rum cherry baltic", "lakewood porter", "lakewood temptress nitro", "lakewood zomer pils", "live oak berliner weisse", "live oak pilz", "martin house acheron", "martin house cellerman's reserve ipa", "oasis, tx luchesa", "oasis, tx slow ride", "rabbit hole rude jester", "revolver blood and honey", "save the world agnus dei", "southern star bombshell blonde", "buried hatchet nitro", "twisted x texmex lager"],
		url: 'http://craftprideaustin.com/'
	},
	{
		name: 'Draught House Pub & Brewery',
		lon: -97.7450796,
		lat: 30.3110813,
		beers: ["512 ipa", "512 pecan porter nitro", "alaskan smoked porter", "alesmith speedway stout", "alpine beer company duet", "apricot cider", "bear republic mach 10", "bitburger premium pils", "draught house pub and brewery bock", "boulevard ginger lemon radler", "brooklyn brewery brooklyn summer ale", "collective brewing project tropic thunder", "collective brewing project urban funkhouse saison", "community witbier", "blue owl czech czech", "deschutes jubelale nitro", "deschutes obsidian stout nitro", "destihl wild sour series: here goes nothin'", "dogfish head festina peche", "draught house pub and brewery draught house edel weisse", "draught house pub and brewery draught house sunshade gose", "draught house pub and brewery weizenheimer", "draught house pub and brewery dunkelweizen", "meridian hive meadery dynamo", "fuller's esb", "firestone walker union jack ipa", "founders sumatra mountain brown", "draugt house pub and brewery funkhouser", "green flash sea to sea lager", "guadalupe brewing company guadalupe oaked scotch ale", "guadalupe brewing company guadalupe texas honey ale", "st. james's gate guinniess draught", "ranger creek brewing and distilling hard days night", "victory brewing company hod devil ipa", "hops and grain dispensary series: ipa", "the bruery jardinier", "alltech lexington brewing and distilling kentucky bourbon barrel stout", "knee deep brewing company knee deep citra extra pale ale", "laguinitas brewing company lagunitas aunt sally", "lagunitas brewing company lagunitas maximus", "left hand brewing company left hand sawtooth ale", "left hand brewing company left hand wicked juju", "live oak brewing company live oak hefe weizen", "oasis texas brewing company london homesick ale", "lone pint brewery lone pint yellow rose", "maui brewing company maui brewing coconut porter", "draught house pub and brewery mercyful fate", "oasis texas brewing company metamodern ipa", "the bruery mischief", "new belgium brewing company new belgium / hof ten dormaal lips of faith - golden ale", "new belgium company new belgium la folie brown", "odell brewing company odell cutthroat porter nitro", "odell brewing company odell drumroll", "odell brewing company odell india pale ale", "odell brewing company odell prop! culture", "austin eastciders dry original cider", "paulaner brauerei paulaner oktoberfest bier", "real ale brewing company real ale hans' pils", "revolver brewing revolver blood and honey", "save the world brewing save the world froctum bonum", "sierra nevada brewing company sierra nevada beer camp sweet sunny south southern table beer", "sierra nevada brewing company sierra nevada nooner pilsner", "brasserie de silly silly stupid sour", "draught house pub and brewery smoked weisse", "southern star brewing company southern star bombshell blonde ale", "stone brewing stone enjoy by ipa", "austin eastciders texas honey", "texas keeper cider texas keeper no. 1", "thirsty planet thirsty planet thirsty goat amber", "upslope brewing company upslope thai style white ipa", "victory brewing company victory helles lager", "victory brewing company victory summer love", "victory brewing company victory tart ten", "wasatch brewery wasatch apricot hefewizen"],
		url: 'http://www.draughthouse.com/'
	},
	{
		name: 'Easy Tiger',
		lon: -97.737847,
		lat: 30.265923,
		beers: ["avery white rascal wheat ale", "karbach sympathy for the lager pale lager", "founders porter american porter", "deschutes chainbreaker white ipa", "brooklyn blast double ipa", "firestone walker pivo pils hoppy pils", "ommegang fleur de houblon belgian pale ale", "austin beerworks pearl snap", "stone go-to session ipa", "ballast point mango even kneel fruit beer", "lakewood all call kolsh", "dogfish head festina peche", "live oak hefe weizen", "odell ipa", "strangleland alemania altbier", "austin beerworks gringo de mayo", "austin eastciders dry original cider", "brooklyn lager amber", "community mosaic ipa american ipa", "lefthand milk stout nitro", "oskar blues old chub nitro scotch ale", "firestone walker sucaba barleywine", "real ale mv coffisar coffee imperial stout", "austin eastciders hopped cider", "boulevard tank 7 saison", "real ale 20th anniversary ryeunion imperial rye ipa", "odell the meddler flanders oud bruin", "firestone walker parabola russian imperial stout", "brooklyn improved old fashioned american strong ale", "revolver sidewinder southwest pale ale"],
		url: 'http://workhorsebar.com/'
	}
]

$('.well').addClass("hide");
$('#map').addClass('hide');
//$('.thumbnail').addClass("hide");

//Where the array of beers is stored for the autocomplete
new Awesomplete(input, {
	autoFirst: true,
	list: ["thirsty planet thirsty goat amber", "zilker brewing marco ipa", "oasis slow ride pale ale", "thirsty planet buckethead ipa", "real ale firemans 4", "512 funky kingston (BLT)", "shiner blonde", "shiner bock", "austin beerworks pearl snap", "austin beerworks heisenberg", "austin beerworks fire eagle", "hops and grain alt-eration", "hell yes", "industry", "day trip", "superliner", "big mama red", "legacy", "austin beerworks black thunder", "austin beerworks peacemaker extra pale", "brewhouse brown ale", "rio blanco pale ale", "full moon pale rye ale", "sisyphus barleywine", "hans pils", "real ale devils backbone", "lost gold API", "bootlegger brown ale", "convict hill oatmeal stout", "independence pale ale", "independence stash ipa", "commercial suicide", "wytchmaker rye IPA", "black metal imperial stout", "boxers revenge", "whiskey suicide", "drink'in the sunbelt", "pecan porter", "live oak pilz", "live oak big bark amber", "liberation american IPA", "live oak hefeweizen", "revolver blood and honey",  "hops and grain pale dog ale", "the one they call zoe", "belgian golden ale", "belgian saison", "adelbert's naked nun", "adelbert's philosophizer", "deep ellum ipa", "ramber ale", "adelbert's scratchin hippo", "adelbert's black rhino", "adelbert's tripel b", "adelbert's dancin' monks", "rocket 100", "convict hill", "the green room", "sputnik", "heavy machinery double IPA", "recalcitrant dockhand", "cascabel cream stout", "wild bear", "vintage monks", "sweep the leg", "black metal imperial stout", "brahmale", "metamodern session IPA", "hops and grain mosaic pale ale", "hops and grain greenhouse ipa", "the jaguar shark", "hop overboard", "lobo negro", "real heavy", "holiday", "senor viejo", "lonestar", "real ale lost gold", "512 ipa", "512 pecan porter", "austin eastciders dry original cider", "austin beerworks gringo de mayo", "friends and allies noisy cricket", "blue owl spirit animal sour pale ale"]
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
				//lat: 30.2397576,
				//lng: -97.7554287
			};
			initMap();
			displayBeerStats();
		});
	}
	setTimeout(function() {$('.well').removeClass('hide')}, 5000);
	$('.thumbnail').removeClass("hide");
	$("#loading-gif").removeClass('hide').css('display', 'block !important');
	$('#info').addClass('hide');
	$('.form-inline').css('margin-top', '35px');
	$('#beerInput').val("");
	$('#beerList > tbody').empty();
	$('#map').removeClass('hide');
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
    var brewerySpot = {
    	lat: 30.380054,
    	lng: -97.730148
    }
    var marker = new google.maps.Marker({
    	position: brewerySpot, 
    	map: map,
    	title: 'Austin Beerworks Brewery: Beer of the Month',
    	icon: '../assets/images/beer_icon.png'
    });

  var service = new google.maps.DistanceMatrixService;
  //get distance of each bar that sells beer user entered
  barArr.forEach(function(bar) {
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
