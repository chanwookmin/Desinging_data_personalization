// var ideaTag = [][];

function init(){
	myRefinit();

	// $('.carousel').carousel({
	// 	  interval: 2000
	// })
}

function myRefinit(){
	var ideas;
	var ideaTitle, ideaContents, ideaTag;
	var tag_string = '';
	var img_html_string = '';

	$.getJSON('/api/get', function(idea_data){
		ideas = idea_data.ideas;
		
		for(var i=ideas.length-1; i>=0; i--){

			tag_string='';

			for(var j=ideas[i].tag.length; j>0;j--){
				if(j==1){
					tag_string = tag_string+ideas[i].tag[j-1];
				}else{
				tag_string = tag_string+(ideas[i].tag[j-1]+", ");
				}	
			}

			ideaTitle = ideas[i].title;
			ideaContents = ideas[i].contents;
			ideaTag = ideas[i].tag;

			var htmlToAdd =
				'<div class=row-fluid id="section_ref">'+
					'<div class="span6 col-md-4 card-holder">' +
						'<div class="card">' +
	      					'<p><h2>'+ideaTitle+'</h2></p>' +
	      					'<br>'+
	      					'<p>'+ideaContents+'</p>'+
	      					'<p>'+ideaTag+'</p>'+
	      				'</div>'+
	      			'</div>'+
	      			//'<div class="span9 col-md-9 img-holder" id="img_add_'+i+'">'+
	      			///////////////////////////////////////////
	      			// '<div class="span9 col-md-9 card-holder">'+
	      			// 	'<div class="flexslider">'+
	      			// 		'<ul class="slides" id="img_add_'+i+'">'+
	      			// 		'</ul>'+
	      			// 	'</div>'+
	      			// '</div>'+

	      			//////carousel////
	      			'<div id="visual_ref_'+i+'" class="carousel slide span6 col-md-6 img-holder" data-ride="carousel">'+

                        //<!-- Wrapper for slides -->
                        '<div class="carousel-inner" role="listbox" id="img_add_'+i+'">'+
                          
                        '</div>'+
                                
                        //<!-- Controls -->
                        '<a class="left carousel-control" href="#visual_ref_'+i+'" role="button" data-slide="prev">'+
                          '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>'+
                          '<span class="sr-only">Previous</span>'+
                        '</a>'+
                        '<a class="right carousel-control" href="#visual_ref_'+i+'" role="button" data-slide="next">'+
                          '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>'+
                          '<span class="sr-only">Next</span>'+
                        '</a>'+
                  	'</div>'+
                 	//////////
                 '</div>';
	      	jQuery("#note-holder").append(htmlToAdd);
	      
	      	//console.log(tag_string);

			$.getJSON('/api/search/pins/'+tag_string+'/'+i, function(pinterest_data){
	
				var obj = JSON.parse(pinterest_data.result);
				var index = pinterest_data.index;

				console.log(obj);
				img_html_string = '';

				for(var k=0; k<obj.data.length;k++){
					//img_html_string = img_html_string+('<li><img src="'+obj.data[k].image_medium_url+'"/></li>');
					if(k==0){
						img_html_string = img_html_string+('<div class="item active" align="center">'+'<img src="'+obj.data[k].image_medium_url+'" height="300">'+'</div>');
					}else{
						img_html_string = img_html_string+('<div class="item" align="center">'+'<img src="'+obj.data[k].image_medium_url+'" height="300">'+'</div>');
					}
					//img_html_string = img_html_string+('<div><img src="'+obj.data[k].image_medium_url+'"/></div>');
				}

				var htmlToAdd = img_html_string;
	  			
	  			console.log(index);	
	  			jQuery("#img_add_"+index).append(htmlToAdd);	  		
			});
		}
	});
}

window.addEventListener('load', init());


