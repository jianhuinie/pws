{{*

@file 发表评价
@author hanzh
@date 16/3/01
*}}
{{extends file="page/_base/base.tpl"}}
{{block name="page"}}
    {{$page_title = $tpl_data.tdk.title}}
    {{$page_description = $tpl_data.tdk.description}}
    {{$page_keywords = $tpl_data.tdk.keywords}}
    {{$page_module = "page/k12_video/k12Video"}}
    {{$enable_backTopButton = true}}
{{/block}}

{{block name="data"}}
    {{$kaodian = $tpl_data.filter.kaodian}}
    {{$script_data["kaodian"] = $kaodian}}
    {{$script_data["condition"] = $tpl_data.condition}}
    {{$script_data["page_type"] = $ext_data.page}}
    {{$script_data["is_redu"] = $tpl_data.condition.redu}}
    {{if !empty($smarty.get.condition)}}
    {{$script_data["url_condition"] = $smarty.get.condition}}
    {{/if}}

{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/k12_video/k12Video.styl"/>
{{/block}}

{{block name="content"}}
{{strip}}
{{$bottomheight = 306}}
<div class="mask"></div>
<div class="fixed-icon">
    <div class="icon">
        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/05/574bf50a00017.png">
    </div>
    <div class="items">
        <p class="item im">咨询客服</p>
        <p class="item liudan">推荐老师</p>
        {{$cItem = $tpl_data.qq}}
        <div class="item qq" qq="{{$cItem.number}}" android-key="{{$cItem.android_key}}" url="{{$cItem.url}}">
        入群领取名师优惠券
            <div>
                <img class="left-qq" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56fc867bbb475.png">
                {{$cItem.number}}
            </div>
        </div>
    </div>
</div>
<div class="main-content">
    <div class="head">
        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/04/5708ad681b5d2.jpg">
        <div class="search-content">
            <div class="search-input">
                <form action>
                    <span class="icon-search search-icon"></span>
                    <input name="search" id="searchInput" type="text" placeholder="请输入搜索内容">
                </form>
            </div>
        </div>
    </div>
    <div class="selection">
        <div class="drop-select">
            <span class="txt"></span>
            <span class="icon"></span>
        </div>
        <div class="drop-items">
            {{foreach $tpl_data.drop_items as $cItem}}
            <p value = "{{$cItem.id}}">{{$cItem.name}}</p>
            {{/foreach}}
        </div>
        <div class="class-head">
            <ul id="course-type">
                {{$ckemu = $tpl_data.condition.kemu}}
                {{foreach $tpl_data.kemu as $citem}}
                    <li value="{{$citem.id}}" {{if $ckemu == $citem.id}} class="on"{{/if}}>
                        <span>{{$citem.name}}</span>
                    </li>
                {{/foreach}}
            </ul>
        </div>
    </div>

    <div class="class-content">

        {{if count($tpl_data.courses) > 0}}
            {{if $tpl_data.condition.redu}}
            <div class="class-block">
                <ul>
                {{foreach $tpl_data.courses as $cCourse}}
                    <li>
                        <a href="{{$cCourse.url}}">
                            <div class="class-item">
                                <div class="img-content img-background">
                                    <img data-src="{{$cCourse.img}}">
                                </div>
                                <div class="txt-info">
                                    <p class="title double-line">{{$cCourse.name}}</p>
                                    <p class="sub-title single-line">{{$cCourse.desc}}</p>
                                    <p class="bottom-txt">
                                        {{$cCourse.teacher_name}}&nbsp;&nbsp;{{$cCourse.play_num}}次播放
                                    </p>
                                </div>
                            </div>
                        </a>
                    </li>
                {{/foreach}}
                </ul>
            </div>

            {{else}}
            {{$lastTitle=""}}
                {{foreach $tpl_data.courses as $cBlock}}
                {{$cItemClass = false}}
                {{if $cBlock.nianji}}
                    {{$cItemClass = $lastTitle == $cBlock.nianji}}
                    {{$lastTitle=$cBlock.nianji}}
                {{/if}}
                    <div class="class-block {{if $cItemClass}}go-top{{/if}} ">
                        {{if $cBlock.nianji && !$cItemClass}}<h2>{{$cBlock.nianji}}</h2>{{/if}}
                        {{if $cBlock.name}}<h2 class="h2-line2">{{$cBlock.name}}</h2>{{/if}}
                        <ul>
                            {{foreach $cBlock.courses as $cCourse}}
                                <li>
                                    <a href="{{$cCourse.url}}">
                                        <div class="class-item">
                                            <div class="img-content img-background">
                                                <img data-src="{{$cCourse.img}}">
                                            </div>
                                            <div class="txt-info">
                                                <p class="title double-line">{{$cCourse.name}}</p>
                                                <p class="sub-title single-line">{{$cCourse.desc}}</p>
                                                <p class="bottom-txt single-line">{{$cCourse.teacher_name}}&nbsp;&nbsp;{{$cCourse.play_num}}次播放</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            {{/foreach}}
                        </ul>
                    </div>
                {{/foreach}}
            {{/if}}
        {{else}}
            <div class="none-data-li">
                <div class="none-data-tip">
                    <img class="page-image" src="https://imgs.genshuixue.com/0cms/d/file/content/2015/06/5577f4561f155.png">
                    <p>亲爱的同学，这里的知识点视频还在准备中，过几天再来看看吧~</p>
                </div>
            </div>
        {{/if}}
    </div>
    <div class="fixed-footer on" style=" display:block; ">
        <div data-filter="kaodian" class="left part">
            <p class="fixed-footer-first user-icon img">
            </p>
            <p class="single-line">
                {{if $tpl_data.condition.kaodian_display != ""}}
                    {{$tpl_data.condition.kaodian_display}}
                {{else}}
                    选择考点
                {{/if}}
            </p>
            <span class="line">
            </span>
        </div>

        <div data-filter="zhishidian" class="left part{{if $tpl_data.condition.zhishidian}} on{{/if}}">
            <p class="user-icon img fixed-footer-second">
            </p>
            <p class="single-line">
                按知识点
            </p>
            <span class="line">
            </span>
        </div>
        <div data-filter="redu" class="left part{{if $tpl_data.condition.redu}} on{{/if}}">
            <p class="user-icon img fixed-footer-second">
            </p>
            <p class="single-line">
                按热度
            </p>
            <span class="line">
            </span>
        </div>
    </div>
    {{if $tpl_data.has_more}}
        <div id="more-button" class="more-button" next_cursor="1">
            <div class="text">点击查看更多</div>
            <div class="typing_loader"></div>
        </div>
    {{else if count($tpl_data.courses) > 0}}
        <div class="none-button">
            <div  class="none-button-text"
                >没有更多结果了</div>
        </div>
    {{/if}}

    <div class="margin-height"></div>
    <div class="filter-dialog-mask" style="display:none;">
        <div class="filter-dialog-content">
            <div class="filter-parent filter-parent-need-height">
                <div class="filter-content">
                    <div class="first part">
                        <div id="level-1" class="filter-parent-need-height" style="overflow:hidden;background-color:#f2f4f5;">
                                <ul class="left-items-c">
                                {{foreach $kaodian as $item}}
                                <li data-value="{{$item.id}}" clickitem="true" class="menu level-parent">
                                    {{$item.name}}
                                    <span class="icon-back"></span>
                                </li>
                                <div class="level-item2" p-value="{{$item.id}}">
                                    <ul>
                                        {{$children=[]}}
                                        {{if isset($item.children)}}
                                            {{$children = $item.children}}
                                        {{/if}}
                                        {{foreach $children as $ic}}
                                        <li data-value="{{$ic.id}}" class="menu"  p-value="{{$item.id}}">
                                            {{$ic.name}}
                                        </li>
                                        {{/foreach}}
                                    </ul>
                                </div>
                                {{/foreach}}
                            </ul>
                        </div>
                    </div>
                    <div class="second part">
                        <div id="level-2" class="filter-parent-need-height" style="overflow:hidden;">
                                <ul class="left-items-c"></ul>
                        </div>
                    </div>
                    <div class="third part">
                        <div id="level-3" class="filter-parent-need-height" style="overflow:hidden;">
                                <ul class="left-items-c"></ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
{{/strip}}
{{/block}}