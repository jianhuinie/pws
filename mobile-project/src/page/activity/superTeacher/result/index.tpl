{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_title = "跟谁学杯互联网风云老师视频大赛获奖榜单"}}

    {{$page_module = "page/activity/superTeacher/result/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
<link rel="stylesheet" href="{{$static_origin}}/src/page/activity/superTeacher/result/index.styl">
{{/block}}

{{block name="content"}}
<section class="banner">
    <img data-src="./img/banner.png" alt="" class="img">
</section>
<section class="no1">
    <div class="title tac">
        <img data-src="./img/no1.png" alt="" class="img">
    </div>
    {{$no1 = $tpl_data.first}}
    <div class="content">
        <a href="/activity/superTeacherPersonal?number={{$no1.number}}" class="link">
            <img data-src="./img/no1-avatar.png" alt="" class="avatar tac">
            <div class="name fz18 tac">{{$no1.teacher_name}}</div>
            <div class="wrapper-tac tac">
                <span class="pv">浏览量{{$no1.pv}}</span>
                <span class="seperator"> | </span>
                <span class="stu-no">学生数{{$no1.student_count}}</span>
            </div>
            <div class="prize-comment">
                <div class="title fz18">获奖评语：</div>
                <div class="content fz14">{{$no1.description}}</div>
            </div>
        </a>
    </div>
</section>
<section class="no10">
    <div class="title tac">
        <img data-src="./img/prize2.png" alt="" class="prize">
        <div class="text tac">
            <span class="angle-left"></span>
            <span class="desc fw700 fz18">2016年度十大人气老师</span>
            <span class="angle-right"></span>
        </div>
    </div>
    <div class="content">
        {{foreach $tpl_data.ten as $item0}}
        <a href="/activity/superTeacherPersonal?number={{$item0.number}}" class="tac unit{{if $item0@index%2 eq 0}} unit-left{{/if}}">
            <img data-src="{{$item0.avatar}}" alt="" class="avatar">
            <div class="name text-ellipsis fz16 fw700">{{$item0.teacher_name}}</div>
            <div class="pv">浏览量{{$item0.pv}}</div>
            <div class="stu-no">学生数{{$item0.student_count}}</div>
        </a>
        {{/foreach}}
    </div>
</section>
<section class="creative tac">
    <div class="title">
        <img data-src="./img/prize3.png" alt="" class="prize">
        <div class="text">
            <span class="angle-left angle-left-pink"></span>
            <span class="desc fw700 fz18">最佳创意课堂奖</span>
            <span class="angle-right angle-right-pink"></span>
        </div>
    </div>
    <div class="content">
        {{foreach $tpl_data.course as $item0}}
        <a href="/activity/superTeacherPersonal?number={{$item0.number}}" class="unit{{if $item0@index%2 eq 1}} unit-left{{/if}}{{if $item0@index eq 0}} unit-first tac{{/if}}">
            <img data-src="{{$item0.avatar}}" alt="" class="avatar">
            <div class="name text-ellipsis fz16 fw700">{{$item0.teacher_name}}</div>
            <div class="pv">浏览量{{$item0.pv}}</div>
            <div class="stu-no">学生数{{$item0.student_count}}</div>
        </a>
        {{/foreach}}
    </div>
</section>
<section class="method tac">
    <div class="title">
        <img data-src="./img/prize4.png" alt="" class="prize">
        <div class="text">
            <span class="angle-left"></span>
            <span class="desc fw700 fz18">最佳教学方法奖</span>
            <span class="angle-right"></span>
        </div>
    </div>
    <div class="content">
        {{foreach $tpl_data.teach as $item0}}
        <a href="/activity/superTeacherPersonal?number={{$item0.number}}" class="unit{{if $item0@index%2 eq 1}} unit-left{{/if}}{{if $item0@index eq 0}} unit-first tac{{/if}}">
            <img data-src="{{$item0.avatar}}" alt="" class="avatar">
            <div class="name text-ellipsis fz16 fw700">{{$item0.teacher_name}}</div>
            <div class="pv">浏览量{{$item0.pv}}</div>
            <div class="stu-no">学生数{{$item0.student_count}}</div>
        </a>
        {{/foreach}}
    </div>
</section>
<section class="talent tac">
    <div class="title">
        <img data-src="./img/prize5.png" alt="" class="prize">
        <div class="text">
            <span class="angle-left angle-left-pink"></span>
            <span class="desc fw700 fz18">最佳才艺奖</span>
            <span class="angle-right angle-right-pink"></span>
        </div>
    </div>
    <div class="content">
        {{foreach $tpl_data.art as $item0}}
        <a href="/activity/superTeacherPersonal?number={{$item0.number}}" class="unit{{if $item0@index%2 eq 1}} unit-left{{/if}}{{if $item0@index eq 0}} unit-first tac{{/if}}">
            <img data-src="{{$item0.avatar}}" alt="" class="avatar">
            <div class="name text-ellipsis fz16 fw700">{{$item0.teacher_name}}</div>
            <div class="pv">浏览量{{$item0.pv}}</div>
            <div class="stu-no">学生数{{$item0.student_count}}</div>
        </a>
        {{/foreach}}
    </div>
</section>
<section class="young">
    <div class="title tac">
        <img data-src="./img/prize6.png" alt="" class="prize">
        <div class="text">
            <span class="angle-left"></span>
            <span class="desc fw700 fz18">年度新锐老师奖</span>
            <span class="angle-right"></span>
        </div>
    </div>
    <div class="list-young">
        {{foreach $tpl_data.fifty as $item0}}
        <a href="/activity/superTeacherPersonal?number={{$item0.number}}" class="unit">
            <img data-src="{{$item0.avatar}}" alt="" class="avatar">
            <span class="name text-ellipsis fw700">&nbsp;{{$item0.teacher_name}}&nbsp;</span>
            <span class="pv">浏览量{{$item0.pv}}</span>
            <span class="seperator fz14">&nbsp;|&nbsp;</span>
            <span class="stu-no">学生数{{$item0.student_count}}</span>
        </a>
        {{/foreach}}
        <div class="tip-no-rank tac">——————— 奖项排名不分先后 ———————</div>
    </div>
</section>
<section class="prizes">
    <div class="title title-prizes tac">
        <div class="text">
            <span class="angle-left angle-left-pink"></span>
            <span class="desc fw700 fz18">大赛奖品</span>
            <span class="angle-right angle-right-pink"></span>
        </div>
    </div>
    <div class="content-prizes">
        <div class="unit">
            <img data-src="./img/prize1.png" alt="" class="trophy">
            <h3 class="prize-name fz14">互联网风云老师<span class="num fz20"> 1名</span></h3>
            <p class="desc">大众评审阶段得票数前10名老师，入围互联网教育风云奖。专家评委根据课堂创意、教学方法、才艺展示和互联网教学创新综合评选。</p>
            <p class="specific">颁发荣誉证书及奖杯<br>跟谁学站内全量推广<br>跟谁学合作主流媒体宣传<br>iPhone 7手机一部</p>
        </div>
        <div class="unit">
            <img data-src="./img/prize2.png" alt="" class="trophy">
            <h3 class="prize-name fz14">年度人气老师<span class="num fz20"> 10名</span></h3>
            <p class="desc">大众评审阶段得票数前10名，当选年度人气老师。</p>
            <p class="specific">颁发荣誉证书及奖杯<br>跟谁学站内全量推广<br>跟谁学合作主流媒体宣传<br>iPad一部</p>
        </div>
        <div class="unit">
            <img data-src="./img/prize3.png" alt="" class="trophy">
            <h3 class="prize-name fz14">最佳创意课堂奖<span class="num fz20"> 5名</span></h3>
            <p class="desc">大众评审阶段得票数前100名，入围最佳创意课堂奖，专家团队评选出前5名。</p>
            <p class="specific">颁发荣誉证书及奖杯<br>跟谁学站内全量推广<br>跟谁学合作主流媒体宣传<br>kindle一部</p>
        </div>
        <div class="unit">
            <img data-src="./img/prize4.png" alt="" class="trophy">
            <h3 class="prize-name fz14">最佳教学方法奖<span class="num fz20"> 5名</span></h3>
            <p class="desc">大众评审阶段得票前100名，入围最佳教学方法奖，专家团队评选出前5名。</p>
            <p class="specific">颁发荣誉证书及奖杯<br>跟谁学站内全量推广<br>跟谁学合作主流媒体宣传<br>kindle一部</p>
        </div>
        <div class="unit">
            <img data-src="./img/prize5.png" alt="" class="trophy">
            <h3 class="prize-name fz14">最佳才艺奖<span class="num fz20"> 5名</span></h3>
            <p class="desc">大众评审阶段得票前100名老师，入围最佳才艺奖，专家团队评选出前5名。</p>
            <p class="specific">颁发荣誉证书及奖杯<br>跟谁学站内全量推广<br>跟谁学合作主流媒体宣传<br>kindle一部</p>
        </div>
        <div class="unit">
            <img data-src="./img/prize6.png" alt="" class="trophy">
            <h3 class="prize-name fz14">年度新锐老师奖<span class="num fz20"> 50名</span></h3>
            <p class="desc">单日得票前十名老师，入围年度新锐老师奖，专家团队根据互联网教学创新评选出50名年度新锐老师奖。</p>
            <p class="specific">颁发荣誉证书及奖杯<br>2000条平台短信</p>
        </div>
    </div>
</section>
<section class="intro-rank">
    <div class="btns-wrapper tac">
        <a class="btn fw700 tac fz18 intro" href="/activity/superTeacher#intro">查看大赛介绍</a>
        <a class="btn fw700 tac fz18" href="/activity/superTeacherVote">参赛老师风采</a>
    </div>
</section>
<section class="footer">
    <div class="who">
        <span class="desc">主办方：</span>
        <img data-src="./img/logo.png" width="69" height="30">
    </div>
    <p class="final-right">本活动最终解释权归跟谁学所有</p>
    <p class="copyright">Copyright © 2014 - 2017 北京百家互联科技有限公司版权所有.<br>京公网安备11010802015210号 | 京ICP备14027590号-1</p>
</section>
{{/block}}