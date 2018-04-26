{{$data_info = $course_list.data}}
{{$org_list = $data_info.list}}
{{if isset($data_info.keyword) && $data_info.keyword}}
<div class="nearby-org" data-key-word="{{$data_info.keyword}}">
{{else}}
<div class="nearby-org" data-key-word="{{$tpl_data.more.keyword}}">
{{/if}}
    <div class="start-title">
        <span class="icon-star_all block-line">
            <span class="line"></span>
            <span class="line line-sub"></span>
        </span>
        <div class="title">{{$data_info.title}}</div>
        <span class="icon-star_all block-line block-line-right">
            <span class="line"></span>
            <span class="line line-sub"></span>
        </span>
        <div class="start-title-sub">
                {{$data_info.sub}}
        </div>
    </div>

    <ul class="org-list">
        {{foreach $org_list as $item}}
        <a href="{{$item.url}}">
            {{if $item@index == $org_list|count-1}}
            <li class="org-item logClick" style="border-bottom: none" data-ctype="1" data-cname="{{$course_list.report_name}}">
            {{else}}
            <li class="org-item logClick" data-ctype="1" data-cname="{{$course_list.report_name}}">
            {{/if}}
                <img data-src="{{$item.logo}}">
                <div class="org-info">
                    <p class="org-name">{{$item.name}}</p>
                    <div class="second-nav">
                        <span>{{$item.teacher_count}}位老师</span>
                        <span>{{$item.total_comments}}条评论</span>
                    </div>
                    {{if isset($item.range)}}
                    <div class="third-nav">
                        <span class="location">{{$item.range}}</span>
                    </div>
                    {{/if}}
                </div>
            </li>
        </a>
        {{/foreach}}
    </ul>

    <p class="has-more hide logClick" data-ctype="2" data-cname="{{$course_list.report_name}}">更多机构 ></p>

</div>