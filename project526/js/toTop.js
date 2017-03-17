function toTop () {
	 window.onscroll = function () {
		var osTop = document.body.scrollTop||document.documentElement.scrollTop;
		if(osTop > 0) {
			$("#toTop").css('display','block');
		}
		if(osTop == 0) {
			$("#toTop").css('display','none');
		}
	}
	$("#toTop")
	.click(function() {
		document.body.scrollTop=document.documentElement.scrollTop=0;
		$(this).hide();
	});
}

$(document).ready(function() {
	toTop();
})
