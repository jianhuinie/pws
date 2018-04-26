{{*
@file 亲子课堂（活动）
@author huangshiming
@date 2016-05-16
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_title = "生源大厅"}}
    {{$page_module = "page/studentRoom/teacher/room/index"}}
    {{$enable_backTopButton = false}}
    <script>window.PointerEvent = void 0</script>
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
    {{$roomText = 'all'}}
    {{if isset($smarty.get.type) &&  $smarty.get.type == 'my_subject'}}
        {{$roomText = 'my_subject'}}
    {{else if isset($smarty.get.type) &&  $smarty.get.type == 'my_joined'}}
        {{$roomText = 'my_joined'}}
    {{else if isset($smarty.get.type) &&  $smarty.get.type == 'my_published'}}
        {{$roomText = 'my_published'}}
    {{/if}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/studentRoom/teacher/room/index.styl"/>
{{/block}}

{{block name="content"}}

    {{include file="page/_common/nav_bar/nav_bar.tpl" text="生源大厅" studentRoomRule="true"}}

    {{include file="page/studentRoom/_part/nav.tpl" roomText = $roomText}}

    <div id="wrapper">
        <div id="scroller">
            <div class="pull-to-refresh">
                <div class="refresh-wrap">
                    <span class="pull-indicator">
                        <div class="arrow-body"></div>
                        <div class="triangle-down"></div>
                    </span>
                    <span class="pull-text">下拉刷新</span>
                    <div class="pull-spinner" style="display:none"></div>
                </div>
            </div>

            <div class="list-box">
                {{include file="page/studentRoom/_part/teacherList.tpl"}}

                <!-- {{if $tpl_data.pager.has_more == true}}
                <div class="has-more">上滑查看历史需求列表</div>
                {{/if}} -->
            </div>

            {{*iscroll bug 内容过少时，warapper比scroller高度高，从而滑动失效，所以当scroller的高度不够时，要使用一个div进行填充*}}
            <div class="full-box" style="width: 100%;"></div>
        </div>
    </div>
    <div class="add-icon">
        <a href="/hall-teacher/publishRecord?source=history">
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2017/01/587d79a3b1ab8.png">
        </a>
    </div>

{{/block}}