<div class="bottom-wrap">
    <ul class="clearfix">
        <a href="/business_school/detail">
            {{if $index==1}}
            <li class="bottom-list on first-page">
            {{else}}
            <li class="bottom-list first-page">
            {{/if}}
                <p>首页</p>
            </li>
        </a>
        <a href="/business_school/courseIntroduce">
            {{if $index==2}}
            <li class="bottom-list on second-page">
            {{else}}
            <li class="bottom-list second-page">
            {{/if}}
                <p>课程介绍</p>
            </li>
        </a>
        <a href="/business_school/aboutUs">
            {{if $index==3}}
            <li class="bottom-list on third-page">
            {{else}}
            <li class="bottom-list third-page">
            {{/if}}
                <p>关于我们</p>
            </li>
        </a>
        <li class="bottom-list ask-form">
            <p>免费咨询</p>
        </li>
    </ul>
</div>