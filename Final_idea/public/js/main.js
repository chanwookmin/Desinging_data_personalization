// var notes = []; // a blank array that we'll use to hold our notes
// var totalWords = 0; // how many words?
// var totalNotes = 0; // how many notes?

// var word = [];

// var barChartJSONdata;


function init(){
	myIdeainit();
}

function myIdeainit(){
	jQuery.ajax({
		url:'/api/get',
		dataType:'json',
		success : function(response){
			console.log(response);

			var ideas = response.ideas;

			for(var i=ideas.length-1; i>=0; i--){
				var htmlToAdd = '<div class="col-md-4 card-holder-main">' +
				'<div class="card">' +
	      			'<p><h2>'+ideas[i].title+'</h2></p>' +
	      			'<br>'+
	      			'<p>'+ideas[i].contents+'</p>'+
	      			'<p>'+ideas[i].tag+'</p>'+
	      			'<a href="../edit/'+ideas[i]._id+'">Edit</a>'+
	  			'</div>';

	  			jQuery("#note-holder").append(htmlToAdd);
			}
		}
	})
}

function homeclickEvent(){
	document.getElementById('home_img').src='../img/home_2.png';
	document.getElementById('add_img').src='../img/add_1.png';
	document.getElementById('stats_img').src='../img/stats_1.png';
}
function addclickEvent(){
	document.getElementById('add_img').src='../img/add_2.png';
	document.getElementById('home_img').src='../img/home_1.png';
	document.getElementById('stats_img').src='../img/stats_1.png';
}
function statsclickEvent(){
	document.getElementById('stats_img').src='../img/stats_2.png';
	document.getElementById('add_img').src='../img/add_1.png';
	document.getElementById('home_img').src='../img/home_1.png';
}

window.addEventListener('load', init());
document.getElementById('home_menu').addEventListener('click', homeclickEvent);
document.getElementById('add_menu').addEventListener('click', addclickEvent);
document.getElementById('stats_menu').addEventListener('click', statsclickEvent);




