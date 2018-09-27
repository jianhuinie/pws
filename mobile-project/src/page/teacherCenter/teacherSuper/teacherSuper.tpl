{{*
* @file 老师会员版——超级会员
* @author caoying
* @date 2016/03/03
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_title = $tpl_data.base_info.name}}
    {{$page_module = "page/teacherCenter/teacherMain/teacherMain"}}
    {{$enable_backTopButton = true}}
{{/block}}

{{block name="data"}}
    {{$script_data.canAppDownload = !isset($tpl_data.is_u_meng)}}
    {{$script_data.is_sem_chengdu = $tpl_data.is_sem}}
    {{$script_data.teacher_number = $tpl_data.base_info.number}}
    {{$script_data.model = $tpl_data.model}}

    {{if isset($tpl_data.trial_course_info)}}
        {{$script_data['try_status'] = $tpl_data.trial_course_info.status}}
    {{/if}}

    {{$script_data.favorStatus = $tpl_data.favorite_info.favorite_status}}
    {{$script_data.favor_type = $tpl_data.favorite_info.type}}
    {{$script_data.im_data = $tpl_data.im_data}}
    {{$script_data.userNum = $tpl_data.base_info.number}}
    {{$script_data.cover_url = $tpl_data.base_info.preface}}
    {{$script_data.audioUrl = $tpl_data.base_info.audio.url}}
    {{$script_data.private_domain = $tpl_data.base_info.private_domain}}
    {{$script_data.lng = $tpl_data.detail_info.position.lng}}
    {{$script_data.lat = $tpl_data.detail_info.position.lat}}
    {{$script_data['shareInfo'] = json_encode($tpl_data.share_info)}}
    {{$script_data.isPreview = $tpl_data.is_preview}}
    {{$script_data.title = $tpl_data.base_info.name}}
    {{$script_data.img_text = $tpl_data.other_info}}
    {{if !empty($tpl_data.comment)}}
        {{$script_data.total = $tpl_data.comment.total}}
    {{/if}}
    {{* 老师所在机构是否支持预约试听 *}}
    {{if !empty($tpl_data.base_info.org) && $tpl_data.base_info.org.support_student_advisory}}
        {{$script_data.is_trail_class = true}}
        {{$script_data.org_name = $tpl_data.base_info.org.name}}
        {{$script_data.org_number = $tpl_data.base_info.org.number}}
        {{$script_data.tel_400 = $tpl_data.base_info.org.extension}}
    {{else}}
        {{$script_data.is_trail_class = false}}
        {{$script_data.org_name = ""}}
        {{$script_data.org_number = ""}}
        {{$script_data.tel_400 = ""}}
    {{/if}}

    {{if not empty($tpl_data.base_info.org)}}
        {{if not empty($tpl_data.base_info.org.support_tianxiao)}}
        {{$script_data.isTianxiaoOrg = $tpl_data.base_info.org.support_tianxiao}}
        {{/if}}
        {{$script_data.orgNumber = $tpl_data.base_info.org.number}}
    {{/if}}

    {{if isset($tpl_data.qrcode_url)}}
        {{$script_data.qrcodeUrl = $tpl_data.qrcode_url}}
    {{/if}}
    {{$script_data.page_model = "super_vip"}}
    {{$script_data.isOne2oneTeacher = $tpl_data.base_info.is_one_on_one_teacher}}
    {{if not empty($tpl_data.other_info)}}
        {{$script_data.otherInfo = $tpl_data.other_info}}
    {{/if}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/teacherCenter/teacherSuper/teacherSuper.styl"/>
{{/block}}

{{block name="content"}}
    {{*include file="page/_common/nav_bar/nav_bar.tpl" text="老师主页" menu_button=true*}}
    {{if preg_match('/kaoyan/', $host)}}
        {{include file="page/_common/nav_bar/nav_bar.tpl" text="老师主页" share_button=true}}
    {{else if isset($tpl_data.is_u_meng) && $tpl_data.is_u_meng==true}}
        {{include file="page/_common/nav_bar/nav_bar.tpl" text="老师主页" share_button=false menu_button=true}}
    {{else if !$ext_data.is_app}}
        {{include file="page/teacherCenter/_part/top.tpl"}}
    {{*else*}}
        {{*include file="page/_common/nav_bar/nav_bar.tpl" text="老师主页" menu_button=true*}}
    {{/if}}
    <div id="main">
        {{* 头部 *}}
        {{include file="page/teacherCenter/teacherSuper/detail/super-head.tpl"}}

        {{* 推荐课程 *}}
        {{include file="page/teacherCenter/teacherSuper/detail/super-course.tpl"}}

        {{* 内容 tab切换*}}
        <div class="other-info">
            <div class="change-tab">
                <ul class="main-tab-title">
                    <li class="tab-intro">
                        <span class="active">简介</span>
                    </li>
                    <li class="tab-photo">
                        <span>相册</span>
                    </li>
                    <li class="tab-article">
                        <span>文章</span>
                    </li>
                    <li class="tab-comment">
                        <span>评价</span>
                    </li>
                </ul>
            </div>

            {{* 承载简介、相册、文章、评价的容器 *}}
            <div class="tab-container">
                <div data-tab="tab-intro">
                    {{include file="page/teacherCenter/teacherSuper/main/teacher-intro.tpl"}}
                </div>
                <div data-tab="tab-photo">

                </div>
                <div data-tab="tab-article">

                </div>
                <div data-tab="tab-comment">
                    <div class="tab-comment-container">
                    </div>
                    <p class="more-comment has-more hide" data-page="1">查看更多评价</p>
                </div>
            </div>
        </div>

        {{* 老师主页提供问答入口 *}}
        <div class="main-wenda"></div>

        <div class="share-info">
            <img class="bottom-banner" width="100%" height="100%" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/569f1d3539e59.png">
            <div class="share-qrCode">
                <div class="app-qrCode">
                    <ul>
                        <li class="list-share li-friends">
                            <div class="friends">
                                <img 
                                     src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/569f240228546.png" alt=""/>
                                朋友圈
                            </div>
                        </li>
                        <li class="list-share li-weixin">
                            <div class="weixin">
                                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/569f242862802.png">微信
                            </div>

                        </li>
                        <li class="list-share li-qrcode">
                            <div class="qrcode">
                                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/569f218b134d0.png">
                                二维码
                            </div>
                        </li>
                    </ul>
                    <div class="tip">这个老师很不错，快介绍给伙伴吧！</div>
                    <div class="course-id">老师ID:{{$tpl_data.base_info.number}}</div>
                </div>
                <div class="m-qrCode">
                    <div class="qrCode">
                        <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/569f218b134d0.png">
                        二维码
                    </div>
                    <p class="qrCode-desc">老师ID:{{$tpl_data.base_info.number}}</p>
                </div>
            </div>
            {{* 页面底部 *}}
            {{* include file='page/teacherCenter/teacherMain/detail/bottom.tpl' page_model="super_vip" *}}
        </div>
        {{include file="page/bottom/teacherBottom.tpl" templateMode="super"}}
    </div>

    <div id="detail-container">
        <div class="detail"></div>
    </div>

    {{* 二维码弹框 *}}
    <div class="qrcode-container">
        <div class="mask">
        </div>
        <div class="front">
            <i class="icon icon-close cancel"></i>

            <div class="label-group">
                <div class="teacher-name">{{$tpl_data.base_info.name}}&nbsp;&nbsp;<em class="gray-400">@跟谁学</em></div>
            </div>
            <div id="qrcode">
                <img src="http://m.genshuixue.com/static/qrcode?url={{$tpl_data.qrcode_url}}&size=4&margin=1"/>
            </div>
            <p class="hint">可通过扫描二维码打开老师详情页</p>
        </div>
    </div>

    {{* 页面遮罩层 *}}
    <div class="page-mask">

    </div>

    {{* 微信分享页面遮罩层 *}}
    <div class="share-mask">
        <div class="content">
            <img width="100%" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a87d1c87cf3.png"/>
        </div>
    </div>

{{/block}}

