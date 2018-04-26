{{extends file="page_app/_base/base.tpl"}}

{{*页面配置*}}
{{block name="page" append}}
    {{*标题*}}
    {{$page_title = "免单奖励课程"}}
    {{*页面入口模块, 例如:page/app_teacher/vip_index/index*}}
    {{$page_module = "page_app/imgInvite/searchClass"}}
    {{*是否使用返回顶部的按钮*}}
    {{$enable_backTopButton = true}}
{{/block}}

{{*模板数据, 需要传递到js模块中的模板数据在这里配置*}}
{{block name="data"}}
    {{$script_data["data"] = $tpl_data}}
{{/block}}

{{*页面样式*}}
{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page_app/imgInvite/searchClass.styl"/>
{{/block}}

{{*页面内容*}}
{{block name="content"}}
    <div class="course-container">
        <div class="search">
            <p class="tip">注：仅支持售卖中的班课和视频课</p>
            <span class="cancel">取消</span>
            <span class="confirm hide">完成</span>
            <div class="inp">
                <input type="text" id="goSearch" placeholder="请输入课程名称">
                <div class="doSearch">搜索</div>
            </div>
        </div>
        <div class="course-list">
            {{if !empty($tpl_data.course)}}
                {{foreach $tpl_data.course as $course}}
                <div class="course" data-url="{{$course.m_detail_url}}" data-number="{{$course.number}}" data-type="{{$course.type}}">
                    <img data-src="{{$course.cover_url_for_mobile}}" class="course-img">
                    <div class="right-info">
                        <div class="title">
                            <span class="tag">{{if $course.type == 2}}班课{{else if $course.type == 3}}视频课{{/if}}</span>
                            <p class="course-name">{{$course.display_name}}</p>
                        </div>
                        <p class="middle">
                            <img src="{{$static_origin}}/src/page_app/imgInvite/img/ic_selected.png" class="icon">
                        </p>
                        <p class="price">¥&nbsp;{{$course.price}}</p>
                    </div>
                </div>
                {{/foreach}}
            {{else}}
                <div class="tips">您还没有开设该课程</div>
            {{/if}}
        </div>
    </div>

{{/block}}

{{*js脚本, 有些特殊情况js需要写在页面里的时候用写在这个block里*}}
{{block name="script"}}
    {{*<script></script>*}}
{{/block}}