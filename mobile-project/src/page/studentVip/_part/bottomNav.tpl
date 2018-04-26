<div class="bottom-nav hide">
    <img src="{{$static_origin}}/src/page/studentVip/image/ic_closebar.png" class="bottom-close">
    <a href="http://m.genshuixue.com/teacher/classCourseDetail/160705902085">
        <div class = "bottom-info">
        {{if isset($text) && $text == 'child'}}
            <p class="bottom-text">这么多精品课，还享会员专属优惠</p>
            <p class="bottom-show">加入"会员俱乐部"</p>
        {{else}}
            <p class="bottom-text">那么多精品活动，解决周末难题</p>
            <p class="bottom-show">加入"会员俱乐部"</p>
        {{/if}}
        </div>
        <img src="{{$static_origin}}/src/page/studentVip/image/ic_go.png" class="bottom-purple">
    </a>
</div>