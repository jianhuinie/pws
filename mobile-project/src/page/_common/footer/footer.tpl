{{*

@file 底部
@author zhujl
@param no_login 不登录,使用ajax登录

*}}

{{if empty($ext_data.is_app)}}
{{strip}}

<div id="footer" class="app-hide">

    {{include file="page/_common/parseUrl.tpl"}}

    {{$query.dsp = "pc"}}

    {{include file="page/_common/stringifyQuery.tpl" query=$query}}

    <div class="btn-container">
        {{$next = urlencode($smarty.server.REQUEST_URI)}}

        {{if !empty($tpl_data.next)}}
        {{$next = urlencode($tpl_data.next)}}
        {{/if}}

        {{if !empty($no_login)}}

        <span class="user-name login-item"></span>
        <a class="btn-default1 logout login-item" href="{{$main_origin}}/auth/exit?next={{$next}}">退出</a>


        <a class="btn-default1 logout-item" href="{{$main_origin}}/static/login?next={{$next}}">登录</a>
        <a class="btn-default1 logout-item" href="{{$main_origin}}/static/login?next={{$next}}">注册</a>
        {{else}}
        {{if isset($user_data.user_id)}}
        <span class="user-name">{{$user_data.user_name}}</span>
        <a class="btn-default1 logout" id="footer-exit" href="{{$main_origin}}/auth/exit?next={{$next}}">退出</a>
        {{else}}
        <a class="btn-default1" href="{{$main_origin}}/static/login?next={{$next}}">登录</a>
        <a class="btn-default1" href="{{$main_origin}}/static/login?next={{$next}}">注册</a>
        {{/if}}
        {{/if}}

        {{*根据PM要求隐藏“电脑版”按钮，modify by hanzh@08-20*}}
        {{if false}}
        <a class="btn-default1 pc" href="{{$main_origin}}{{$host_url}}?{{$search}}">电脑版</a>
        {{/if}}
        <a class="btn-default1" href="{{$main_origin}}">首页</a>

        {{if !isset($smarty.get.source) || !$smarty.get.source == 'tcl'}}
            <a id="footer_download" class="btn-default1" href="{{$main_origin}}/app?ct=GenShuiXue_M2100013">下载APP</a>
        {{/if}}

        <a class="btn-default1 phone" href="tel:4000910910">
            <i class="icon icon-phone"></i>客服电话
        </a>
    </div>

    <div class="logo-container">
        <span class="logo">
        </span>
    </div>

    <p class="copy-right">
        Copyright © 2014-2017 跟谁学版权所有
    </p>

</div>
<script>
    window.gsx_ready && window.gsx_ready(function (config) {
        if (config.source == 'baidu_zhidahao' || config.source == 'baidu_app_zhidahao') {
            document.getElementById("footer_download").style.display = "none";
            var downloadElement = document.getElementById('footer_download');
            if (downloadElement) {
                downloadElement.style.display = 'none';
            }
        }else if (config.source == 'x360life') {
            var x360 = document.getElementById('footer-exit');
            var download = document.getElementById('footer_download');
            if (x360) {
                x360.style.display = 'none';
            }
            if (download) {
                download.style.display = 'none';
            }
        }

    });
</script>
{{/strip}}
{{/if}}