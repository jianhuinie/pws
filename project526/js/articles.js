function validateform () {
	//var title = $('#newsTitle').val();
	//var subject = $('#newsSubject').val();
	var content = $('#searchThesis').val();
	if (content == '') {
		alert('请输入评论内容');
		return false;
	}
	else {
		return true;
	}
}