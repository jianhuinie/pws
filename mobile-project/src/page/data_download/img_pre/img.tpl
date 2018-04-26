{{*

@file 图片预览
@author wuxl
@date 16/9/07
*}}
{{extends file="page/_base/base.tpl"}}
{{block name="page"}}
{{$page_title = "图片预览"}}
{{$page_module = "page/data_download/img_pre/img"}}
{{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
{{if not empty ($smarty.get.fid)}}
{{$script_data['fid'] = $smarty.get.fid}}
{{/if}}
{{/block}}

{{block name="style"}}

{{/block}}

{{block name="content"}}
{{strip}}

<div class="container">
    <img id="pre_img" width="100%" alt="" src="">
</div>



{{/strip}}
{{/block}}