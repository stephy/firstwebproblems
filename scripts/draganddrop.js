/*
	First Web Problems
	Javascript 
	by Stephani Alves & Kevin Deng
*/


$(function() {
var tightness = 50;

var l = {
	'drag1': {
		x: 0,
		y: 0
	},
	'drag2': {
		x: 0,
		y: 0
	},
	'drag3': {
		x: 0,
		y: 0
	},
	'drag4': {
		x: 0,
		y: 0
	},
	'drag5': {
		x: 0,
		y: 0
	},
	'drag6': {
		x: 0,
		y: 0
	}
}

function between(elem, pos, loc){
	var x_pos = l['drag1'].x;
	var y_pos = l['drag1'].y;

	var low_x = x_pos+pos-tightness;
	var high_x = x_pos+pos+tightness;

	var low_y = y_pos+pos-tightness;
	var high_y = y_pos+pos+tightness;

	//console.log(low_x);
	//console.log(high_x);
	if(loc == 'x'){
		if(elem.x > low_x && elem.x < high_x){
			return true;
		}else{
			return false;
		}
	}//end of loc x

	if(loc == 'y'){
		if(elem.y > low_y && elem.y < high_y){
			return true;
		}else{
			return false;
		}
	}//end of loc x
	
	
}

function updatePuzzle(elem,x,y){
	l[elem].x = x;
	l[elem].y = y;
}

function checkPuzzle(){
	var check_array = [];
	
	var check2_x = between(l['drag2'], 60, 'x');
	check_array.push(check2_x);
	var check2_y = between(l['drag2'], 20, 'y');
	check_array.push(check2_y);
	var check3_x = between(l['drag3'], 164, 'x');
	check_array.push(check3_x);
	var check3_y = between(l['drag3'], 105, 'y');
	check_array.push(check3_y);
	var check4_x = between(l['drag4'], 325, 'x');
	check_array.push(check4_x);
	var check4_y = between(l['drag4'], 244, 'y');
	check_array.push(check4_y);
	var check5_x = between(l['drag5'], 153, 'x');
	check_array.push(check5_x);
	var check5_y = between(l['drag5'], 183, 'y');
	check_array.push(check5_y);
	var check6_x = between(l['drag6'], 57, 'x');
	check_array.push(check6_x);
	var check6_y = between(l['drag6'], 90, 'y');
	check_array.push(check6_y);

	for(var i = 0; i< check_array.length; i++){
		if(check_array[i] == false){
			return false;
		}
	}

	return true;

}


$(".dragme").draggable({ 
	stop: function(){
		updatePuzzle($(this).attr('id'), $(this).position().left, $(this).position().top);
		var status = checkPuzzle();
		console.log(status);
		if (status) {
			$('#dialog1').dialog({
				modal: true,
	      buttons: {
	        Ok: function() {
	          $( this ).dialog( "close" );
	        }
	      }
			});

			var d = $(document.createElement('div'));
			d.css({
				position: 'absolute',
				left: $('#drag1').css('left'),
				top: $('#drag1').css('top'),
				width: 433,
				height: 433
			});
			$('#puzzle').append(d);

			new Eraser(50, 50)
			.loadImage($('#completedImage'))
			.appendTo(d)
			.onComplete(function() {
				$('#dialog2').dialog({
					modal: true
				});
			});

			$('.dragme').hide();
		}
	}
});

});//end function main

