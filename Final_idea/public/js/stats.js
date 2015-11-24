var barChartJSONdata;
var notes = [];

function statsinit(){

	// getDOM = $('#note').get(0);
	// console.log(getDOM);

	//document.getElementById("note").style.visibility = "hidden";
	jQuery.ajax({
		url:'/api/get',
		dataType:'json',
		success: function(response){
			//console.log(response);
			var idea = response.ideas;
			for(var i=idea.length-1; i>=0; i--){
				notes.push(idea[i].title);
				notes.push(idea[i].contents);
				for(var j=idea[i].tag.length-1;j>=0;j--){
					notes.push(idea[i].tag[j]);
				}
			}
			process1(notes);
			//console.log(notes);
			//console.log("aaa"+barChartJSONdata);
		}
	})
}

function buildingStats(){
	if(barChartJSONdata != null){
		if(barChartJSONdata.datasets[0].data.length<20){
		    //$('#note').detach();
		    $('#stats-content').append(
	 	    	'<div id="note">'+
	 	    	//'<div id="stats">'+
	 	    		'<h1>Stats by word</h1>'+
    	    		'<!-- canvas for line chart -->'+
    	    		'<canvas id="barChart" width="1200" height="500"></canvas>'+
    	    	'</div>'
    	    	);
		    buildBarChart();
		    //document.getElementById('home_img').src = "img/home_1.png";
		    //document.getElementById('stats_img').src = "img/stats_2.png";
		}
		else if(barChartJSONdata.datasets[0].data.length<40){
			//$('#note').detach();
			$('#stats-content').append(
	 			'<div id="note">'+
	 			//'<div id="stats">'+
	 				'<h1>Stats by word</h1>'+
    				'<!-- canvas for line chart -->'+
    				'<canvas id="barChart" width="2400" height="500"></canvas>'+
    			'</div>'
    			);
			buildBarChart();
			//document.getElementById('home_img').src = "img/home_1.png";
			//document.getElementById('stats_img').src = "img/stats_2.png";
		}
		else if(barChartJSONdata.datasets[0].data.length<60){
			//$('#note').detach();
			$('#stats-content').append(
	 			'<div id="note">'+
	 			//'<div id="stats">'+
	 				'<h1>Stats by word</h1>'+
    				'<!-- canvas for line chart -->'+
    				'<canvas id="barChart" width="3600" height="500"></canvas>'+
    			'</div>'
    			);
			buildBarChart();
			//document.getElementById('home_img').src = "img/home_1.png";
			//document.getElementById('stats_img').src = "img/stats_2.png";
		}
		else if(barChartJSONdata.datasets[0].data.length<80){
			//$('#note').detach();
			$('#stats-content').append(
	 			'<div id="note">'+
	 			//'<div id="stats">'+
	 				'<h1>Stats by word</h1>'+
    				'<!-- canvas for line chart -->'+
    				'<canvas id="barChart" width="4800" height="500"></canvas>'+
    			'</div>'
    			);
			buildBarChart();
			//document.getElementById('home_img').src = "img/home_1.png";
			//document.getElementById('stats_img').src = "img/stats_2.png";
		}
		else{
			//$('#note').detach();
			$('#stats-content').append(
	 			'<div id="note">'+
	 			//'<div id="stats">'+
	 				'<h1>Stats by word</h1>'+
    				'<!-- canvas for line chart -->'+
    				'<canvas id="barChart" width="12000" height="500"></canvas>'+
    			'</div>'
    			);
			buildBarChart();
			//document.getElementById('home_img').src = "img/home_1.png";
			//document.getElementById('stats_img').src = "img/stats_2.png";

		}
	}
	else{
		alert("Add Your Idea!");
	}
}



//////////////////////////////////////////////////////////////////////////
// calcFunc/////////////////
//////////////////////////////////////////////////////////////////////////

var check_word_remove = ['AM','ARE','IS','WAS', 'WERE', 'BEING', 'BEEN', 'BE',
    					 'DO', 'DID', 'DOES','CAN', 'COULD', 'MAY', 'MIGHT', 'WILL', 'WOULD' , 'MUST', 'SHALL', 'SHOULD', 'OUGHT', 'HAVE',
    					 'TO',
    					 'I', 'HE', 'SHE', 'THEY',
    					 'THE','A',
    					 'THIS','THAT',
    					 'WHICH','WHO','WHERE','WHEN',
    					 'FOR','AT', 'IN','ON','AS','OF','BY','THUS', 'BECAUSE', 'SUCH', 'FROM', 'AND'];

function process1 (count)	{		// for words	
	// m=new Array(10000);
	// m1=new Array(10000);
	// N=new Array (10000);

	console.log(count);

	var m = [];
	var m1 = [];
	var N= [];


	// for (i=0;i<=1;i++)		// which is chosen
	// {	if ( count.radio1[i].checked)
	// 	{	ch=i;
	// 	}
	// }
	
	A=count;		// original message 
	B="";
	A=" " + A+" ";
	A=A.toUpperCase();		// changes all alphas to Upper case
	// if (ch==0)		// get rid of everything but apha's
	// {	condense1(count);
	// }
	// else{
	//	lesscondense(count);
	//}
	condense1(count);
	//lesscondense(count);
	
	for (i=1;i<=A.length;i++)		//  trims leading spaces and multiple spaces
	{	if ((!(A.charAt(i)==" ")) || (!(A.charAt(i-1)==" ")))
		{B=B + A.charAt(i);
		}
	}
	//count.result1.value=B;
	B=B+" ";				// makes sure there is a space at end
	
	k=0; str=" ";


    for (i=0;i<=B.length;i++)
    {	k1=B.indexOf(str,k);
    	if (k1==-1)		//end of string B
    	{	Numwords=i-1;
    		break;
    	}
    	m[i+1]=B.substring(k,k1); // places all the words into an array m
    	k=k1+1;
    }
    //count.result1.value=B; 


    C="";
    NN=0;
    for (i=1;i<=Numwords; i++)	// Numwords is total number of words
    {	if (!(m[i]==""))	// only looks at m1 words that have not been processed before (not empty)
    	{	NN=NN+1;			//unique word stored in m1 array
    		m1[NN]=m[i];
    		N[NN]=1;			// initialize counter for word
    		for (j=i+1;j<=Numwords+1;j++)	//counts and makes m1 elements with unique word empty.
    		{	if (m1[NN]==m[j])
    			{	N[NN]=N[NN]+1;
    				m[j]="";
    			}
    		}	
    	}	
    }

	//////////////////sortFreq////
    for (i=1;i<=NN-1;i++){
    	for (j=i+1;j<=NN;j++){
    		if (N[i]<N[j]){
    			temp=m1[i];
				m1[i]=m1[j];
				m1[j]=temp;
				temp=N[i];
				N[i]=N[j];
				N[j]=temp;
			}
		}
	}

	//console.log(m1+" "+N+" "+NN+" "+Numwords);

	//m1.splice(0,1);
    //N.splice(0,1);
    //NN--;
    //Numwords--;


	for(var i = 1 ; i<m1.length+1 ; i++){
		//console.log(m1.length);
    	for(var j=0 ; j<check_word_remove.length ; j++){
    		//console.log(check_word_remove[j]);
    		if(m1[i] == check_word_remove[j]){
    			
    			m1.splice(i,1);
    			N.splice(i,1);
    			NN--;
    			Numwords--;
    			i = i-1;
    			break;
    		}
    	}
    	//console.log(m1+" "+N);
    }


    C=C+"Unique:" + NN+"  Total:" + Numwords+"<br>";
    C=C+"Freq.	Word<br>";
    // sets up C for showing
    for (i=1;i<=NN;i++){
    	C= C + N[i]+ "	" + m1[i] + "<br>";
    }
  
    m1.splice(0,1);
    N.splice(0,1);

    //console.log(C);
    

    barChartJSON(m1, N);

    //document.getElementById('result1').innerHTML=C; 
}

// function sortfreq(count)	{	// sorts words according to frequency
// 	for (i=1;i<=NN-1;i++)
// 	{	for (j=i+1;j<=NN;j++)
// 		{	if (N[i]<N[j])
// 			{	temp=m1[i];
// 				m1[i]=m1[j];
// 				m1[j]=temp;
// 				temp=N[i];
// 				N[i]=N[j];
// 				N[j]=temp;
// 			}
// 		}
// 	}
// 	C="Unique words:" + NN+"  Total words:" + Numwords+"<br>";
// 	C=C+"Freq.  Word<br>";
// 	for (i=1;i<=NN;i++)
// 	{	C=C + N[i]+ "  " + m1[i] + "<br>";
// 	}
// 	//count.result1.value=C;
// 	barChartJSON(m1, N);
// 	document.getElementById('result1').innerHTML=C;
// }

function condense1(count) {	// allows only alpha's and spaces for choice 1
	C="";
	for (i=0;i<=A.length-1;i++)
		{	k=A.charCodeAt(i);
			if (((k>64) && (k<91)) || (k==32))
			{	C=C+A.charAt(i);
			}
			else
			{	C=C+" ";
			}
		}
	A=C;
	//count.result1.value=B;
}

function lesscondense(count)	{	// allows all characters from space on
	C="";
	for (i=0;i<=A.length-1;i++)
		{	k=A.charCodeAt(i);
			if (k>31)
			{	C=C+A.charAt(i);
			}
			else 
			{	C=C+" ";
			}
		}
	A=C;
}

// making JSON File for Chart.js
function barChartJSON(word, wordNum){
	var wordData = {
		labels:[],
		datasets:[
			{
				fillColor: "rgba(220,220,220,0.5)",
	            strokeColor: "rgba(220,220,220,0.8)",
	            highlightFill: "rgba(220,220,220,0.75)",
	            highlightStroke:"rgba(220,220,220,1)",
				data:[]
			}
		]
	};

	wordData.labels = word;

	wordData.datasets[0].data = wordNum;

	barChartJSONdata = wordData;
	//return barChartJSONdata;
	//console.log(wordData);
	buildingStats();
}

// //========================================
// function letters1(count)	{		// counting characters upto unicode #255
// 	mN=new Array(5000);
// 	for (i=0;i<=1;i++)		// which is chosen
// 	{	if ( count.radio2[i].checked)
// 		{	ch1=i;
// 		}
// 	}
// 	A=count.message.value;
// 	T=0;
// 	for (i=0;i<=5000;i++)		// initialize Array mN to 0
// 	{	mN[i]=0;
// 	}
	
// 	for (i=0;i<=A.length-1;i++)	// k is character and counted in mN[k]
// 	{	k=A.charCodeAt(i);
// 		mN[k]=mN[k]+1;	
// 	}
// 	//count.result1.value=E;
// 	D="";
// 	D=D+"Freq.\tLetter\n"
// 	if (ch1==0)			// shows only alpha's and total number of letters T
// 	{	for (i=65; i<91;i++)
// 		{	if (!(mN[i]==0))
// 			{	D=D + mN[i] + "\t"+ String.fromCharCode(i) + "\n";
// 				T=T+mN[i];
// 			}
// 		}
// 		for (i=97;i<=122;i++)
// 		{	if (!(mN[i]==0))
// 			{	D=D+mN[i]+"\t"+String.fromCharCode(i)+"\n";
// 				T=T+mN[i];
// 			}
// 		}
// 	}
// 	else		// shows all characters from space (32) to unicode 255
// 	{	for (i=32; i<=255;i++)
// 		{	if (!(mN[i]==0))
// 			{	D=D + mN[i] + "\t"+ String.fromCharCode(i) + "\n";
// 				T=T+mN[i];
// 			}
// 		}
// 	}
// 	count.result1.value=D; 
// 	count.total.value=T;
// 	count.wordav.value=Math.round(T/Numwords*10000)/10000; // rounds off 
// }
// function sortalph(count)	{		// sort words alphabetically
// 	for (i=1;i<=NN-1;i++)
// 	{	for (j=i+1;j<=NN;j++)
// 		{	if (m1[i]>m1[j])
// 			{	temp=m1[i];
// 				m1[i]=m1[j];
// 				m1[j]=temp;
// 				temp=N[i];
// 				N[i]=N[j];
// 				N[j]=temp;
// 			}
// 		}
// 	}
// 	C="Unique words:" + NN+"  Total words:" + Numwords+"\n";
// 	C=C+"Freq.\tWord\n";
// 	for (i=1;i<=NN;i++)
// 	{	C=C + N[i]+ "\t" + m1[i] + "\n";
// 	}
// 	count.result1.value=C;
// }



// function sortletters(count)	{		//sorts characters according to frequency
// 	nletters=new Array(256);
// 	for (i=1;i<=255;i++)
// 	{	nletters[i]=i;
// 	}
// 	D="";
// 	D=D+"Freq.\tLetter\n"
// 	if (ch1==0)		// sort for alpha's
// 	{	for (i=65;i<=122;i++)
// 		{	for (j=i+1;j<=122;j++)
// 			{	if (mN[i]<mN[j])
// 				{	temp=mN[i];
// 					mN[i]=mN[j];
// 					mN[j]=temp;
// 					temp=nletters[i];
// 					nletters[i]=nletters[j];
// 					nletters[j]=temp;
// 				}
// 			}
// 		}
// 		for (i=65; i<91;i++)	// show for upper case letters
// 		{	if (!(mN[i]==0))
// 			D=D + mN[i] + "\t"+ String.fromCharCode(nletters[i]) + "\n"
// 		}
// 		for (i=97;i<=122;i++)	// show for lower case letters
// 		{	if (!(mN[i]==0))
// 			D=D + mN[i] + "\t"+ String.fromCharCode(nletters[i]) + "\n"
// 		}
	
// 	}		
// 	else		// show from space to 255
// 	{	for (i=32;i<=255;i++)
// 		{	for (j=i+1;j<=122;j++)
// 			{	if (mN[i]<mN[j])
// 				{	temp=mN[i];
// 					mN[i]=mN[j];
// 					mN[j]=temp;
// 					temp=nletters[i];
// 					nletters[i]=nletters[j];
// 					nletters[j]=temp;
// 				}
// 			}
// 		}					
// 	for (i=32; i<255;i++)
// 		{	if (!(mN[i]==0))
// 			D=D + mN[i] + "\t"+ String.fromCharCode(nletters[i]) + "\n"
// 		}
					
// 	}	
// 	count.result1.value=D;
// 	count.total.value=T;	
// }

//////////////////////////////////////////////////////////////////////////



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

window.addEventListener('load', statsinit());

