{{$acceptConsultPrice = false}}
{{$display_price = 0}}

{{if $tpl_data.source_order_set && isset($tpl_data.source_order_set.display_price) && $tpl_data.source_order_set.display_price > 0}}
    {{$display_price = $tpl_data.source_order_set.display_price}}
{{/if}}

{{if $tpl_data.source_order_set}}
    {{if $tpl_data.source_order_set.is_accept_consult}}
        {{$acceptConsultPrice = true}}
    {{/if}}
{{/if}}
<section class="set-price">
    <div class="price">
        <div class="text">接受生源的价格</div>
        <div class="price-sets setting">
            <span class="input-content">{{$display_price}}</span>
            <input type="text" class="set hide" placeholder="请输入价格" data-type="price" {{if $display_price > 0}}autofocus{{/if}}></input>
            <span class="input-text">元/小时以上</span>
        </div>
    </div>

    <div class="set-price-line">
    </div>

    <div class="set-price-button">
        <div class="text">接受协商价格</div>
        <div class="button">
            <div class="circles{{if $acceptConsultPrice}} circles-open{{/if}}" data-type="price">
                {{if $acceptConsultPrice}}
                    <div class="circle-button-open"></div>
                {{else}}
                    <div class="circle-button"></div>
                {{/if}}
            </div>
        </div>
    </div>
</section>