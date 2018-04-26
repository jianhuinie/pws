<div class="slide-container {{name}}">
    <div class="info">请选择{{title}}</div>
    {{each content as $item}}
        <div class="select-item">
            <span class="content">{{$item}}</span>
            {{if $item == '¥100-¥200'}}
                <span class="suggestion">建议</span>
            {{/if}}
            <i class="icon icon-checkmark"></i>
        </div>
    {{/each}}
    <div class="cancel">取消</div>
</div>