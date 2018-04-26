{{*
    @file 学生会员-我的活动
    @author hurry
    @date 2016-07-02
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "我的活动"}}
    {{$page_module = "page/studentVip/myActivity/index"}}
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
    <link rel="stylesheet" href="{{$static_origin}}/src/page/studentVip/myActivity/index.styl"/>
{{/block}}

{{block name="content"}}
    <div class="student-vip-activity">
        <header style="margin-bottom: 20px;">
            <div>
                <img class="bg" src="{{$static_origin}}/src/page/studentVip/myActivity/img/bg_bar.png"/>
                <div>
                    <img width="26px" height="14px" src="{{$static_origin}}/src/page/studentVip/myActivity/img/icon.png"/>
                    <span>
                    我有{{$tpl_data.coupon_info.total}}张活动券，已使用{{$tpl_data.coupon_info.used}}张，剩余{{$tpl_data.coupon_info.unused}}张
                    </span>
                </div>
            </div>
        </header>
        {{if $tpl_data.list|@count neq 0}}
        <main>

                {{foreach $tpl_data.list as $activity}}
                    <section data-url="{{$activity.detail_url}}"
                    {{if $activity.tag == '已结束'}} class="over"{{/if}}>
                        <div class="cover">
                            <img height="100%" width="100%" data-src="{{$activity.cover}}"/>
                        </div>
                        <div class="detail">
                            <div class="title ellipsis  {{if $activity.tag == '已结束'}}over{{/if}}">{{$activity.course_title}}</div>
                            <div class="content ellipsis aggrement">{{$activity.arrangement}}</div>
                            <div class="content clearfix">
                                <span class="list-address line-clamp">{{$activity.address}}</span>
                                <span class="tag {{if $activity.tag == '已报名'}}success{{/if}}">{{$activity.tag}}</span>
                            </div>
                        </div>
                    </section>
                {{/foreach}}
        </main>
        {{else}}
            <div style="margin-top: 40px;">
                <span class="empty">还没有参加任何活动哦</span>
            </div>
        {{/if}}

        {{if $tpl_data.list|@count neq 0}}
        <footer>
            <a href="/student/vip/topic">
                去“精彩主题”专区看看 >
            </a>
        </footer>
        {{else}}
        <footer style="margin-top: 30px;">
            <a style="background: #954ba8; color: white;" href="/student/vip/topic">
                去“精彩主题”专区看看 >
            </a>
        </footer>
        {{/if}}
    </div>
{{/block}}