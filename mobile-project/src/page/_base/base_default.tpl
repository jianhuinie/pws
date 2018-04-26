{{extends file="page/_base/base.tpl"}}

{{block name="_data"}}
    {{if !$ext_data.is_app && !$ext_data.is_tapp && $isShowAds}}
    {{$g_modules[] = 'common/_page_init'}}
    {{/if}}
{{/block}}

{{block name="_body"}}
    {{strip}}
    <div id="page_main">
        {{block name="content"}}{{/block}}
    </div>
    <!--<div id="bottom-container" style="position: fixed;width:100%;bottom:0;z-index: 1;">
        <div style="width:100%;position:relative;">
            {{block name="bottom"}}{{/block}}
        </div>
    </div>-->
    {{/strip}}

{{/block}}