<div class="comment-info not-empty">
    <div class="comment-left">
        <div class="score"><span class="score">{{commentInfo.score}}</span>分</div>
        <div class="stars"></div>
        <div class="count">{{commentInfo.count}}条学习评价</div>
    </div>

    <div class="comment-right">
        <div class="star-item" data-percent="{{commentInfo.total_score.five_rate}}">
            <span class="name">五星</span>
            <span class="line">
                <span class="mask"></span>
            </span>
            <span class="percent">{{(commentInfo.total_score.five_rate * 100).toFixed(2)}}%</span>
        </div>

        <div class="star-item" data-percent="{{commentInfo.total_score.four_rate}}">
            <span class="name">四星</span>
            <span class="line">
                <span class="mask"></span>
            </span>
            <span class="percent">{{(commentInfo.total_score.four_rate * 100).toFixed(2)}}%</span>
        </div>

        <div class="star-item" data-percent="{{commentInfo.total_score.three_rate}}">
            <span class="name">三星</span>
            <span class="line">
                <span class="mask"></span>
            </span>
            <span class="percent">{{(commentInfo.total_score.three_rate * 100).toFixed(2)}}%</span>
        </div>

        <div class="star-item" data-percent="{{commentInfo.total_score.two_rate}}">
            <span class="name">二星</span>
            <span class="line">
                <span class="mask"></span>
            </span>
            <span class="percent">{{(commentInfo.total_score.two_rate * 100).toFixed(2)}}%</span>
        </div>

        <div class="star-item" data-percent="{{commentInfo.total_score.one_rate}}">
            <span class="name">一星</span>
            <span class="line">
                <span class="mask"></span>
            </span>
            <span class="percent">{{(commentInfo.total_score.one_rate * 100).toFixed(2)}}%</span>
        </div>
    </div>
</div>
<div class="comment-child-tab">
    <div class="item comment-nav-tab{{if type == 0}} on{{/if}}" data-type="0">全部评价</div>
    <div class="item comment-nav-tab{{if type == 1}} on{{/if}}" data-type="1">1对1</div>
    <div class="item comment-nav-tab{{if type == 3}} on{{/if}}" data-type="3">班课</div>
    <div class="item comment-nav-tab{{if type == 4}} on{{/if}}" data-type="4">视频课</div>
</div>