{{*
@file 生源大厅
@author huangshiming
@date 2016-05-16
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_title = $tpl_data.item.course_name}}
    {{$page_module = "page/studentRoom/teacher/detail/index"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/studentRoom/teacher/detail/index.styl"/>
{{/block}}

{{block name="content"}}

    {{include file="page/_common/nav_bar/nav_bar.tpl" text=$tpl_data.item.course_name}}

    {{include file="page/studentRoom/_part/teacherDetail.tpl"}}

    <div class="mask hide"></div>

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

    <div class="dialog">
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

    </div>

{{/block}}