{{extends file="page_app/_base/base.tpl"}}

{{*页面配置*}}
{{block name="page" append}}
    {{*标题*}}
    {{$page_title = "有一个新生源推荐"}}
    {{*页面入口模块, 例如:page/app_teacher/vip_index/index*}}
    {{$page_module = "page_app/teacher/liudan_push/index"}}
    {{*是否使用返回顶部的按钮*}}
    {{$enable_backTopButton = false}}
{{/block}}

{{*模板数据, 需要传递到js模块中的模板数据在这里配置*}}
{{block name="data"}}
    {{$script_data["id"] = $tpl_data.id}}
{{/block}}

{{*页面样式*}}
{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page_app/teacher/liudan_push/index.styl"/>
{{/block}}

{{*页面内容*}}
{{block name="content"}}
    <div id="info_wrap">
        <h1>学生情况描述</h1>
        <div>
            <table cellspacing="10">
                <tr>
                    <td class="column1">学生姓名</td>
                    <td class="column2">{{htmlspecialchars($tpl_data.detail.student_name)}}</td>
                </tr>
                <tr>
                    <td class="column1">要学科目</td>
                    <td class="column2">{{htmlspecialchars($tpl_data.detail.subject)}}</td>
                </tr>
                <tr>
                    <td class="column1">预期学费</td>
                    <td class="column2">
                        {{htmlspecialchars($tpl_data.detail.min_price)}}-{{htmlspecialchars($tpl_data.detail.max_price)}} /小时
                    </td>
                </tr>
                <tr>
                    <td class="column1">如何上课</td>
                    <td class="column2">{{htmlspecialchars($tpl_data.detail.way_text)}}</td>
                </tr>
                <tr>
                    <td class="column1">上课地址</td>
                    <td class="column2">{{htmlspecialchars($tpl_data.detail.address)}}</td>
                </tr>
                <tr>
                    <td class="column1">学生备注</td>
                    <td class="column2">{{htmlspecialchars($tpl_data.detail.notes)}}</td>
                </tr>
            </table>
        </div>
    </div>
    {{if $tpl_data.status == 0}}
        <div id="button_wrap">
            <p class="text">对该生源感兴趣，请点击下方“感兴趣”按钮</p>
            <div class="button-container">
                <div class="button-item">
                    <input id="no" class="button white" type="button" value="不感兴趣"/>
                </div>
                <div class="button-item">
                    <input id="yes" class="button blue" type="button" value="感兴趣"/>
                </div>
            </div>
        </div>
        <div id="sms_wrap">
            <span id="chk-sms" data-checked="checked">
                {{$class="icon-checkbox-checked"}}
                {{if $tpl_data.sms_push.status == 0}}
                    {{$class="icon-checkbox-unchecked"}}
                {{/if}}
                <i class="icon {{$class}}"></i>
                不再推荐生源给我
            </span>
        </div>
    {{elseif $tpl_data.status == 1}}
        <div id="result_wrap">
            <p>感谢您的参与！</p>
            <p>客服MM将在30分钟内，根据您和学生的匹配度电话联系您，请关注010-86448910的来电。</p>
            <p>若没有联系您，可能该生源已匹配其他老师，我们仍将持续给您推荐合适的学生，请继续关注哦~</p>
        </div>
    {{elseif $tpl_data.status == 2}}
        <div id="result_wrap">
            <p style="text-align: center">对该生源不感兴趣</p>
        </div>
    {{elseif $tpl_data.status == 3}}
        <div id="result_wrap">
            <p style="text-align: center">已过期</p>
        </div>
    {{/if}}

    <div class="confirm-tip" {{if $tpl_data.status == 0}} style="display: block;" {{/if}}>
    <div class="tip-title">温馨提示</div>
            <div id="dialog-content">
                <div class="dialog-tip">
                    <p>请下载跟谁学老师版APP，尽快联系学生，以保证有效性，超时我们将会把学生推荐给其他适合的老师。</p>
                    <!-- <p>该生源订单为收费订单</p>
                    <p>若订单最终成交时，跟谁学平台将自动收取一定比例的技术服务费，标准如下：</p>
                    <ul>
                        <li>1、1对1课程，成交课酬的<i>{{$cps.normal_course}}</i></li>
                        <li>2、直播课，线下班课，成交课酬的<i>{{$cps.class_course}}</i></li>
                        <li>3、视频课，成交课酬的<i>{{$cps.video_course}}</i></li>
                        <li style="margin-top: 8px;">若订单最终未成交，将不会收取任何费用</li>
                    </ul> -->
                </div>
            </div>
    </div>

{{/block}}

{{*js脚本, 有些特殊情况js需要写在页面里的时候用写在这个block里*}}
{{block name="script"}}
    {{*<script></script>*}}
{{/block}}