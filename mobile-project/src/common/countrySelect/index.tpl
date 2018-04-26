<div class="country_select_control">
    <div class="country_text">
        <img width="auto" height="auto"
             src="{{data[0].pic}}">
        <span class="">{{data[0].code}}</span>
    </div>
    <select class="country_select" name="country_code">
        {{foreach data as $item}}
        <option value="{{$item.value}}"
                data-code="{{$item.code}}"
                data-pic="{{$item.pic}}">
            {{$item.text}} ( {{$item.code}} )
        </option>
        {{/foreach}}
    </select>
    <i class="icon icon-caret-down"></i>
</div>
