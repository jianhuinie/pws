<div class="dynamic-child-box" data-type="article">
{{foreach articleList as $item}}
<div class="article-item clickRevers" data-url="{{$item.detail_url}}">
    <div class="first-nav">
        <img class="avatar" data-src="{{basicInfo.avatar}}">
        <div class="name">{{basicInfo.name}}</div>
        <div class="text">发表了文章</div>
    </div>

    <div class="second-nav" {{if !$item.cover}}style="padding-right: 0;"{{/if}}>
        {{if $item.cover}}
            <img class="cover" data-src="{{$item.cover}}">
        {{/if}}
        <div class="name line-clamp line-clamp-2">{{$item.title}}</div>
        <div class="info line-clamp line-clamp-2">{{$item.summary}}</div>
    </div>

    <div class="last-nav">
        <span class="time">{{$item.publish_at}}</span>
        <span class="good">
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/12/584aa95ba413b.png">
            <span class="good-number">{{$item.upvotes}}</span>
        </span>
    </div>
</div>
{{/foreach}}
</div>