{{*
@file 发布需求输入页
@author shubaiqiao
@date 2017-01-04
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_title = "发布找老师需求"}}
    {{$page_module = "page/studentRoom/student/input/index"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/studentRoom/student/input/index.styl"/>
{{/block}}

{{block name="content"}}

    {{include file="page/_common/nav_bar/nav_bar.tpl" text="发布找老师需求"}}
    <form>
        <div class="container">
            <div class="item">
                <div class="label">我想学</div>
                <i class="a-icon icon-icon-warning"></i>
                <input type="text" placeholder="学习科目" name="course_name">
            </div>
            <div class="item">
                <div class="label">详细描述</div>
                <i class="a-icon icon-icon-warning"></i>
                <textarea rows="3" maxlength="100" name="info" placeholder="描述一下您的学习需求，介绍一下学生的基本情况，清楚准确的描述更容易找到老师"></textarea>
            </div>
            <div class="item">
                <div class="label">学费</div>
                <div class="information price placeholder">双方协商</div>
                <i class="icon icon-chevron-thin-right"></i>
                <input class="hide price" name="exp_price" value="双方协商">
            </div>
            <div class="item">
                <div class="label">授课方式</div>
                <div class="information lesson-way placeholder">不限制</div>
                <i class="icon icon-chevron-thin-right"></i>
                <input class="hide lesson-way" name="support_online" value="不限制">
            </div>
            <div class="item">
                <div class="label">老师性别</div>
                <div class="information sex placeholder">不限制</div>
                <i class="icon icon-chevron-thin-right"></i>
                <input class="hide sex" name="sex" value="不限制">
            </div>
        </div>
        <div class="container">
            <div class="item">
                <div class="label">姓名</div>
                <i class="a-icon icon-icon-warning"></i>
                <input type="text" placeholder="真实姓名" name="user_name">
            </div>
            <div class="item">
                <div class="label">电话</div>
                <i class="a-icon icon-icon-warning"></i>
                <input id="mobile" type="number" placeholder="手机号码" name="mobile">
                <span class="empty-icon"><i class="icon-close"></i></span>
            </div>
            <div class="item">
                <div class="label">验证码</div>
                <i class="a-icon sms-icon icon-icon-warning"></i>
                <input id="verify-code" type="text" placeholder="短信验证码" maxlength="6" name="sms_code">
                <span class="empty-icon sms-close"><i class="icon-close"></i></span>
                <div class="sms-code" id="verify">获取验证码</div>
            </div>
        </div>
        <div class="tip">1、您的找老师需求发布后，跟谁学的客服同学会通过010-86448910与您联系，还请注意接听电话。</div>
        <div class="tip">2、当有适合您的老师报名后，会通过我们的虚拟号码010-89192621与您联系，还请注意接听电话。</div>
        <div class="tip">3、您发布的找老师需求可以主动操作关闭，或自发布后7天系统将自动关闭。</div>
        <div class="button">立即发布</div>
    </form>

{{/block}}