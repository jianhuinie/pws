{{foreach list as $item}}
    <span class="item normal" data-status="{{$item.index}}">
        {{$item.name}}
    </span>
{{/foreach}}