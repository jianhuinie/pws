{{$only_teach = false}}
{{if $tpl_data.source_order_set && isset($tpl_data.source_order_set.only_teach) && $tpl_data.source_order_set.only_teach}}
    {{$only_teach = true}}
{{/if}}

<section class="set-time">
    <div class="set-time-button">
        <div class="text">仅接受符合我授课时间的生源</div>
        <div class="button">
            <div class="circles{{if $only_teach}} circles-open{{/if}}""  data-type="time">
                {{if $only_teach}}
                    <div class="circle-button-open"></div>
                {{else}}
                    <div class="circle-button"></div>
                {{/if}}
            </div>
        </div>
    </div>

    <div class="set-time-line">
    </div>

    <div class="set-time-table">
        <div class="title">
            <span class="text">请选择可授课时间</span>
            <span class="choose-all">全选</span>
        </div>
        {{$title = ['意向时间','周一', '周二', '周三', '周四', '周五', '周六', '周日']}}
        <div class="table">
            <div class="header">
                {{foreach $title as $item index}}
                <div class="title-item{{if $item@index > 0}} title-item-time{{else}} title-item-name{{/if}}">{{$item}}</div>
                {{/foreach}}
            </div>
            <div class="set-time-line-time"></div>
            <div class="timer-container">
                {{$firstTimer=['上午', '0', '3', '6', '9', '12', '15', '18']}}
                {{foreach $firstTimer as $item index}}
                    <div class="time-item{{if $item@index == 0}} time-item-name{{/if}}" {{if $item@index > 0}}data-index={{$item}} data-status="0"{{/if}}>
                        {{if $item@index > 0}}
                            <i class="icon icon-ic_unselect"></i>
                        {{else}}
                            <span class="time-text">{{$item}}</span>
                        {{/if}}
                    </div>
                {{/foreach}}
            </div>
            <div class="set-time-line-time"></div>
            <div class="timer-container">
                {{$secondTimer=['下午', '1', '4', '7', '10', '13', '16', '19']}}
                {{foreach $secondTimer as $item index}}
                    <div class="time-item{{if $item@index == 0}} time-item-name{{/if}}" {{if $item@index > 0}}data-index={{$item}} data-status="0"{{/if}}>
                        {{if $item@index > 0}}
                            <i class="icon icon-ic_unselect"></i>
                        {{else}}
                            <span class="time-text">{{$item}}</span>
                        {{/if}}
                    </div>
                {{/foreach}}
            </div>
            <div class="set-time-line-time"></div>
            <div class="timer-container">
                {{$lastTimer=['晚上', '2', '5', '8', '11', '14', '17', '20']}}
                {{foreach $lastTimer as $item index}}
                    <div class="time-item{{if $item@index == 0}} time-item-name{{/if}}" {{if $item@index > 0}}data-index={{$item}} data-status="0"{{/if}}>
                        {{if $item@index > 0}}
                            <i class="icon icon-ic_unselect"></i>
                        {{else}}
                            <span class="time-text">{{$item}}</span>
                        {{/if}}
                    </div>
                {{/foreach}}
            </div>
        </div>
    </div>
</section>