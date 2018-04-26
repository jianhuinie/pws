<div class="footer-container">
    <img class="footer-back" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/03/58b9133e63c1d.jpg">
    <div class="back-box">
        <p class="small-title center">全球好老师数量遥遥领先的</p>
        <p class="title center">找好老师学习服务平台</p>
        <div class="number-box">
            <div class="box">
                <p class="number center">{{$tpl_data.teacher}}</p>
                <p class="exp center">认证老师</p>
            </div>
            <div class="box">
                <p class="number center">{{$tpl_data.user}}</p>
                <p class="exp center">用户</p>
            </div>
            <div class="box">
                <p class="number center">{{$tpl_data.city}}</p>
                <p class="exp center">城市</p>
            </div>
        </div>
    </div>
    <div class="footer no-fixed">
        <div class="consult center analysis-habo-log"
             data-tel="4000910910"
             data-habo-type="2"
             data-habo-stype="tikuxs"
             data-habo-params="source:{{if isset($smarty.get.source)}}{{$smarty.get.source}}{{/if}}">
            <p>
                <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/02/58b5248c1b860.png" alt="">
                <span>免费咨询</span>
            </p>
        </div>
        <a tag="#0" class="free" href="javascript:go('#0');">
            <div class="free center">
                立即预约试听课
            </div>
        </a>
    </div>
</div>