define("userCenter/teacherCenter/dataCenter/sysntheticSort/viptop_html", [], function () { return '{{ #each teachers }}<a target="_blank" href="{{homelink}}"><div class="top-teacher"><div class="teacher-img"><img class="image huge round" data-src="{{avatar}}" data-width="100" data-height="100"/><div class="rank {{#if rank<=3 }} active {{/if}}">{{rank}}</div></div><div class="teacher-name">{{getName(nickname)}}</div></div></a>{{ /each }}'});