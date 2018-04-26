{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "学分规则"}}
    {{$page_module = "page/activity/statistics/jifenShop/student/index"}}

    {{$enable_backTopButton = true}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/statistics/jifenShop/teacher/index.styl"/>
{{/block}}

{{block name="content"}}

    {{include file="page/_common/nav_bar/nav_bar.tpl" text="学分规则"}}

    <ul class="nav-first clearfix">
        <li class="tab-item on">如何获得</li>
        <li class="tab-item">如何使用</li>
        <li class="tab-item">扣减规则</li>
    </ul>
    <div class="text-box">
        <p class="text-title">什么是学分</p>
        <p>学分是跟谁学用户在完成一些行为后获得的奖励分，用户可以用学分进行买课、提问、在商城兑换超值礼品等</p>
        <p class="last-text text-red">注：同一账号下学生身份的积分和老师身份的积分不可互通</p>

        <p class="text-title">完成新手任务</p>
        <p>对于入驻跟谁学的用户，完成一些新手任务可以获得积分，新手任务积分每人只能获得一次：</p>
        <p>1、上传至少4张照片可获得10分；</p>
        <p>2、上传至少一个风采视频，可获得10分；</p>
        <p>3、上传语音留言，可获得10分；</p>
        <p class="last-text">新手任务获得的学分需要在我的-学分商城-我的学分页面进行领取。</p>

        <p class="text-title">签到获得学分</p>
        <p>在PC或APP上每日签到均可获得学分，连续签到可以获得更多积分，如中间漏签，则需要重新开始计算，具体规则如下：</p>
        <table border="1" class="text-table">
            <tr>
                <td>连续签到</td>
                <td>获得分值</td>
            </tr>
            <tr>
                <td>第1天</td>
                <td>5分</td>
            </tr>
            <tr>
                <td>第2-6天</td>
                <td>10分</td>
            </tr>
            <tr>
                <td>第7-13天</td>
                <td>15分</td>
            </tr>
            <tr>
                <td>第14-20天</td>
                <td>25分</td>
            </tr>
            <tr>
                <td>第21天及以后</td>
                <td>30分</td>
            </tr>
        </table>

        <p class="text-title">问答问题获得学分</p>
        <table border="1" class="text-table">
            <tr>
                <td>行为</td>
                <td>获得分值</td>
                <td>限制</td>
            </tr>
            <tr>
                <td>设置问答科目</td>
                <td>20分</td>
                <td>一次</td>
            </tr>
            <tr>
                <td>回答问题</td>
                <td>10分/题</td>
                <td>10题/天</td>
            </tr>
            <tr>
                <td>回答悬赏问题被采纳</td>
                <td>悬赏分值</td>
                <td>无</td>
            </tr>
        </table>

        <p>1、在我-设置中设置问答科目，即可获得20分，每人最多奖励一次；</p>
        <p>2、每天回答的前10个问题，每题奖励10分；</p>
        <p class="last-text">3、回答悬赏问题被采纳，则可获得对应的悬赏分；</p>

        <p class="text-title">开通会员获得奖励</p>
        <p class="last-text">购买会员的老师，可获得该档会员对应的学分奖励，奖励学分数值为该档会员价格数值，如再升级会员，则再奖励差额学分。</p>

        <!-- <p class="text-title">佣金返学分</p>
        <p class="last-text">与跟谁学签约的老师，会按交易中实际佣金金额返学分，学分数值为实际佣金金额，学分在课程结束后一次性奖励。</p> -->
    </div>

    <div class="text-box hide">
        <p class="text-title">兑换到课短信</p>
        <p class="last-text">可在商城中按照商品价格兑换到课短信，兑换完成后短信数额相应增加，兑换限制见商城该商品说明。</p>

        <p class="text-title">兑换会员模板</p>
        <p class="last-text">可在商城中兑换会员、高级会员、超级会员的模板使用权，有效期一个月，兑换后即可使用该档会员对应的模板，有效期过后需要开通会员才能使用。</p>

        <p class="text-title">兑换跟谁学广告资源</p>
        <p class="last-text">可在商城中兑换跟谁学的广告资源，各种广告资源不定期开放，请老师时常关注哦，广告资源有一定兑换门槛，请兑换前仔细阅读兑换规则哦。</p>

        <p class="text-title">商城内商品</p>
        <p>在学分商城内可兑换各种超值好礼，学分兑换后不能退回</p>
        <p class="last-text text-red">注：实物礼品发货请耐心等待哦</p>
    </div>

    <div class="text-box hide">
        <p class="text-title">违约行为</p>
        <p>如您违反与跟谁学的如下约定，跟谁学会扣除相应学分：</p>
        <ul>1、问答社区中，问答被审核标记为无效回答，包括但不仅限于下述情况视为无效问题：
            <li>1) 回答与题目无关</li>
            <li>2) 广告等信息</li>
            <li>3) 涉黄涉政等违规信息 </li>
            <li>4) 随便乱写的</li>
        </ul>

        <p class="text-title">过期策略</p>
        <p class="last-text">当年获得的学分会在次年年底过期，即今年1月1日-12月31日获得积分都将在第二年12月31日24点过期，优先消耗最早获得的积分。</p>

        <p class="text-title">注意事项</p>
        <p>1、跟谁学兑换或抽奖的礼品以跟谁学平台上的资料为准，如遇不可抗力因素，跟谁学保留更换其他等值奖项的权利。</p>
        <p>2、学分兑换的所有实物礼品寄送地区仅限中国大陆，跟谁学不处理邮寄礼品至海外地区之事宜。</p>
        <p>3、跟谁学保留对活动进行变动和调整的权利，具体情形以跟谁学官方活动页面上文案标书为准。</p>
        <p>4、实物礼品兑换或抽奖成功后，请尽快提供真实有效的收货地址，以便跟谁学完成后续邮寄事宜。</p>
        <p>5、其他未尽事宜，跟谁学拥有最终解释权。</p>
        <p class="last-text">6、对于存在学分刷取、恶意兑换等不良行为的账号及其相关联的账号，以及已被冻结的账号及其相关联的账号，跟谁学有权对其做扣除学分处理，最终解释权归跟谁学所有。</p>
    </div>
{{/block}}
