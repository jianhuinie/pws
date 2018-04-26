<div class="nearby-org">
    <div class="start-title">
        <span class="icon-star_all block-line">
            <span class="line"></span>
            <span class="line line-sub"></span>
        </span>
        <div class="title">{{$text}}</div>
        <span class="icon-star_all block-line block-line-right">
            <span class="line"></span>
            <span class="line line-sub"></span>
        </span>
        <div class="start-title-sub">
                {{$sub}}
        </div>
    </div>

    <ul class="org-list">
        {{foreach $org_list as $item}}
        <a href="{{$item.url}}" class="logClick" data-ctype="1" data-cname="k12_org">
            {{if $item@index < $org_list|count - 1}}
            <li class="org-item">
            {{else}}
            <li class="org-item" style="border-bottom: none;">
            {{/if}}
                <img data-src="{{$item.logo}}">
                <div class="org-info">
                    <p class="org-name">{{$item.name}}</p>
                    <div class="second-nav">
                        <span>{{$item.teacher_count}}位老师</span>
                        <span>{{$item.total_comments}}条评价</span>
                    </div>
                    <div class="third-nav">
                        <span class="location">{{$item.range}}</span>
                    </div>
                </div>
            </li>
        </a>
        {{/foreach}}
    </ul>

    <p class="has-more hide logClick" data-ctype="2" data-cname="k12_org">更多机构 ></p>

</div>