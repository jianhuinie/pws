<div class="sort-box hide">
    {{$sort=['发布时间排序','距离从近到远','价格从高到低']}}

    {{foreach $sort as $item index}}
        <div class="item" data-type="{{$item@index}}">
            <span class="text {{if $item@index == 0}}active{{else}}normal{{/if}}">{{$item}}</span>
            <i class="icon icon-check {{if $item@index > 0}}hide{{/if}}"></i>
        </div>
    {{/foreach}}
</div>