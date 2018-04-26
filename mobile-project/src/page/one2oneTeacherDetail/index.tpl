{{*
	@file 一对一老师主页
	@author huangshiming
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}

    {{$queryOneOnOneCourse = $tpl_data.query_one_on_one_course}}
    {{$title = $queryOneOnOneCourse.teacher.display_name|cat:"-"|cat:$queryOneOnOneCourse.name}}
    {{$page_title = $title}}
    {{$page_module = "page/one2oneTeacherDetail/index"}}
    {{$enable_backTopButton = false}}
    {{$isNeedScale = false}}

    {{$script_data = $tpl_data}}
    {{*隐藏广告条*}}
    {{if isset($smarty.get.viewType) && $smarty.get.viewType == 'hide'}}
        {{$isShowAds = false}}
    {{/if}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/one2oneTeacherDetail/index.styl"/>
{{/block}}

{{block name="content"}}
    {{include file="page/_common/nav_bar/nav_bar.tpl" text={{$title}}}}

    {{*头部*}}
    {{include file="page/one2oneTeacherDetail/header/index.tpl"}}

    {{*购买*}}
    {{include file="page/one2oneTeacherDetail/buy/index.tpl"}}

    {{*评论*}}
    {{include file="page/one2oneTeacherDetail/comment/index.tpl"}}

    {{*自我介绍*}}
    {{include file="page/one2oneTeacherDetail/introduction/index.tpl"}}

    {{*成功案例*}}
    {{include file="page/one2oneTeacherDetail/case/index.tpl"}}

    {{*荣誉奖励*}}
    {{include file="page/one2oneTeacherDetail/honors/index.tpl"}}

    {{*教学经历*}}
    {{include file="page/one2oneTeacherDetail/exprience/index.tpl"}}

    {{*授课区域*}}
    {{include file="page/one2oneTeacherDetail/teacherLesson/index.tpl"}}

    {{*广告图*}}
    <img class="show-banners analysis-habo-log" 
        data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/04/58ff181b56add.png"
        data-habo-type="YouXuan_Service" 
        data-habo-stype="YouXuan_Service_Bottom"
        >

    {{*底部按钮*}}
    {{include file="page/one2oneTeacherDetail/one2oneBottom/index.tpl"}}

{{/block}}