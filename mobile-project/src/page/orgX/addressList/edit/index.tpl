{{**
 * 领取资料编辑页
 * Created by nanci on 16/11/12.
**}}

{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{if !empty($smarty.get.address_id)}}
    {{$page_title = "修改地址"}}
    {{else}}
    {{$page_title = "添加新地址"}}
    {{/if}}
    {{$page_module = "page/orgX/addressList/edit/index"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{if !empty($smarty.get.purchase_id)}}
    {{$purchase_id = $smarty.get.purchase_id}}
    {{/if}}
    {{if !empty($smarty.get.user_name)}}
    {{$user_name = $smarty.get.user_name}}
    {{/if}}
    {{if !empty($smarty.get.mobile)}}
    {{$mobile = $smarty.get.mobile}}
    {{/if}}
    {{if !empty($smarty.get.email)}}
    {{$email = $smarty.get.email}}
    {{/if}}
    {{if !empty($smarty.get.area_id)}}
    {{$area_id = $smarty.get.area_id}}
    {{/if}}
    {{if !empty($smarty.get.address)}}
    {{$address = $smarty.get.address}}
    {{/if}}
    {{if !empty($smarty.get.address_id)}}
    {{$address_id = $smarty.get.address_id}}
    {{/if}}
    {{if !empty($smarty.get.address)}}
    {{$full_address = $smarty.get.address}}
    {{/if}}

{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/orgX/addressList/edit/index.styl"/>
{{/block}}

{{block name="content"}}

{{if !empty($smarty.get.address_id)}}
{{include file='page/_common/nav_bar/nav_bar.tpl' text='修改地址' menu_button=false}}
{{else}}
{{include file='page/_common/nav_bar/nav_bar.tpl' text='添加新地址' menu_button=false}}
{{/if}}
    <div id="main" class="main-content" data-purchase-id="{{$purchase_id}}" data-address-id="{{if !empty($smarty.get.address_id)}}{{$smarty.get.address_id}}{{/if}}">
        <div class="name">
            <span class="desc">收货人</span>
            <input class="content form-content" data-validate="name" data-validate-message="姓名：只能输入中文2-10个字" value="{{if !empty($user_name)}}{{$user_name}}{{/if}}">
            <!-- <span class="icon icon-chevron-thin-right"></span> -->
        </div>
        <div class="mobile">
            <span class="desc">联系电话</span>
            <input class="content form-content" data-validate="phone" data-validate-message="联系电话：以1开头、11位正确的手机号码" value="{{if !empty($mobile)}}{{$mobile}}{{/if}}">
            <!-- <span class="icon icon-chevron-thin-right"></span> -->
        </div>
        <div class="email">
            <span class="desc">邮箱</span>
            <input class="content form-content" data-validate="email" data-validate-message="电子邮箱：必须为邮箱格式" value="{{if !empty($email)}}{{$email}}{{/if}}">
        </div>
        <div class="address">
            <span class="desc">所在地区</span>
            <!-- <input class="content" value="{{if !empty($address)}}{{$address}}{{/if}}"> -->
            <!-- <span class="icon icon-chevron-thin-right"></span> -->
            <!-- <input class="content content-address hidden" value="已设置"> -->
            <!-- <div class="m-set select"> -->
            <select id="province" name="province" data-validate="required" class="form-element">
                <option value="{{if !empty($smarty.get.province_id)}}{{$smarty.get.province_id}}{{/if}}">{{if !empty($smarty.get.province)}}{{$smarty.get.province}}{{else}}请选择省{{/if}}</option>
            </select>

            <select id="city" name="city" class="form-element" data-validate="required">
                <option value="{{if !empty($smarty.get.city_id)}}{{$smarty.get.city_id}}{{/if}}">{{if !empty($smarty.get.city)}}{{$smarty.get.city}}{{else}}请选择市{{/if}}</option>
            </select>

            <select id="area" name="district" class="form-element" data-validate="required">
                <option value="{{if !empty($smarty.get.area_id)}}{{$smarty.get.area_id}}{{/if}}">{{if !empty($smarty.get.area)}}{{$smarty.get.area}}{{else}}请选择区{{/if}}</option>
            </select>
            <!-- <select id="province" name="province" data-validate="required" class="form-element">
                <option value="">请选择省</option>
            </select>

            <select id="city" name="city" class="form-element" data-validate="required">
                <option value="">请选择市</option>
            </select>

            <select id="area" name="district" class="form-element" data-validate="required">
                <option value="">请选择区</option>
            </select> -->
            <!-- </div> -->
        </div>
        <div class="address-detail">
            <textarea name="address-detail" placeholder="请填写详细地址，街道楼牌号等" id="address-detail" cols="30" rows="10">{{if !empty($full_address)}}{{$full_address}}{{/if}}</textarea>
        </div>
        <div class="actions">
            <span class="save">保存</span>
            <!-- {{if $smarty.get.if_receive_textbook}}
            <span class="save-and-use">保存并使用</span>
            {{/if}} -->
        </div>
    </div>
{{/block}}
