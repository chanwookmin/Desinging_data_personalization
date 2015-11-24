var notes = []; // a blank array that we'll use to hold our notes
var totalWords = 0; // how many words?
var totalNotes = 0; // how many notes?

var word = [];

var barChartJSONdata;

var getDOM;

// adds a note 
function addNote(){
	// first let's get the note text;
	var noteText = document.getElementById('noteText').value;
	if(!noteText || noteText=="") return alert('Enter a Idea!');

	// now let's push the note into our notes array
	// it's a good idea to keep track of our data in our code
	notes.push(noteText);

	process1(notes);


	// now, let's actually add the note to our page
	addCard(noteText);

	// now, let's reset the textarea
	document.getElementById('noteText').value = '';

	totalNotes++; // increment the notes number by 1

	// get the stats for this note
	var wordCount = noteText.split(' ').length;
	totalWords+=wordCount; // increment the total wordcount
	// calcWord(noteText);

	// now, let's call the function to update the stats
	//updateStats();

}

// add the note card
function addCard(text){
	$('#note-holder').append(
	  '<div class="col-md-4 card-holder">' +
	    '<div class="card">' +
	      '<p>'+text+'</p>' +
	    '</div>' +
	  '</div>'
		);
}

function statsinit(){

	// getDOM = $('#note').get(0);
	// console.log(getDOM);

	//document.getElementById("note").style.visibility = "hidden";

	if(barChartJSONdata != null){
		if(barChartJSONdata.datasets[0].data.length<20){
		    $('#note').detach();
		    $('#note-content').append(
	 	    	'<div id="note">'+
	 	    	//'<div id="stats">'+
	 	    		'<h1>Stats by word</h1>'+
    	    		'<!-- canvas for line chart -->'+
    	    		'<canvas id="barChart" width="1200" height="500"></canvas>'+
    	    	'</div>'
    	    	);
		    buildBarChart();
		    document.getElementById('home_img').src = "img/home_1.png";
		    document.getElementById('stats_img').src = "img/stats_2.png";
		}
		else if(barChartJSONdata.datasets[0].data.length<40){
			$('#note').detach();
			$('#note-content').append(
	 			'<div id="note">'+
	 			//'<div id="stats">'+
	 				'<h1>Stats by word</h1>'+
    				'<!-- canvas for line chart -->'+
    				'<canvas id="barChart" width="2400" height="500"></canvas>'+
    			'</div>'
    			);
			buildBarChart();
			document.getElementById('home_img').src = "img/home_1.png";
			document.getElementById('stats_img').src = "img/stats_2.png";
		}
		else if(barChartJSONdata.datasets[0].data.length<60){
			$('#note').detach();
			$('#note-content').append(
	 			'<div id="note">'+
	 			//'<div id="stats">'+
	 				'<h1>Stats by word</h1>'+
    				'<!-- canvas for line chart -->'+
    				'<canvas id="barChart" width="3600" height="500"></canvas>'+
    			'</div>'
    			);
			buildBarChart();
			document.getElementById('home_img').src = "img/home_1.png";
			document.getElementById('stats_img').src = "img/stats_2.png";
		}
		else if(barChartJSONdata.datasets[0].data.length<80){
			$('#note').detach();
			$('#note-content').append(
	 			'<div id="note">'+
	 			//'<div id="stats">'+
	 				'<h1>Stats by word</h1>'+
    				'<!-- canvas for line chart -->'+
    				'<canvas id="barChart" width="4800" height="500"></canvas>'+
    			'</div>'
    			);
			buildBarChart();
			document.getElementById('home_img').src = "img/home_1.png";
			document.getElementById('stats_img').src = "img/stats_2.png";
		}
		else{
			$('#note').detach();
			$('#note-content').append(
	 			'<div id="note">'+
	 			//'<div id="stats">'+
	 				'<h1>Stats by word</h1>'+
    				'<!-- canvas for line chart -->'+
    				'<canvas id="barChart" width="12000" height="500"></canvas>'+
    			'</div>'
    			);
			buildBarChart();
			document.getElementById('home_img').src = "img/home_1.png";
			document.getElementById('stats_img').src = "img/stats_2.png";

		}
	}
	else{
		alert("Add Your Idea!");
	}
}

function myIdeainit(){

	barChartJSONdata='';

	//document.getElementById("note").style.visibility = "visible";

	$('#note').detach();

	$('#note-content').append(
		'<div id="note">'+
            '<div class="row" id="top-holder">'+
              '<div class="col-md-7 col-sm-6" id="text-area">'+
                '<textarea name="noteText" id="noteText" placeholder="Type your note here"></textarea>'+
                '<button id="add">ADD THE NOTE</button>'+
              '</div>'+
              '<div class="col-md-5 col-sm-6">'+
                '<div class="card">'+
                  '<div id="result1" cols="28" rows="16" wrap="PHYSICAL">Calculated, Sorted and Converted Data Results.</div>'+
                '</div>'+
                '<button id="reset">RESET</button>'+
              '</div>'+  
            '</div>'+
            '<div class="row" id="note-holder"></div>'+
        '</div>'
        );


	$('#add').click(function(event){ addNote();});
	$('#reset').click(function(event){resetNotes();});



	document.getElementById('home_img').src = 'img/home_2.png';
	document.getElementById('stats_img').src = "img/stats_1.png";
}

function buildBarChart(){
	
	// a chart can take 2 objects:
	// 1. data - the data/information (required)
	// 2. options - chart options (optional)



	// create chart options (this is optional)
	// see list of options:
	// http://www.chartjs.org/docs/#line-chart-chart-options
	var options = {
		showScale:true,
		barShowStroke : false,
		barValueSpacing : 3,
		barDatasetSpacing : 1
	}

	// NOW, we actually create the chart
	// first, get the context of the canvas where we're drawing the chart
	var ctx = document.getElementById("barChart").getContext("2d");
	
	// now, create the line chart, passing in:
	// 1. the data (required)
	// 2. chart options (optional)
	var myBarChart = new Chart(ctx).Bar(barChartJSONdata, options);

}


// function calcWord(noteText){

// 	var pre_saveWord = [];
// 	var saveWord = [];
// 	var calcWord = [];
// 	//var word = [];
// 	 word.push(noteText.split(' '));
// 	 //console.log("aaa");
// 	 //console.log(word.length);

// 	 for(var j=0; j<word.length ; j++){
// 	 	for(var i=0; i<word[j].length; i++){
// 	 		calcWord.push(word[j][i]);
// 	 		//console.log(word[j][i]);
// 	 	}	
// 	 }
// 	 console.log(calcWord.length);

// 	 calc();

// 	 function calc() {

// 	 	var startVar = calcWord[0];

// 	 	//console.log(calcWord);

// 	 	for(var k =0 ; k<calcWord.length; k++){
// 	 		//console.log(calcWord.length);
// 	 		if(startVar.localeCompare(calcWord[k])==0){
// 	 			pre_saveWord.push(calcWord[k]);
// 	 			calcWord.splice(k,1);
// 	 			//console.log(calcWord);
// 	 		}
// 	 	}
// 	 	console.log(pre_saveWord);
// 	 	saveWord.push(pre_saveWord);


// 	 	calcWord.splice(0,1);
// 	 	//console.log(saveWord);
// 	 	//console.log(calcWord);
// 	 	//console.log(calcWord);
	 	
// 	 	if(calcWord.length>0) return(calc());
// 	}

// 	//console.log(saveWord);
	 
// 	 // if(word[i][i])
// }

// updates the stats
// function updateStats(){
// 	document.getElementById('totalNotes').innerHTML = totalNotes;
// 	document.getElementById('totalWords').innerHTML = totalWords;	
// }
function resetStats(){
    document.getElementById('result1').innerHTML='Calculated, Sorted and Converted Data Results.'; 
}

// resets the notes
function resetNotes(){
	notes = []; // empty the note array
	//remove the card html
	document.getElementById('note-holder').innerHTML = '';
	//update the stats
	totalWords = 0;
	totalNotes = 0;
	resetStats();
	//updateStats(); 
}

document.getElementById('home').addEventListener('click',myIdeainit);
document.getElementById('stats').addEventListener('click',statsinit);
document.getElementById('add').addEventListener('click',addNote);
document.getElementById('reset').addEventListener('click',resetNotes);
