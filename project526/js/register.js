$(document).ready(function () {
	$('#readRule').click(function (){
		policyagree();
	})
})
function policyagree(){        
    if (document.getElementById("readRule").checked) {
    	document.getElementById("submit").disabled=false;
    }
    else {
    	document.getElementById("submit").disabled=true;
    }
}
//前台表单验证，验证表单内容的合法性
function validateForm () {
	var username = $('#registerUsername').val();
	var password = $('#registerPassword').val();
	var repeatPassword = $('#repeatPassword').val();
	var name = $('#name').val();
	var birthday = $('#birthday').val();
	if (username == '') {
		alert('请输入用户名');
		//$('#registerUsername').focus();
		return false;
	}
	else {
		var re =/^[a-zA-Z\d]{1}[\w\.\-]{2,16}[a-zA-Z\d]{1}$/; 
        if(!(re.test(username))) {
        	alert('用户名格式不正确');
        	return false;
    	}
    	else {
    		if (password == '') {
				alert('请输入密码');
				return false;
			}
			else {
				if (password.length < 6 || password.length > 16) {
					alert('密码格式不正确');
					return false;
				}
				else {
					if (repeatPassword == '') {
						alert('请重复输入密码');
						return false;
					}
					else {
						if (repeatPassword.length < 6 || repeatPassword.length > 16) {
							alert('重复密码的密码格式不正确');
						}
						else {
							if (repeatPassword != password) {
								alert('两次输入的密码不一致');
								return false;
							}
							else {
								if (name == '') {
									alert('请输入真实姓名');
									return false;
								}
								else {
									var genders = document.getElementsByName('gender');
									if (!(genders[0].checked) && !(genders[1].checked)) {
										alert('请选择性别');
										return false;
									}
									else {
										if (birthday == '') {
											alert('请选择出生年月');
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
			}
    	}	 
	}
}