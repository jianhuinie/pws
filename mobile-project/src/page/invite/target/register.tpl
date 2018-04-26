<div id="container" class="vcode_mode">
    <form id="login_form_vcode" class="login_form">
        <div class="input_wrap">
            <div class="item">
                <div id="countryCode" class="left_wrap">
                </div>
                <div class="right_wrap">
                    <div id="sms_vcode" class="{{if $role == "student"}}student-btn-vcode{{else}}teacher-btn-vcode{{/if}} disable">获取验证码</div>
                </div>

                <div class="user_wrap form-group">
                    <input class="input_text input_mobile"
                           name="mobile"
                           type="number"
                           placeholder="请输入手机号"
                           required oninput="if(value.length > 11)value=value.slice(0,11)"/>
                </div>
            </div>
            <div class="item">
                <div class="left_wrap">
                    验证码
                </div>
                <div class="vcode_wrap form-group">
                    <input class="input_text"
                           type="number"
                           name="verify_code"
                           placeholder="输入手机验证码"
                           required/>
                </div>
            </div>
            {{if $role == "teacher"}}
                <div class="item">
                    <div class="left_wrap">
                        密　码
                    </div>
                    <div class="password_wrap form-group">
                        <input class="input_text"
                               type="password"
                               name="password"
                               placeholder="请输入数字、字母组成的6-20位密码"
                               required/>
                    </div>
                </div>
            {{/if}}
        </div>
        <div class="submit_button {{$role}}-reg disable">注册</div>
    </form>
</div>
