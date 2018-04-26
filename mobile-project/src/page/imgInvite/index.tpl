{{*
    @file 邀请卡
    @author yuanye
    @date 2017-03-09
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "限时免费"}}
    {{$page_module = ""}}
    {{$enable_backTopButton = false}}
{{/block}}
{{block name="data"}}
    
{{/block}}
{{block name="content"}}
    <p class="info" style="text-align: center;">长按图片, 微信扫描二维码, 即可参与活动哦 ~</p>
    <div class="img-container" style="width: 100%;">
        <img src="{{$tpl_data.image_url}}" style="width: 100%;">
    </div>
{{/block}}