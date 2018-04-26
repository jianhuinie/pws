{{*
    @file 调起app
    @author hurry
    @date 2016-07-28
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "调起app"}}
    {{$page_module = "page/openApp/index"}}
    {{$enable_backTopButton = false}}
{{/block}}
{{block name="data"}}
    {{* 要打开的schema *}}
    {{if isset($smarty.get.target)}}
        {{$script_data.target = $smarty.get.target}}
    {{/if}}
    {{* 没有打开app跳转页面，默认跳转app下载页 *}}
    {{if isset($smarty.get.openError)}}
        {{$script_data.openError = $smarty.get.openError}}
    {{/if}}
    {{* type: 老师:teacher，机构:org，学生: student；默认学生 *}}
    {{if isset($smarty.get.type)}}
        {{$script_data.type = $smarty.get.type}}
    {{/if}}
{{/block}}
{{block name="content"}}
    <div class="main" style="border-radius: 15px;
    border: 1px solid #acacac;
    margin: 0 auto;
    width: 200px;
    text-align: center;
    padding: 5px 10px;
    margin-top: 100px;">
        正在打开app，请稍后...
    </div>
{{/block}}