define("userCenter/teacherCenter/dataCenter/transactionData/vipchange_html", [], function () { return '<div class="exchange-tab"><span data-index="exchange-weeks" class="exchange-times active" on-click="changeTrans(event)" style="border-right: none;margin-right: -5px;">最近2周</span><span data-index="exchange-sums" class="exchange-times" on-click="changeTrans(event)" >累计</span></div><div class="exchange-data"><div class="exchange-weeks exchange-data-item"><div class="weeks-num"><div class="number">浏览量<br/><span>{{weeks.vistor_num}}</span></div><div class="percent {{#if vistor_rate > 0 }} active up {{else}}down {{/if}}">{{ getNumber(weeks.vistor_rate) }}<i class="icon"></i></div><div class="img-descript"><div class="descripts"><i class="visit icon"></i>访客</div></div></div><div class="weeks-rate"> <i class="line"></i><div class="rate">{{weeks.rate}}%<br/>支付转化率</div> </div><div class="weeks-order"><div class="number">下单数<br/><span>{{weeks.order_num}}</span></div><div class="percent {{#if weeks.order_num_rate > 0 }} active up {{else}}down {{/if}}">{{ getNumber(weeks.order_num_rate) }}<i class="icon"></i></div><div class="number">下单金额<br/><span>{{weeks.order_money}}</span></div><div class="percent {{#if weeks.order_money_rate > 0 }} active up {{else}}down {{/if}}">{{ getNumber(weeks.order_money_rate) }}<i class="icon"></i></div><div class="img-descript"><div class="descripts"><i class="order icon"></i>下单</div></div></div><div class="weeks-pay"><div class="number">支付数<br/><span>{{weeks.pay_num}}</span></div><div class="percent {{#if weeks.pay_num_order > 0 }} active up {{else}}down {{/if}}">{{ getNumber(weeks.pay_num_order) }}<i class="icon"></i></div><div class="number">支付金额<br/><span>{{weeks.pay_money}}</span></div><div class="percent {{#if weeks.pay_money_rate > 0 }} active up {{else}}down {{/if}}">{{ getNumber(weeks.pay_money_rate) }}<i class="icon"></i></div><div class="img-descript"><div class="descripts"><i class="pay icon"></i>支付</div></div></div></div><div class="exchange-sums exchange-data-item"><div class="weeks-num"><div class="number">浏览量<br/><span>{{history.vistor}}</span></div><div class="percent"></div><div class="img-descript"><div class="descripts"><i class="visit icon"></i>访客</div></div></div><div class="weeks-rate"> <i class="line"></i><div class="rate">{{history.rate}}%<br/>支付转化率</div> </div><div class="weeks-order"><div class="number">下单数<br/><span>{{history.order_num}}</span></div><div class="percent"></div><div class="number">下单金额<br/><span>{{history.order_money}}</span></div><div class="percent"></div><div class="img-descript"><div class="descripts"><i class="order icon"></i>下单</div></div></div><div class="weeks-pay"><div class="number">支付数<br/><span>{{history.pay_num}}</span></div><div class="percent"></div><div class="number">支付金额<br/><span>{{history.pay_money}}</span></div><div class="percent"></div><div class="img-descript"><div class="descripts"><i class="pay icon"></i>支付</div></div></div></div></div><div class="exchange-style"><div class="title">怎样提高转化？</div><p>1.获得更多的页面浏览量</p><p>2.增加页面的丰富度，或者主动去回复转化潜在生源</p><p>3.维护好目前的学生，增加转介绍和扩课</p></div>'});