<div class="bottom">
    <div class="item wechat hide">
        <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/09/57ea26ab3b09c.png"><span>分享</span>
    </div>

    {{if ($tpl_data.base_info.city_filter > 0) && (not empty($tpl_data.base_info.extension) )}}
    <div class="item phone" data-tel="tel:{{$tpl_data.base_info.extension}}" data-number="{{$tpl_data.base_info.extension}}" data-org_num = "{{$tpl_data.base_info.number}}">
        <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/09/57ea2681ad95a.png">
        <span>打电话</span>
    </div>
    {{/if}}


    {{if $ext_data.is_app}}
        {{if $tpl_data.im_online_status == 1}}
            <div class="item consult" data-easemob="{{$tpl_data.base_info.easemob}}" data-org_num = "{{$tpl_data.base_info.number}}">
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/09/57ea26aac1eb6.png">
                <span>咨询</span>
            </div>
        {{else}}
            <div class="item consult" data-easemob="{{$tpl_data.base_info.easemob}}" data-org_num = "{{$tpl_data.base_info.number}}">
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/09/57ea26aac1eb6.png">
                <span>留言</span>
            </div>
        {{/if}}
    {{/if}}
    <div class="item appoint">
        <div class="btn-appoint" data-click="advisory" data-sku="org|{{$tpl_data.base_info.number}}">
            预约咨询
        </div>
    </div>
</div>