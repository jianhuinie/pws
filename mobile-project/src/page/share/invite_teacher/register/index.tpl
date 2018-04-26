{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "注册跟谁学老师"}}

    {{$page_module = "page/share/invite_teacher/register/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/share/invite_teacher/register/index.styl"/>
{{/block}}

{{block name="content"}}

    {{if $tpl_data}}
    <div class="top-banner">
        <img data-src="{{$static_origin}}/src/page/share/invite_teacher/register/images/pic_sharebanner.png">

        <div class="top-banner-text">
            <span class="text">{{$tpl_data.title}}</span>
        </div>
    </div>

    <div class="container" id="container">
        <div class="header">{{$tpl_data.description}}</div>
        <div class="form">
            <div class="input_wrap">
                <div class="item item-layout">
                    <div id="v-code" class="btn_vcode disabled">获取验证码</div>
                    <div class="mobile-layout">
                        <input class="input_text" autocomplete="off" id="mobile" type="tel" name="mobile" placeholder="请输入手机号">
                    </div>
                </div>
                <div class="item">
                    <input class="input_text" id="verify_code" name="smscode" type="text" placeholder="请输入验证码">
                </div>
                <div class="item">
                    <input class="input_text" name="pass" id="password" type="password" placeholder="请设置6-20位密码（数字+字母）">
                </div>
            </div>

            <div class="button" id="submit_button">注册跟谁学老师</div>
            <div class="protocol">
                <label id="protocolLabel">
                    <img src="{{$static_origin}}/src/page/share/invite_teacher/register/images/ic_select_done.png" />
                    <input type="checkbox" checked="true" /> 已阅读并同意<a href="https://m.genshuixue.com/static/clause">《跟谁学服务协议》</a>
                </label>

            </div>
        </div>
    </div>

    <div class="result" id="success">
        <div class="icon"><img data-src="{{$static_origin}}/src/page/share/invite_teacher/register/images/success.png" /></div>
        <div class="text-info header">&nbsp;</div>
        <div class="btn-down button">
            <a href="https://m.genshuixue.com/app?ct=GenShuiXue_M2100013" >下载跟谁学老师APP</a>
        </div>
    </div>
    <div class="result" id="error">
        <div class="icon"><img data-src="{{$static_origin}}/src/page/share/invite_teacher/register/images/ic_remind.png" /></div>
        <div class="text-info header">&nbsp;</div>
        <div class="btn-down button">
            <a href="https://m.genshuixue.com/app?ct=GenShuiXue_M2100013">下载跟谁学老师APP</a>
        </div>
    </div>
    {{/if}}
    <div class="activity">
        <a href="{{$static_origin}}/activity/template/invite_teacher_detail">活动详情</a>
    </div>

{{/block}}
