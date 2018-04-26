{{*
    @file 新年签到活动
    @author yuanye
    @date 2016-12-19
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
	{{$teacher = $tpl_data.teacher}}
    {{$page_title = $teacher.display_name|cat:"的2017新年签"}}

    {{$page_module = "page/activity/newYear/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/newYear/result.styl"/>
{{/block}}

{{block name="content"}}
    {{*include file="page/_common/nav_bar/nav_bar.tpl" text=$teacher.display_name|cat:"的2017新年签" *}}
	<section class="result">
		<img data-src="">
		<div class="content">
		    <div class="left-cont">
		    	<p class="text text-left">{{$tpl_data.message.message2}}</p>
		    	<p class="text text-right">{{$tpl_data.message.message1}}</p>
		    	<span class="divider"></span>
		    	<p class="text-title">{{$tpl_data.message.title}}</p>
		    </div>
		    <div class="right-cont">
		    	<div class="img-cont"><img src="{{$teacher.avatar_url}}" class="avatar"></div>
		    	<p class="name single-line">{{$teacher.display_name}}</p>
		    	<p class="zan single-line">
		    		<img src="http://imgs.genshuixue.com/0cms/d/file/content/2016/12/585bcebc2a629.png" class="praise">
		    		<img src="http://imgs.genshuixue.com/0cms/d/file/content/2016/12/585bcebc04713.png" class="hide">
		    		<span class="zan-count">{{$tpl_data.zan}}</span>
		    	</p>
		    	<p class="trace">Ta的2016年足迹</p>
		    	{{if $teacher.pv}}
		    	<p class="info">获得了<span>{{$teacher.pv}}</span>围观</p>
		    	{{/if}}
		    	{{if $teacher.student_count}}
		    	<p class="info">帮助了<span>{{$teacher.student_count}}</span>个学生</p>
		    	{{/if}}
		    	{{if $teacher.teach_length}}
		    	<p class="info">教学<span>{{$teacher.teach_length}}</span>小时</p>
		    	{{/if}}
		    	<p class="toTeacher" data-url="{{$teacher.home_url}}">为Ta送祝福 <span class="icon">></span></p>
		    </div>
		    <div class="qiuqian-wrap">
		    	<span class="qiuqian-text">求签</span>
			    <img src="http://imgs.genshuixue.com/0cms/d/file/content/2016/12/585e30e2031ee.png" class="qiuqian-img">
		    </div>
		    <div class="bottom-info hide">
		    	<span class="bottom-text single-line">立即成为跟谁学老师, 领取属于你的新年签! </span><span class="register">注册有礼</span>
		    </div>
		</div>
	</section>


{{/block}}