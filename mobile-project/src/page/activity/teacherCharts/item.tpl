<div class="head-content">
    {{if itemData.items.length > 0}}
        <div class="champion-banner" data-url={{itemData.items[0].url}}>
            <div class="champion-container">
                <div class="avator">
                    <div class="avator-icon"><img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a2315c62581.png" data-src={{itemData.items[0].avatar}}></div>
                    <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/583d1bdb1868f.png">
                </div>
                {{if itemData.items[0].name == null}}
                    <span class="name">未知</span>
                {{else}}
                    <span class="name line-clamp">{{itemData.items[0].name}}</span>
                {{/if}}
                <span class="amount">{{itemData.items[0].student_count}}学生</span>
            </div>
        </div>
    {{/if}}
    {{if itemData.teacher != null}}
        <div class="item" data-url={{itemData.teacher.url}}>
            <div class="number">
                <div class="ranking {{if itemData.teacher.rank == null}}null{{/if}}">{{if itemData.teacher.rank != null}}{{itemData.teacher.rank}}{{else}}暂未上榜{{/if}}</div>
                <div class="avatar"><img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a2315c62581.png" data-src={{itemData.teacher.avatar}}></div>
            </div>
            <div class="information">
                <div class="info-container">
                    {{if itemData.teacher.name == null}}
                        <p class="teacher">未知</p>
                    {{else}}
                        <p class="teacher line-clamp">{{itemData.teacher.name}}</p>
                    {{/if}}
                    {{if itemData.teacher.vip_level == 0}}
                        <a href="/vip/index?pay_sandbox=0&sw=360&pw=1080">
                            <p class="line-clamp vipBtn">
                                成为会员-冲击榜单
                            </p>
                        </a>
                    {{else}}
                        {{if itemData.teacher.rank == null}}
                            <p class="line-clamp">
                                学生不足{{if itemData.pager.type == 1}}500{{else if itemData.pager.type == 0}}10{{/if}}人
                            </p>
                        {{else}}
                            <p class="line-clamp">{{itemData.teacher.city}}·{{itemData.teacher.subject_name}}</p>
                        {{/if}}
                    {{/if}}
                </div>
            </div>
            {{if itemData.teacher.student_count > 0}}
                <div class="student-amount">{{itemData.teacher.student_count}}学生</div>
            {{/if}}
            <div class="ranking-change">
                {{if itemData.teacher.rank == null}}
                {{else if itemData.teacher.rank_change == -1}}
                    <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/583cfe930c6f9.png">
                {{else if itemData.teacher.rank_change == 1}}
                    <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/583cfe935e33e.png">
                {{else if itemData.teacher.rank_change == 0}}
                    <img class="no-change" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/583d15fae7c60.png">
                {{/if}}
            </div>
        </div>
    {{/if}}
</div>
<div class="tips">榜单数据每6小时更新一次</div>
<div class="item-content">
    {{each itemData.items as $list}}
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
    {{/each}}
    {{if itemData.pager.total <= 30 && !itemData.pager.has_more}}
        <div class="tip">冲榜时间开放中，快快招生来冲榜</div>
    {{/if}}
    <div class="has-more">
        <div class="typing-loader"></div>
    </div>
    {{if itemData.pager.total > 30}}
        <div class="no-more">
            {{if itemData.pager.type == 0}}
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
