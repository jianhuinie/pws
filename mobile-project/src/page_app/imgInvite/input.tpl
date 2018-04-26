{{extends file="page_app/_base/base.tpl"}}

{{*页面配置*}}
{{block name="page" append}}
    {{*标题*}}
    {{$page_title = "编辑邀请卡"}}
    {{*页面入口模块, 例如:page/app_teacher/vip_index/index*}}
    {{$page_module = "page_app/imgInvite/input"}}
    {{*是否使用返回顶部的按钮*}}
    {{$enable_backTopButton = true}}
{{/block}}

{{*模板数据, 需要传递到js模块中的模板数据在这里配置*}}
{{block name="data"}}
    {{$script_data["data"] = $tpl_data}}
{{/block}}

{{*页面样式*}}
{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page_app/imgInvite/input.styl"/>
{{/block}}

{{*页面内容*}}
{{block name="content"}}
    <div class="container">
        <form method="post" name="publish" action="javascript:return false;">
            <div class="inp-group">
                <label id="searchClass">
                    <span class="left">免单奖励课程</span>
                    <span class="right-info single-line">请选择</span>
                    <input type="hidden" name="course_number" value>
                    <input type="hidden" name="course_type" value>
                </label>
            </div>
            <p class="mes">建议选择低价课程，激发学生参与，获得更多曝光机会</p>
            <div class="inp-group">
                <label class="textarea-label">
                    <span class="left">活动名称</span>
                    <textarea name="name" class="name-inp" autocomplete="off" maxlength=20 rows="2" placeholder="请输入"></textarea>
                </label>
            </div>
            <p class="mes">如何吸引更多人眼球, 活动名称很关键哦!</p>
            <div class="inp-group">
                <div class="begin">
                    <label>
                        <span class="left">开始时间</span>
                        <input type="date" name="begin_time" class="hide-inp">
                        <span class="arrow right-info single-line">></span>
                    </label>
                </div>
                <div class="end">
                    <label>
                        <span class="left">结束时间</span>
                        <input type="date" name="end_time" class="hide-inp">
                        <span class="arrow right-info single-line">></span>
                    </label>
                </div>
            </div>
            <p class="mes">活动时间不能超过30天</p>
            <div class="inp-group">
                <label>
                    <span class="left">最低邀请人数</span>
                    <input type="number" name="quota" class="num-inp single-line" placeholder="请输入" value="3" min="1">
                </label>
            </div>
            <p class="mes">建议最佳为3人, 邀请人数不超过10人</p>
        </form>
        <button id="submit" style="visibility: hidden;">预 览</button>
    </div>

{{/block}}

{{*js脚本, 有些特殊情况js需要写在页面里的时候用写在这个block里*}}
{{block name="script"}}
    {{*<script></script>*}}
{{/block}}