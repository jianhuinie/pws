{{*
    @file 视频课 课程详情页
    @author hurry
    @date 2017/1/18
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = $tpl_data.course_info.name}}
    {{$page_module = "page/course/video/index"}}
    {{$enable_backTopButton = false}}
    {{$isNeedScale = false}}
{{/block}}


<!-- (可选)引用php数据 -->
{{block name="data"}}
{{include file="page/_common/parseUrl.tpl"}}
{{$smarty.block.parent}}

{{$isLogin = false}}
{{if not empty($user_data)}}
    {{$isLogin = true}}
{{/if}}
{{* hurry: 上报type *}}
{{$gsType = 'M_video'}}
{{* hurry: 不明白为什么要做二次转换 *}}
{{$script_data = $tpl_data}}
{{$script_data.origin = $main_origin}}
{{$course_info = $tpl_data.course_info}}
{{$comment = $tpl_data.comment_info}}
{{$org_info = $tpl_data.org_info}}
{{$teacher_info = $tpl_data.teacher_info}}
{{$material_info = $tpl_data.material_info}}

{{if !empty($course_info.discount)}}
    {{$script_data.countDownList = $course_info.discount}}
{{/if}}

{{* yuanye: 由于include的子模板不能修改父模板的变量,因此要在这里设置$script_data *}}
{{* yuanye: target_price用于分期免息修改 *}}
{{if !empty($course_info.discount)}}
    {{$script_data.target_price = $course_info.discount.discount_price}}
{{else}}
    {{$script_data.target_price = $course_info.price}}
{{/if}}

{{$script_data.loginStatus['success'] = $isLogin}}
{{$script_data.loginStatus['loginUrl'] = $origin|cat:"/static/login?next="|cat:$smarty.server.REQUEST_URI}}
{{if isset($tpl_data.hidden_download)}}
    {{$script_data.hidden_download = $tpl_data.hidden_download}}
{{/if}}
{{if isset($tpl_data.is_u_meng)}}
    {{$script_data.is_u_meng = $tpl_data.is_u_meng}}
{{/if}}
{{$host = $smarty.server.HTTP_HOST}}
{{$url = $smarty.server.REQUEST_URI}}
{{$onlyOnePrice = $course_info.price}}
{{if isset($tpl_data.course_info.discount) && $tpl_data.course_info.discount.discount_price}}
    {{$onlyOnePrice = $tpl_data.course_info.discount.discount_price}}
{{/if}}

{{/block}}

<!-- (未开启)页面样式，可使用@page-css模板 -->
{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/course/video/index.styl">
{{/block}}


{{block name="content"}}
{{strip}}

{{* 广告条 *}}
{{*include file="./component/ads.tpl"*}}


<div id="container">
    <!--添加navbar-->
    {{* 顶导 *}}
    {{*include file="./component/topNav.tpl"*}}
    <!-- 页面内容 -->
    {{if isset($tpl_data.hidden_download) && $tpl_data.hidden_download == true}}
    {{else}}
        {{include file="common/topAction/courseTop.tpl" type="classDetailApp"}}
    {{/if}}
    {{* 轮播图 *}}
    {{include file="page/course/video/component/banner.tpl"}}
    {{* 二次导航 *}}
    {{include file="page/course/video/component/navTab/navTab.tpl"}}
    <div id="tabs-container">
        {{* 课程详情 *}}
        {{include file="./component/detail.tpl"}}
        {{* 课程目录 *}}
        {{include file="./component/catalogue/tabCatalogue.tpl"}}
        {{* 课程评价 *}}
        {{include file="./component/comment/tabComment.tpl"}}
    </div>

    {{* 底部按钮 *}}
    {{if !$ext_data.is_tapp}}
        {{include file="common/courseBottom/videoBottom/videoBottom.tpl"}}
    {{/if}}
</div>

{{*微信登陆*}}
{{include file="common/weChatLogin/weChatLogin.tpl"}}

{{* 二维码弹框 *}}
<div class="qrcode-container">
    <div class="mask">
    </div>
    <div class="front">
        <i class="icon icon-times cancel"></i>

        <div class="label-group">
            <div class="label-name">课程名称:</div>
            <div class="org-name">{{$tpl_data.course_info.name}}</div>
        </div>
        <div id="qrcode">
        </div>
        <p class="hint">可通过扫描二维码打开课程详情页</p>
    </div>
</div>
{{/strip}}
{{/block}}