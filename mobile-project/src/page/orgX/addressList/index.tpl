{{**
 * 领取资料页
 * Created by nanci on 16/11/11.
**}}

{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "管理收货地址"}}
    {{$page_module = "page/orgX/addressList/index"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}

    {{$purchase_id = $smarty.get.purchase_id}}

{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/orgX/addressList/index.styl"/>
{{/block}}

{{block name="content"}}

{{include file='page/_common/nav_bar/nav_bar.tpl' text='管理收货地址' menu_button=false}}
    <div id="main" class="main-content" data-purchase-id="{{$purchase_id}}">
        <div class="address-num-tip">温馨提示：您最多能添加10个地址</div>
        <div class="list">
        {{if !empty($tpl_data.address_list)}}
        {{foreach $tpl_data.address_list as $key => $val}}
            <div class="unit">
                <div class="info{{if $val@index eq 0}} choosen{{/if}}" data-user-name="{{$val.user_name}}" data-mobile="{{$val.mobile}}" data-area-id="{{$val.area_id}}" data-address="{{$val.location_addr}}" data-address-id="{{$val.id}}" data-email="{{$val.email}}" data-province="{{$val.regular_address.province.name}}" data-city="{{$val.regular_address.city.name}}" data-area="{{$val.regular_address.area.name}}" data-province-id="{{$val.regular_address.province.id}}" data-city-id="{{$val.regular_address.city.id}}">
                    <div class="check-wrapper">
                        <span class="icon icon-checkmark primary-content{{if $val@index neq 0}} hidden{{/if}}"></span>
                    </div>
                    <div class="text">
                        <span class="name">{{$val.user_name}}</span>
                        <span class="mobile">{{$val.mobile}}</span>
                        <p class="address clearfix">{{$val.full_address}}</p>
                    </div>
                </div>
                <div class="unit-edit-del">
                    <span class="del">
                        <span class="icon icon-del"></span>删除
                    </span>
                    <span class="edit">
                        <span class="icon icon-edit-with-a-line"></span>编辑
                    </span>
                </div>
            </div>
        {{/foreach}}
        {{/if}}
        {{if $tpl_data.address_list|@count <  10}}
            <div class="unit-add">
                <span class="icon icon-unfocus primary-content"></span>
                <span class="desc">新增地址</span>
                <span class="icon icon-chevron-thin-right"></span>
            </div>
        </div>
        {{/if}}
        <div class="state-receive">
        {{if !empty($tpl_data.if_receive_textbook)}}
            <span class="yes">已领取</span>
        {{else}}
            <span class="no">立即领取</span>
        {{/if}}
        </div>
    </div>
{{/block}}
