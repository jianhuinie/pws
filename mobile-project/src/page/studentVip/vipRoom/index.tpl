{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$smarty.block.parent}}
    {{$page_title = "会员俱乐部"}}
    {{$page_module = "page/studentVip/vipRoom/index"}}
{{/block}}

{{block name="data"}}{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/studentVip/vipRoom/index.styl"/>
{{/block}}

{{block name="content"}}

    <div class="vip-club">

        <div class="vip-card">
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/07/577729de70ba3.png">
            <div class="card-number">
                {{$tpl_data.card.no}}
            </div>
        </div>

        <div class="text">
            激活时间：{{$tpl_data.card.start_date}} 有效期剩余
            <span class="rest-time">{{$tpl_data.card.remain_days}}</span> 天
        </div>

        <div class="row">

            <a href="{{$tpl_data.acvitity_url}}" class="column column-first">
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/07/57773325a50b1.png">
                <div class="title">
                    专属活动
                </div>
                <div class="sub-title">
                    <span class="coupon-count">
                        {{$tpl_data.coupon_count}}
                    </span>
                    张主题活动券
                </div>
            </a>
            <a class="column column-second">
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/07/57773951b9fc2.png">
                <div class="title muted">
                    课程优惠券
                </div>
                <div class="sub-title">
                    近期上线 敬请期待
                </div>
            </a>

        </div>

        <div class="row">

            <a href="{{$tpl_data.group_url}}" class="column column-third">
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/07/5777399a4d9f7.png">
                <div class="title">
                    专属社群
                </div>
                <div class="sub-title">
                    我们的学习交流区
                </div>
            </a>

            <a href="{{$tpl_data.recommend_url}}" class="column column-fourth">
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/07/577739a17c52a.png">
                <div class="title">
                    预约推荐老师
                </div>
                <div class="sub-title">
                    50万老师6万家机构
                </div>
            </a>

        </div>

        <div class="row">

            <a href="{{$tpl_data.bigshot_url}}" class="column column-fifth">
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/07/577739a78ca1b.png">
                <div class="title">
                    邀请有礼
                </div>
                <div class="sub-title">
                    享平台现金红包
                </div>
            </a>

            <a href="tel:{{$tpl_data.kefu_tel}}" class="column column-sixth">
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/07/577739ac9c36f.png">
                <div class="title">
                    客服专线
                </div>
                <div class="sub-title">
                    {{$tpl_data.kefu_tel}}
                </div>
            </a>

        </div>

        <a href="{{$tpl_data.save_guard_url}}" class="tuition-bodyguard">
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/07/57773d6da5a73.png">
            <span class="tuition-letin">
                学费卫士，保障您的学费安全
            </span>
            <span> &gt; </span>
        </a>

    </div>
{{/block}}