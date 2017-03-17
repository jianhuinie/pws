function validateform () {
	//var title = $('#newsTitle').val();
	//var subject = $('#newsSubject').val();
	var content = $('#thesisContent').val();
	if (content.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
		alert('请输入修改后的论文内容');
		return false;
	}
	else {
		return true;
	}
}