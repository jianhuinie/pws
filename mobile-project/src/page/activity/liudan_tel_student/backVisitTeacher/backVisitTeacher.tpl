{{*
@file 老师回访
@author hanzhaohang
@date 2016-05-12
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_title = "老师回访"}}
    {{$page_module = "page/activity/liudan_tel_student/backVisitTeacher/backVisitTeacher"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    
    {{$script_data["page_type"] = $ext_data.page}}
    {{$script_data['dispatch_id'] = $tpl_data.dispatch_id}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/liudan_tel_student/backVisitTeacher/backVisitTeacher.styl"/>
{{/block}}

{{block name="content"}}
    {{$td = $tpl_data}}
    <div id="main">
	    <div class="student-info">
		    <div class="user-info">
		        <div class="u-img">
		            <img class="USERIMG" data-src="{{$td.student.avatar}}" width="100%" height="auto" whs="1">
		        </div>
		        <div class="USERINFO">
		            <div class="u-logined">
		                <p class="u-name">{{$td.student.display_name}}</p>
		                <p class="u-quit">
		                    {{$td.student.mobile}}
		                </p>
		            </div>
		        </div>
		        <div class="price">{{$td.price}}</div>
		    </div>
	    
	        <table cellspacing="10">
                <tr>
                    <td class="column1">科目</td>
                    <td class="column2">{{$td.subject_name}}</td>
                </tr>
                <tr>
                    <td class="column1">地点</td>
                    <td class="column2">{{$td.lesson_detail.lesson_address}}</td>
                </tr>
                <tr>
                    <td class="column1">方式</td>
                    <td class="column2">{{$td.lesson_detail.lesson_way}}</td>
                </tr>
                <tr>
                    <td class="column1">时间</td>
                    <td class="column2">{{$td.lesson_detail.lesson_time}}</td>
                </tr>
            </table>
	    </div>
	    <div class="call-info">
	       <div style="{{if $td.feedback_status == 0}}display: block;{{else}}display: none;{{/if}}">
		    	<p>推荐给您的{{$td.student.display_name}}同学是否适合做您的学生，跟您一起学习？</p>
			    <span>您的反馈将帮我们更准确的为您推荐老师，感谢</span>
			    <div class="aui-buttons">
			    	<div data-status="2" class="call-btn aui-btn aui-btn-info aui-btn-block dis_btn">不适合</div>
			    	<div data-status="1" class="call-btn aui-btn aui-btn-info aui-btn-block">适合</div>
			    </div>
		    </div>
		    <p style="{{if $td.feedback_status == 1}}display: block;{{else}}display: none;{{/if}}">非常感谢您的反馈,预祝您双方工作，学习顺利，希望未来我们能为您推荐更多适合您的学生！</p>
		    <p class="re" style="{{if $td.feedback_status == 2}}display: block;{{else}}display: none;{{/if}}">非常感谢您的反馈，我们会给学生推荐其他老师，同时希望未来我们能为您推荐更多适合您的学生！</p>
	    </div>

    </div>
    <div class="b-logo">
	    	<img width="148" height="auto" data-src="http://cdn.gsxservice.com/asset/img/logo-release2_96e0aea1fb.png">
	    </div>
{{/block}}