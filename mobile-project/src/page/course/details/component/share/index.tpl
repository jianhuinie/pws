{{*分享*}}
<div class="share">
    <div class="app-qrCode">
        <ul>
            <li class="list-share li-friends">
                <div class="friends">
                    <img width="14" height="14"
                         src="https://img.genshuixue.com/0cms/d/file/content/2015/11/564b26ad93caf.png" alt=""/>
                    朋友圈
                </div>
            </li>
            <li class="list-share li-weixin">
                <div class="weixin">
                    <i class="icon icon-wechat"></i>微信
                </div>
            </li>
            <li class="list-share li-qrcode">
                <div class="qrcode">
                    <i class="icon icon-qrcode"></i>
                    二维码
                </div>
            </li>
        </ul>
        <div class="tip">
            {{if $courseInfo.lesson_way == 2}}
                分享给伙伴，一起学习更有趣
            {{elseif $courseInfo.lesson_way == 4}}
                分享给伙伴，一起学习不孤单
            {{/if}}
        </div>
        <div class="course-id">课程ID:{{$courseInfo.number}}</div>
    </div>
    <div class="m-qrcode-share">
        <div class="m-qrcode">
            <i class="icon icon-qrcode"></i>二维码
        </div>
        <div class="course-id">课程ID:{{$courseInfo.number}}</div>
    </div>
</div>

<div class="qrcode-container">
    <div class="QRmask">
    </div>
    <div class="front">
        <i class="icon icon-close cancel"></i>

        <div class="label-group">
            <label>课程名称：</label>

            <p>{{$courseInfo.name}}</p>
        </div>
        <div id="qrcode">
        </div>
        <p class="hint">可通过扫描二维码打开课程详情页</p>
    </div>
</div>

{{* 预约试听弹框 *}}
<div class="try-container">
    <div class="mask"></div>
    <div class="front">
        <h3>预约试听</h3>
        {{if $tpl_data.trial_course_info.status == 4}}
        <p>您之前已经发起预约，但未支付成功</p>

        <p>是否马上去完成支付？</p>
        {{elseif $tpl_data.trial_course_info.status == 2 || $tpl_data.trial_course_info.status == 1}}
        <p>您已经成功预约试听，无需重复预约</p>

        <p>请前往订单页面查看详情</p>
        {{/if}}
        <div class="btn">
            <div class="cancel-pay">
                取消
            </div>
            {{if $tpl_data.trial_course_info.status == 4}}
            <div class="pay">
                    立即支付
            </div>
            {{elseif $tpl_data.trial_course_info.status == 2 || $tpl_data.trial_course_info.status == 1}}
            <div class="pay">
                <a href="/student_center/order_detail?purchase_id={{$tpl_data.trial_course_info.data.purchase_id}}">
                    查看详情</a>
            </div>
            {{/if}}
        </div>
    </div>
</div>

{{* 微信分享页面遮罩层 *}}
<div class="share-mask">
    <div class="content">
        <img width="100%" height="100%" src="https://img.genshuixue.com/0cms/d/file/content/2016/01/56a87d1c87cf3.png"/>
    </div>
</div>
