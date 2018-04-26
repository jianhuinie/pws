{{*
    @file 新年第一课活动
    @author yuanye
    @date 2017-02-13
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "开学第一课"}}

    {{$page_module = "page/activity/firstClass/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/firstClass/index.styl"/>
{{/block}}

{{block name="content"}}
    {{include file="page/_common/nav_bar/nav_bar.tpl" text="开学第一课" }}
    <div class="alert-container">
        <div class="content">
            <p class="title">开课六步曲:</p>
            <p class="info-main">打开跟谁学老师版APP -<strong>【课程管理】</strong>- 点击<strong>【开课】</strong>- 开设<strong>直播课</strong> - 编辑课程信息-成功发布</p>
            <p class="info-bottom">三分钟轻松参与“开学第一课”，开课成功享好礼，更有学生端广告宣传机会等你来使用！</p>
        </div>
        <div class="btn-container">
            <div class="btn">知道了</div>
        </div>
    </div>
    <header class="img-container">
        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/02/58a177c88eb1d.jpg">
        <p class="top-title">新学期 新开始</p>
        <p class="middle-title">相约开课就差你</p>
        <button class="get-start">立即开课</button>
    </header>
    <ul class="nav">
        <li class="recommend" data-url="{{$tpl_data.hot_recommend_url}}">人气推荐专区</li>
        <li class="cheats" data-url="{{$tpl_data.open_method_url}}">爆款课程开课秘笈</li>
    </ul>
    <div class="main">
        <section class="intro">
            <h2 class="title">活动介绍</h2>
            <ol class="list">
                <li>活动时间：2017.02.01—2017.03.15</li>
                <li>参与活动对象：所有老师</li>
                <li>活动期间开设的课程均在评奖范围内;</li>
                <li>如果老师活动期间遭到学生投诉，则取消参与本次活动资格;</li>
                <li>每日选取包装精美、内容丰富、学生喜爱的课程入选人气推荐专区以及今日推荐专区，并展示在学生端，各位老师抓紧机会赶紧开课吧！</li>
                <li>本活动最终解释权归跟谁学所有，如有任何疑问可添加工作人员(cc472656978)微信。</li>
            </ol>
        </section>
        <section class="prize">
            <h2 class="title">奖项设置</h2>
            <ul class="prize-list">
                <li class="xueshi">
                    <div class="left">
                        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/02/58a11eab91650.png" class="left-img">
                    </div>
                    <div class="right">
                        <p class="prize-title">跟谁学大学士</p>
                        <p class="prize-info">授予荣誉证书及荣誉称号</p>
                        <p class="prize-info">2000条平台短信</p>
                    </div>
                    <span class="condition">活动期间开设直播课累计招生人数达到500人</span>
                </li>
                <li class="hanlin">
                    <div class="left">
                        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/02/58a11eab60290.png" class="left-img">
                    </div>
                    <div class="right">
                        <p class="prize-title">跟谁学翰林</p>
                        <p class="prize-info">授予荣誉证书及荣誉称号</p>
                        <p class="prize-info">1000条平台短信</p>
                    </div>
                    <span class="condition">活动期间开设直播课累计招生人数达到300人</span>
                </li>
                <li class="jinshi">
                    <div class="left">
                        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/02/58a11eab3f0cc.png" class="left-img">
                    </div>
                    <div class="right">
                        <p class="prize-title">跟谁学进士</p>
                        <p class="prize-info">授予荣誉证书及荣誉称号</p>
                        <p class="prize-info">500条平台短信</p>
                    </div>
                    <span class="condition">活动期间开设直播课累计招生人数达到200人</span>
                </li>
                <li class="juren">
                    <div class="left">
                        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/02/58a11eab1da5d.png" class="left-img">
                    </div>
                    <div class="right">
                        <p class="prize-title">跟谁学举人</p>
                        <p class="prize-info">授予荣誉证书及荣誉称号</p>
                        <p class="prize-info">200条平台短信</p>
                    </div>
                    <!-- 防止下面出现乱码,原因不明... -->
                    <span class="condition">活动期间开设直播课累计招生人数达到100人</span>
                </li>
                <li class="xiucai">
                    <div class="left">
                        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/02/58a11eaadfeaf.png" class="left-img">
                    </div>
                    <div class="right">
                        <p class="prize-title">跟谁学秀才</p>
                        <p class="prize-info">授予荣誉证书及荣誉称号</p>
                    </div>
                    <span class="condition">活动期间开设直播课累计招生人数达到3人</span>
                </li>
            </ul>
        </section>
        <section class="step">
            <h2 class="title">兑奖步骤</h2>
            <ol class="list">
                <li>点击右上角分享本活动页面至微信朋友圈</li>
                <li>微信点击本活动页面，长按页面下方二维码识别关注【跟谁学老师版】公众号</li>
                <li>在【跟谁学老师版】公众号中回复“开课”即可了解活动详情并掌握活动第一手资料，活动获奖名单以及兑奖方式也会第一时间公布在公众号里</li>
            </ol>
            <div class="QR-code-container">
                <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/02/58a11e93ecaad.jpg" class="qr-code">
            </div>
            <p class="concern">关注【跟谁学老师版】公众号，掌握活动最新动态</p>
        </section>
        
    </div>

{{/block}}