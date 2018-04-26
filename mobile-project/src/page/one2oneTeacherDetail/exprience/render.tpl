{{foreach list as $item index}}
    <div class="box-item{{if index > 1}} hide{{/if}}">
        <div class="dot-box">
            <div class="dot"></div>
            <div class="dot-line"></div>
        </div>

        <div class="box">
            <div class="box-time">
                <span class="time begin-time">{{$item.start_date}}</span>
                <span class="time"> - </span>
                <span class="time end-time">{{if $item.end_date!='0000-00-00'}}{{$item.end_date}}{{else}}至今{{/if}}</span>    
            </div>
            <div class="box-content">{{$item.content}}</div>
        </div>
    </div>


{{/foreach}}
