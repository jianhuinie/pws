{{$stars = ['', '一', '二', '三', '四', '五']}}
<div class="addition">
    <div class="infos">
        <div class="score-text">
            <span class="text">{{commentSummary.score}}</span>
            <span class="text-r">分</span>
        </div>

        <div class="stars-lines" data-scores="{{commentSummary.score}}"></div>

        <div class="count">{{commentSummary.count}}条学习评价</div>
    </div>

    <div class="cross-line"></div>

    <div class="total-lines">
        {{foreach commentSummary.score_detail as $item}}
            <div class="item">
                <span class="text">{{$stars[$item.score]}}星</span>
                <span class="line">
                    <span class="line-grey"></span>
                    <span class="line-orange" data-rate="{{$item.rate}}"></span>
                </span>
                <span class="rate" data-rate="{{$item.rate}}"></span>
            </div>
        {{/foreach}}
    </div>
</div>