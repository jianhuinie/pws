<ul class="choose-section-filter-content-child-content">
    {{foreach arrays as $item}}
        <li class="choose-section-filter-content-child-item unchoosed" 
            data-array-type="{{position}}"
            data-id="{{$item.id}}"
            data-name="{{$item.name}}">
            {{$item.name}}
        </li>
    {{/foreach}}
    <span></span>
</ul>