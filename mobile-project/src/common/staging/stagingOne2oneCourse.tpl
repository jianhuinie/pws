 <div class="one2one-staging">
 <div class="text">花呗分期</div>
 {{foreach stagingData as $item index}}
     <div class="item" data-periods="{{$item.periods}}" data-price="{{$item.every_periods_repayment}}">
         <div class="first-nav">￥{{$item.every_periods_repayment}}x{{$item.periods}}期</div>
         <div class="fee">(含手续费)</div>
     </div>
 {{/foreach}}
 </div>