<div class="title">成功案例</div>
<div class="content">
    {{foreach list as $item}}
        <div class="box-item">
            <div class="dot-box">
                <div class="dot"></div>
                <div class="dot-line"></div>
            </div>

            <div class="box">
                <div class="box-title line-clamp">{{$item.title}}</div>
                <div class="box-time">{{$item.date}}</div>
                <div class="box-content">{{$item.content}}</div>
            </div>
        </div>
    

    {{/foreach}}
</div>