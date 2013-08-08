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

function animateLogos(){
	/*
	for(var i=0; i< 100; i++){

		var lil_logo = 
		$('#anime').append()
	}
	*/
	
}

$(window).resize(function(){
	resizeSection();
});

resizeSection();
animateLogos();
