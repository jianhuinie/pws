define("userCenter/teacherCenter/classCourseEdit/offlineCourseEdit/common/PreviewDetail_html", [], function () { return '<div class="preview-detail"><div class="header"><div class="button secondary button-exit" on-click="close()">退出预览</div><div class="tool-bar"><span class="title muted large">样式：</span><ul class="tool-bar-list">{{#each colorList:index}}<li class="tool-bar-item"{{#if themeChecked != index}}style="background-color: {{this}}"{{/if}}on-click="set(\'themeChecked\', index)">{{#if themeChecked == index}}<i class="{{#if index == \'white\'}} icon-check{{else}} icon-check-circle{{/if}}"style="{{#if index != \'white\'}}color: {{this}};{{else}}color: #ccc;{{/if}} "></i>{{/if}}</li>{{/each}}</ul></div></div><div class="preview-body {{options.list.style}}">{{#each options.list.list}}{{#if type === \'title\'}}<div class="title">{{options.text}}</div>{{elseif type === \'body\'}}<div class="body" style="color: {{options.color}};font-weight: {{#if options.isBold}}bold{{else}}normal{{/if}};font-size: {{#if options.isBig}}17px{{else}}15px{{/if}};text-align: {{#if options.isCenter}}center{{else}}left{{/if}};">{{{formatText(options.text)}}}</div>{{elseif type === \'image\' && options.url}}<div class="image-box"><img src="{{options.url}}"></div>{{elseif type === \'video\' && options.cover}}<div class="video-box" on-click="playVideo(this)"><img src="{{options.cover}}"><img src="http://img.gsxservice.com/0cms/d/file/content/2016/08/57b5684983da9.png" class="icon play"></div>{{elseif type === \'audio\' && options.url}}<div class="audio-box" on-click="playAudio(this)"><img src="http://img.gsxservice.com/0cms/d/file/content/2016/08/57b693e1e3815.png">{{#if playing}}<img class="icon" src="http://img.gsxservice.com/0cms/d/file/content/2016/08/57b69204a2241.gif">{{else}}<i class="icon icon-recording"></i>{{/if}}</div>{{/if}}{{/each}}<div class="view-audio-wrapper"></div></div><style>{{style}}</style></div>'});