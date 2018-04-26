<div class="tags-box">
    <div class="header">
        <span class="title">老师特点</span>
        <div class="close-box">
            <i class="icon icon-close"></i>
        </div>
    </div>

    <div class="tag-box-items">
        {{foreach skills as $item}}
            <span class="tag-item">{{$item.title}}</span>
        {{/foreach}}
    </div>
</div>