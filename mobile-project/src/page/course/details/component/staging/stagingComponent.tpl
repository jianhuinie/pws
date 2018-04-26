<div class="staging-dialog">
    <div class="nav">花呗分期付款
        <div class="close-icon">
            <i class="icon icon-close" {{if type == "courseDetail"}}style="padding-top: 0px;"{{/if}}></i>
        </div>
    </div>
    <div class="staging-all">
    {{foreach staging.fenqi_detail as $item index}}
        <div class="staging-item" {{if index == staging.fenqi_detail.length-1}}style="border-bottom: none;"{{/if}} data-periods={{$item.periods}} data-flag="{{if index == 0 && type == 'courseDetail'}}1{{else}}0{{/if}}" data-price="{{$item.every_periods_repayment}}">
            <div class="price">
                ￥{{$item.every_periods_repayment}} x {{$item.periods}}期
            </div>

            <div class="fee">
                含手续费
            </div>

            <div class="options">
                <div class="icon {{if index>0 || type == 'order'}}hide{{/if}}"><img src="https://img.genshuixue.com/0cms/d/file/content/2016/10/580daf713b4a8.png"></div>
            </div>

        </div>
    {{/foreach}}
    </div>
    <div class="button">
        {{if type == 'order'}}
        确定
        {{else}}
        分期购买
        {{/if}}
    </div>
</div>
