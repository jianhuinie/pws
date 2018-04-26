{{if list.length}}
{{foreach list as $item}}
<li>
    <div class="list-container">
    {{if $item.rank}}
    <div class="list-single">
    <div class="text">{{$item.rank}}</div>
    </div>
    {{/if}}
    <div class="li-container-item">
        <a class="list-avatar" href="{{$item.url}}"><img class="img-background" src="{{$item.avatar}}"/></a>
    <div class="list-info">
    <div class="list-info-name line-clamp">{{$item.name}}</div>
    <div class="list-info-source"><span class="count" data-count="{{$item.vote_count}}">{{$item.vote_count}}</span> 票</div>
        <div class="list-project line-clamp">
            才艺：{{$item.talent}}
        </div>
    </div>

    {{if $item.can_vote != true}}
        <div class="list-btn">已投票</div>
    {{else}}
        <div data-number="{{$item.number}}" class="apply list-btn list-btn-active"><span class="icon-heart"></span> 投票</div>
    {{/if}}

    </div>
    </div>
</li>
{{/foreach}}
{{else}}
    <div class="no-data">暂无参赛列表</div>
{{/if}}