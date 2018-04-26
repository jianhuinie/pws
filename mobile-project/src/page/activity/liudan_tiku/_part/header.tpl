<div class="liudan-header">
    <div class="header-header">
        <img data-src="{{$static_origin}}/src/page/activity/liudan_tiku/img/header.jpg"
             class="header-back">
        <div class="header-box">
            <p class="title">名师1对1辅导</p>
            <p class="little-title">个性化学习方案</p>
            <p class="content">60万认证好老师</p>
            <p class="content">8000万家长信赖</p>
            <p class="content">400+城市覆盖</p>
            <p class="teacher">小学奥数老师</p>
            <p class="teacher-info">田老师</p>
        </div>
    </div>

    <div class="input-container">
        <p class="title center">寻找自己的1对1老师</p>
        <p class="little-title center">（小学、初中、高中、艺体、留学1对1）</p>
        <form id="form" class="liudan-form">
            <div class="input-box">
                <div class="input-border name-border">
                    <input class="name" type="text" name="name"
                       required="required"
                       maxlength="20" placeholder="请输入您的姓名">
                </div>
                <div class="subject-box input-border">
                    <input class="subject" type="text" name="subject-search"
                           required="required"
                           maxlength="20" placeholder="请输入想学的年级和科目">
                    <ul class="search-suggestion" data-type="liudan" style="display: none;">
                        <li>VC</li>
                        <li>数学</li>
                        <li>Vinogradova</li>
                        <li>Vivian</li>
                        <li>Viviane V KENGNECHANSEU</li>
                        <li>VOLODYMYR SHEVCHUK</li>
                        <li>Valizada Ali</li>
                        <li>vishnu prasad</li>
                        <li>VUONG THU THANH</li>
                        <li>VANACORE ANTHONY P</li>
                    </ul>
                </div>

            </div>
            <div class="input-box input-border">
                <input class="number" type="number" name="number"
                       required="required" maxlength="15" placeholder="请输入您的手机号码">
            </div>
            <div
                class="submit center analysis-habo-log"
                 data-habo-type="1"
                 data-habo-stype="tikuxs"
                 data-habo-params="source:{{if isset($smarty.get.source)}}{{$smarty.get.source}}{{/if}}|dom: mobile=.liudan-header .input-container .number"
            >
                快速预约
            </div>
        </form>
    </div>
</div>