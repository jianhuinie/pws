{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "短信中心常见问题"}}

    {{$enable_backTopButton = false}}
{{/block}}
{{block name="data"}}{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/statistics/about/css/index.styl"/>
{{/block}}

{{block name="content"}}
    <h2>短信中心常见问题</h2>
    <p class="title">1：如何购买短信？</p>
    <p class="content">
        在短信中心页面点击充值按钮后，输入您需要购买的短信数量，点击支付即可购买短信，支付成功后短信数量会实时增加。

        <div class="img"><img src="{{$static_origin}}/src/page/activity/statistics/about/imgs/about.png" /></div>
    </p>

    <p class="title">2：短信充值后如何使用？</p>
    <p class="content">短信充值业务暂时只开放了上课提醒功能，当您充值成功并打开短信通知开关后，所有购买您课程（视频课除外）的学生，在每节课前都会受到上课提醒短信，线上课程提前半小时发送，线下课程提前一小时发送。</p>

    <p class="title">3：短信扣费逻辑是怎么样的？</p>
    <p class="content">现在已经开通的上课提醒功能，会按照发送的人数扣除相应的短信数。因学生退订或运营商网络原因发送失败的不会扣。</p>
    <p class="title"> 4：短信充值后除了上课提醒是否可以发送其它短信？</p>
    <p class="content">我们将在后续会为您提供更多的短信增值营销服务，请持续关注我们的升级通知。</p>
    <p class="title">5：短信充值后是否可以退费？</p>
    <p class="content">短信充值成功后无法退费。请根据自己的课程及学生数量，按需购买。</p>
    <p class="title">6：为什么我购买了短信后，仍有学生无法收到提醒？</p>
    <p class="content">短信发送需要经过运营商审核，有些学生因为选择了拒收通知短信，会出现短信无法到达的情况。对于未成功发送的用户，我们不会扣除您的短信条数，请您放心。</p>
{{/block}}
