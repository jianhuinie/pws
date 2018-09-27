define("userCenter/teacherCenter/videoCourseEdit/videoCourseEdit_html", [], function () { return '<div class="video-course-edit"><div class="header"><span class="huge">视频课管理</span><span class="muted">> 课程编辑<span class="error">（带*为必填项）</span></span></div><div class="body">{{#if isSelling}}<strong class="error">当前视频课正在线上售卖中，您对视频课的任何修改和变更都需要通过审核后方可生效，请您谨慎修改。</strong>{{/if}}<div class="section course-info"><div class="section-title">{{#if !courseInfoEditing}}<div class="floated"><div class="link info tiny" on-click="editCourseInfo()">编辑</div></div>{{/if}}<strong class="name">第一步：设置课程封面、简介及价格</strong>{{#if courseInfoAuditFail}}<span class="desc error tiny">经问仔细心检测，以下标记<i class="icon icon-info-circle"></i>的部分审核不通过，请点击<i class="icon icon-info-circle"></i>查看原因，修改后再发布</span>{{/if}}</div><div class="section-body{{#if courseInfoEditing}} editing{{else}} default{{/if}}">{{#if courseInfoEditing}}<CourseInfoForm options="{{courseInfoFormOptions}}" /><div class="action"><div class="buttons"><div class="button primary" on-click="saveCourseInfo()">保存课程信息</div><div class="button secondary" on-click="restoreCourseInfo()">放弃修改</div></div></div>{{else}}<CourseInfo options="{{courseInfoOptions}}" />{{/if}}</div></div><div class="section video-upload"><div class="section-title">{{#if !courseSectionEditing}}<div class="floated"><div class="link info tiny" on-click="editCourseSection()">编辑</div></div>{{/if}}<strong class="name">第二步：视频上传</strong>{{#if courseSectionCheckFail}}<span class="desc error tiny">经问仔细心检测，以下标记<i class="icon icon-info-circle"></i>的课节未转码成功，请替换</span>{{elseif courseSectionAuditFail}}<span class="desc error tiny">经问仔细心检测，以下标记<i class="icon icon-info-circle"></i>的部分审核不通过，请点击<i class="icon icon-info-circle"></i>查看原因，修改后再发布</span>{{else}}<span class="desc info tiny">上传中断时，再次选择同一文件可以从中断处续传</span>{{/if}}</div><div class="section-body{{#if courseSectionEditing}} editing{{else}} default{{/if}}">{{#if courseSectionEditing}}<CourseSectionFormList options="{{courseSectionListOptions}}" courseNumber="{{courseNumber}}" /><div class="action"><div class="button primary" on-click="saveCourseSection()">保存课节</div></div>{{else}}{{#each courseSectionListOptions.list:index}}<CourseSection options="{{this}}" sectionIndex="{{index + 1}}" />{{/each}}{{#if courseSectionListOptions.canAddCourseSection}}<div class="course-section"><div class="add-course-section" on-click="addCourseSection()"><i class="book"></i><div class="muted small"><i class="icon icon-plus"></i>添加新课节</div></div></div>{{/if}}{{/if}}</div></div><div class="section course-detail"><div class="section-title">{{#if !courseDetailEditing}}<div class="floated"><div class="link info tiny" on-click="editCourseDetail()">编辑</div></div>{{/if}}<strong class="name">第三步：课程详情</strong><div class="desc tiny"><div>请不要在内容中留电话、QQ、和网址哦，仅支持5M以内的jpg、png、jpeg格式图片，最大宽度不要超过760像素。</div>{{#if getAuditErrorMessage(\'brief\')}}<div class="error">课程详情审核不通过，理由如下：{{{getAuditErrorMessage(\'brief\')}}}</div>{{/if}}</div></div><div class="section-body{{#if courseDetailEditing}} editing{{else}} default{{/if}}">{{#if courseDetailEditing}}<RichTextEditor options="{{courseDetailEditingEditorOptions}}" /><div class="action"><div class="buttons"><div class="button primary" on-click="saveCourseDetail()">保存</div><div class="button secondary" on-click="restoreCourseDetail()">放弃修改</div></div></div>{{else}}<div class="course-detail">{{{courseDetail}}}</div>{{/if}}</div></div>{{#if showModifyReason}}<div class="modify-reason"><div class="muted small">请填写修改原因，此原因将会影响审核是否通过（<strong class="error">* 必填</strong>）</div><Input options="{{modifyReasonInputOptions}}" /></div>{{/if}}<div class="buttons centered"><div class="button primary" on-click="publishCourse()">立即发布课程</div><div class="button secondary" on-click="saveToQueue()">保存至待发布列表</div></div></div></div>'});