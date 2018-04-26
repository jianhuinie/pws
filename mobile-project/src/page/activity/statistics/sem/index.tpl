{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = $tpl_data.title}}
    {{$page_module = "page/activity/statistics/sem/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/statistics/sem/index.styl"/>
{{/block}}

{{block name="content"}}
    <div class="nav-bar">
        <img class="img-banner" src="{{$tpl_data.banner}}">
    </div>
    <ul class="list">
        {{foreach $tpl_data.user_infos as $item}}
            <li>
                <div class="list-container">
                    <a class="li-container-item" href="{{$item.url}}?source=recommend_sem_chengdu">
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
                            {{$item.name = $item.name|cn_truncate:10}}
                            <span>{{$item.name}}</span>
                            <span>{{$item.subject}}</span>
                        </div>
                        <div class="second-item-nav">
                            {{$item.intro = $item.intro1|cn_truncate:24}}
                            <p>{{$item.intro}}</p>
                        </div>
                    </a>
                    <a class="item-sendSMS" target="_blank" href='{{$tpl_data.qq_url}}'>
                        <p>{{$item.text|cn_truncate:8}}</p>
                    </a>
                </div>
            </li>
        {{/foreach}}
    </ul>
    <div class="bottom-nav" >
        <a  href="{{$tpl_data.qq_url}}" target="_blank">
            <img class="free-contact" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/05/57456aceded52.png"/>
        </a>
        <a class="free-ziliao" target="_blank" href='{{$tpl_data.qq_url}}'>
            <img class="free-ziliao-sms" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/05/57307f050c8e2.png">
        </a>
    </div>
{{/block}}
