define("userCenter/teacherCenter/courseEdit/CourseInfoDialog_html", [], function () { return '<div class="dialog course-info-dialog"><div class="header"><div class="title">课程信息</div></div><div class="close">×</div><div class="body"><div class="block">填写下方问题自动生成课程信息，这样的课程信息更有吸引力哦</div><div class="form"><div class="group"><label class="label"><span class="icon warning">*</span><span class="text">课程适合哪些学生：</span></label><div class="controls"><Input options="{{applicationInputOptions}}"/></div></div><div class="group"><label class="label"><span class="icon warning">*</span><span class="text">课程相关的信息介绍：</span></label><div class="controls"><Input options="{{relativeInputOptions}}" /></div></div><div class="group"><label class="label"><span class="icon warning">*</span><span class="text">学生容易遇到的困难、误区：</span></label><div class="controls"><Input options="{{questionInputOptions}}" /></div></div><div class="group"><label class="label"><span class="icon warning">*</span><span class="text">提供的教学内容或方法：</span></label><div class="controls"><Input options="{{learnwayInputOptions}}" /></div></div><div class="group"><label class="label"><span class="text">学习时长：</span></label><div class="controls"><Input options="{{timeInputOptions}}" /></div></div><div class="group"><label class="label"><span class="icon warning">*</span><span class="text">达到哪些学习目标</span></label><div class="controls"><Input options="{{targetInputOptions}}" /></div></div><div class="group"><div class="label">课程信息预览：</div><div class="controls"><div class="text">{{#if relativeInputOptions.value}}{{relativeInputOptions.value}},{{/if}}{{#if questionInputOptions.value}}<span class="text muted">学生容易遇到</span>{{questionInputOptions.value}}<span class="text muted">等方面的问题</span>，{{/if}}{{#if applicationInputOptions.value}}<span class="text muted">课程面向</span>{{applicationInputOptions.value}},{{/if}}{{#if learnwayInputOptions.value}}<span class="text muted">通过</span>{{learnwayInputOptions.value}},{{/if}}{{#if timeInputOptions.value}}<span class="text muted">在</span>{{timeInputOptions.value}}内，{{/if}}{{#if targetInputOptions.value}}<span class="text muted">达到</span>{{targetInputOptions.value}}<span class="text muted">的学习目标。</span>{{/if}}</div></div></div></div></div><div class="footer"><div class="buttons"><div class="button info" on-click="publish()">生成课程信息</div></div></div><style>{{style}}</style></div>'});