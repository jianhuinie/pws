    <div class="tanchuang-mask hide"></div>

    <div class="tanchuang hide">
        <form class="m-form">
            <div class="m-item">
                <textarea class="form-element" type="text" placeholder="请输入留言内容我们会尽快与您联系" name="info" data-validate="required"></textarea>
            </div>
            <div class="m-item">
                <img src="{{$static_origin}}/src/page/activity/shangxueyuan/image/ic_name.png" class="tanchuang-icon">
                <input placeholder="请输入您的真实姓名" name="name" class="form-element form-element-item" type="text" data-validate="name" data-validate-message="姓名:只能输入中文2-10个字"/>
            </div>
            <div class="m-item">
                <input placeholder="请输入您的机构全称" name="org" class="form-element form-element-item" type="text" data-validate="required" />
                <img src="{{$static_origin}}/src/page/activity/shangxueyuan/image/ic_jigou.png" class="tanchuang-icon">
            </div>
            <div class="m-item">
                <input placeholder="请输入您所在的城市" name="city" class="form-element form-element-item" type="text" data-validate="required" />
                <img src="{{$static_origin}}/src/page/activity/shangxueyuan/image/ic_map.png" class="tanchuang-icon">
            </div>
            <div class="m-item">
                <input placeholder="请输入您的手机号" name="mobile" class="form-element form-element-item" type="text" data-validate="phone" data-validate-message="联系电话：以1开头、11位正确的手机号码" />
                <img src="{{$static_origin}}/src/page/activity/shangxueyuan/image/ic_phone.png" class="tanchuang-icon">
            </div>
        </form>
        <div class="confirm-pay">
            <p class="confirm-text">点击提交</p>
        </div>
        <span class="cancel-icon">x</span>
    </div>