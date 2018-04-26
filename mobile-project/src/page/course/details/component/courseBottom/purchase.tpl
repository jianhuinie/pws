<div id="j_purchase" class="purchase">
    <img class="close" src="/src/page/course/details/component/img/ic_cancel.png" alt="" />
    <div class="name">{{$courseInfo.name}}</div>
    <div class="way">
        <div class="title">
            上课方式
        </div>
        <div>
            <div class="choose">
                {{if $courseInfo.lesson_way == 2}}在线授课{{else}}线下授课{{/if}}
            </div>
        </div>
    </div>
    <div class="quantity">
        <div class="title">购买数量：</div>
        <span id="j_plus" class="operation">+</span>
        <span id="j_num" class="num">1</span>
        <span id="j_minus" class="operation">-</span>
    </div>
    <div class="sum">
        共计：<span id="j_sum" data-price="{{$courseInfo.price}}">¥{{$courseInfo.price}}</span>
    </div>
    <div id="j_submit" class="submit">立即报名</div>
</div>
