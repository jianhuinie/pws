{{*
    @file 个性化推送
    @author hurry
    @date 2016-06-13
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "顶级好课免费送"}}
    {{$page_module = "page/activity/push/index"}}
    {{$enable_backTopButton = true}}
{{/block}}
{{block name="data"}}
    {{if isset($smarty.get.user_number)}}
        {{$script_data["user_number"] = $smarty.get.user_number}}
    {{/if}}
    {{if isset($smarty.get.user_channel)}}
        {{$script_data["user_channel"] = $smarty.get.user_channel}}
    {{/if}}


{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/push/index.styl"/>
{{/block}}

{{block name="content"}}
    <div class="individual-push">
        <div class="header">
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/06/576125409fb16.jpeg@0e_375w_229h_0c_0i_1o_90Q_1x.jpeg"/>
        </div>
        <div class="content">
            <div class="title">为您推荐四门好课</div>
            <ul class="course clearfix">
                {{foreach $tpl_data as $cImg}}
                    <a href="{{$cImg.url}}" target="_blank">
                        <li class="item">
                            <div class="cover">
                                <img src="{{$cImg.cover}}@172w_96h_2x_70Q_0i_1e_1c_1o_1wh_1pr.jpg"/>
                            </div>
                            <div class="name double-line">{{$cImg.name}}</div>
                            <div class="desc">
                                {{if $cImg.price > 0}}
                                    <span class="price">￥{{$cImg.price}}</span>
                                {{else}}
                                    <span class="price">免费</span>
                                {{/if}}
                                <span class="pay-count">{{$cImg.play_count}}人正在学习</span>
                            </div>
                        </li>
                    </a>
                {{/foreach}}
            </ul>
        </div>
        <div class="footer">
            <p>Copyright @ 2014-2017 北京百家互联科技有限公司版权所有</p>
            <p>京公网安备11010802015210|京ICP备14027590号-1</p>
        </div>
    </div>
{{/block}}