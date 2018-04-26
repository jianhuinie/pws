{{*
@file 平台保障
@author hanzhaohang
*}}

<div class="security-block" data-url="http://m.genshuixue.com/feed_back/protection">
    <div class="security-title" data-url="http://m.genshuixue.com/feed_back/protection">平台保障</div>
    <ul class="security-p">
        <li>
            <p class="icon">
                <span class="safe"></span>
            </p>
            <p>资金安全</p>
        </li>

        {{if $courseInfo.retire_flag == 0}}
        <li>
            <p class="icon">
                <span class="tuikuan"></span>
            </p>
            <p>随时可退</p>
        </li>
        {{/if}}
        <li>
            <p class="icon">
                <span class="haoke"></span>
            </p>
            <p>真实评价</p>
        </li>

        <li>
            <p class="icon">
                <span class="renzheng"></span>
            </p>
            <p>实名认证</p>
        </li>
    </ul>

    {{if $ext_data.is_app || $ext_data.is_tapp}}
        <div class="tips">如发现老师违规行为请前往“我的－帮助与意见反馈”举报</div>
    {{/if}}
</div>
