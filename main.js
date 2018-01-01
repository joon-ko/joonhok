$(document).ready(main);

function main() {
	$('.show-text').hide();
	$('#fun-title').click(function() {
		$('.show-text').fadeIn(3000);
		/* $('h1').css("border", "3px solid #ff6666"); --> */
		$('h1').animate({backgroundColor: '#ffb3b3'}, {borderColor: '#ff6666'}, 3000);
	});

	$('.dropdown').hide();
	$('.dropdown-click').on('click', function() {
		/* $(this).prev().css("height", "auto"); */
		$(this).next().slideToggle(500);
	});
}