function validateform () {
	//var title = $('#newsTitle').val();
	//var subject = $('#newsSubject').val();
	var content = $('#searchMeeting').val();
	if (content == '') {
		alert('请输入评论内容');
		return false;
	}
	else {
		return true;
	}
}