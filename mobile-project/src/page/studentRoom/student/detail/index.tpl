{{*
@file 亲子课堂（活动）
@author huangshiming
@date 2016-05-16
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_title = "帮我找老师"}}
    {{$page_module = "page/studentRoom/student/detail/index"}}
    {{$enable_backTopButton = false}}
    <script>window.PointerEvent = void 0</script>
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/studentRoom/student/detail/index.styl"/>
{{/block}}

{{block name="content"}}

    {{include file="page/_common/nav_bar/nav_bar.tpl" text="帮我找老师"}}

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
                {{include file="page/studentRoom/_part/detail.tpl"}}
            </div>
            {{*iscroll bug 内容过少时，warapper比scroller高度高，从而滑动失效，所以当scroller的高度不够时，要使用一个div进行填充*}}
            <div class="full-box" style="width: 100%;"></div>
        </div>
    </div>
    {{if $tpl_data.is_own == true}}
    <div class="new-buttons">
        <div class="recommend-box recommend button">
            <div class="recommend-image"><img src="/src/page/studentRoom/teacher/img/recommend.svg"></div>
            <p>我要推荐</p>
        </div>
        <div class="button contact primary {{if empty($tpl_data.joined_teachers_info)}}no-teacher{{/if}}">
            联系老师
        </div>
    </div>
    {{/if}}

    <div class="mask hide"></div>
    <div class="share-mask">
        <div class="content">
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e91f33723af.png"/>
        </div>
    </div>

    <div class="dialog">
        <div class="question hide">
            <p class="title">确认关闭找老师需求</p>
            <p class="content">关闭后将不再为您推荐老师</p>

            <ul>
                <li class="options">
                    <div class="radio-btn checked-btn">
                        <i>
                        </i>
                    </div>
                    不想找了
                </li>
                <li class="options">
                    <div class="radio-btn">
                        <i>
                        </i>
                    </div>
                    找到了
                </li>
            </ul>

            <div class="buttons">
                <span style="border-right: 1px solid #ededee;" class="btn-cancel">取消</span>
                <span class="btn-confirm">确认</span>
            </div>
        </div>

        <div class="close-reason hide">
            <div class="buttons">
                <div class="choose-button">
                    <div class="button confirm">
                        已经找到老师了
                    </div>
                    <div class="button confirm">
                        不需要找老师了
                    </div>
                </div>

                <div class="button cancel">
                    取消
                </div>
            </div>
        </div>

        <div class="close-reason-confirm hide">
            <div class="title">
                您确定关闭这个找老师需求？
            </div>

            <div class="buttons">
                <div class="button cancel">
                    取消
                </div>
                <div class="button confirm">
                    确认
                </div>
            </div>
        </div>

        <div class="delete-teacher hide">
            <div class="button confirm">
                不合适换一个
            </div>
            <div class="button cancel">
                取消
            </div>
        </div>

        <div class="delete-teacher-confirm hide">
            <div class="title">
                移除这个老师并释放报名名额？
            </div>

            <div class="buttons">
                <div class="button cancel">
                    取消
                </div>
                <div class="button confirm">
                    确认
                </div>
            </div>
        </div>

        <div class="download-tip hide">
            <div class="content">
                <p>
                    下载跟谁学APP，
                </p>
                <p>
                    即可免费在线咨询老师
                </p>
            </div>
            <div class="button download-app">
                立即下载
            </div>
        </div>
    </div>

{{/block}}