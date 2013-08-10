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

var loc = [
		{x:0, y:0},
		{x:0, y:100},
		{x:0, y:200},

		{x:100, y:0},
		{x:100, y:100},
		{x:100, y:200},

		{x:200, y:0},
		{x:200, y:100},
		{x:200, y:200},
	]
var prev_number = 0;
function animateLogos(){
	
 	for(var i = 0; i< 1; i++){
 		var lil_logo = $('.lil-logo#'+i+'');
 		var pos_x = 1+ Math.floor(Math.random() * 800);
 		var pos_y = 1 + Math.floor(Math.random() * 150);
		lil_logo.tween({
			   left:{
			      start: 0,
			      stop: pos_x,
			      time: 0,
			      units: 'px',
			      duration: 1,
			      effect:'easeInOut'
			   },
			   top:{
			      start: 0,
			      stop: pos_y,
			      time: 0,
			      units: 'px',
			      duration: 1,
			      effect:'easeInOut',
			      
			   }
			});
		 
		$.play();
 	}//end of for
	
}//end of function


function bounce(obj){
	setInterval(function() {
	  //$('#my_div').text(number);
		//console.log(lil_logo);
		obj.tween({
		   top:{
		      start: 0,
		      stop: 30,
		      time: 0,
		      units: 'px',
		      duration: 1,
		      effect:'easeOut',
			   onStop: function( element ){
			     obj.tween({
					top:{
						start: 30,
						stop: 0,
						time: 0,
						units: 'px',
						duration: 1,
						effect:'easeOut'
					}
			     });
			   }
			}
		});

		$.play();
	},
	2000); // every 1 second

}

function animateIntro(){
	$('.intro-logo').tween({
	   rotate:{
	      start: 0,
	      stop: 360,
	      time: 0,
	      duration: 2,
	      effect:'easeInOut',
	      onStop: function(){
			      	$('.arrow-1').fadeIn();
			      	bounce($('.arrow-1'));
			      }
	   }
	});
	 
	$.play();

}

function isScrolledIntoView(elem){
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)
      && (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop) );
}



$(window).resize(function(){
	resizeSection();
});


$(window).scroll(function(){
	var logos = $('.lil-logo');
	if(isScrolledIntoView(logos) == true){
			//animateLogos();
	}
});

resizeSection();
//animateLogos();
bounce($('.arrow-2'));
animateIntro();


