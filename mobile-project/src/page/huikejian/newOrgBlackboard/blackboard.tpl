{{*

@file 机构黑板报详情页面
@author peilonghui

*}}

{{extends file="page/_base/base.tpl"}}

{{block name="data"}}
{{$smarty.block.parent}}
{{$script_data.pageData = $tpl_data}}
{{$script_data['share_info'] = []}}
{{$script_data['share_info']['title'] = $tpl_data.board_detail.title|escape}}
{{$script_data['share_info']['content'] = strip_tags($tpl_data.board_detail.content)}}
{{$script_data['share_info']['img'] = $tpl_data.board_detail.img}}
{{$script_data['blackboard_id'] = $tpl_data.board_detail.id}}
{{$script_data['number'] = $tpl_data.base_info.number}}
{{if not empty($tpl_data.base_info.support_tianxiao)}}
{{$script_data.isTianxiaoOrg = $tpl_data.base_info.support_tianxiao}}
{{/if}}
{{if not empty($tpl_data.short_url)}}
{{$script_data['share_info']['shortUrl'] = $tpl_data.short_url}}
{{/if}}
{{$script_data.id = $tpl_data.board_detail.id}}
{{$script_path = './blackboard'}}
{{/block}}


{{block name="title"}}
{{$tpl_data.board_detail.title|escape}}
{{/block}}

{{block name="style"}}
<link rel="stylesheet" href="{{$static_origin}}/src/page/huikejian/newOrgBlackboard/blackboard.styl">
{{/block}}

{{block name="content"}}
{{strip}}
{{$headerData = $tpl_data.base_info}}
{{$boardDetail = $tpl_data.board_detail}}

{{include file="../../_common/image.tpl" url=$boardDetail.img width="300" height="300" class="share-img"}}

{{include file="../../_common/nav_bar/nav_bar.tpl" text=$boardDetail.title|escape}}

<article id="main">
    <header>
        <h2>{{$boardDetail.title|escape}}</h2>
        <p>
            {{$boardDetail.create_time|escape}}
            &nbsp;&nbsp;
            {{$headerData.name|escape}}
        </p>
    </header>
    <div class="body">{{$boardDetail.content}}</div>

    {{* 机构黑板报 2.0 推荐课程 *}}
    {{include file="../detail/loveCourse.tpl"}}

    {{* 机构黑板报 屏蔽进入教室 *}}
    <!--
   <footer>
        <a href="/i/{{$headerData.number|escape}}">进入机构</a>
    </footer>
    -->
    {{* 机构黑板报2.0 底部 *}}
    <div class="footer">
        <span class="eye">阅读 {{$tpl_data.board_detail.read_times}}</span>
        <span class="thump" data-thump="{{$tpl_data.board_detail.liked}}" data-count="{{$tpl_data.board_detail.support_num}}">
            <i class="icon icon-thumbs-up"></i>
            <span class="thump-count">{{$tpl_data.board_detail.support_num}}</span>
        </span>
        <a href="{{$tpl_data.more_url|regex_replace:"/black/":"new_black"}}">点击查看更多</a>
    </div>
</article>
{{/strip}}

{{/block}}
