define("userCenter/teacherCenter/index/CheckinDialog_html", [], function () { return '<div class="dialog checkin-dialog">{{#if checkinData.today.has_checkin}}<div class="header"><div class="title">签到</div></div><div class="close">×</div><div class="body">{{#checkinData.today}}<div class="someday"><img class="bigExp" src="{{siteSource}}/img/im/expression-{{mood}}.png" /><p class="status"><i class="icon icon-check-circle success"></i>今日签到成功！</p><p class="credit error">学分：+{{integral}}<span class="interval-line">|</span>已签到 {{serial_day}} 天</p><p class="tips">{{#if serial_day < 3 }}继续签到 {{3 - serial_day}} 天获得&lt;活跃老师&gt;勋章<img src="http://img.gsxservice.com/0medal/101.png" alt="活跃老师" />{{else}}你已获得&lt;活跃老师&gt;勋章<img src="http://img.gsxservice.com/0medal/101.png" alt="活跃老师" />{{/if}}</p></div>{{/checkinData.today}}<div class="sign-calendar"></div></div>{{else}}<div class="header"><div class="title">选择签到表情</div></div><div class="close sign-close">×</div><div class="body sign-body"><div id="expression-container" class="expression-container"><div class="expression-panel" >{{#each emotions:value}}<div class="expression-item{{#if emotionValue == value}} lively{{/if}}" on-click="selectEmotion(value)"><img src="{{siteSource}}/img/im/expression-{{value}}.png" alt="{{this}}" /><div class="tip-container"><div>{{this}}</div><div class="back-arrow"></div><div class="front-arrow"></div></div></div>{{/each}}</div></div><div class="group"><div class="controls"><Input options="{{moodInputOptions}}" /><div class="small hint">{{#if 140 - moodInputOptions.value.length >= 0}}还可以输入<strong class="info">{{140 - moodInputOptions.value.length}}</strong>个字{{else}}已超出<strong class="error">{{moodInputOptions.value.length-140}}</strong>个字{{/if}}</div></div></div></div><div class="footer">{{#if noValue}}<span class="error">选择一个签到表情吧！</span>{{elseif tooLong}}<span class="error">请不要输入超过 140 个字！</span>{{/if}}<button class="button info radius" on-click="checkinAction()">签到</button></div>{{/if}}<style>{{style}}</style></div>'});