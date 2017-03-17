function validateform () {
	var title = $('#thesisTitle').val();
	var thesisMeeting = $('#thesisMeeting').val();
	var content = $('#thesisContent').val();
	if (title == '') {
		alert('请输入新闻标题');
		return false;
	}
	else {
		if (thesisMeeting == '') {
			alert('请输入论文所属会议');
			return false;
		}
		else {
			if (content.replace(/(^\s*)|(\s*$)/g, "").length == 0 ) {
				alert('请输入论文内容');
				return false;
			}
			else {
				return true;
			}
		}
	}
}