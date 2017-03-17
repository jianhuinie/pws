function validateform () {
	var title = $('#notifierTitle').val();
	var subject = $('#notifierMeeting').val();
	var content = $('#notifierContent').val();
	if (title == '') {
		alert('请输入通知标题');
		return false;
	}
	else {
		if (subject == '') {
			alert('请输入通知所属会议');
			return false;
		}
		else {
			if (content.replace(/(^\s*)|(\s*$)/g, "").length == 0 ) {
				alert('请输入通知内容');
				return false;
			}
			else {
				return true;
			}
		}
	}
}