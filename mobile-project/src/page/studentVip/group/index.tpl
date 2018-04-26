{{*
    @file 学生会员-专属社群
    @author hurry
    @date 2016-07-02
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "专属社群"}}
    {{$page_module = "page/studentVip/group/index"}}
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
    <link rel="stylesheet" href="{{$static_origin}}/src/page/studentVip/group/index.styl"/>
{{/block}}

{{block name="content"}}
    <div class="student-vip-group">
        <div class="main">
            <section class="qq">
                <div>
                    <span class="underline">
                        <span>QQ群</span>
                    </span>
                </div>
                <div class="tips">
                    根据学员年龄阶段选择对应的QQ群加入，请勿重复加群，谢谢您的配合。
                </div>
                <div class="button" is-qq="1" data-url="https://jq.qq.com/?_wv=1027&k=2I0wl7a">
                    0-4岁家长群
                </div>
                <div class="button" is-qq="1" data-url="https://jq.qq.com/?_wv=1027&k=2BQ10Aj">
                    5-12岁家长群
                </div>
            </section>
            <section class="discuss">
                <span class="underline" >
                    <span>讨论区</span>
                </span>
                <div class="button" data-url="https://m.genshuixue.com/forum/threadBrowse?forum_group_id=100">全体家长</div>
            </section>
        </div>
    </div>
{{/block}}