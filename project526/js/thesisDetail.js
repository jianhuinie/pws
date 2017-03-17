$(document).ready(function () {
	$('#comment').click(function () {
		$(this).hide();
		$('#commentForm').show();
	})
})
function validateform () {
	//var title = $('#newsTitle').val();
	//var subject = $('#newsSubject').val();
	var content = $('#commentContent').val();
	if (content.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
		alert('请输入评论内容');
		return false;
	}
	else {
		return true;
	}
}