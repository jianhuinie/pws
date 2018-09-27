define("userCenter/teacherCenter/netdiskShare/ShareInfo_html", [], function () { return '<div class="netdisk-share-info">{{#if !options.isFromNetdisk}}<div class="inline muted">文件添加到：资料库目录</div><div class="help info texts"><i class="text primary icon-help-o"></i><span class="text"data-title="严禁利用跟谁学网站上传和传播暴力恐怖、色情及其他违法信息，一经发现将严格按照法律法规处理"data-skin="primary"data-placement="bottomLeft"data-offset-x="80"data-max-width="30em">上传须知</span></div><div class="button text small upload-wrapper primary {{#if !canShare}} disabled{{/if}}" ><input type="file">本地上传</div>{{else}}<div class="texts crumbs"><span class="info text" on-click="changeDirectory()">我的资料库</span>{{#if !truncateCrumbs}}{{#each crumbs:index}}<span class="text">></span><span class="text" on-click="changeDirectory(this, index)">{{{cutString(name, 20)}}}</span>{{/each}}{{else}}{{#each crumbs:index}}{{#if index < 1 || index == crumbs.length - 1 || index == crumbs.length - 2}}<span class="text">></span><span class="text" on-click="changeDirectory(this, index)">{{{cutString(name, 20)}}}</span>{{/if}}{{#if index == crumbs.length - 3}}<span class="text">></span><span class="text">...</span>{{/if}}{{/each}}{{/if}}</div>{{/if}}<div class="items-list">{{#each options.files:index}}<div class="item"><span class="texts">{{#if status == UPLOADER_STATUS_SUCCESS}}<i class="text success icon-check-circle"></i>{{elseif status == UPLOADER_STATUS_ERROR || status == UPLOADER_STATUS_CANCELED || status == UPLOADER_STATUS_COPYNAME}}<i class="text error icon-info-circle"></i>{{/if}}<span class="text file-name">{{{cutString(file.name, 60)}}}</span></span><br><span class="status {{#if status == UPLOADER_STATUS_ERROR || status == UPLOADER_STATUS_CANCELED || status == UPLOADER_STATUS_COPYNAME}} error{{else}} muted{{/if}}">{{#if status == UPLOADER_STATUS_SUCCESS}}恭喜您，上传成功{{elseif status == UPLOADER_STATUS_UPLOADING}}{{#if progress != \'100%\'}}<div class="progress-wrapper"><div class="label" style="width: {{progress}}"></div><span class="progress-span">{{progress}}</span></div><span class="button cancel" on-click="cancelUpload(index)">取消</span><div class="arguments texts"><span class="text">已上传：{{formateSize(uploaded)}}</span><span class="text">速度：{{formatSpeed(speed)}}</span><span class="text">剩余时间：{{formatRestTime(restTime)}} s</span></div>{{else}}正在上传到服务器...{{/if}}{{elseif status == UPLOADER_STATUS_ERROR}}对不起，上传失败{{elseif status == UPLOADER_STATUS_CANCELED}}已取消上传{{elseif status == UPLOADER_STATUS_COPYNAME}}文件重名上传失败{{/if}}</span></div>{{/each}}</div>{{#if options.isFromNetdisk}}<div class="items-list-from-netdisk"><div class="item item-header"><div class="item-name"><input class="checked-all" type="checkbox" checked="{{checkedAll}}"><span class="checkspan"><i class="icon icon-unchecked"></i><i class="icon icon-checked info"></i></span>文件名称</div><div class="item-size">文件大小</div><div class="item-status">状态</div></div>{{#if netDiskFiles.length > 0}}<div class="item-list">{{#each netDiskFiles}}<div class="item"><div class="item-name {{#if hasSubDirectory}} has-sub{{/if}}" on-click="intoSubDirectory(this)">{{#if !hasSubDirectory}}<label class="label checkbox fluid">{{#if !hasShare}}<input type="checkbox" checked="{{checked}}"><span class="checkspan"><i class="icon icon-unchecked"></i><i class="icon icon-checked info"></i></span>{{else}}<div class="solid"></div>{{/if}}{{#if type == \'jpg\' || type == \'png\' || type == \'jpeg\' || type == \'svg\' || type == \'gif\'}}<img class="image-icon" src="{{rootUrl}}/s-img.png">{{elseif type == \'audio\'}}<img class="image-icon" src="{{rootUrl}}/s-audio.png">{{elseif type == \'excel\' || type == \'xlsx\' || type == \'xls\'}}<img class="image-icon" src="{{rootUrl}}/s-excel.png">{{elseif type == \'pdf\'}}<img class="image-icon" src="{{rootUrl}}/s-pdf.png">{{elseif type == \'ppt\' || type == \'pptx\'}}<img class="image-icon" src="{{rootUrl}}/s-ppt.png">{{elseif type == \'txt\'}}<img class="image-icon" src="{{rootUrl}}/s-txt.png">{{elseif type == \'video\'}}<img class="image-icon" src="{{rootUrl}}/s-video.png">{{elseif type == \'doc\' || type == \'docx\'}}<img class="image-icon" src="{{rootUrl}}/s-word.png">{{elseif type == \'zip\' || type == \'rar\'}}<img class="image-icon" src="{{rootUrl}}/s-zip.png">{{elseif type == \'\'}}<img class="image-icon" src="{{rootUrl}}/s-folder.png">{{else}}<img class="image-icon" src="{{rootUrl}}/s-unknown.png">{{/if}}{{{cutString(name, 20)}}}</label>{{else}}{{#if type == \'\'}}<img class="image-icon" src="{{rootUrl}}/s-folder.png">{{else}}<img class="image-icon" src="{{rootUrl}}/s-unknown.png">{{/if}}{{{cutString(name, 20)}}}{{/if}}</div><div class="item-size">{{#if !hasSubDirectory}}{{size}}{{else}}-{{/if}}</div><div class="item-status{{#if hasShare}} success{{/if}}">{{#if !hasSubDirectory}}{{#if hasShare}}已共享{{else}}未共享{{/if}}{{else}}-{{/if}}</div></div>{{/each}}</div>{{elseif netDiskFiles == null}}<div class="list-body">资料库中还没有文件，试试<span class="link info" on-click="uploadFromLocal()">本地上传</span></div>{{else}}<div class="list-body">正在加载...</div>{{/if}}</div>{{/if}}<div class="footer"><span class="primary">资料设置</span><div class="choose"><label class="label checkbox"><input type="checkbox" checked="{{canDownload}}" {{#if !cancel}} disabled{{/if}}>允许学生下载</label><label class="label checkbox"><input type="checkbox" checked="{{isOpen}}">公开资料</label></div><div class="error">{{#if downloadTips}}{{downloadTips}}{{/if}}</div><div class="button primary{{#if !canShare}} disabled{{/if}} submit-button" on-click="shareComplete()">完成</div></div><style>{{style}}</style></div>'});