{{*
@file 学生发起三方通话
@author hanzhaohang
@date 2016-05-12
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_title = "老师推荐"}}
    {{$page_module = "page/activity/liudan_tel_student/callForStudent/callForStudent"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data["page_type"] = $ext_data.page}}
    {{$script_data["dispatch_id"] = $tpl_data.dispatch_id}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/liudan_tel_student/callForStudent/callForStudent.styl"/>
{{/block}}

{{block name="content"}}
    {{$td = $tpl_data}}
    <div id="main">

		{{$hcoin[1]="https://imgs.genshuixue.com/0cms/d/file/content/2016/02/56d3b6e867bb9.png"}}
        {{$hcoin[2]="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5aef77.png"}}
        {{$hcoin[3]="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5d1676.png"}}
        
        {{if !empty($td.teacher)}}
            {{$tt = $td.teacher}}

            {{$sex[0]="https://imgs.genshuixue.com/2016/6/7150e136ad.png"}}
            {{$sex[1]="https://imgs.genshuixue.com/2016/6/16b2ef9423.png"}}

            
            
	        <div class="common-teacher-info">
		        <div class="avatar">
		            <div class="avatar-info img-background">
		                <img width="100%" height="100%" data-src="{{$tt.avatar}}" style="visibility: visible; opacity: 1;">
		            </div>
		        </div>
			    <div class="teacher-name">
			        <span class="name">

			        {{if !empty($hcoin[$tt.vip_level])}}
				        <i class="vip-icon"><img width="100%" height="auto" src="{{$hcoin[$tt.vip_level]}}"></i>
			        {{/if}}
			            
			            {{$tt.display_name}}
			        </span>
			        <div class="sex-vip">
			            <span class="teacher-sex">
			                <img width="100%" height="auto" src="{{$sex[$tt.sex]}}">
			            </span>
			        </div>
			    </div>
			    {{if !empty($tt.organization_name)}}
			        <a class="org-name" href="javascript:void(0)"> ({{$tt.organization_name}}) </a>
			    {{/if}}
			    
			    <div class="self-brief">{{$tt.short_introduce}}</div>
			    {{if !empty($tt.school_age)}}
				    <p class="age">
				        <span>{{$tt.school_age}}</span>
				    </p>
			    {{/if}}
		    </div>
        {{else}}
            {{$tt = $td.organization}}

	       <div class="common-teacher-info">
		        <div class="avatar">
		            <div class="avatar-info img-background">
		                <img width="100%" height="100%" data-src="{{$tt.avatar}}" style="visibility: visible; opacity: 1;">
		            </div>
		        </div>
			    <div class="teacher-name">
			        <span class="name">

			        {{if !empty($hcoin[$tt.vip_level])}}
				        <i class="vip-icon"><img width="100%" height="auto" src="{{$hcoin[$tt.vip_level]}}"></i>
			        {{/if}}
			            
			            {{$tt.display_name}}
			        </span>
			    </div>
			    {{if !empty($tt.organization_name)}}
			        <a class="org-name" href="javascript:void(0)"> ({{$tt.organization_name}}) </a>
			    {{/if}}
			    
			    <div class="self-brief">{{$tt.short_introduce}}</div>
		    </div>
        {{/if}}
	    <div class="call-info">
		    <p class="call-tip">赶快联系对方吧</p>
		    <div class="call-btn aui-btn aui-btn-info aui-btn-block">免费通话</div>
	    	
	    </div>
    </div>
    <div class="b-logo">
	    	<img width="148" height="auto" data-src="http://cdn.gsxservice.com/asset/img/logo-release2_96e0aea1fb.png">
	    </div>
{{/block}}