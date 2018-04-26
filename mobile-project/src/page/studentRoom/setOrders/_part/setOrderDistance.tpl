{{$distance = 0}}
{{if $tpl_data.source_order_set && isset($tpl_data.source_order_set.distance) && $tpl_data.source_order_set.distance > 0}}
    {{$distance = $tpl_data.source_order_set.distance}}
{{/if}}
<section class="set-distance">
    <div class="distance">
        <div class="text">接受生源的距离</div>
        <div class="distance-sets setting">
            {{if $distance > 0}}
                <span class="input-content">{{$distance}}</span>
            {{else}}
                <span class="input-content">不限</span>
            {{/if}}
            <input type="text" class="set hide" placeholder="请输入距离" data-type="distance" {{if $distance}}autofocus{{/if}}></input>
            <span class="input-text">公里以内</span>
        </div>
    </div>

    <div class="set-distance-line">
    </div>

    {{$location_addr = ''}}
    {{if $tpl_data.address && isset($tpl_data.address.location_addr) && $tpl_data.address.location_addr}}
        {{$location_addr = $tpl_data.address.location_addr}}
    {{/if}}

    {{$detailed_address = ''}}
    {{if $tpl_data.address && isset($tpl_data.address.detailed_address) && $tpl_data.address.detailed_address}}
        {{$detailed_address = $tpl_data.address.detailed_address}}
    {{/if}}
    <div class="set-distance-button">
        <div class="text">我的地址</div>
        <div class="address line-clamp">
            {{if $location_addr}}
                {{$location_addr}}
            {{/if}}   

            {{if $location_addr && $detailed_address}}
                -
            {{/if}} 

            {{if $detailed_address}}
                {{$detailed_address}}
            {{/if}}  
        </div>
        <i class="icon icon-angle-right"></i>
    </div>
</section>