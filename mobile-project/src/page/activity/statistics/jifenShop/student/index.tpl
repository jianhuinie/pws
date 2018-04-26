{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "学分规则"}}
    {{$page_module = "page/activity/statistics/jifenShop/student/index"}}

    {{$enable_backTopButton = true}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/statistics/jifenShop/student/index.styl"/>
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
        <p>针对刚注册跟谁学的用户，完成一些新手任务可以获得积分，新手任务积分每人只能获得一次：</p>
        <p>1、完善个人资料中的所有信息可获得20分；</p>
        <p>2、在APP 我的-我的身份中选择身份并设置至少一个兴趣，可获得20分；</p>
        <p>3、首次在跟谁学上购买一门付费课程（价格不限）即可获得50分。</p>
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
                <td>第14天及以后</td>
                <td>20分</td>
            </tr>
        </table>

        <p class="text-title">评价课程获得学分</p>
        <p class="last-text">在学习完付费课程7天内完成评价，一次评价可获得10分哦，仅付费课程的首次主动评价可获得学分，系列课程的多次评价不再奖励学分。如过期未评价，则系统的默认评价不奖励学分，修改评价不奖励学分。</p>

        <!-- <p class="text-title">购课获得学分</p>
        <p>购买平台上带有"送学分"标识的课程可获得学分，学分为实际支付金额数值的100%，学分在全部课程结束后发放。</p>
        <p>1、必须是带“送学分”标识的课程</p>
        <p>2、支付金额是指用户实际以余额、银行卡、学币、微信、支付宝等方式实际支付的金额，即1000元的课程，支付了1000元则奖励1000学分，如使用100元优惠券，实际支付了900元，则奖励900学分</p>
        <p class="last-text">3、全部课程结束是指在所有课程学习完成并确认课酬</p> -->


        <p class="text-title">每日分享获得学分</p>
        <p class="last-text">每日成功分享任意一门课程或老师主页，可获得5分，每日最多获得一次奖励，奖励在分享成功后即时发放。</p>

        <p class="text-title">提问获得学分</p>
        <p class="last-text">从2016.7.3日起，提问不再额外赠送学分。</p>
    </div>

    <div class="text-box hide">
        <p class="text-title">提问悬赏</p>
        <p class="last-text">在跟谁学问答功能中，提问时可以设置学分悬赏，来吸引更多老师回答问题，发出悬赏问题后学分即被冻结，问题被回答并采纳答案后，学分被消耗。</p>

        <!-- <p class="text-title">购买课程</p>
        <p>购买平台上带有“支持学分抵学费”的课程，可用学分抵部分学分，具体规则如下：</p>
        <p>1、必须是带有“支持学分抵学费”的课程</p>
        <p>2、最多可抵课程价格的10%，且不能与其他优惠同时使用</p>
        <p>3、使用学分数量必须是1000的整数倍</p>
        <p class="last-text">4、用学分兑换的课程优惠如不使用不退回</p> -->

        <p class="text-title">学分商城</p>
        <p>在学分商城内可兑换各种超值好礼，学分兑换后不能退回</p>
        <p class="last-text text-red">注：实物礼品发货请耐心等待哦</p>
    </div>

    <div class="text-box hide">
        <p class="text-title">违约行为</p>
        <p>如您违反与跟谁学的如下约定，跟谁学会扣除相应学分：</p>
        <ul>1、问答社区中，提出的问题被审核标记为无效问题，包括但不仅限于下述情况视为无效问题：
            <li>1) 图片拍摄特别不清晰的</li>
            <li>2) 图片拍摄不完整的</li>
            <li>3) 选择科目与实际内容不符的</li>
            <li>4) 随便乱写的</li>
        </ul>
        <p class="last-text">2、评价的内容被审核标记为无效评价</p>

        <p class="text-title">过期策略</p>
        <p class="last-text">当年获得的学分会在次年年底过期，即今年1月1日-12月31日获得积分都将在第二年12月31日24点过期，优先消耗最早获得的积分。</p>

        <p class="text-title">注意事项</p>
        <p>1、跟谁学兑换或抽奖的礼品以跟谁学平台上的资料为准，如遇不可抗力因素，跟谁学保留更换其他等值奖项的权利。</p>
        <p>2、学分兑换的所有实物礼品寄送地区仅限中国大陆，跟谁学不处理邮寄礼品至海外地区之事宜。</p>
        <p>3、跟谁学保留对活动进行变动和调整的权利，具体情形以跟谁学官方活动页面上文案标书为准。</p>
        <p>4、实物礼品兑换或抽奖成功后，请尽快提供真实有效的收获地址，以便跟谁学完成后续邮寄事宜。</p>
        <p>5、其他未尽事宜，跟谁学拥有最终解释权。</p>
        <p class="last-text">6、对于存在学分刷取、恶意兑换等不良行为的账号及其相关联的账号，以及已被冻结的账号及其相关联的账号，跟谁学有权对其做扣除学分处理，最终解释权归跟谁学所有。</p>
    </div>
{{/block}}
