{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{if $tpl_data.type == 1}}
        {{$page_title = "艺术体育热门名师"}}
    {{elseif $tpl_data.type == 2}}
        {{$page_title= "托福雅思赛达必过"}}
    {{else}}
        {{$page_title= "中小学提分神器"}}
    {{/if}}
    {{$page_module = "page/activity/chengduSem/sem"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/chengduSem/sem.styl"/>
{{/block}}

{{block name="content"}}
    <div class="nav-bar">
        {{if $tpl_data.type == 1}}
            <img class="img-banner" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/05/5733044466adf.jpg">
        {{elseif $tpl_data.type == 2}}
            <img class="img-banner" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/05/573304449e57a.jpg">
        {{else}}
            <img class="img-banner" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/05/57330444c7184.jpg">
        {{/if}}

    </div>
    <div class="tel-phone">
        <a class="phone-cli"><img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/05/5735c03160b19.png"></a>
    </div>
    <ul class="list">
        {{foreach $tpl_data.user_infos as $item}}
            <li>
                <div class="list-container">
                    {{if $item.type==1}}
                    <a class="li-container-item" href="http://{{$item.url}}?source=recommend_sem_chengdu">
                    {{else}}
                    <a class="li-container-item" href="{{$item.url}}?source=recommend_sem_chengdu">
                    {{/if}}
                    {{if $item.type==0}}
                        <div class="single-title">
                            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/05/57307f047d23b.png" />
                        </div>
                    {{else}}
                        <div class="single-title-2">
                            <img src="{{$static_origin}}/src/page/activity/chengduSem/image/left_single_title.png" />
                        </div>
                    {{/if}}

                        <img data-src="{{$item.avatar}}" class="item-avatar"/>
                        <div class="first-item-nav">
                            <span>{{$item.name}}</span>
                            <span>{{$item.subject}}</span>
                        </div>
                        <div class="second-item-nav">
                            {{$item.intro = $item.intro1|cn_truncate:24}}
                            <p>{{$item.intro}}</p>
                        </div>
                    </a>
                    <a class="item-sendSMS" href='' type='{{$item.type}}' name='{{$item.name}}' text='{{$item.text}}'>
                        <p>{{$item.text|truncate:24}}</p>
                    </a>
                </div>
            </li>
        {{/foreach}}
    </ul>
    <div class="bottom-nav" >
        <a class="bottom-call">
            <img class="free-contact" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/05/57307f04d0502.png"/>
        </a>
        <a class="free-ziliao" href='' type='{{$tpl_data.type}}'>
            <img class="free-ziliao-sms" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/05/57307f050c8e2.png"/>
        </a>
    </div>
{{/block}}
