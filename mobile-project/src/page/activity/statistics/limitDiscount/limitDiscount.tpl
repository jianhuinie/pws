{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "限额折扣说明"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/statistics/limitDiscount/css/index.styl"/>
{{/block}}

{{block name="content"}}
    <h1 class="title">什么是限额折扣</h1>
    <p>设置限额折扣数量后，最先购买的对应数量学生能够以您设置的优惠价格购买课程；限额折扣是跟谁学会员专享功能。</p>
    <h1 class="title">优惠设置</h1>
    <div class="text-container">
    	<div class="row">
    		<span class="left">限额数量 :</span>
    		<span class="right">是指有多少位学生可以按照折扣价购买课程</span>
    	</div>
    	<div class="row">
    		<span class="left">优惠幅度 :</span>
    		<span class="right">您可以选择“立减”或“折扣”进行优惠设置。
              <br>立减是指直接以金额扣减的方式优惠；
              <br>折扣是指以折扣百分比的方式进行优惠。</span>
    	</div>
    </div>
    <h1 class="title">如何关闭限额折扣设置</h1>
    <p>开启限额折扣后，想要关闭该优惠，进入设置页面点击下方［删除折扣］即可。</p>
    <h1 class="title">学生购买时的使用条件</h1>
    <ul>
    	<li>学生使用限额折扣的优惠方式购买课程时，不可以同时使用优惠券；</li>
    	<li>学生下单后，需要在10分钟内付款，否则订单会被自动取消，并返还优惠名额。</li>
    </ul>
{{/block}}
