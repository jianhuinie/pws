<div class="head-content">
    {{if isset($tpl_data.items)}}
        <div class="champion-banner" data-url={{$tpl_data.items[0].url}}>
            <div class="champion-container">
                <div class="avator">
                    <div class="avator-icon"><img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a2315c62581.png" data-src={{$tpl_data.items[0].avatar}}></div>
                    <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/583d1bdb1868f.png">
                </div>
                {{if $tpl_data.items[0].name == null}}
                    <span class="name">未知</span>
                {{else}}
                    <span class="name line-clamp">{{$tpl_data.items[0].name}}</span>
                {{/if}}
                <span class="amount">{{$tpl_data.items[0].student_count}}学生</span>
            </div>
        </div>
    {{/if}}
    {{if $tpl_data.teacher != null}}
        <div class="item" data-url={{$tpl_data.teacher.url}}>
            <div class="number">
                <div class="ranking {{if $tpl_data.teacher.rank == null}}null{{/if}}">{{if $tpl_data.teacher.rank != null}}{{$tpl_data.teacher.rank}}{{else}}暂未上榜{{/if}}</div>
                <div class="avatar"><img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a2315c62581.png" data-src={{$tpl_data.teacher.avatar}}></div>
            </div>
            <div class="information">
                <div class="info-container">
                    {{if $tpl_data.teacher.name == null}}
                        <p class="teacher">未知</p>
                    {{else}}
                        <p class="teacher line-clamp">{{$tpl_data.teacher.name}}</p>
                    {{/if}}
                    {{if $tpl_data.teacher.vip_level == 0}}
                        <a href="/vip/index?pay_sandbox=0&sw=360&pw=1080">
                            <p class="line-clamp vipBtn">
                                成为会员-冲击榜单
                            </p>
                        </a>
                    {{else}}
                        {{if $tpl_data.teacher.rank == null}}
                            <p class="line-clamp">
                                学生不足{{if $tpl_data.pager.type == 1}}500{{else if $tpl_data.pager.type == 0}}10{{/if}}人
                            </p>
                        {{else}}
                            <p class="line-clamp">{{$tpl_data.teacher.city}}·{{$tpl_data.teacher.subject_name}}</p>
                        {{/if}}
                    {{/if}}
                </div>
            </div>
            {{if $tpl_data.teacher.student_count > 0}}
                <div class="student-amount">{{$tpl_data.teacher.student_count}}学生</div>
            {{/if}}
            <div class="ranking-change">
                {{if $tpl_data.teacher.rank == null}}
                {{else if $tpl_data.teacher.rank_change == -1}}
                    <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/583cfe930c6f9.png">
                {{else if $tpl_data.teacher.rank_change == 1}}
                    <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/583cfe935e33e.png">
                {{else if $tpl_data.teacher.rank_change == 0}}
                    <img class="no-change" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/583d15fae7c60.png">
                {{/if}}
            </div>
        </div>
    {{/if}}
</div>
<div class="tips">榜单数据每6小时更新一次</div>
<div class="item-content">
    {{foreach $tpl_data.items as $list name=foo}}
        <div class="item" data-url={{$list.url}}>
            <div class="number">
                <div class="ranking {{if $list.rank <= 3}}excellent{{/if}}">{{$list.rank}}</div>
                <div class="avatar"><img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a2315c62581.png" data-src={{$list.avatar}}></div>
            </div>
            <div class="information">
                <div class="info-container">
                    {{if $list.name == null}}
                        <p class="teacher">未知</p>
                    {{else}}
                        <p class="teacher line-clamp">{{$list.name}}</p>
                    {{/if}}
                    <p class="line-clamp">{{$list.city}}·{{$list.subject_name}}</p>
                </div>
            </div>
            <div class="student-amount">{{$list.student_count}}学生</div>
            <div class="ranking-change">
                {{if $list.rank == null}}
                {{else if $list.rank_change == -1}}
                    <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/583cfe930c6f9.png">
                {{else if $list.rank_change == 1}}
                    <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/583cfe935e33e.png">
                {{else if $list.rank_change == 0}}
                    <img class="no-change" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/583d15fae7c60.png">
                {{/if}}
            </div>
        </div>
    {{/foreach}}
    {{if $tpl_data.pager.total <= 30 && !$tpl_data.pager.has_more}}
        <div class="tip">冲榜时间开放中，快快招生来冲榜</div>
    {{/if}}
    <div class="has-more">
        <div class="typing-loader"></div>
    </div>
    {{if $tpl_data.pager.total > 30}}
        <div class="no-more">
            {{if $tpl_data.pager.type == 0}}
                <div>已加载全部</div>
                <div>本月学生数达到50才可以上榜哦</div>
            {{else}}
                <div>已加载全部</div>
                <div>学生数达到500才可以上榜哦</div>
            {{/if}}
        </div>
    {{else}}
        <div class="no-more" style="padding: 0"></div>
    {{/if}}
    <div class="more-flag"></div>
</div>
