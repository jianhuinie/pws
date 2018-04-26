{{$order = $tpl_data.order}}
{{$order['distance'] = $tpl_data.teacher_self.distance}}
{{$teachSelf = $tpl_data.teacher_self}}
<div class="detail">
    
    {{include file="page/studentRoom/_part/detailCard.tpl"}}

    {{$title = ['意向时间','周一', '周二', '周三', '周四', '周五', '周六', '周日']}}
    <div class="table">
        <div class="table-header">
            {{foreach $title as $item index}}
            <div class="title-item{{if $item@index > 0}} title-item-time{{else}} title-item-name{{/if}}">{{$item}}</div>
            {{/foreach}}
        </div>
        <div class="time-line"></div>
        <div class="timer-container">
            {{$firstTimer=['上午', '0', '3', '6', '9', '12', '15', '18']}}
            {{foreach $firstTimer as $item index}}
                <div class="time-item{{if $item@index == 0}} time-item-name{{/if}}" {{if $item@index > 0}}data-index={{$item}} data-status="0"{{/if}}>
                    {{if $item@index > 0}}
                        <i class="icon icon-ic_noselect"></i>
                    {{else}}
                        <span class="time-text">{{$item}}</span>
                    {{/if}}
                </div>
            {{/foreach}}
        </div>
        <div class="time-line"></div>
        <div class="timer-container">
            {{$secondTimer=['下午', '1', '4', '7', '10', '13', '16', '19']}}
            {{foreach $secondTimer as $item index}}
                <div class="time-item{{if $item@index == 0}} time-item-name{{/if}}" {{if $item@index > 0}}data-index={{$item}} data-status="0"{{/if}}>
                    {{if $item@index > 0}}
                        <i class="icon icon-ic_noselect"></i>
                    {{else}}
                        <span class="time-text">{{$item}}</span>
                    {{/if}}
                </div>
            {{/foreach}}
        </div>
        <div class="time-line"></div>
        <div class="timer-container">
            {{$lastTimer=['晚上', '2', '5', '8', '11', '14', '17', '20']}}
            {{foreach $lastTimer as $item index}}
                <div class="time-item{{if $item@index == 0}} time-item-name{{/if}}" {{if $item@index > 0}}data-index={{$item}} data-status="0"{{/if}}>
                    {{if $item@index > 0}}
                        <i class="icon icon-ic_noselect"></i>
                    {{else}}
                        <span class="time-text">{{$item}}</span>
                    {{/if}}
                </div>
            {{/foreach}}
        </div>
        <div class="time-line"></div>

        <div class="warn">
            <div class="warn-item warn-item-1">
                <i class="icon icon-focus"></i>
                <span class="warn-text">您和学生的匹配时间</span>
            </div>

            <div class="warn-item warn-item-1">
                <i class="icon icon-ic_unselect"></i>
                <span class="warn-text">学生其他可上课时间</span>
            </div>

            <div class="warn-item warn-item-2">
                <i class="icon icon-ic_noselect"></i>
                <span class="warn-text">无法匹配</span>
            </div>
        </div>
    </div>
</div>