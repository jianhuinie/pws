function validateform () {
	var originpsw = $('#originPassword').val();
	var newpsw = $('#newPassword').val();
	var newpsw1 = $('#newPassword1').val();
	if (originpsw == '') {
		alert('请输入原始密码');
		return false;
	}
	else {
        if(newpsw == '') {
        	alert('请输入新密码');
        	return false;
    	}
    	else {
    		if (newpsw.length < 6 || newpsw.length > 16) {
				alert('密码格式不正确');
				return false;
			}
			else {
				if (newpsw1 == '') {
					alert('请重复输入新密码');
					return false;
				}
				else {
					if (newpsw1.length < 6 || newpsw1.length > 16) {
						alert('密码格式不正确');
						return false;
					}
					else {
						if (newpsw != newpsw1) {
							alert('两次输入的密码不一致');
							return false;
						}
						else {
							return true;
						}
					}
				}
			}
    	}	 
	}
}