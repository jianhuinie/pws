{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "中英文化交流大使全国招募大赛"}}

    {{$page_module = "page/activity/ce_contest/home/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/ce_contest/home/css/index.styl"/>
{{/block}}

{{block name="content"}}
    <div class="header">
        <a href="javascript:void(0)">
            <img src="{{$static_origin}}/src/page/activity/ce_contest/home/img/logo.png">
        </a>

        <div class="header-info">
            <div class="header-title">2016中英文化交流大使全国招募大赛</div>
            <div class="header-remind">The Audition For the Ambassador of Sino-UK Cultural Exchanges</div>
        </div>
    </div>
    <div class="nav-bar">
        <img class="img-background" src="{{$static_origin}}/src/page/activity/ce_contest/home/img/header.jpg">
    </div>
    <div class="container">
        {{include file="page/activity/ce_contest/_part/menu.tpl" menu_active="home"}}
        <div class="introduce">
            {{if $tpl_data.status == '0'}}
            <a class="apply resume" href="/uk/edit"><span class="icon-heart"></span> 立即报名</a>
            {{/if}}
            {{if $tpl_data.status == "1"}}
            <a class="apply vote" href="/uk/rank"><span class="icon-heart"></span> 我要投票</a>
            {{/if}}
            <h2 class="title">赛事介绍</h2>

            <p>
                为加深国内外优秀文化的交流，传播和弘扬中华文化的精髓，促进学生积极参与国际交流拓展国际化视野，跟谁学特举办“2016年中英文化交流大使招募大赛“。本次大赛将选拔出一批拥有突出才艺和技能的优秀学生代表，作为中外文化交流的使者，参与一系列的文化交流活动，深化中英关系。</p>
            <p>
                本次大赛将选拔出最多100名优秀学生代表，授予“中英文化交流大使”称号，提供寒假英国游学的机会和外语培训课程，并颁发获奖证书。还将选拔出400名优秀学生，颁发“中英文化交流优秀奖”证书，提供中英文化交流冬令营的机会和外语培训课程。
            </p>
        </div>
        <div class="introduce">
            <h2 class="title">参赛条件</h2>
            <p>1、6-25岁的全日制在校大中小学生。</p>
            <p>2、活动设立小学组、初中组、高中组和大学组，每个组单独设定评选办法。</p>
            <p>3、参赛者按照所就读年级报名对应组别，不允许跨年级段报名，如高中生报名至初中组、初中生报名至小学组等情况。</p>
        </div>
        <div class="active">
            <a href="/forum/threadBrowse?forum_group_id=76" class="more">【查看更多】</a>
            <h2 class="title active-title">大赛动态</h2>
            <ul class="active-list clearfix">
              {{foreach $tpl_data.active as $item}}
                <li class="active-item">
                    {{if $item.status == '1'}}<div class="active-item-hot">Hot</div>{{/if}}
                    <a href="/forum/postBrowse?thread_id={{$item.number}}" class="active-item-text line-clamp">{{$item.title}}</a>
                    <div class="active-item-date line-clamp">{{$item.summary}}</div>
                </li>
              {{/foreach}}
            </ul>

        </div>
        <div class="rewards">
            <h2 class="title rewards-title">活动奖励</h2>
            <div class="rewards-block">
                <div class="rewards-block-single">
                    <img data-src="{{$static_origin}}/src/page/activity/ce_contest/home/img/gold.png">
                </div>
                <div class="rewards-block-item">价值40000元的2017年寒假公费英国游学机会</div>
                <div class="rewards-block-item">跟谁学外语培训课程（价值1500元）＋荣誉证书</div>

            </div>
            <div class="rewards-block">
                <div class="rewards-block-single">
                    <img data-src="{{$static_origin}}/src/page/activity/ce_contest/home/img/silver.png">
                </div>
                <div class="rewards-block-item">价值3000元的2017年北京中英文化交流冬令营活动参与机会</div>
                <div class="rewards-block-item">外语课程培训奖励（价值1500元）＋荣誉证书</div>
                <div class="rewards-block-item">“中英文化交流大使”荣誉称号</div>

            </div>
            <div class="rewards-block">
                <div class="rewards-block-single">
                    <img data-src="{{$static_origin}}/src/page/activity/ce_contest/home/img/final.png">
                </div>
                <div class="rewards-block-item">决赛入围奖：免费赛前辅导（价值600元）＋荣誉证书</div>
            </div>
            <div class="rewards-block">
                <div class="rewards-block-single">
                    <img data-src="{{$static_origin}}/src/page/activity/ce_contest/home/img/playoff.png">
                </div>
                <div class="rewards-block-item">复赛入围奖：免费赛前辅导（价值300元）</div>
            </div>
        </div>
        <div class="plan">
            <h2 class="title plan-title">时间安排</h2>
            <div class="plan-list">
                <div class="plan-item plan-item-1">
                    <div class="plan-item-icon">&nbsp;</div>
                    <div class="plan-item-text">报名：2016.4.8－2016.5.21</div>
                </div>
                <div class="plan-item plan-item-2">
                    <div class="plan-item-icon">&nbsp;</div>
                    <div class="plan-item-text">初赛：2016.4.8－2016.5.21</div>
                </div>
                <div class="plan-item plan-item-3">
                    <div class="plan-item-icon">&nbsp;</div>
                    <div class="plan-item-text">复赛：2016.5.28－2016.6.30</div>
                </div>
                <div class="plan-item plan-item-4">
                    <div class="plan-item-icon">&nbsp;</div>
                    <div class="plan-item-text">决赛：2016.8.18－2016.8.27</div>
                </div>
            </div>
        </div>
    </div>
    <div class="logo">
        <div class="title">支持单位</div>
        <div class="logo-list">
            <img style="height:33px;width:124px;" data-src="{{$static_origin}}/src/page/activity/ce_contest/home/img/logo/EUK-logo.jpg">
        </div>
        <div class="title">主办单位</div>
        <div class="logo-list">
            <img src="{{$static_origin}}/src/page/activity/ce_contest/home/img/logo/logo.png">
        </div>
        <div class="title">协助单位</div>
        <div class="logo-list">
            <img style="width:133px;height:43px;" class="land" data-src="{{$static_origin}}/src/page/activity/ce_contest/home/img/logo/first-UK.png">
        </div>
        <div class="title">媒体单位</div>
        <div class="logo-list">
            <img data-src="{{$static_origin}}/src/page/activity/ce_contest/home/img/logo/assist-1.jpg">
            <img data-src="{{$static_origin}}/src/page/activity/ce_contest/home/img/logo/assist-2.jpg">
            <img data-src="{{$static_origin}}/src/page/activity/ce_contest/home/img/logo/assist-3.jpg">
            <img data-src="{{$static_origin}}/src/page/activity/ce_contest/home/img/logo/assist-4.jpg">
            <img data-src="{{$static_origin}}/src/page/activity/ce_contest/home/img/logo/assist-5.jpg">
            <img data-src="{{$static_origin}}/src/page/activity/ce_contest/home/img/logo/assist-6.jpg">
            <img data-src="{{$static_origin}}/src/page/activity/ce_contest/home/img/logo/assist-7.jpg">
            <img data-src="{{$static_origin}}/src/page/activity/ce_contest/home/img/logo/assist-8.jpg">
        </div>
        <div class="title">特别支持</div>
        <div class="logo-list">
            <img data-src="{{$static_origin}}/src/page/activity/ce_contest/home/img/logo/s-1.jpg">
            <img style="width:144px;height:44px;" data-src="{{$static_origin}}/src/page/activity/ce_contest/home/img/logo/s-2.jpg">
        </div>
    </div>
{{/block}}
