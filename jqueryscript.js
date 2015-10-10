	var test  = 'abc';
	$(document).ready(function(){
		setTimeout(function(){
			log('.output');
			$('.output').on('mouseenter', function(){
				log(this);
				$(this).children().addClass('selected');
			});
			$('.output').on('mouseleave', function(){
				log(this);
				$(this).children().removeClass('selected');
			});
		},500);
		

		
		$('#test').on('mouseenter', function(){
				log(this);
				$(this).css({
					 "background-color": "yellow",
      				"font-weight": "bolder"
				});
		})
	});
