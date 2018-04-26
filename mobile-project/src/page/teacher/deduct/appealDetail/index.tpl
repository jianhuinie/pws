{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$appeal = ""}}
    {{if !$tpl_data.status}}
    {{$appeal = "申诉"}}
    {{else if $tpl_data.status == 1}}
    {{$appeal = "申诉中"}}
    {{else if $tpl_data.status == 2}}
    {{$appeal = "申诉结果"}}
    {{else if $tpl_data.status == 3}}
    {{$appeal = "申诉结果"}}
    {{/if}}
    {{$page_title = {{$appeal}}}}

    {{$page_module = "page/teacher/deduct/appealDetail/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data.pageData = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/teacher/deduct/appealDetail/index.styl"/>
{{/block}}

{{block name="content"}}
    <div class="content">
        <div class="item">申诉事项：</div>
        <div class="how">{{$tpl_data.problem}}</div>
        <div class="item">申诉说明：</div>
        <div class="how">{{$tpl_data.reason}}</div>
        {{if !empty($tpl_data.photo_list)}}
        <div class="item">图片说明：</div>
        <div class="photo-content">
             <ul>
                {{foreach $tpl_data.photo_list as $item}}
                <li>
                    <div class="photo">
                        <img src="{{$item.url}}" width=100% height=100%/>
                    </div>
                </li>
                {{/foreach}}
            </ul>
        </div>

        {{/if}}
        {{if !empty($tpl_data.result)}}
        <div class="item">申诉处理：</div>
        <div class="how">{{$tpl_data.result}}</div>
        {{/if}}
        <a class="detail-btn" href="/teacher_center/deductRule">查看扣分规则</a>
    </div>
{{/block}}
