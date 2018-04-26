{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "报名中心"}}

    {{$page_module = "page/activity/ce_contest/apply/index"}}

    {{$enable_backTopButton = false}}

    {{$baseInfo = $tpl_data.basic_info}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/ce_contest/apply/css/index.styl"/>
{{/block}}

{{block name="content"}}
    <script>
        var nextPage = "{{$tpl_data.url}}";
    </script>
    {{include file="page/_common/nav_bar/nav_bar.tpl" text="报名中心"}}
    <div class="apply">
        <form class="m-form">
            <div class="m-item">
                <div class="m-title">姓名：</div>
                <div class="m-set short"><input  class="form-element" value="{{$baseInfo.name}}" type="text" name="name" data-validate="name" data-validate-message="姓名：只能输入中文2-10个字"/></div>
            </div>
            <div class="m-item">
                <div class="m-title">头像：</div>
                <div class="m-set m-set-avatar">
                    点击上传
                    <input type="text" name="avatar" class="form-element" data-validate="required"/>
                    <input class="file" type="file"/></div>
            </div>
            <div class="m-item">
                <div class="m-title">联系电话：</div>
                <div class="m-set"><input type="text" value="{{$baseInfo.phone}}"  class="form-element" name="phone" data-validate="phone" data-validate-message="联系电话：以1开头、11位正确的手机号码"/></div>
            </div>
            <div class="m-item">
                <div class="m-title">电子邮件：</div>
                <div class="m-set"><input type="text" value="{{$baseInfo.email}}" class="form-element" name="email" data-validate="email" data-validate-message="电子邮箱：必须为邮箱格式"/></div>
            </div>
            <div class="m-item">
                <div class="m-title">地址：</div>
                <div class="m-set select">
                    <select id="province" name="province" data-validate="required" class="form-element">
                        <option value="">请选择省</option>
                        {{foreach $tpl_data.province as $item}}
                            <option value="{{$item.id}}">{{$item.name}}</option>
                        {{/foreach}}
                    </select>

                    <select id="city" name="city" class="form-element" data-validate="required">
                        <option value="">请选择市</option>
                    </select>

                    <select id="area" name="district" class="form-element" data-validate="required">
                        <option value="">请选择区</option>
                    </select>
                </div>
            </div>
            <div class="m-item">
                <div class="m-title">学校名称：</div>
                <div class="m-set"><input type="text" placeholder="最多10个字" data-validate-message="学校名称：字数最多10个字，可以为中文、英文、数字" maxlength="10" class="form-element" name="school" data-validate="schoolName" /></div>
            </div>
            <div class="m-item">
                <div class="m-title">年级分组：</div>
                <div class="m-set select">
                    <select class="form-element" name="grade" data-validate="required">
                        {{foreach $tpl_data.grade as $item}}
                            <option value="{{$item.id}}">{{$item.name}}</option>
                        {{/foreach}}
                    </select>
                </div>
            </div>
            <div class="m-item">
                <div class="m-title">才艺类型：</div>
                <div class="m-set select">
                    <select class="form-element" name="subject" data-validate="required">
                        {{foreach $tpl_data.subject as $item}}
                            <option value="{{$item.id}}">{{$item.name}}</option>
                        {{/foreach}}
                    </select>
                </div>
            </div>
            <div class="m-item">
                <div class="m-title">才艺名称：</div>
                <div class="m-set"><input placeholder="最多15个字"  name="talent" maxlength="15" type="text" class="form-element" data-validate="talentName" data-validate-message="才艺名称：字数最多15个字，可以为中文、英文、数字"/></div>
            </div>
            <div class="m-item">
                <div class="m-title">邀请编码：</div>
                <div class="m-set"><input name="invite_id" data-validate="inviteCode" placeholder="请输入邀请您参赛的选手编码，非必填" class="form-element"/></div>
            </div>
            <div class="m-item">
                <div class="m-title">个人描述：</div>
                <div class="m-set"><textarea maxlength="200" placeholder="请输入200字以内的个人描述，将展示于个人主页" name="describe" class="form-element" data-validate="required">{{$baseInfo.describe}}</textarea></div>
            </div>
        </form>
        {{if $tpl_data.has_pay != 1}}
        <div class="m-submit">确认报名</div>
        {{/if}}
    </div>
{{/block}}
