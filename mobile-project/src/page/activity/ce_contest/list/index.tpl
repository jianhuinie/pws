{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "投票专区"}}

    {{$page_module = "page/activity/ce_contest/list/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/ce_contest/list/css/index.styl"/>
{{/block}}

{{block name="content"}}
    {{include file="page/_common/nav_bar/nav_bar.tpl" text="投票专区"}}
    <div class="center-list">
        <div class="btn-toolbar">
            <div class="drop-down">
                <div class="drop-down-title" value="0"><span class="drop-down-text">全部分组</span><span class="icon-back drop-down-icon"></span></div>
                <ul class="drop-down-list">
                    <li class="drop-down-item" value="0">全部分组</li>
                    <li class="drop-down-item" value="1">小学组</li>
                    <li class="drop-down-item" value="2">初中组</li>
                    <li class="drop-down-item" value="3">高中组</li>
                    <li class="drop-down-item" value="4">大学组</li>
                </ul>
            </div>
            <div class="search">
                <input class="search-value" placeholder="请输入选手姓名或编号" type="text" />

                <div class="icon-search btn-search"></div>
            </div>

        </div>
        {{if !empty($tpl_data.user_infos)}}
        <ul class="list clearfix">
            {{foreach $tpl_data.user_infos as $item}}
            <li>
                <div class="list-container">
                    {{if !empty($item.rank)}}
                    <div class="list-single">
                        <div class="text">{{$item.rank}}</div>
                    </div>
                    {{/if}}
                    <div class="li-container-item">
                        <a class="list-avatar" href="{{$item.url}}"><img class="img-background" src="{{$item.avatar}}"/></a>
                        <div class="list-info">
                            <div class="list-info-name  line-clamp">{{$item.name}}</div>
                            <div class="list-info-source "><span data-count="{{$item.vote_count}}" class="count">{{$item.vote_count}}</span> 票</div>
                            <div class="list-project line-clamp">
                                才艺：{{$item.talent}}
                            </div>
                        </div>

                        {{if $item.can_vote != true}}
                            <div class="list-btn">已投票</div>
                        {{else}}
                            <div data-number="{{$item.number}}" class="apply list-btn list-btn-active"><span class="icon-heart"></span> 投票</div>
                        {{/if}}
                    </div>
                </div>
            </li>
            {{/foreach}}
        </ul>
            {{if !empty($tpl_data.page_info.has_more)}}
                <div class="list-more">查看更多</div>
            {{/if}}
        {{else}}
            <div class="no-data">暂无参赛列表</div>
        {{/if}}
    </div>
{{/block}}
