function validateform () {
	var title = $('#newsTitle').val();
	var subject = $('#newsSubject').val();
	var content = $('#newsContent').val();
	if (title == '') {
		alert('请输入新闻标题');
		return false;
	}
	else {
		if (subject == '') {
			alert('请输入新闻所属学科');
			return false;
		}
		else {
			if (content.replace(/(^\s*)|(\s*$)/g, "").length == 0 ) {
				alert('请输入新闻内容');
				return false;
			}
			else {
				return true;
			}
		}
	}
}