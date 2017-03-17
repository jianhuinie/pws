function validateform () {
	var name = $('#meetingName').val();
	var englishName = $('#englishName').val();
	var meetingSubject = $('#meetingSubject').val();
	var beginTime = $('#beginTime').val();
	var endTime = $('#endTime').val();
	var place = $('#place').val();
	var holder = $('#holder').val();
	var thesisDeadline = $('#thesisDeadline').val();
	var chairMan = $('#chairMan').val();
	var orgChairman = $('#orgChairman').val();
	var proChairman = $('#proChairman').val();
	var contacter = $('#contacter').val();
	var telphone = $('#telphone').val();
	var email = $('#email').val();
	var address = $('#address').val();
	var website = $('#website').val();
	var bgIntro = $('#bgIntro').val();
	var thesisRequest = $('#thesisRequest').val();
	if (name == '') {
		alert('请输入会议名');
		return false;
	}
	else {
		if (englishName == '') {
			alert('请输入会议英文名');
			return false;
		}
		else {
			if (meetingSubject == '') {
				alert('请输入会议所属学科');
				return false;
			}
			else {
				if (beginTime == '') {
					alert ('请选择会议开始时间');
					return false;
				}
				else {
					if (endTime == '') {
						alert ('请选择会议结束时间');
						return false;
					}
					else {
						if (place == '') {
							alert('请输入会议举办地');
							return false;
						}
						else {
							if (holder == '') {
								alert ('请输入会议举办方');
								return false;
							}
							else {
								if (thesisDeadline == '') {
									alert('请选择会议论文截止时间');
									return false;
								}
								else {
									if (chairMan == '') {
										alert('请输入会议主席名');
										return false;
									}
									else {
										if (orgChairman == '') {
											alert('请输入组织委员会主席名');
											return false;
										}
										else {
											if (proChairman == '') {
												alert ('请输入程序委员会主席名');
												return false;
											}
											else {
												if (contacter == '') {
													alert('请输入联系人姓名');
													return false;
												}
												else {
													if (telphone == '') {
														alert('请输入电话号码');
														return false;
													}
													else {
														if (email == '') {
															alert('请输入邮件');
															return false;
														}
														else {
															if (address == '') {
																alert('请输入地址');
																return false;
															}
															else {
																if (website == '') {
																	alert('请输入网址');
																	return false;
																}
																else {
																	if (bgIntro.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
																		alert ('请输入会议背景');
																		return false;
																	}
																	else {
																		if (thesisRequest.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
																			alert('请输入会议论文要求');
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
							}
						}
					}
				}
			}
		}
	}
}