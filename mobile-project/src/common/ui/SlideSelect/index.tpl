<div class="slide-container slider-{{name}}">
    <div class="info">请选择{{title}}</div>
    {{each content as $item}}
        <div class="select-item">
            <span class="content" data-id={{$item.id}}>{{$item.name}}</span>
            <i class="icon icon-checkmark"></i>
        </div>
    {{/each}}
    <div class="cancel">取消</div>
</div>