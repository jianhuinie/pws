{{each data as item}}
    <div class="card{{if item.is_end === true}} end{{/if}}" data-uuid="{{item.uuid}}">
        {{if item.is_end === true}}
        <span class="end-info">已结束</span>
        {{/if}}
        <p class="info">
            <span class="title">活动名称:&nbsp;</span>
            <span class="content">{{item.name}}</span>
        </p>
        <p class="info time-info">
            <span class="title time-title">活动时间:&nbsp;</span>
            <span class="content time">
            {{item.begin_time}}至{{item.end_time}}
            </span>
        </p>
        <p class="info">
            <span class="title">免单课程:&nbsp;</span>
            <span class="content">{{item.course.name}}</span>
        </p>
        <p class="info">
            <span class="title">最低邀请人数:&nbsp;</span>
            <span class="content">{{item.quota}}人</span>
        </p>
        <p class="info">
            <span class="title">活动统计:&nbsp;</span>
            <span class="content">
                <span class="num">{{item.stat.cards_count}}人</span>看过你的课程,
                <span class="num">{{item.stat.cards_satisfy_quota_count}}人</span>免单
            </span>
        </p>
    </div>
{{/each}}