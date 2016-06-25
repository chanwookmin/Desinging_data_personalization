function init(){
	$.ajax({
		url:'./data/json/travel.json',
		type: 'GET',
		failure: function(err){
			return console.log("There Was an issue getting the data");
		},
		success: function(response){
			console.log('the response from our JSON is -->');
			console.log(response);

			var placesToRender = response.countryCode;
			var country = response.countryData;
			var changeToCountry = response.travelData;
			for(var i = 0 ; i<placesToRender.length ; i++){
			 	//countryforFlag.push(placesToRender[i].country);
			 	addFlag(placesToRender[i], country[i]);
			 	//console.log(placesToRender[i].country);
			 }
			$("#de").click(function(){
				changeCard("de");
				console.log("afdsafdsaf");
			});
			$("#it").click(function(){
				changeCard("it");
				console.log("afdsafdsaf");
			});
			$("#nl").click(function(){
				changeCard("nl");
				console.log("afdsafdsaf");
			});
			$("#be").click(function(){
				changeCard("be");
				console.log("afdsafdsaf");
			});
		}
	});
}

function flagClick(){

}

function addFlag(countryCode, country){
	console.log(countryCode);
	var htmlToAppend = 
	'<div class = "card-container col-sm-1 col-md-3 centered">'+
		'<div class="flag" id="'+ countryCode + '">' +
			'<img src="http://www.geonames.org/flags/x/'+ countryCode +'.gif">'+
			'<h1>'+country+'</h1>'+
		'</div>'+
	'</div>';
	$('#card-holder').prepend(htmlToAppend);
}

function changeCard(countryCode){
	$('#card-holder').empty();
	addCardForhistoryByCountry(countryCode);
}

function addCardForhistoryByCountry(countryCode){
	$.ajax({
		url:'./data/json/travel.json',
		type: 'GET',
		failure: function(err){
			return console.log("There Was an issue getting the data");
		},
		success: function(response){
			console.log('the response from our JSON is -->');
			console.log(response);
			var placesToRender = response.travelData;
			for(var i=0; i<placesToRender.length;i++){
				if(placesToRender[i].countryCode == countryCode){
					//addCard(countryCode);
					geoCodeIt(placesToRender[i].city, 
							  placesToRender[i].companion, 
							  placesToRender[i].tDate, 
							  placesToRender[i].tDescription);
				}
			}
		}
	});
}

function geoCodeIt(location, companion,tDate, tDescription){

	var apiKey = 'AIzaSyCIxywgknotMlV6Kjqn-HbJgQBkSAMPOlU';

	// make a request to geocode the location
	$.ajax({
	    url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+location+'&key='+apiKey,
	    type: 'GET',
	    failure: function(err){
	    	return alert ("Could not find that location");
	    },
	    success: function(response) {
	      console.log('the geocode response is -- >');
	      console.log(response);
	      
	      if(response.status=="ZERO_RESULTS") return alert ("Could not find that location");

	      // now that we have the lat/lon details, can get the weather
	      var lat = response.results[0].geometry.location.lat;
	      var lon = response.results[0].geometry.location.lng;
	      return getTheWeatherAPI(location,companion,tDate, tDescription, lat, lon);
	    }
	});
}

function getTheWeatherAPI(location, companion,tDate, tDescription, lat, lon){

	//forecast apiKey
	var apiKey = "a345a0f8bba13003d1bb79fa4fad60d6";

	// make a request to get the current weather details for the lat/lon
	$.ajax({
	    url: 'https://api.forecast.io/forecast/'+apiKey+'/'+lat+','+lon+', '+tDate+'T12:00:00-0400',
	    type: 'GET',
	    dataType: "jsonp", // need to specify this
	    success: function(response) {
	      console.log('the weather response is -- >');
	      console.log(response);
	      // now that we have the weather details, we can build the card
	      var status = response.currently.summary;
	      var temp = Math.round(response.currently.temperature);
	      var icon = response.currently.icon;

	      // reset the input value
	     // document.getElementById("theInput").value = '';

	      // add the card
	      return addCard(location,companion,tDate, tDescription, status, temp, icon);
	    }
	});

}

function addCard(location, companion,tDate, tDescription,status, temp, icon){

	var htmlToAppend = 
	'<div class="card-container col-sm-4 col-md-4 centered">'+
		'<div class="card">'+
		  '<img src="data/img/'+icon+'.png">'+
		    '<h1>'+location+'</h1>'+
		    '<h2>'+temp+'&#176; / '+status+'</h2>'+
		    '<h2>'+companion+'</h2>'+
		    '<h2>'+tDate+'</h2>'+
		    '<h2>'+tDescription+'</h2>'+
	  '</div>'+
	'</div>';

  return $('#card-holder').prepend(htmlToAppend);

}

window.addEventListener('onload', init());


