{{if $grade=='gaozhong'}}
    <div class="gaokao-lesson bottom">
        <div class="start-title">
            <span class="icon-star_all block-line">
                <span class="line"></span>
                <span class="line line-sub"></span>
            </span>
            <div class="title">高考志愿填报</div>
            <span class="icon-star_all block-line block-line-right">
                <span class="line"></span>
                <span class="line line-sub"></span>
            </span>
            <div class="start-title-sub">
                科学填志愿，高考更成功
            </div>
        </div>
        <ul class="first-wrap clearfix">
            <a href="http://m.genshuixue.com/i-gaokao/school" class="logClick" data-ctype="1" data-cname="k12_choicecollege">
                <li class="item">
                    <img src="{{$static_origin}}/src/page/course/k12_search/img/ic_search_yuanxiao.png">
                    <p class="gaokao-title">查个院校</p>
                    <p class="gaokao-text">各大院校信息</p>
                </li>
            </a>
            <a href="http://m.genshuixue.com/i-gaokao/major_relate" class="logClick" data-ctype="2" data-cname="k12_choicecollege">
                <li class="item line">
                    <img src="{{$static_origin}}/src/page/course/k12_search/img/ic_search_zhuanye.png" >
                    <p class="gaokao-title">查院校专业</p>
                    <p class="gaokao-text">各大院校专业查询</p>
                </li>
            </a>
            <a href="http://www.chaojizhiyuan.com/wap/pici/query.html" class="logClick" data-ctype="3" data-cname="k12_choicecollege">
                <li class="item">
                    <img src="{{$static_origin}}/src/page/course/k12_search/img/ic_search_fenshuxian.png">
                    <p class="gaokao-title">查批次线</p>
                    <p class="gaokao-text">各省录取批次线</p>
                </li>
            </a>
        </ul>
        <a class="logClick" data-ctype="4" data-cname="k12_choicecollege" href="http://m.chaojizhiyuan.com/paper/index.html?zn=gkzy">
            <div class="second-wrap clearfix">
                <img src="{{$static_origin}}/src/page/course/k12_search/img/ic_search_ceshi.png"  class="img-ceshi">
                <div class="ceshi-box">
                    <p class="ceshi-title">专业性格测试</p>
                    <img src="{{$static_origin}}/src/page/course/k12_search/img/hot-icon.png"  class="hot-icon">
                    <p class="ceshi-text">快速了解自己的性格定位</p>
                </div>
                <p class="next-icon">></p>
            </div>
        </a>
        <a href="/gaokao" class="logClick" data-ctype="5" data-cname="k12_choicecollege">
            <p class="has-more">更多高考志愿填报信息></p>
        </a>
    </div>
{{/if}}