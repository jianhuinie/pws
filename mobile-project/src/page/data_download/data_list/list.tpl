{{*

@file 资料下载列表
@author wuxl
@date 16/9/07
*}}
{{extends file="page/_base/base.tpl"}}
{{block name="page"}}
    {{$page_title = $tpl_data.head_info.title}}
    {{$page_module = "page/data_download/data_list/list"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}

    {{$si_k = 1024}}
    {{$si_m = 1024*1024}}
    {{$course_info = $tpl_data.course_info}}
    {{$file_info = $tpl_data.material_info}}
    {{$is_end = $course_info.is_end}}
    {{$is_login = $tpl_data.user_login_status}}
    {{$is_join = $tpl_data.is_join}}

    {{$script_data['share_info'] = $tpl_data.head_info.share_info}}
    {{$script_data['course_info'] = $tpl_data.course_info}}

    {{$file_type = []}}
    {{$file_type["pdf"] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/09/57d64a942c932.png"}}
    {{$file_type["word"] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/09/57d64a951816b.png"}}
    {{$file_type["excel"] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/09/57d64a9349066.png"}}
    {{$file_type["ppt"] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/09/57d64a9459206.png"}}
    {{$file_type["jpg"] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/09/57d64a93c1f3d.png"}}
    {{$file_type["jpeg"] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/09/57d64a93c1f3d.png"}}
    {{$file_type["png"] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/09/57d64a93c1f3d.png"}}
    {{$file_type["gif"] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/09/57d64a93c1f3d.png"}}
    {{$file_type["txt"] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/09/57d64a948d7bd.png"}}
    {{$file_type["zip"] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/09/57e0e3d998e65.png"}}
    {{$file_type["rar"] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/09/57e0e3d998e65.png"}}
    {{$file_type["unknown"] = "https://imgs.genshuixue.com/0cms/d/file/content/2016/09/57d64a94cab45.png"}}

    {{$browser = "https://imgs.genshuixue.com/0cms/d/file/content/2016/09/57d64b631040b.png"}}
    {{$new = "https://imgs.genshuixue.com/0cms/d/file/content/2016/09/57d64a9552f7d.png"}}

    {{$data_type = ["pdf", "word", "excel", "ppt", "jpg", "jpeg", "png", "gif", "zip", "rar", "txt"]}}
    {{$pre_type = ["pdf", "word", "jpg", "jpeg", "png", "gif", "excel", "ppt", "txt"]}}


{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/data_download/data_list/list.styl"/>
{{/block}}

{{block name="content"}}
{{strip}}
{{include file="page/_common/nav_bar/nav_bar.tpl" text={{$tpl_data.head_info.title}} menu_button=true}}

<div class="container">
    <a href="{{$course_info.course_url}}">
        <div class="course-info">
            <div class="avatar">
                <img height="100%"
                     width="100%"
                     data-src="{{$course_info.cover}}"
                     alt="">
            </div>
            <div class="intro">
                <p class="course-title single-line">{{$course_info.course_name}}</p>
                <p class="course-teacher">讲师：{{$course_info.display_name}}</p>
            </div>
        </div>
    </a>
    <div class="file-content">
        <div class="file-head">
            共{{$file_info.total_count}}个文件，{{$file_info.can_download_count}}个可以下载
            {{if $file_info.can_download_count > 0}}
                <span class="down-all">全部下载</span>
            {{/if}}
        </div>
        <div class="file-list">
            <ul>
                {{foreach $file_info.material_list as $item}}
                    <li class="item">
                        <a  data-href="{{$item.preview_url}}"
                            href="javascript:void(0);"
                            data-fid="{{$item.fid}}"
                            data-type="{{$item.type}}"
                            data-ctype="2"
                            data-cname="course_material"
                            class="to-preview logClick"
                            {{if in_array($item.type,$pre_type)}}
                                {{if ($item.is_open && $is_login) || (!$item.is_open && $is_login && $is_join) || ($is_end && $is_join)}}
                                    data-tonew="toNew"
                                {{/if}}
                            {{/if}}
                            {{if ($item.is_open && !$is_login) || ($is_end && !$item.is_open && !$is_login)}}
                                data-login="toLogin"
                            {{/if}}>
                            <div class="file">
                                <div class="file-img">
                                    <img width="100%"
                                         height="100%"
                                         {{if in_array($item.type,$data_type)}}
                                            data-src="{{$file_type[{{$item.type}}]}}"
                                         {{else}}
                                            data-src="{{$file_type.unknown}}"
                                         {{/if}}
                                         alt="">
                                </div>
                                <div class="file-info">
                                    <div class="file-title-new">
                                        <p class="file-title single-line">
                                            {{$item.name}}
                                        </p>
                                        {{if $item.is_new}}
                                            <div class="new">
                                                <img data-src="{{$new}}" alt="">
                                                <!--<span>NEW</span>-->
                                            </div>
                                        {{/if}}
                                    </div>
                                    <p class="file-size">
                                        {{if $item.size lt $si_k}}
                                            {{$item.size|string_format:'%.2f'}}字节
                                        {{else if $item.size lt $si_m}}
                                            {{($item.size/$si_k)|string_format:'%.2f'}}KB
                                        {{else}}
                                            {{($item.size/$si_m)|string_format:'%.2f'}}M
                                        {{/if}}
                                    </p>
                                </div>
                            </div>
                        </a>
                        {{if !$item.can_download}}
                            <a  data-href="{{$item.preview_url}}"
                                href="javascript:void(0);"
                                data-fid="{{$item.fid}}"
                                data-type="{{$item.type}}"
                                data-ctype="2"
                                data-cname="course_material"
                                class="to-preview logClick"
                                {{if in_array($item.type,$pre_type)}}
                                    {{if ($item.is_open && $is_login) || (!$item.is_open && $is_login && $is_join) || ($is_end && $is_join)}}
                                        data-tonew="toNew"
                                    {{/if}}
                                {{/if}}
                                {{if ($item.is_open && !$is_login) || ($is_end && !$item.is_open && !$is_login)}}
                                    data-login="toLogin"
                                {{/if}}>
                                <span class="button">在线看</span>
                            </a>
                        {{else}}
                            <span class="button download">下载</span>
                        {{/if}}
                    </li>
                {{/foreach}}
            </ul>
        </div>
    </div>
</div>
<div class="browser-mask" style="display: none">
    <img src="{{$browser}}" alt="">
</div>
<div class="app-mask" style="display: none;">
    <div class="app-box">
        <p>可使用跟谁学客户端下载此资料</p>
        <span class="to-app">打开客户端</span>
    </div>
</div>


{{/strip}}
{{/block}}