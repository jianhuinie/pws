$(document).ready(function () {
	$('#released').click(function () {
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		$('.thesis').hide();
		$('#releasedThesis').show();

	});
	$('#prevote').click(function () {
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		$('.thesis').hide();
		$('#prevoteThesis').show();

	});
	$('#voting').click(function () {
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		$('.thesis').hide();
		$('#votingThesis').show();

	});
	$('#failed').click(function () {
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		$('.thesis').hide();
		$('#failedThesis').show();

	});
})