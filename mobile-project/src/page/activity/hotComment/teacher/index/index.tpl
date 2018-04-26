{{*
    @file 热门评价老师榜
    @author nanci
    @date 2016-12-20
*}}

{{extends file="page/_base/base.tpl"}}

{{block name="page"}}

    {{$page_title = "热门评价老师榜"}}
    {{$page_module = "page/activity/hotComment/teacher/index/index"}}
    {{$enable_backTopButton = false}}
    {{$script_data = $tpl_data}}

{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/hotComment/teacher/index/index.styl"/>
{{/block}}

{{block name="content"}}

<a href="{{$tpl_data.list_url}}" class="banner-link db">
    <img data-src="./img/banner-index1.png" alt="" class="img">
</a>
<div class="how-comment-works">
    <div class="block-para">
        <div class="flag"></div>
        <p class="text">学生评价已经成为很多老师非常重要的一个展示内容，其所占篇幅甚至超过老师或者课程本身的描述。</p>
    </div>
    <div class="block-para">
        <div class="flag"></div>
        <p class="text">老师收到学生的评价，不但可以让老师可以在一定程度上更有针对性地改善教学中的薄弱环节，还会对学生的购买行为有很大程度的影响哦！</p>
    </div>
    <div class="block-para">
        <div class="flag"></div>
        <p class="text">积累学生评价对老师来说是巨大的财富，不仅可以提高成单率，还可以吸引流量，更可以提高老师的人气。因此学生评价越积极，说明老师积累的口碑越好，品牌形象也越好。</p>
    </div>
    <a href="{{$tpl_data.college_url}}" class="more-secrets db tac">发现更多招生秘籍</a>
</div>
{{/block}}