{{*
@file 商学院（活动）
@author huangshiming
@date 2016-06-02
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "跟谁学商学院"}}
    {{$page_module = "page/activity/shangxueyuan/course/index"}}
    {{$enable_backTopButton = true}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/shangxueyuan/course/index.styl"/>
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="content"}}
    {{include file="page/_common/nav_bar/nav_bar.tpl" text="跟谁学商学院"}}
    <div class="painter">
        {{foreach $tpl_data.courses_introduce as $key => $item}}
            <div id="img{{$key+1}}">
                <img data-src="{{$item.imgUrl}}" class="hot-course-img">
            </div>
        {{/foreach}}
        <div class="backup">
            <p>Copyright © 2014 - 2017 北京百家互联科技有限公司版权所有</p>
            <p>京公网安备11010802015210号 | 京ICP备14027590号-1</p>
        </div>
    </div>
    {{include file="page/activity/shangxueyuan/_part/liudan.tpl"}}
    {{include file="page/activity/shangxueyuan/_part/bottom.tpl" index='2'}}
{{/block}}