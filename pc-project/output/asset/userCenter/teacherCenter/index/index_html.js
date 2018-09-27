define("userCenter/teacherCenter/index/index_html", [], function () { return '<div class="ad-banner card"><a href="{{tpl_data.banner.url}}" target="_blank"><img src="{{tpl_data.banner.image}}"></a></div><div class="basic-info card"><div class="body"><div id="plus">+5</div>{{#with tpl_data.basic_info}}<div class="sign"><div class="sign-icon success" on-click="checkin()">{{#if has_checkin}}已签到{{else}}<i class="icon icon-calendar-more"></i>签到{{/if}}</div><div class="sign-status">{{ formatDate(Date(), \'MM月DD日\') }}{{#if has_checkin}}<span class="tiny">连续签到<span class="error">{{checkin_serial_day}}</span>天</span>{{else}}<span class="tiny">还没签到哦</span>{{/if}}</div></div>{{/with}}<a href="{{site_data.host}}/{{user_data.privateDomain}}" target="_blank"><img class="image huge round" data-src="{{user_data.avatar}}" data-width="100" data-height="100" /></a><div class="profile"><div class="user-name"><strong class="huge"><a href="{{site_data.host}}/{{user_data.privateDomain}}" target="_blank">{{{cutString(user_data.displayName, 30)}}}</a></strong>{{#if user_data.vip_level != 0}}<i class="icon-vip-{{vip_level[user_data.vip_level]}}"data-title="{{#if user_data.vip_level == 1}}跟谁学会员{{elseif user_data.vip_level == 2}}跟谁学高级会员{{elseif user_data.vip_level == 3}}跟谁学超级会员{{/if}}"></i>{{#if tpl_data.basic_info.vip_remind}}<div class="vip-remind"><div>为了更好的招生，请确认下述信息是否填写准确</div><div class="button secondary tiny radius" on-click=\'vipremind()\'>已确认准确</div><ul class="unstyled"><li><a href="/teacher_center/profile" target="_blank">1、授课方式</a></li><li><a href="/usable_time/setting" target="_blank">2、授课时间</a></li><li><a href="/teacher_center/account" target="_blank">3、邮箱</a></li><li><a href="/teacher_center/profile" target="_blank">4、老师介绍</a></li></ul></div>{{/if}}{{/if}}</div><div class="user-id">ID：{{user_data.number}}</div><div class="user-credit">学分：{{#if user_data.totalIntegral != 0}}{{user_data.totalIntegral}}分{{else}}暂无，签到获取学分{{/if}}</div><div class="user-action"><a class="info" href="/teacher_center/profile">编辑资料</a><a class="info" href="/teacher_center/set_course">设置课程</a><a class="info" on-click="scheduleForStudent()">为学生排课</a></div></div></div></div><div class="progress-info card">{{#if tpl_data.user.status != 1}}<div class="header"><div class="header-title">账户状态：</div></div><div class="body"><strong class="error">{{tpl_data.user.disabled_tip }}</strong></div>{{else}}<!--   老师没有被禁号 -->{{#if tpl_data.progress_info.search_status != 0}}<!-- 该老师不能被搜到 -->{{#with tpl_data.progress_info}}<div class="header"><div class="header-title">账户状态：<span class="tips tiny">{{tpl_data.progress_info.tip}}</span></div></div><div class="body"><div class="task-schedule"><div class="progress error round small"><div class="meter" style="width: {{progress}}%;"></div></div><span clss="schedule">{{#if progress == 100}}任务全部完成{{else}}任务已完成<span class="error">{{#if progress == 0}}0/3{{elseif progress == 33}}1/3{{elseif progress == 67}}2/3{{/if}}</span>{{/if}}</span></div><ul class="task-list unstyled">{{#sections.cert}}<li>{{#if status == 3}}<i class="icon icon-check success"></i>{{else}}<i class="icon icon-info-circle error"></i>{{/if}}<span class="task-name">身份认证</span><span class="task-detail">{{#if status == 1}}入驻跟谁学的老师都需要经过身份认证哦，<a class="primary" href="/teacher_center/user_cert" on-click="gsReport(\'tpc_ide\')">马上去认证</a>{{elseif status == 2}}您的身份认证正在审核中，请耐心等待！{{elseif status == 3}}恭喜您的身份认证已经通过审核！{{elseif status == 4}}您的身份认证存在问题，暂时不能完成入驻，<a class="primary" href="/teacher_center/user_cert"  on-click="gsReport(\'tpc_ide\')">马上去修改</a>{{/if}}</span></li>{{/sections.cert}}{{#sections.profile}}<li>{{#if status == 3}}<i class="icon icon-check success"></i>{{else}}<i class="icon icon-info-circle error"></i>{{/if}}<span class="task-name">资料管理</span><span class="task-detail">{{#if status == 3}}恭喜您的资料已经全部完善并通过审核，<a class="primary" href="{{site_data.host}}/{{user_data.privateDomain}}" target="_blank">去个人主页看看</a>{{else}}{{#if group_status[\'2\'].length}}<span>审核被拒：</span>{{#each group_status[\'2\']}}<span>{{baseinfo_map[this]}}，</span>{{/each}}<a class="primary" href="/teacher_center/profile" on-click="gsReport(\'tpc_ainf\')">马上去修改</a>{{elseif group_status[\'3\'].length}}<span>待完善：</span>{{#each group_status[\'3\']}}<span>{{baseinfo_map[this]}}，</span>{{/each}}<a class="primary" href="/teacher_center/profile" on-click="gsReport(\'tpc_ainf\')">马上去完善</a>{{elseif group_status[\'0\'].length || group_status[\'5\'].length}}<span>审核中：</span>{{#each group_status[\'0\']}}<span>{{baseinfo_map[this]}}，</span>{{/each}}{{#each group_status[\'5\']}}<span>{{baseinfo_map[this]}}，</span>{{/each}}{{/if}}{{/if}}</span></li>{{/sections.profile}}{{#sections.address}}<li>{{#if status == 3}}<i class="icon icon-check success"></i>{{else}}<i class="icon icon-info-circle error"></i>{{/if}}<span class="task-name">地址管理</span><span class="task-detail">{{#if status == 1}}为方便学生找到您，请至少设置一个常用地址，<a class="primary" href="/tcenter/addresses/list" on-click="gsReport(\'tpc_a_addr\')">马上去设置</a>{{else}}常用地址：{{full_address}}，<a class="primary" href="/tcenter/addresses/list">管理我的地址</a>{{/if}}</span></li>{{/sections.address}}{{#sections.course}}<li>{{#if status == 3}}<i class="icon icon-check success"></i>{{else}}<i class="icon icon-info-circle error"></i>{{/if}}<span class="task-name">课程设置</span><span class="task-detail">{{#if status == 1}}入驻平台至少需要设一门课程（一对一、班课、视频课均可）并审核通过，<a class="primary" href="/teacher_center/set_course">马上去开课</a>{{elseif status == 2}}您提交的课程正在审核中，请耐心等待{{elseif status == 3}}课程设置成功{{elseif status == 4}}您提交的课程审核不通过，<a class="primary" href="/teacher_center/set_course">去修改</a>{{/if}}</span></li>{{/sections.course}}</ul></div>{{/with}}{{elseif tpl_data.progress_info.search_status == 0 && tpl_data.progress_info.is_checked == 0}}<!-- 该老师能被搜到 没有检测过 -->{{#with tpl_data.progress_info}}<div class="header"><div class="header-title">账户状态：</div></div><div class="body search-ok"><img src="{{site_data.source}}/img/im/expression-32.png" /><div class="intro"><div class="primary">恭喜你当前已经可以被学生搜到啦！</div><div class="hint tiny">丰富的主页对学生更有吸引力，检测您的主页吸引力</div><button class="button primary radius small" on-click="checked()">去检测</button></div></div>{{/with}}{{elseif tpl_data.progress_info.search_status == 0 && tpl_data.progress_info.is_checked == 1}}<!-- 该老师不能被搜到 检测过--><div class="header"><div class="header-title">主页完善度：</div></div><div class="body"><div class="home-percent"><div class="progress primary round small"><div class="meter" style="width: {{scores}}%;"></div></div><strong class="large primary">{{scores.toFixed(1)}}%</strong><button class="button primary radius" on-click="checked()">重新检测</button></div><ul class="task-list unstyled">{{#if scores == \'100\'}}{{#if user_data.vip_level == 0}}太棒了，您的信息很丰富，尝试去装修一下让您的主页更有吸引力，<a class="error" href="/teacher_center/index_decorate">去装修</a>{{else}}太棒了，您的信息很丰富{{/if}}{{/if}}{{#each task_list}}<li>{{this.static_desc}}<a class="info" href="{{this.href_url}}">{{this.href_desc}}</a></li>{{/each}}</ul></div>{{/if}}{{/if}}</div><div class="backlog card"><div class="header"><div class="header-title">待办事项</div></div>{{#with backlog}}<div class="body labels justified"><div class="backlog-item label"><div class="list-title">课表</div>{{#schedule}}<ul class="tiny unstyled"><li><a href="/teacher_center/timetable">待上课</a><strong class="primary">{{wait_start}}</strong></li><li><a href="/teacher_center/timetable?status=2">待确认约课</a><strong class="primary">{{wait_confirm}}</strong></li></ul>{{/schedule}}</div><div class="backlog-item label"><div class="list-title">学生</div>{{#student}}<ul class="tiny unstyled"><li><a href="/teacher_center/student">总学生数</a><strong class="primary">{{student_num}}</strong></li></ul>{{/student}}</div><div class="backlog-item label"><div class="list-title">订单</div>{{#order}}<ul class="tiny unstyled"><li><a href="/teacher_center/orders">待支付</a><strong class="primary">{{wait_pay}}</strong></li><li><a href="/teacher_center/orders">进行中</a><strong class="primary">{{underway}}</strong></li><li><a href="/teacher_center/commentFromStudent">待评价</a><strong class="primary">{{wait_comment}}</strong></li></ul>{{/order}}</div><div class="backlog-item label"><div class="list-title">课程</div>{{#course}}<ul class="tiny unstyled"><li><a href="/teacher_center/set_course">进行中</a><strong class="primary">{{underway}}</strong></li><li><a href="/teacher_center/set_course">编辑中</a><strong class="primary">{{editing}}</strong></li><li>{{#if refuse_type == \'class\'}}<a href="/teacher_center/classCourseSearch">审核被拒</a>{{elseif refuse_type == \'video\'}}<a href="/video_course/getcourselist?type=1&page=1&page_size=10">审核被拒</a>{{else}}<a href="/teacher_center/set_course">审核被拒</a>{{/if}}<strong class="primary">{{refuse}}</strong></li></ul>{{/course}}</div></div>{{/with}}</div><div class="statistic card"><div class="header"><div class="more-link tiny"><a href="/teacher_center/visit_data">数据详情&gt;</a></div><div class="header-title">数据统计</div></div><div class="body">{{#with tpl_data.statistic}}{{#pv}}<div class="statistics-item item-success"><div class="item-title"><a class="item-link" href="/teacher_center/visit_data"><span class="tiny">今日浏览量</span><strong class="huge">{{#if today == 0}}--{{else}}{{today}}{{/if}}</strong><i class="icon icon-crowd"></i></a></div><div class="item-data"><span class="data">近30日日均浏览量：<span class="large">{{#if daily == 0}}--{{else}}{{daily}}{{/if}}</span></span></div></div>{{/pv}}{{#if rank}}<div class="statistics-item item-info"><div class="item-title">{{#each results}}<a class="item-link" href="/teacher_center/sysnthetic_sort"><span class="tiny">{{remark}}</span><strong class="huge">{{#if rank}}{{rank}}{{else}}-{{/if}}</strong></a>{{/each}}</div><i class="icon icon-ranking"></i><div class="item-data"><a href="/teacher_center/sysnthetic_sort" target="_blank">查看排名解析</a></div></div>{{else}}<div class="statistics-item item-info"><div class="item-title"><a class="item-link" href="/teacher_center/sysnthetic_sort"><span class="tiny">本地同行排名</span><strong class="huge">-</strong></a></div><i class="icon icon-ranking"></i><div class="item-data"><a href="/teacher_center/sysnthetic_sort" target="_blank">查看排名解析</a></div></div>{{/if}}{{/with}}<div class="statistics-item item-error"><div class="item-title"><!-- {{#if org_id == 0}}{{#if tpl_data.is_bind_card}}<a class="withdraw" href="/teacher_center/withdraw">提现</a>{{else}}<a class="withdraw" on-click="withdraw">提现</a>{{/if}}{{/if}} -->{{#with tpl_data.statistic.cash}}<a class="item-link" href="/teacher_center/transaction_data"><span class="tiny">钱包余额</span><strong class="huge">{{#if balance == 0}}--{{else}}{{balance}}{{/if}}</strong><i class="icon icon-coins"></i></a>{{/with}}</div><div class="item-data"><span class="data-left">预期收入<span class="large">{{#if tpl_data.statistic.cash.expect == 0 || org_id != 0}}--{{else}}{{tpl_data.statistic.cash.expect}}{{/if}}</span></span><span class="data-right">累计<span class="large">{{#if tpl_data.statistic.cash.total == 0 || org_id !=0}}--{{else}}{{tpl_data.statistic.cash.total}}{{/if}}</span></span></div></div></div></div>'});