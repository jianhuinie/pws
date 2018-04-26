<div class="org-list one detail-item">
    <div class="title detail-title">机构介绍</div>
    <div class="org-info detail-content analysis-habo-log" data-habo-type="{{$gsType}}" data-habo-stype="org">

        <div class="avatar w220">

            <a href="{{$org_info.url}}">
                <div class="img">
                    <img width="100%" height="100%"  src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a2315c62581.png"
                         data-src="{{$org_info.logo}}" alt=""/>
                </div>
            </a>

        </div>
        <div class="right-col">
            <div class="org-name">
                <a href="{{$org_info.url}}">
                    <div class="name">
                        <span class="name-wrap">{{$org_info.name}}</span>
                    </div>
                </a>

            </div>
            {{if !empty($org_info)}}
            <div class="org">
                {{if !empty($org_info.membership_level) && $org_info.membership_level != 1}}
            <span class="org-vip">
                {{if $org_info.membership_level == 2}}
                <img width="100%" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/02/56d3b6e867bb9.png" alt=""/>
                {{elseif $org_info.membership_level == 3}}
                <img width="100%" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5aef77.png" alt=""/>
                {{elseif $org_info.membership_level == 4}}
                <img class="senior" width="100%" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5d1676.png" alt=""/>
                {{/if}}
            </span>
                {{/if}}
            </div>
            {{/if}}
        </div>
    </div>
</div>
