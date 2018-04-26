# 老师／机构 公共代码仓库简介
---

## 项目资源
---
资料库接口wiki：[这里](http://ewiki.baijiahulian.com/%E5%B9%B3%E5%8F%B0%E4%BA%8B%E4%B8%9A%E9%83%A8/%E4%B8%BB%E7%AB%99%E7%B3%BB%E7%BB%9F/%E8%B5%84%E6%96%99%E5%BA%93/index.md)  
视频课接口wiki： [这里](http://ewiki.baijiahulian.com/www/%E8%A7%86%E9%A2%91%E8%AF%BE%E6%94%B9%E7%89%88/%E5%8F%91%E5%B8%83%E8%A7%86%E9%A2%91%E8%AF%BE.md)


## 项目介绍
---
前端框架：angular
前端包管理：npm
打包工具：gulp

## 开发
---
* app 业务代码
	* common 业务公共
		* ngDirective 业务公共指令  
		* ngService 业务公共服务  
		* function 公共函数  
		* ui 公共ui控件  
	* module 业务逻辑  
		* commonPage 没有顶导的相关业务 一般用来嵌iframe ＋ 直播助手相关页面  入口 commonPage.html
			* dataBank 从资料库添加资料的通用页面
				* 调用方法及传递参数  如下 var iframeUrl = 'http://ziliao.genshuixue.com/commonPage.html?fileType=video&hideUpload=true&noMultiple=true&hideSettings=false&auth_token=' + $rootScope.user.auth_token + '#/dataBank';
				* fileType: 可选的文件类型 video audio 等 可选 默认全部
				* noMultiple: 是否不支持多选 true false 可选 默认false(支持多选)
				* hideSettings: 是否隐藏设置 true false 可选 默认 false
				* auth_token: 标识 必传
		* main 主流程业务代码   一般是编辑页  入口 main.html
		* detail 老师学生个人中心非seo详情页业务代码  有左导和顶导 入口 detail.html
			* selectFileFromDiskDialog 支持从资料库选指定类型的文件 （目前支持视频、音频）
	* resource 公共css和图片  
		* css 统一样式  
			* mixin/* less统一的mixin文件  
			* variables.less less统一的变量  
		* icomoon 统一font icon存放文件，每次新增icon，增加版本号控制  
* dep 第三方依赖  
	* cs 前端统一的css类库，demo见[这里](http://musicode.github.io/cs/)，文档见[这里](https://musicode.gitbooks.io/cc/content/ui/combobox.html)  
	* cc 前端统一的ui类库，git仓库地址见[这里](https://github.com/musicode/cc)(里边有demo)  
* build gulp任务  
	* 启动服务：`gulp server`
* mock  

### mock数据
---
为了便于查找，以path名称生成目录接口，例如: `/demo/demo`
文件对应目录接口：`demo/demo.js`
