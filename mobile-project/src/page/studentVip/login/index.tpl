{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$smarty.block.parent}}
    {{$page_title = "会员俱乐部"}}
    {{$page_module = "page/studentVip/login/index"}}
    {{$script_data['mobile'] = $tpl_data.mobile}}
    {{$script_data['isLogin'] = $tpl_data.is_login}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/studentVip/login/index.styl"/>
{{/block}}

{{block name="content"}}

    <div class="banner">
        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/07/577f231a4ae35.png">

        <div class="title">
            <p class="bold">改变，从这个夏天开始</p>
            <p>不再为孩子的素质教育发愁</p>
        </div>
    </div>

    <div class="login-form centered">

        <a href="{{$tpl_data.course_url}}" class="button bug-vip">
            我要买会员
        </a>

        <div class="isNoLogin">

            <div class="vip-login">
                已购买会员登录
            </div>

            <div class="title">
                我是会员，激活账号
            </div>

            <div class="row">
                <input class="input-mobile" type="text" placeholder="会员手机号">
            </div>

            <div class="row">
                <input class="input-verifycode" type="text" placeholder="验证码">
                <button class="button-verifycode">
                    获取验证码
                </button>
            </div>

        </div>

        <div class="isLogin">

            <div class="title">
                我是会员，激活账号
            </div>

            <div class="confirm-mobile">
                确认你要绑定的手机号
            </div>

            <div class="binded-mobile">
                {{$tpl_data.mobile}}
            </div>

            <div class="change-mobile">
                更换手机号
            </div>

        </div>

        <div class="row">
            <input class="input-invitecode" type="text" placeholder="会员激活码">
        </div>

        <button class="button button-activate">
            激活会员账号
        </button>

        <div class="illustrate">
            使用说明：<br/>
            1.会员激活仅限于线下购买成长萌会员卡使用<br/>
            2.输入会员卡背面涂层下的激活码
        </div>

        <a href="https://m.genshuixue.com/app?ct=GenShuiXue_M2100013" class="button button-download">
            <img class="logo" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/07/577f4af865e98.png">
            <div class="text">
                下载跟谁学客户端
            </div>
        </a>

    </div>

    <footer class="footer">
        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/07/5776743fe3df9.png">
    </footer>
{{/block}}