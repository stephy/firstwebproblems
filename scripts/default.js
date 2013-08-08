/*
	First Web Problems
	Javascript 
	by Stephani Alves & Kevin Deng
*/

function resizeSection(){
	if($(window).height() > 900){
		$('.section').css('height',  $(window).height());	
	}else{
		$('.section').css('height',  '900px');
	}
	
}

var prev_number = 0;
function animateLogos(){
	$('.lil-logo').clone().appendTo('#anime');
	for(var i=0; i<5; i++){
		var clone_class = 'l-' + i;
		console.log(clone_class); 
		// $('.lil-logo').clone().appendTo('#anime');
	}
  var number = 1 + Math.floor(Math.random() * 600);
  //$('#my_div').text(number);

  	var lil_logo = $('.lil-logo');
	//console.log(lil_logo);
	lil_logo.tween({
		 left:{
		      start: prev_number,
		      stop: number,
		      time: 0,
		      units: 'px',
		      duration: 1,
		      effect:'easeInOut'
		   },
		   top:{
		      start: prev_number,
		      stop: number,
		      time: 0,
		      units: 'px',
		      duration: 1,
		      effect:'easeInOut'
		   }
	});

	$.play();

	
}


function animateArrows(){
	setInterval(function() {
	  //$('#my_div').text(number);
		//console.log(lil_logo);
		var arrow_1 = $('.arrow-1');
		arrow_1.tween({
			   top:{
			      start: 0,
			      stop: 30,
			      time: 0,
			      units: 'px',
			      duration: 1,
			      effect:'easeOut'
			   }
		});

		$.play();
	},
	1000); // every 1 second


	setInterval(function() {
	  //$('#my_div').text(number);
		//console.log(lil_logo);
		var arrow_1 = $('.arrow-2');
		arrow_1.tween({
			   top:{
			      start: 0,
			      stop: 30,
			      time: 0,
			      units: 'px',
			      duration: 1,
			      effect:'easeOut'
			   }
		});

		$.play();
	},
	1000); // every 1 second


}

$(window).resize(function(){
	resizeSection();
});

resizeSection();
animateLogos();
animateArrows();
