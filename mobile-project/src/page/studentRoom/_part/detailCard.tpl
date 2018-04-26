{{$orderStatus = ['待响应', 
                  '暂不报名', 
                  '已报名', 
                  '已成单', 
                  '取消报名',
                  '已结束报名']}}
<div class="header">
    <div class="time" data-time="{{$order.create_time}}"></div>
    <div class="status
        {{if $teachSelf.display_status == 0}}
            un-do
        {{else if $teachSelf.display_status == 1}}
            un-do-now
        {{else if $teachSelf.display_status == 2}}
            has-pay
        {{else if $teachSelf.display_status == 3}}
            has-done
        {{else}}
            other-pay
        {{/if}}">{{$orderStatus[$teachSelf.display_status]}}</div>
</div>

<div class="subject-name">
    {{$order.subject_name}}
</div>

<div class="line">
</div>

<div class="content">
    <div class="item">
        <i class="icon icon-ic_price"></i>
        <span class="price">￥{{$order.min_price}}-{{$order.max_price}}/小时</span>
    </div>

    <div class="item">
        <i class="icon icon-ic_bookclass"></i>
        <span class="lessonWay">
            {{foreach $order.lesson_way_cn_array as $item index}}
                {{if $item@index == 0}}
                    {{$item}}
                {{else}}
                    | {{$item}}
                {{/if}}
            {{/foreach}}
        </span>
    </div>

    <div class="item">
        <i class="icon icon-shijian"></i>
        <span class="student-require-time">
        </span>
    </div>

    {{if $order.class_address}}
    <div class="item">
        <i class="icon icon-ditu"></i>
        <span class="location">
            {{$order.class_address}}
        </span>
    </div>

        {{if $order.distance > 0}}
            <div class="distance">
                距离您{{$order.distance}}km
            </div>
        {{/if}}
    {{/if}}

    {{if isset($order.sex)}}
        <div class="item sex">
            <i class="icon icon-icon-sex"></i>
            <span class="sex-text">
            {{if $order.sex == 0}}
                女
            {{else if $order.sex == 1}}
                男
            {{else if $order.sex == 2}}
                性别不限
            {{/if}}
            </span>
        </div>
    {{/if}}

    <div class="item remark-content">
        <span class="text">备注:</span>
        <span class="remark">
            {{$order.remark}}
        </span>
    </div>

</div>

<div class="time-line">
</div>